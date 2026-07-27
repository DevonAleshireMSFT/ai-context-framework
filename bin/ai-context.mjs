#!/usr/bin/env node

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  checkCommand,
  createStamp,
  initCommand,
  printCheckReport,
  printInitReport,
  printUpdateReport,
  updateCommand
} from '../scripts/lib/cli-operations.mjs';
import { FRAMEWORK_VERSION, SCHEMA_VERSION } from '../scripts/lib/version.mjs';

const USAGE = `AI Context Framework CLI

Usage:
  ai-context init [--cwd <path>]
  ai-context update [--cwd <path>] [--dry-run] [--strict]
  ai-context check [--cwd <path>] [--strict]
  ai-context --version
  ai-context --help

Commands:
  init     Scaffold a consumer repo without clobbering existing files.
  update   Refresh framework-managed tooling; never rewrites .ai/**.
  check    Run validator and drift check without mutating the repo.

Flags:
  --cwd <path>  Consumer repository root. Defaults to current directory.
  --dry-run     For update: report planned changes but write nothing.
  --strict      Non-zero on update drift/manual actions or check drift.
  --help        Print this help.
  --version     Print framework and schema versions.
`;

async function main() {
  const parsed = parseArgs(process.argv.slice(2));

  if (parsed.help || !parsed.command) {
    console.log(USAGE.trimEnd());
    return;
  }

  if (parsed.version) {
    console.log(`AI Context Framework ${FRAMEWORK_VERSION} (schema ${SCHEMA_VERSION})`);
    return;
  }

  const cwd = path.resolve(parsed.cwd ?? process.cwd());

  switch (parsed.command) {
    case 'init': {
      const report = await initCommand({ cwd });
      printInitReport(report);
      return;
    }

    case 'update': {
      const report = await updateCommand({ cwd, dryRun: parsed.dryRun });
      printUpdateReport(report);
      process.exitCode = parsed.strict && (report.manualActions.length > 0 || report.schemaWarnings.length > 0) ? 1 : 0;
      return;
    }

    case 'check': {
      const report = await checkCommand({ cwd });
      printCheckReport(report);
      const hasValidationErrors = report.validationFindings.some((finding) => finding.severity === 'ERROR');
      const hasStrictDrift = report.driftReport.findings.some((finding) => finding.severity === 'WARNING');
      process.exitCode = hasValidationErrors || (parsed.strict && hasStrictDrift) ? 1 : 0;
      return;
    }

    default:
      throw new Error(`Unknown command: ${parsed.command}`);
  }
}

function parseArgs(argv) {
  const result = {
    command: null,
    cwd: undefined,
    dryRun: false,
    strict: false,
    help: false,
    version: false
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--help' || arg === '-h') {
      result.help = true;
    } else if (arg === '--version' || arg === '-v') {
      result.version = true;
    } else if (arg === '--cwd') {
      const cwd = argv[index + 1];
      if (!cwd) {
        throw new Error('--cwd requires a path argument.');
      }
      result.cwd = cwd;
      index += 1;
    } else if (arg === '--dry-run') {
      result.dryRun = true;
    } else if (arg === '--strict') {
      result.strict = true;
    } else if (arg.startsWith('-')) {
      throw new Error(`Unknown flag: ${arg}`);
    } else if (!result.command) {
      result.command = arg;
    } else {
      throw new Error(`Unexpected argument: ${arg}`);
    }
  }

  if (result.version) {
    result.command = result.command ?? '__version__';
  }

  if (result.help) {
    result.command = result.command ?? '__help__';
  }

  return result;
}

try {
  await main();
} catch (error) {
  console.error(`ERROR: ${error.message}`);
  process.exitCode = 1;
}

export { createStamp };
