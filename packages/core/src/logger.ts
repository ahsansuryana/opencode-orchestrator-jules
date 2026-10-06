import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  redact: {
    paths: [
      'JULES_API_KEY',
      'GITHUB_TOKEN',
      'OPENCODE_SERVER_PASSWORD',
      'PLUGIN_SECRET',
      'WEB_AUTH_TOKEN'
    ],
    censor: '***',
  },
});
