import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { checkDrift } from '../check-drift.mjs';
import { FRAMEWORK_VERSION, SCHEMA_VERSION } from '../lib/version.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const driftPath = path.join(repoRoot, 'scripts', 'check-drift.mjs');

test('no stamp file reports unmanaged info and exits 0', async () => {
  await withFixture(async (root) => {
    const report = await checkDrift(root);
    assert.equal(report.findings.length, 1);
    assert.equal(report.findings[0].severity, 'INFO');
    assert.match(report.findings[0].message, /unmanaged \/ pre-CLI install/);

    const cli = runDrift(root);
    assert.equal(cli.status, 0);
    assert.match(cli.stdout, /unmanaged \/ pre-CLI install/);
  });
});

test('equal stamp reports current and exits 0', async () => {
  await withFixture(async (root) => {
    await writeStamp(root, { frameworkVersion: FRAMEWORK_VERSION, schemaVersion: SCHEMA_VERSION });

    const report = await checkDrift(root);
    assert.deepEqual(report.findings, []);

    const cli = runDrift(root);
    assert.equal(cli.status, 0);
    assert.match(cli.stdout, /tooling is current/);
  });
});

test('behind framework and schema warn, default exits 0, strict exits non-zero', async () => {
  await withFixture(async (root) => {
    await writeStamp(root, { frameworkVersion: '0.0.9', schemaVersion: '0.9.0' });

    const report = await checkDrift(root);
    assert.equal(report.findings.filter((finding) => finding.severity === 'WARNING').length, 2);
    assert.match(report.findings[0].message, /0\.0\.9 is behind latest/);
    assert.match(report.findings[1].message, /0\.9\.0 is behind latest/);

    const normal = runDrift(root);
    assert.equal(normal.status, 0);
    assert.match(normal.stdout, /WARNING/);

    const strict = runDrift(root, '--strict');
    assert.equal(strict.status, 1);
  });
});

test('ahead stamp reports notice and exits 0', async () => {
  await withFixture(async (root) => {
    await writeStamp(root, { frameworkVersion: '99.0.0', schemaVersion: '99.0.0' });

    const report = await checkDrift(root);
    assert.equal(report.findings.length, 2);
    assert.ok(report.findings.every((finding) => finding.severity === 'INFO'));
    assert.match(report.findings[0].message, /newer than this framework package/);

    const cli = runDrift(root, '--strict');
    assert.equal(cli.status, 0);
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

async function writeStamp(root, stamp) {
  await writeFile(path.join(root, '.ai-context.json'), `${JSON.stringify(stamp, null, 2)}\n`, 'utf8');
}

function runDrift(root, ...args) {
  return spawnSync(process.execPath, [driftPath, '--root', root, ...args], {
    cwd: repoRoot,
    encoding: 'utf8'
  });
}
