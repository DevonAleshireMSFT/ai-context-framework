import assert from 'node:assert/strict';
import test from 'node:test';
import { evaluateStaleness } from '../check-staleness.mjs';

test('fresh context is ok when age is less than max age', () => {
  const result = evaluateStaleness({
    lastUpdated: '2026-07-01',
    cadence: 'monthly',
    now: '2026-07-20T00:00:00.000Z'
  });

  assert.deepEqual(result, {
    status: 'ok',
    ageDays: 19,
    maxAgeDays: 30,
    overdueByDays: 0
  });
});

test('overdue context reports days past max age', () => {
  const result = evaluateStaleness({
    lastUpdated: '2026-01-01',
    cadence: 'monthly',
    now: '2026-02-05T00:00:00.000Z'
  });

  assert.deepEqual(result, {
    status: 'overdue',
    ageDays: 35,
    maxAgeDays: 30,
    overdueByDays: 5
  });
});

test('unknown cadence returns unknown without crashing', () => {
  const result = evaluateStaleness({
    lastUpdated: '2026-07-01',
    cadence: 'weekly',
    now: '2026-07-20T00:00:00.000Z'
  });

  assert.deepEqual(result, {
    status: 'unknown',
    ageDays: 19,
    maxAgeDays: null,
    overdueByDays: 0
  });
});

test('boundary age equal to max age is not overdue', () => {
  const result = evaluateStaleness({
    lastUpdated: '2026-01-01',
    cadence: 'monthly',
    now: '2026-01-31T00:00:00.000Z'
  });

  assert.deepEqual(result, {
    status: 'ok',
    ageDays: 30,
    maxAgeDays: 30,
    overdueByDays: 0
  });
});
