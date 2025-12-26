# 📘 COPILOT_DATA_REFACTOR.md

## Purpose
This document contains **strict instructions for GitHub Copilot** to refactor and optimize the portfolio data layer **without breaking the existing working React + TypeScript application**.

Copilot must follow this plan **step‑by‑step**. Deviations, shortcuts, or assumptions are not allowed.

---

## 🧠 Context

- This is a **production‑ready personal portfolio** built with **React + TypeScript**.
- Current data lives in `src/data/` and is **heavily duplicated** across files.
- The application currently works — **do not break it**.

The goal is to **introduce a new optimized data layer** and then migrate consumers gradually.

---

## 🎯 High‑Level Goals

1. Create a **single source of truth** for all portfolio data
2. Eliminate duplication and inconsistencies
3. Add strong TypeScript typing
4. Migrate imports safely, page‑by‑page
5. Preserve existing UI and behavior

---

## 🧱 Phase 1 — Create new data architecture

### Create new folder (DO NOT TOUCH OLD DATA YET)

```
src/data_new/
```

### Create the following files EXACTLY

```
src/data_new/
  ├─ index.ts          // barrel export only
  ├─ types.ts          // TypeScript interfaces only
  ├─ common.ts         // personalInfo, socialLinks, siteMetadata, getThemeColor
  ├─ interests.ts      // interestData + icons
  ├─ achievements.ts   // achievements + stats
  ├─ projects.ts       // canonical projects array
  ├─ experiences.ts    // canonical experiences array
  ├─ education.ts      // education + timeline
  ├─ footer.ts         // footerStats, footerData, socialMediaLinks
```

---

## 📐 Phase 2 — Type definitions (MANDATORY)

### File: `src/data_new/types.ts`

You MUST define interfaces for:

- `PersonalInfo`
- `SocialLinks`
- `Interest`
- `AchievementStats`
- `Project`
- `Experience`
- `EducationItem`
- `FooterStats`

### Rules

- ❌ No implementations here
- ❌ No React imports
- ✅ All list items MUST include `id` or `slug`

---

## 📦 Phase 3 — Canonical data rules

### General rules (STRICT)

- ❌ No duplicated objects across files
- ❌ No string‑based icon names ("FaRobot")
- ✅ Icons must be imported React components
- ✅ Each domain lives in **one file only**
- ✅ Use types from `types.ts`

### Specific fixes required

- `BookNest` → **BookHive** (single canonical name)
- `totalProjects` → derived from `projects.length`
- `resume`, `profileImage`, `siteUrl` → defined once in `common.ts`

---

## 🧾 Phase 4 — Populate canonical files

For each `data_new/*.ts` file:

1. Copy data from old `src/data/*`
2. Deduplicate
3. Fix inconsistencies
4. Add `id` fields to arrays
5. Export typed constants

⚠️ DO NOT invent new data or remove fields used by components.

---

## 📤 Phase 5 — Barrel export

### File: `src/data_new/index.ts`

```ts
export * from './types';
export * from './common';
export * from './interests';
export * from './achievements';
export * from './projects';
export * from './experiences';
export * from './education';
export * from './footer';
```

---

## 🔁 Phase 6 — Import migration strategy (CRITICAL)

### Rules

- ❌ Do NOT mass‑replace imports
- ❌ Do NOT delete old data yet
- ✅ Migrate **one file at a time**
- ✅ App must compile after each change

### Import replacement pattern

❌ Before:
```ts
import { personalInfo } from '../../data/commonData';
import { projects } from '../../data/projectsData';
```

✅ After:
```ts
import { personalInfo, projects } from '@/data_new';
```

(Respect relative paths or path aliases.)

---

## 🧩 Phase 7 — Migration order (FOLLOW STRICTLY)

1. Footer components
2. Contact page
3. About page
4. Skills page
5. Projects page
6. Overview / Home page
7. Shared UI components (Navbar, Cards, Stats)

After each migration:
- Fix TypeScript errors
- Remove unused imports
- Verify UI renders correctly

---

## 🧪 Phase 8 — Validation & cleanup

### After ALL imports use `data_new`

1. Run:
```bash
npm run dev
npm run build
```
2. Confirm zero runtime and TS errors
3. Search for leftover old imports:
```bash
rg "src/data/" src
```
4. Rename:
```
src/data → src/data_legacy
src/data_new → src/data
```
5. Update import paths if needed

---

## 🚫 Forbidden actions

- ❌ Do NOT change UI or component behavior
- ❌ Do NOT inline data into components
- ❌ Do NOT invent data
- ❌ Do NOT delete old files early

---

## ✅ Completion checklist

- [ ] Single source of truth per domain
- [ ] No duplicated objects
- [ ] All components import from new data folder
- [ ] TypeScript build passes
- [ ] UI unchanged

---

## 🧾 Commit discipline

Use small, clear commits:

```
refactor(data): add canonical data_new structure
refactor(data): migrate footer to data_new
refactor(data): migrate projects page
```

---

## 🧠 If unsure

- Prefer existing working behavior
- Ask before deep refactors
- Never guess values

---

## END OF INSTRUCTIONS

Copilot must follow this document **exactly**.
