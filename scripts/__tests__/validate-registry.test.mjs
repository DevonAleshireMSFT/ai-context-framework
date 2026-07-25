import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { validateRegistry } from '../validate-registry.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

test('valid adopter row passes without findings', async () => {
  await withFixture(async (root) => {
    await writeRegistry(root, row());

    const findings = await validateRegistry(root);

    assert.deepEqual(findings, []);
  });
});

test('invalid Mode returns an error', async () => {
  await withFixture(async (root) => {
    await writeRegistry(root, row({ mode: '`invalid-mode`' }));

    const findings = await validateRegistry(root);

    assertHasError(findings, 'Mode must be one of');
  });
});

test('invalid Status returns an error', async () => {
  await withFixture(async (root) => {
    await writeRegistry(root, row({ status: 'Unknown' }));

    const findings = await validateRegistry(root);

    assertHasError(findings, 'Status must be one of');
  });
});

test('wrong cell count returns an error', async () => {
  await withFixture(async (root) => {
    await writeRegistry(root, '| example/repo | 2026-07-25 | Owner | `standalone` | Active |');

    const findings = await validateRegistry(root);

    assertHasError(findings, 'exactly 7 cells');
  });
});

test('YYYY-MM-DD placeholder returns a warning, not an error', async () => {
  await withFixture(async (root) => {
    await writeRegistry(root, row({ adoptionDate: 'YYYY-MM-DD' }));

    const findings = await validateRegistry(root);

    assert.equal(findings.filter((finding) => finding.severity === 'ERROR').length, 0);
    assertHasWarning(findings, 'YYYY-MM-DD placeholder');
  });
});

async function withFixture(callback) {
  const root = await mkdtemp(path.join(repoRoot, 'scripts', '__tests__', '.registry-fixture-'));
  try {
    await callback(root);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

async function writeRegistry(root, registeredRow) {
  await writeFile(
    path.join(root, 'registry.md'),
    `# Registry

## Registered Repositories

| Repository | Adoption Date | Tier-2 Owner | Mode | Status | Squad Boundary Enforcement | Notes |
|------------|---------------|--------------|------|--------|----------------------------|-------|
${registeredRow}

## Adoption Statuses

| Status | Meaning |
|--------|---------|
| \`Active\` | Current |
| \`Bootstrapped\` | Created |
| \`Stale\` | Needs review |
| \`Archived\` | Retired |

## Adoption Modes

| Mode | Meaning |
|------|---------|
| \`standalone\` | Uses .ai only |
| \`squad-companion\` | Uses .ai with .squad |
`,
    'utf8'
  );
}

function row(overrides = {}) {
  const data = {
    repository: 'example/repo',
    adoptionDate: '2026-07-25',
    owner: 'Example Owner',
    mode: '`standalone`',
    status: 'Active',
    boundary: 'Active',
    notes: '',
    ...overrides
  };

  return `| ${data.repository} | ${data.adoptionDate} | ${data.owner} | ${data.mode} | ${data.status} | ${data.boundary} | ${data.notes} |`;
}

function assertHasError(findings, text) {
  assert.ok(
    findings.some((finding) => finding.severity === 'ERROR' && finding.message.includes(text)),
    `Expected ERROR containing "${text}", got ${JSON.stringify(findings)}`
  );
}

function assertHasWarning(findings, text) {
  assert.ok(
    findings.some((finding) => finding.severity === 'WARNING' && finding.message.includes(text)),
    `Expected WARNING containing "${text}", got ${JSON.stringify(findings)}`
  );
}
