---
name: add-or-update-shared-layout-or-config
description: Workflow command scaffold for add-or-update-shared-layout-or-config in internet-university.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /add-or-update-shared-layout-or-config

Use this workflow when working on **add-or-update-shared-layout-or-config** in `internet-university`.

## Goal

Modify shared layout or configuration files, often together with feature/page updates.

## Common Files

- `src/app/layout.tsx`
- `package.json`
- `package-lock.json`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Edit src/app/layout.tsx and/or configuration files (package.json, package-lock.json)
- Optionally, update related page files for feature integration
- Commit all related changes together

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.