```markdown
# internet-university Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill provides a comprehensive guide to the development patterns and workflows used in the `internet-university` repository. The project is built with TypeScript and Next.js, focusing on modular page development, shared libraries, and consistent coding conventions. This guide will help you quickly understand how to contribute, update features, and follow established practices in this codebase.

## Coding Conventions

**File Naming**
- Use camelCase for file names.
  - Example: `certificateGenerator.ts`, `userProfile.tsx`

**Import Style**
- Use alias imports for modules.
  - Example:
    ```typescript
    import supabase from '@/lib/supabase'
    import CertificateGenerator from '@/lib/certificateGenerator'
    ```

**Export Style**
- Default exports are preferred.
  - Example:
    ```typescript
    // src/lib/supabase.ts
    const supabase = createClient(...)
    export default supabase
    ```

**Commit Patterns**
- Commit messages are freeform, often short (average ~12 characters).
- Prefixes are not enforced.

## Workflows

### Feature Update to Existing Page
**Trigger:** When you need to modify the content, layout, or logic of an existing page (e.g., leaderboard, certificate, profile, etc.)  
**Command:** `/update-page`

1. Locate the relevant page file under `src/app/[feature]/[param]/page.tsx` or `src/app/[feature]/page.tsx`.
2. Edit the file to implement your changes.
3. Commit your changes with a descriptive message.

**Example:**
```typescript
// src/app/leaderboard/page.tsx
export default function LeaderboardPage() {
  // Updated leaderboard logic or UI
}
```

**Common Files:**
- `src/app/leaderboard/page.tsx`
- `src/app/certificate/[id]/page.tsx`
- `src/app/degree/[slug]/page.tsx`
- `src/app/degree/[slug]/pay/page.tsx`
- `src/app/profile/[name]/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/page.tsx`

---

### Add or Update Shared Layout or Config
**Trigger:** When you need to update global layout, configuration, or dependencies (e.g., analytics, UI wrappers, package updates).  
**Command:** `/update-layout`

1. Edit `src/app/layout.tsx` and/or configuration files (`package.json`, `package-lock.json`).
2. Optionally, update related page files for feature integration.
3. Commit all related changes together.

**Example:**
```typescript
// src/app/layout.tsx
export default function RootLayout({ children }) {
  // Add or update global wrappers, providers, etc.
  return <main>{children}</main>
}
```

**Common Files:**
- `src/app/layout.tsx`
- `package.json`
- `package-lock.json`

---

### Add or Update Shared Library
**Trigger:** When you need to update backend integration or shared logic, often to support new or changed features.  
**Command:** `/update-lib`

1. Edit the relevant library file in `src/lib/[library].ts` (e.g., `supabase.ts`, `certificate-generator.ts`).
2. Update related page files to use the new or updated library logic.
3. Commit all related changes together.

**Example:**
```typescript
// src/lib/certificate-generator.ts
const generateCertificate = (userData) => {
  // Certificate generation logic
}
export default generateCertificate
```

**Common Files:**
- `src/lib/supabase.ts`
- `src/lib/certificate-generator.ts`

---

## Testing Patterns

- Test files follow the pattern: `*.test.*`
- The testing framework is not explicitly specified in the repository.
- Place test files alongside the modules they test or in a dedicated test directory.

**Example:**
```typescript
// src/lib/certificate-generator.test.ts
import generateCertificate from './certificate-generator'

test('generates certificate correctly', () => {
  // Test logic here
})
```

## Commands

| Command        | Purpose                                               |
|----------------|-------------------------------------------------------|
| /update-page   | Update or enhance an existing page                    |
| /update-layout | Modify shared layout or configuration files           |
| /update-lib    | Update shared library files and related integrations  |
```
