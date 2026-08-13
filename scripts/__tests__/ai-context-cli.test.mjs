import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { FRAMEWORK_VERSION, SCHEMA_VERSION } from '../lib/version.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const cliPath = path.join(repoRoot, 'bin', 'ai-context.mjs');

test('init on empty repo creates scaffold, managed tooling, workflow, PR template, stamp, and gitignore', async () => {
  await withFixture(async (root) => {
    const result = runCli('init', '--cwd', root);

    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /created:/);
    await assertFileExists(root, '.ai/context.md');
    await assertFileExists(root, '.ai/adr');
    await assertFileExists(root, 'scripts/validate-ai-context.mjs');
    await assertFileExists(root, 'scripts/check-drift.mjs');
    await assertFileExists(root, 'scripts/check-links.mjs');
    await assertFileExists(root, 'scripts/lib/version.mjs');
    await assertFileExists(root, '.github/workflows/ai-context-conformance.yml');
    await assertFileExists(root, '.github/PULL_REQUEST_TEMPLATE.md');
    await assertFileExists(root, '.github/copilot-instructions.md');

    assert.match(await readText(root, '.gitignore'), /^\.ai_local\/$/m);
    assert.deepEqual(JSON.parse(await readText(root, '.ai-context.json')), {
      frameworkVersion: FRAMEWORK_VERSION,
      schemaVersion: SCHEMA_VERSION
    });
  });
});

test('init rerun preserves consumer context, and merges the managed block into existing copilot instructions', async () => {
  await withFixture(async (root) => {
    assert.equal(runCli('init', '--cwd', root).status, 0);
    const customContext = 'consumer-owned context\n';
    const customCopilot = 'consumer-owned copilot instructions\n';
    await writeFile(path.join(root, '.ai', 'context.md'), customContext, 'utf8');
    await writeFile(path.join(root, '.github', 'copilot-instructions.md'), customCopilot, 'utf8');

    const result = runCli('init', '--cwd', root);

    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /skipped:/);
    // .ai/context.md is copy-if-absent: never overwritten.
    assert.equal(await readText(root, '.ai/context.md'), customContext);
    // copilot-instructions.md: existing content preserved, managed block injected.
    const merged = await readText(root, '.github/copilot-instructions.md');
    assert.match(merged, /consumer-owned copilot instructions/);
    assert.match(merged, /BEGIN AI CONTEXT FRAMEWORK MANAGED BLOCK/);
    assert.match(merged, /END AI CONTEXT FRAMEWORK MANAGED BLOCK/);

    // Re-running is idempotent: the block is replaced in place, not duplicated.
    assert.equal(runCli('init', '--cwd', root).status, 0);
    const second = await readText(root, '.github/copilot-instructions.md');
    assert.equal(second, merged);
    assert.equal((second.match(/BEGIN AI CONTEXT FRAMEWORK MANAGED BLOCK/g) || []).length, 1);
  });
});

test('update upgrades managed files and preserves consumer-authored .ai context byte-for-byte', async () => {
  await withFixture(async (root) => {
    await writeOldInstall(root);
    const originalContext = await readText(root, '.ai/context.md');

    const result = runCli('update', '--cwd', root);

    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /updated:/);
    assert.equal(await readText(root, '.ai/context.md'), originalContext);
    assert.equal(
      await readText(root, 'scripts/validate-ai-context.mjs'),
      await readFile(path.join(repoRoot, 'scripts', 'validate-ai-context.mjs'), 'utf8')
    );
    assert.deepEqual(JSON.parse(await readText(root, '.ai-context.json')), {
      frameworkVersion: FRAMEWORK_VERSION,
      schemaVersion: SCHEMA_VERSION
    });
  });
});

test('update never modifies files under .ai', async () => {
  await withFixture(async (root) => {
    await writeOldInstall(root);
    await writeFile(path.join(root, '.ai', 'notes.md'), 'private durable context\n', 'utf8');
    const before = await snapshotDirectory(path.join(root, '.ai'));

    assert.equal(runCli('update', '--cwd', root).status, 0);

    assert.deepEqual(await snapshotDirectory(path.join(root, '.ai')), before);
  });
});

