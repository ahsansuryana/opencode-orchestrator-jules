import { expect, test } from 'vitest';
import { loadConfig } from '../src/index';

test('loadConfig validates config', () => {
  const minimalConfig = {
    JULES_API_KEY: 'test',
    GITHUB_TOKEN: 'test',
    OPENCODE_SERVER_PASSWORD: 'test',
    PLUGIN_SECRET: 'test',
    WEB_AUTH_TOKEN: 'test',
    poll: {},
    github: {},
    scope: {},
    accept: {},
    decision: {},
    handoff: {},
    evidence: {},
    storage: {},
    sandbox: {},
    gate: {},
    jules: {},
    preflight: {},
    ci: {
      required_checks: ['test-check']
    }
  };

  const config = loadConfig(minimalConfig);
  expect(config.JULES_API_KEY).toBe('test');
  expect(config.OPENCODE_URL).toBe('http://127.0.0.1:4096');
});

test('loadConfig throws on missing secrets', () => {
  expect(() => loadConfig({})).toThrow(/Config validation failed/);
});
