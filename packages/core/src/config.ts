import { z } from 'zod';

export const configSchema = z.object({
  JULES_API_KEY: z.string().min(1, 'JULES_API_KEY is required'),
  GITHUB_TOKEN: z.string().min(1, 'GITHUB_TOKEN is required'),
  OPENCODE_URL: z.string().default('http://127.0.0.1:4096'),
  OPENCODE_SERVER_PASSWORD: z.string().min(1, 'OPENCODE_SERVER_PASSWORD is required'),
  PLUGIN_SECRET: z.string().min(1, 'PLUGIN_SECRET is required'),
  WEB_AUTH_TOKEN: z.string().min(1, 'WEB_AUTH_TOKEN is required'),
  DATA_DIR: z.string().default('./data'),
  max_parallel: z.coerce.number().default(3),
  max_total_jules_sessions: z.coerce.number().default(40),
  poll: z.object({
    jules_ms: z.coerce.number().default(20000),
    github_ms: z.coerce.number().default(30000),
  }),
  scheduler_ms: z.coerce.number().default(15000),
  ci: z.object({
    required_checks: z.array(z.string()).min(1, 'ci.required_checks must be set'),
    root_exempt: z.boolean().default(false),
    timeout_minutes: z.coerce.number().default(45),
  }),
  github: z.object({
    merge_method: z.enum(['merge', 'squash', 'rebase']).default('squash'),
  }),
  scope: z.object({
    global_allow: z.array(z.string()).default(["pnpm-lock.yaml", "package-lock.json", "yarn.lock"]),
  }),
  protected_paths: z.array(z.string()).default([".github/workflows/**", "orchestrator.config.json"]),
  accept: z.object({
    policy: z.enum(['risk_based', 'all', 'none']).default('risk_based'),
  }),
  decision: z.object({
    timeout_minutes: z.coerce.number().default(10),
    model: z.string().optional(),
  }),
  handoff: z.object({
    wait_seconds: z.coerce.number().default(300),
  }),
  auto_replies_max: z.coerce.number().default(3),
  pr_grace_seconds: z.coerce.number().default(120),
  evidence: z.object({
    max_bytes: z.coerce.number().default(104857600),
  }),
  storage: z.object({
    max_gb: z.coerce.number().default(20),
    min_free_gb: z.coerce.number().default(2),
  }),
  sandbox: z.object({
    image: z.string().default('orchestrator-verify:latest'),
    cpus: z.coerce.number().default(2),
    memory_mb: z.coerce.number().default(4096),
  }),
  gate: z.object({
    max_auto_fix_nodes: z.coerce.number().default(2),
  }),
  jules: z.object({
    can_resume_completed: z.enum(['unknown', 'true', 'false']).default('unknown'),
    delete_sessions_on_finish: z.boolean().default(false),
  }),
  preflight: z.object({
    require_branch_protection: z.boolean().default(false),
  }),
});

export type Config = z.infer<typeof configSchema>;

export function loadConfig(input: unknown): Config {
  const result = configSchema.safeParse(input);
  if (!result.success) {
    throw new Error('Config validation failed: ' + result.error.message);
  }
  return result.data;
}
