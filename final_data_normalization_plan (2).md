# 📦 Final Data Normalization & Hardening Plan

> **Project:** Personal Portfolio (React + TypeScript + Vite)
>
> **Scope:** `src/data/*`
>
> **Status:** Application is working and stable
>
> **Objective:** Finalize a **production-grade, normalized, typed data layer** with zero duplication and consistent patterns.

---

## 🧠 Core Principles (Non-Negotiable)

1. **Single Source of Truth**  
   Any real-world data (email, counts, URLs, stats) must exist in **exactly one place**.

2. **No Magic Values**  
   Counts and metrics must be **derived**, never hardcoded.

3. **Icons Are Components**  
   Icons must always be `React.ComponentType`, never strings or emojis.

4. **Data Defines, Pages Consume**  
   Pages/components must never redefine canonical data.

---

## 🗂️ Canonical Ownership Map

| Domain | File |
|------|------|
| Personal info | `common.ts` |
| Social links | `common.ts` |
| Interests | `interests.ts` |
| Achievements & stats | `achievements.ts` |
| Projects | `projects.ts` |
| Experience | `experiences.ts` |
| Education | `education.ts` |
| About page (derived) | `about.ts` |
| Overview page (derived) | `overview.ts` |
| Footer stats (derived) | `footer.ts` |

---

## 🧱 Phase 0 — Safety & Baseline

1. Create a branch:
   ```bash
   git checkout -b chore/data-hardening
   ```

2. Confirm baseline:
   ```bash
   npm run dev
   npm run build
   ```

❌ Do **not** move folders or rename files.

---

## 🧱 Phase 1 — Fix Remaining Icon Violations (CRITICAL)

### ❌ Issues Identified
- `about.ts` still uses string-based icons
- `certifications.ts` still uses `"FaGlobe"`
- `skills.ts` → `techStack.icon` uses strings

### ✅ Rules
- Icons must be imported React components
- Icon type must be consistent everywhere

### Actions

#### 1. `about.ts`
- Remove manual icon mapping
- Reuse `interests` directly
- Remove string icons entirely

#### 2. `certifications.ts`
```ts
import { FaGlobe } from "react-icons/fa";

badge: FaGlobe
```

#### 3. `skills.ts` (techStack)
- Replace `"R"`, `"N"`, `"TS"` etc. with icon components
- OR explicitly document them as display-only tokens

### Validation
```bash
rg 'icon: "' src/data
```
Expected result: **0 matches**

---

## 🧱 Phase 2 — Remove Last Hardcoded Metrics

### ❌ Issues Identified
- `"4"` projects count in `about.ts`

### ✅ Canonical Derivations
- Projects count → `projects.length`
- Experience → `achievements.stats.yearsExperience`
- Problems solved → `achievements.leetcode.problemsSolved`

### Actions

#### `about.ts`
```ts
import { projects } from "./projects";

value: `${projects.length}`
```

### Validation
```bash
rg '"4"' src/data
```
Expected: **0 unintended matches**

---

## 🧱 Phase 3 — Enforce Page-Level Consumption Rules

### ❌ Risks
Pages accidentally reintroducing:
- email
- resume path
- social URLs

### Rules
- Email → `personalInfo.email`
- Resume → `personalInfo.resume`
- GitHub → `socialLinks.github.url`

### Files to Audit
- `overview.ts`
- `contact.ts`
- `footer.ts`

No new duplication allowed going forward.

---

## 🧱 Phase 4 — Type Hygiene (Stability Upgrade)

### Add shared icon type

In `types.ts`:
```ts
export type IconType = React.ComponentType<{ className?: string }>;
```

Use for:
- `Interest.icon`
- Skill icons
- Certification badges
- Overview icons

---

## 🧱 Phase 5 — Barrel Discipline

### Rule
`src/data/index.ts` must:
- Only re-export data
- Never contain logic

---

## 🧪 Final Validation Checklist

```bash
npm run dev
npm run build
```

Search audits:
```bash
rg 'icon: "' src
rg 'mailto:' src/data
rg 'http' src/data | rg -v 'projects'
```

Only intentional matches should remain.

---

## 🧾 Commit Strategy

Make atomic commits:
```text
fix(data): remove string-based icons
fix(data): derive remaining hardcoded metrics
refactor(data): enforce canonical data consumption
chore(types): add shared IconType
```

---

## ✅ Completion Criteria

You are DONE when:
- [ ] No string icons exist anywhere
- [ ] No hardcoded real-world metrics remain
- [ ] All pages consume canonical data
- [ ] Types enforce icon correctness
- [ ] UI output is unchanged
- [ ] `npm run build` passes

---

## 🏁 Final Result (Interview-Ready)

> “Designed and hardened a centralized, typed data layer with derived metrics, strict ownership, and zero duplication — following production-grade frontend architecture.”

---

**END OF PLAN**

