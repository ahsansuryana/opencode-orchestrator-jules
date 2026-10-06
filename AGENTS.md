# AGENTS.md — jules-orchestrator

## Project
A daemon + web UI that orchestrates Jules sessions from a DAG plan. See docs/PLAN.md (binding decisions in §3).

## Commands
- Install: `pnpm install`
- Build: `pnpm build` · Typecheck: `pnpm typecheck` · Lint: `pnpm lint` · Test: `pnpm test`
- Single package tests: `pnpm --filter @orch/core test`

## Structure
packages/core (pure logic, no I/O) · packages/adapters (I/O behind interfaces + fakes) · packages/db · packages/shared · apps/daemon · apps/web · opencode/ (plugin + agents) · test/sim (deterministic simulations)

## Rules
- `core` must not import from `adapters`, `db`, or any I/O library. Depend on interfaces only.
- The daemon is the single DB writer. No other process writes SQLite.
- All external calls go through adapter interfaces; every adapter has a Fake used by tests.
- Never use real time or randomness in `core`; inject `Clock` and seeded RNG.
- TypeScript strict; no `any` without a comment. No `console.log` — use the logger.
- Never log or persist secrets; never put secrets in prompts.
- LLM outputs only via structured tool calls with `decision_id`; never parse free text.
- Do not edit `.github/workflows/**` unless the task says so.
- Every PR: tests for new logic, updated docs if behavior changes, description sections per docs/PLAN.md §0.8.

## Testing
Vitest. Simulation tests live in test/sim and must be deterministic.
