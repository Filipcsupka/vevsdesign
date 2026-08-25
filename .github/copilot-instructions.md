# Copilot Instructions — vevsdesign

## Context first (always)
Before answering any deploy/infra question, load context. The ops-brain vault lives OUTSIDE this workspace — read it via terminal:
- `cat ~/Documents/ops-brain/AGENTS.md` — canonical agent rules
- `cat ~/Documents/ops-brain/personal-infra/_context.md` and `cat ~/Documents/ops-brain/personal-infra/clusters/khtz.md` (web runs on the khtz k3s cluster via the `../infra` GitOps repo)
- Repo-local: `AGENTS.md`, `CLAUDE.md`, `README.md`
Answer only after loading matching notes; say which notes you used.

## Execution policy
- Normal requested repo work (inspection, in-scope edits, installs, builds, tests, lint/format, and local validation) — complete end-to-end without approval prompts.
- Read-only diagnostics (kubectl get|describe|logs|events|top, docker ps|logs, git status|log|diff, curl/dig) — run immediately, no permission questions.
- External or destructive state changes (cluster mutations — only via `../infra` GitOps repo, deploys, secrets, git push, deletes, and production writes) — show the exact command/diff and WAIT for explicit user approval.
