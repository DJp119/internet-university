---
name: add-or-update-shared-library
description: Workflow command scaffold for add-or-update-shared-library in internet-university.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /add-or-update-shared-library

Use this workflow when working on **add-or-update-shared-library** in `internet-university`.

## Goal

Modify shared library files (e.g., supabase integration, certificate generator) along with related page updates.

## Common Files

- `src/lib/supabase.ts`
- `src/lib/certificate-generator.ts`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Edit src/lib/[library].ts (e.g., supabase.ts, certificate-generator.ts)
- Update related page files to use the new or updated library logic
- Commit all related changes together

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.