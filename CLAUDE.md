# Commit messages

One rule for every project in this workspace — no per-project variants.

## Shape

```text
<type>: <subject>

- <domain>: <change>
- <domain>: <change>

Co-Authored-By: Claude Code <noreply@anthropic.com>
```

## Header — type only

- Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `perf`, `build`, `ci`, `style`.
- Imperative, lowercase after the colon, no trailing period, ~72 characters max.
- No scope or parentheses in the header — never `chore(project):` or `chore(rps):`.

## Body — domains

- One bullet per domain touched, formatted `- domain: change`.
- Domains: `project` (cross-cutting), `root` (index.html, README, package configs, `.nojekyll`), `styles`, `assets`, `src`, `dist`.
- A domain is never a project name.
- Multiple domains in one commit are fine: list each as its own bullet.

## Footer

- Blank line, then `Co-Authored-By: Claude Code <noreply@anthropic.com>`.

## Principle

Type and domain are orthogonal: the header says *what kind* of change, the bullets say *where*. Do not encode a domain in the header or a type in the bullets.
