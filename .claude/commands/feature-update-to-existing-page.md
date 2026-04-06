---
name: feature-update-to-existing-page
description: Workflow command scaffold for feature-update-to-existing-page in internet-university.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /feature-update-to-existing-page

Use this workflow when working on **feature-update-to-existing-page** in `internet-university`.

## Goal

Update or enhance an existing page, typically in response to feature changes or UI improvements.

## Common Files

- `src/app/leaderboard/page.tsx`
- `src/app/certificate/[id]/page.tsx`
- `src/app/degree/[slug]/page.tsx`
- `src/app/degree/[slug]/pay/page.tsx`
- `src/app/profile/[name]/page.tsx`
- `src/app/contact/page.tsx`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Edit the relevant page file under src/app/[feature]/[param]/page.tsx or src/app/[feature]/page.tsx
- Commit the changes with a descriptive message

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.