import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { checkLinks, githubSlug } from '../check-links.mjs';

function fileUrlToPath(fileUrl) {
  const pathname = decodeURIComponent(new URL(fileUrl).pathname);
  return process.platform === 'win32' && /^\/[A-Za-z]:/.test(pathname) ? pathname.slice(1) : pathname;
}

const __dirname = path.dirname(fileUrlToPath(import.meta.url));
const FIXTURE_ROOT = path.join(__dirname, '.fixtures');
let fixtureCounter = 0;

function makeFixture(files) {
  const root = path.join(FIXTURE_ROOT, `case-${process.pid}-${fixtureCounter++}`);
  fs.rmSync(root, { recursive: true, force: true });

  for (const [file, content] of Object.entries(files)) {
    const target = path.join(root, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content, 'utf8');
  }

  return root;
}

function removeFixture(root) {
  fs.rmSync(root, { recursive: true, force: true });
  fs.rmSync(FIXTURE_ROOT, { recursive: true, force: true });
}

test('valid relative link passes', () => {
  const root = makeFixture({
    'README.md': '[Guide](org/guide.md)\n',
    'org/guide.md': '# Guide\n',
  });

  try {
    const report = checkLinks(root);
    assert.equal(report.summary.errors, 0);
    assert.equal(report.summary.warnings, 0);
  } finally {
    removeFixture(root);
  }
});

test('valid relative directory link passes', () => {
  const root = makeFixture({
    'README.md': '[Directory](sub/)\n',
    'sub/.keep': '',
  });

  try {
    const report = checkLinks(root);
    assert.equal(report.summary.errors, 0);
    assert.equal(report.summary.warnings, 0);
  } finally {
    removeFixture(root);
  }
});

test('missing relative link reports an error', () => {
  const root = makeFixture({
    'README.md': '[Missing](org/missing.md)\n',
  });

  try {
    const report = checkLinks(root);
    assert.equal(report.summary.errors, 1);
    assert.match(report.files[0].errors[0].message, /Target file does not exist/);
  } finally {
    removeFixture(root);
  }
});

test('valid heading anchor passes', () => {
  const root = makeFixture({
    'README.md': '[Section](org/guide.md#deep-section)\n',
    'org/guide.md': '# Guide\n\n## Deep Section\n',
  });

  try {
    const report = checkLinks(root);
    assert.equal(report.summary.errors, 0);
    assert.equal(report.summary.warnings, 0);
  } finally {
    removeFixture(root);
  }
});

test('em dash heading anchor matches GitHub slugging', () => {
  assert.equal(githubSlug('Minimum Viable Setup — 10 Minutes'), 'minimum-viable-setup--10-minutes');

  const root = makeFixture({
    'README.md': '[Setup](org/guide.md#minimum-viable-setup--10-minutes)\n',
    'org/guide.md': '# Guide\n\n## Minimum Viable Setup — 10 Minutes\n',
  });

  try {
    const report = checkLinks(root);
    assert.equal(report.summary.errors, 0);
    assert.equal(report.summary.warnings, 0);
  } finally {
    removeFixture(root);
  }
});

test('empty target reports an error', () => {
  const root = makeFixture({
    'README.md': '[Empty]()\n',
  });

  try {
    const report = checkLinks(root);
    assert.equal(report.summary.errors, 1);
    assert.equal(report.files[0].errors[0].message, 'Empty link target');
  } finally {
    removeFixture(root);
  }
});
