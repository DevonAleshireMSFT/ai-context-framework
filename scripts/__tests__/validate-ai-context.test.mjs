import assert from 'node:assert/strict';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { validate } from '../validate-ai-context.mjs';
import { compareSchemaCompatibility } from '../lib/version.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const validatorPath = path.join(repoRoot, 'scripts', 'validate-ai-context.mjs');

test('valid .ai content passes without findings', async () => {
  await withFixture(async (root) => {
    await writeValidAi(root);

    const findings = await validate(root);

    assert.deepEqual(findings, []);
  });
});

test('current repository .ai content has zero findings', async () => {
  const findings = await validate(repoRoot);
  assert.deepEqual(findings, []);
});

test('missing context required field returns an error', async () => {
  await withFixture(async (root) => {
    await writeValidAi(root);
    await writeFile(
      path.join(root, '.ai', 'context.md'),
      `---
project: Example Project
platform: Node.js
context-version: 1.0.0
last-updated: 2026-07-25
review-cadence: quarterly
---
# Example Project
`,
      'utf8'
    );

    const findings = await validate(root);

    assertHasError(findings, '.ai/context.md', 'owner');
  });
});

test('ADR number must match filename prefix', async () => {
  await withFixture(async (root) => {
    await writeValidAi(root);
    await writeFile(path.join(root, '.ai', 'adr', '0002-example.md'), validAdr({ adr: '0003' }), 'utf8');

    const findings = await validate(root);

    assertHasError(findings, '.ai/adr/0002-example.md', 'must match filename prefix');
  });
});

test('invalid review-cadence returns an error', async () => {
  await withFixture(async (root) => {
    await writeValidAi(root);
    await writeFile(
      path.join(root, '.ai', 'context.md'),
      `---
project: Example Project
platform: Node.js
context-version: 1.0.0
last-updated: 2026-07-25
owner: Test Owner
review-cadence: weekly
---
# Example Project
`,
      'utf8'
    );

    const findings = await validate(root);

    assertHasError(findings, '.ai/context.md', 'review-cadence');
  });
});

test('schema-version older by minor warns', async () => {
  await withFixture(async (root) => {
    await writeValidAi(root, { 'schema-version': '0.9.0' });

    const findings = await validate(root);

    assertHasWarning(findings, '.ai/context.md', 'schema-version 0.9.0 is older');
    assert.equal(findings.filter((finding) => finding.severity === 'ERROR').length, 0);
  });
});

test('schema-version older by major warns', async () => {
  await withFixture(async (root) => {
    await writeValidAi(root, { 'schema-version': '0.0.0' });

    const findings = await validate(root);

    assertHasWarning(findings, '.ai/context.md', 'schema-version 0.0.0 is older');
    assert.equal(findings.filter((finding) => finding.severity === 'ERROR').length, 0);
  });
});

test('schema-version equal to validator schema has no warning', async () => {
  await withFixture(async (root) => {
    await writeValidAi(root, { 'schema-version': '1.0.0' });

    const findings = await validate(root);

    assert.deepEqual(findings, []);
  });
});

test('schema-version patch differences are compatible', async () => {
  await withFixture(async (root) => {
    await writeValidAi(root, { 'schema-version': '1.0.1' });

    const findings = await validate(root);

    assert.deepEqual(findings, []);
    assert.equal(compareSchemaCompatibility('1.0.0', '1.0.1'), 0);
  });
});

test('schema-version prerelease for current major minor warns as older', async () => {
  await withFixture(async (root) => {
    await writeValidAi(root, { 'schema-version': '1.0.0-alpha' });

    const findings = await validate(root);

    assertHasWarning(findings, '.ai/context.md', 'schema-version 1.0.0-alpha is older');
    assert.equal(findings.filter((finding) => finding.severity === 'ERROR').length, 0);
  });
});

test('schema-version newer than validator warns that tooling may be behind', async () => {
  await withFixture(async (root) => {
    await writeValidAi(root, { 'schema-version': '1.1.0' });

    const findings = await validate(root);

    assertHasWarning(findings, '.ai/context.md', 'tooling may be behind');
    assert.equal(findings.filter((finding) => finding.severity === 'ERROR').length, 0);
  });
});