test('update merges copilot instructions without clobbering existing Squad content', async () => {
  await withFixture(async (root) => {
    await writeOldInstall(root);
    const squadContent = '# Squad Coordinator\n\nSQUAD_COORDINATOR_CANARY_a8f3\n';
    await mkdir(path.join(root, '.github'), { recursive: true });
    await writeFile(path.join(root, '.github', 'copilot-instructions.md'), squadContent, 'utf8');

    const result = runCli('update', '--cwd', root);
    const merged = await readText(root, '.github/copilot-instructions.md');

    assert.equal(result.status, 0, result.stderr);
    assert.match(merged, /SQUAD_COORDINATOR_CANARY_a8f3/);
    assert.match(merged, /BEGIN AI CONTEXT FRAMEWORK MANAGED BLOCK/);
    assert.match(merged, /Before answering questions or generating code/);
  });
});

test('update --dry-run reports changes and writes nothing', async () => {
  await withFixture(async (root) => {
    await writeOldInstall(root);
    const before = await snapshotDirectory(root);

    const result = runCli('update', '--cwd', root, '--dry-run');

    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /dry-run/);
    assert.match(result.stdout, /updated:/);
    assert.deepEqual(await snapshotDirectory(root), before);
  });
});

test('update is idempotent: a second run reports zero changes', async () => {
  await withFixture(async (root) => {
    await writeOldInstall(root);
    assert.equal(runCli('update', '--cwd', root).status, 0);

    const second = runCli('update', '--cwd', root);

    assert.equal(second.status, 0, second.stderr);
    assert.match(second.stdout, /updated: 0/);
  });
});

test('check passes on a valid scaffold and is non-mutating', async () => {
  await withFixture(async (root) => {
    assert.equal(runCli('init', '--cwd', root).status, 0);
    await writeValidAi(root);
    const before = await snapshotDirectory(root);

    const result = runCli('check', '--cwd', root);

    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /validation: 1/);
    assert.deepEqual(await snapshotDirectory(root), before);
  });
});

test('--strict exits non-zero when drift remains', async () => {
  await withFixture(async (root) => {
    assert.equal(runCli('init', '--cwd', root).status, 0);
    await writeValidAi(root);
    await writeStamp(root, { frameworkVersion: '0.0.1', schemaVersion: SCHEMA_VERSION });

    const advisory = runCli('check', '--cwd', root);
    const strict = runCli('check', '--cwd', root, '--strict');

    assert.equal(advisory.status, 0, advisory.stderr);
    assert.equal(strict.status, 1);
    assert.match(strict.stdout, /WARNING/);
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

async function writeOldInstall(root) {
  await writeValidAi(root);
  await mkdir(path.join(root, 'scripts'), { recursive: true });
  await writeFile(path.join(root, 'scripts', 'validate-ai-context.mjs'), 'old validator\n', 'utf8');
  await writeStamp(root, { frameworkVersion: '0.0.1', schemaVersion: '0.9.0' });
}

async function writeValidAi(root) {
  await mkdir(path.join(root, '.ai', 'adr'), { recursive: true });
  await writeFile(
    path.join(root, '.ai', 'context.md'),
    `---
project: Example Project
platform: Node.js
context-version: 1.0.0
last-updated: 2026-07-25T01:46:23-07:00
owner: Test Owner
review-cadence: quarterly
---
# Example Project
`,
    'utf8'
  );
  await writeFile(
    path.join(root, '.ai', 'adr', '0001-example.md'),
    `---
adr: 0001
title: Example decision
status: accepted
date: 2026-07-25
deciders: Test Owner
reviewers: Test Reviewer
applies-to: example
supersedes: null
superseded-by: null
---
# ADR-0001: Example decision
`,
    'utf8'
  );
}

async function writeStamp(root, stamp) {
  await writeFile(path.join(root, '.ai-context.json'), `${JSON.stringify(stamp, null, 2)}\n`, 'utf8');
}

async function assertFileExists(root, relative) {
  await stat(path.join(root, ...relative.split('/')));
}

async function readText(root, relative) {
  return await readFile(path.join(root, ...relative.split('/')), 'utf8');
}

function runCli(...args) {
  return spawnSync(process.execPath, [cliPath, ...args], {
    cwd: repoRoot,
    encoding: 'utf8'
  });
}

async function snapshotDirectory(root) {
  const entries = {};
  await snapshotInto(root, root, entries);
  return entries;
}

async function snapshotInto(base, current, entries) {
  for (const entry of (await readdir(current, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const fullPath = path.join(current, entry.name);
    const relative = path.relative(base, fullPath).split(path.sep).join('/');
    if (entry.isDirectory()) {
      entries[`${relative}/`] = '<dir>';
      await snapshotInto(base, fullPath, entries);
    } else if (entry.isFile()) {
      entries[relative] = await readFile(fullPath, 'utf8');
    }
  }
}
