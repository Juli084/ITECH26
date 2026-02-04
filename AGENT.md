# AGENTS.md - Agent Guidelines for iTech26

## Essential Commands
```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Production build - MUST PASS before committing
npm run lint         # ESLint check
npm run start        # Start production server
npm run db:seed      # Seed database with sample data
```

## Code Style & Architecture

### File Organization
- `src/app/` - Next.js App Router (pages, layouts, route handlers)
- `src/app/actions/` - Server Actions (one file per domain: auth.ts, leads.ts, etc.)
- `src/components/ui/` - Reusable UI components (button.tsx, card.tsx, etc.)
- `src/components/sections/` - Page sections (hero, services, etc.)
- `src/components/layout/` - Layout components (navbar, footer)
- `src/db/schema.ts` - All Drizzle ORM table definitions
- `src/lib/utils.ts` - Shared utilities (cn() for Tailwind merging)

### Server Actions Pattern
```typescript
"use server";

import { z } from "zod";
import { db } from "@/db";

const schema = z.object({
  field: z.string().min(1, "Error message"),
});

export async function actionName(data: { field: string }) {
  const result = schema.safeParse(data);
  if (!result.success) return { error: result.error.issues[0].message };

  try {
    await db.insert(table).values({ field: data.field });
    return { success: true };
  } catch (error) {
    return { error: "Generic error message" };
  }
}
```

### TypeScript Rules
- Use `strict: true` in tsconfig.json
- Never use `any` - use `unknown` if type is truly unknown
- Export types explicitly when used across files
- Use `zod` for runtime validation in server actions
- Define return types for all exported functions

### Import Guidelines
- Use `@/` alias for all internal imports
- Group imports: React/libraries first, then internal, then types
- Example:
  ```typescript
  import { useState } from "react";
  import { z } from "zod";
  import { db } from "@/db";
  import { Button } from "@/components/ui/button";
  ```

### Component Guidelines
- Use PascalCase for component files: `UserProfile.tsx`
- Use `cn()` for className merging (from @/lib/utils)
- Destructure props at component top
- Default to Server Components, use `"use client"` only when needed
- Mobile-first responsive design (tailwind: `md:`, `lg:` prefixes)

### Styling (Tailwind CSS v4)
- Use utility classes, avoid arbitrary values when standard classes exist
- Maintain generous spacing (8px base, 16px sections)
- Use standard colors from tailwind config (no custom hex values)
- Add `group` class for hover effects on child elements
- Use `framer-motion` for smooth animations (fade, slide, reveal)

### Database (Drizzle ORM + PostgreSQL)
- All schemas in `src/db/schema.ts`
- Use snake_case for database columns, camelCase for JS properties
- Migrations in `drizzle/` directory
- Always use transactions for multi-step operations
- Price in `products` table stored as integer (cents)

### Error Handling
- Server actions return `{ error: string }` or `{ success: true }`
- Client forms display error from `actionResult?.error`
- Always validate with Zod before database operations
- Sanitize all user inputs
- Never expose sensitive data in error messages

## Product & UX Standards (iTech Premium)

### Design Philosophy
- Minimalist, premium, modern aesthetic
- Mobile-first, responsive design
- Generous white space (breathing room)
- Clear visual hierarchy
- Smooth, subtle animations (fade, reveal, parallax)

### Technical Performance
- Lazy load images with `next/image`
- Use `<Suspense>` for async components
- Avoid unnecessary re-renders
- Minimize bundle size
- SEO-friendly (proper meta tags, semantic HTML)

### Required Pages (MVP)
Public: `/`, `/sobre`, `/servicos`, `/servicos/[slug]`, `/blog`, `/blog/[slug]`, `/login`, `/cadastro`
Private (Admin): `/dashboard`, `/dashboard/leads`, `/dashboard/posts`

### Authentication (NextAuth)
- RBAC: ADMIN (full access), USER (own data only)
- Protected routes check session in middleware or layout
- Password hashing with bcryptjs

## What NOT to Do
- Overengineer features not in MVP scope
- Implement payments, real-time chat, complex integrations
- Skip Zod validation in forms
- Use heavy libraries without justification
- Commit broken builds
- Skip accessibility (a11y) basics

## Testing Notes
- No test framework currently configured
- Manual testing required for all features
- Test: buttons, forms, navigation, mobile/desktop, console errors
- Use browser dev tools to verify responsive behavior

## Before Committing
1. Run `npm run build` - must pass
2. Run `npm run lint` - fix all errors
3. Test all changed functionality manually
4. Remove unused imports and dead code
5. Verify mobile responsiveness