test('absent schema-version remains backward compatible', async () => {
  await withFixture(async (root) => {
    await writeValidAi(root);

    const findings = await validate(root);

    assert.deepEqual(findings, []);
  });
});

test('CLI exits 0 when clean and 1 when errors are present', async () => {
  await withFixture(async (root) => {
    await writeValidAi(root);

    const clean = runValidator(root);
    assert.equal(clean.status, 0);

    await writeFile(
      path.join(root, '.ai', 'context.md'),
      `---
project: Example Project
platform: Node.js
context-version: not-semver
last-updated: 2026-07-25
owner: Test Owner
review-cadence: quarterly
---
# Example Project
`,
      'utf8'
    );

    const invalid = runValidator(root);
    assert.equal(invalid.status, 1);
  });
});

test('--strict exits 1 when warnings are present', async () => {
  await withFixture(async (root) => {
    await mkdir(path.join(root, '.ai'), { recursive: true });
    await writeFile(
      path.join(root, '.ai', 'context.md'),
      `---
project: Example Project
platform: Node.js
context-version: 1.0.0
last-updated: 2026-07-25
owner: Test Owner
review-cadence: quarterly
---
# Example Project
`,
      'utf8'
    );

    const normal = runValidator(root);
    assert.equal(normal.status, 0);

    const strict = runValidator(root, '--strict');
    assert.equal(strict.status, 1);
  });
});

async function withFixture(callback) {
  const root = await mkdtemp(path.join(repoRoot, 'scripts', '__tests__', '.fixture-'));
  try {
    await callback(root);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

async function writeValidAi(root, contextOverrides = {}) {
  const contextData = {
    project: 'Example Project',
    platform: 'Node.js',
    'context-version': '1.0.0',
    'last-updated': '2026-07-25T01:46:23-07:00',
    owner: 'Test Owner',
    'review-cadence': 'quarterly',
    ...contextOverrides
  };

  await mkdir(path.join(root, '.ai', 'adr'), { recursive: true });
  await writeFile(
    path.join(root, '.ai', 'context.md'),
    `${frontmatter(contextData)}
# Example Project
`,
    'utf8'
  );
  await writeFile(path.join(root, '.ai', 'adr', '0001-example.md'), validAdr({ adr: '0001' }), 'utf8');
}

function frontmatter(data) {
  const lines = ['---'];
  for (const [key, value] of Object.entries(data)) {
    lines.push(`${key}: ${value}`);
  }

  lines.push('---');
  return lines.join('\n');
}

function validAdr(overrides = {}) {
  const data = {
    adr: '0001',
    title: 'Example decision',
    status: 'accepted',
    date: '2026-07-25',
    deciders: 'Test Owner',
    reviewers: 'Test Reviewer',
    'applies-to': 'example',
    supersedes: 'null',
    'superseded-by': 'null',
    ...overrides
  };

  return `---
adr: ${data.adr}
title: ${data.title}
status: ${data.status}
date: ${data.date}
deciders: ${data.deciders}
reviewers: ${data.reviewers}
applies-to: ${data['applies-to']}
supersedes: ${data.supersedes}
superseded-by: ${data['superseded-by']}
---
# ADR-${data.adr}: ${data.title}
`;
}

function assertHasError(findings, file, text) {
  assert.ok(
    findings.some(
      (finding) => finding.severity === 'ERROR' && finding.file === file && finding.message.includes(text)
    ),
    `Expected ERROR for ${file} containing "${text}", got ${JSON.stringify(findings)}`
  );
}

function assertHasWarning(findings, file, text) {
  assert.ok(
    findings.some(
      (finding) => finding.severity === 'WARNING' && finding.file === file && finding.message.includes(text)
    ),
    `Expected WARNING for ${file} containing "${text}", got ${JSON.stringify(findings)}`
  );
}

function runValidator(root, ...args) {
  return spawnSync(process.execPath, [validatorPath, '--root', root, ...args], {
    cwd: repoRoot,
    encoding: 'utf8'
  });
}
