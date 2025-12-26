# ✅ Final Data Normalization & Cleanup Plan

> **Scope:** `src/data/` (already canonical)  
> **Goal:** Remove remaining inconsistencies, hardcoded values, and duplication **without breaking the working app**.

---

## 🧭 Current Status

You already have:
- ✅ Centralized data layer (`src/data`)
- ✅ Domain‑wise separation (projects, education, experiences, etc.)
- ✅ Strong TypeScript typings
- ✅ Derived values in some places (e.g. footer stats)

Remaining issues are **normalization**, not architecture.

---

## 🧱 Phase 0 — Safety & Preparation

1. Create a working branch:
   ```bash
   git checkout -b chore/data-normalization
   ```

2. Ensure baseline is clean:
   ```bash
   npm run dev
   npm run build
   ```

3. ❌ Do **not** rename folders or delete files yet.

---

## 🧱 Phase 1 — Icon Normalization (Highest Priority)

### 🎯 Objective
Eliminate **all string‑based icons** and use **React icon components only**.

---

### Step 1.1 — Fix `about.ts`

**Problem**
```ts
icon: "FaRobot"
```

**Plan**
- Stop re‑indexing `interests` manually (`interests[0]`, `interests[1]`)
- Reuse canonical `interests` directly

**Outcome**
- No icon strings
- No index‑based coupling

---

### Step 1.2 — Fix `certifications.ts`

**Problem**
```ts
badge: "FaGlobe"
```

**Action**
```ts
import { FaGlobe } from "react-icons/fa";

badge: FaGlobe,
```

---

### Step 1.3 — Fix `overview.ts`

**Problems**
```ts
icon: "FaLinkedin"
```

**Action**
- Import icon components (`FaLinkedin`, etc.)
- Replace string icons with components

---

### ✅ Phase 1 Validation
```bash
rg 'icon: "' src/data
```
Expected result: **0 matches**

---

## 🧱 Phase 2 — Replace Hardcoded Metrics with Derived Values

### 🎯 Objective
Remove magic numbers and derive values from canonical data.

---

### Step 2.1 — `about.ts`

**Replace**
```ts
value: "4"
```

**With**
```ts
import { projects } from "./projects";

value: `${projects.length}`
```

---

### Step 2.2 — `overview.ts`

**Replace hardcoded values**
- `"4"` → `projects.length`
- `"371 Problems"` → `achievements.leetcode.problemsSolved`
- `"2+"` → `achievements.stats.yearsExperience`

**Canonical sources**
- `projects.ts`
- `achievements.ts`

---

### ✅ Phase 2 Validation
```bash
rg 'title: "4"|subtitle: "371"|year: "2\+"' src/data
```
Expected result: **0 matches**

---

## 🧱 Phase 3 — Remove Page‑Level Data Duplication

### 🎯 Objective
Pages should **consume**, not **redefine**, shared data.

---

### Step 3.1 — `overview.ts`

**Problems**
- Email hardcoded
- GitHub URL hardcoded
- Resume path duplicated
- Availability duplicated

**Plan**
- Import from `common.ts` and `socialLinks`

**Rule**
> If data exists in `common.ts`, pages must import it.

---

### Step 3.2 — Sanity‑check `contact.ts` and `footer.ts`

Ensure:
- Email comes from `personalInfo`
- Links come from `socialLinks`
- Project count comes from `projects.length`

---

## 🧱 Phase 4 — Type Hygiene & Stability

### 🎯 Objective
Improve maintainability without changing behavior.

---

### Step 4.1 — Centralize icon typing

In `types.ts`:
```ts
export type IconType = React.ComponentType<{ className?: string }>;
```

Use for:
- `Interest.icon`
- Overview / social icons

---

### Step 4.2 — Optional typing improvement

- Introduce `OverviewData` interface
- Prevent future regressions

---

## 🧱 Phase 5 — Final Validation & Cleanup

### Run full checks
```bash
npm run dev
npm run build
```

### Final searches
```bash
rg 'icon: "' src
rg 'mailto:' src/data
rg '"4"' src/data
```

Only intentional matches should remain.

---

## 🧾 Commit Strategy

Commit after each phase:
```text
fix(data): normalize icons across data files
fix(data): derive metrics from canonical sources
refactor(data): remove duplicated overview values
chore(types): centralize icon type
```

---

## ✅ Completion Criteria

You are DONE when:
- [ ] No string‑based icons exist
- [ ] No hardcoded metrics tied to real data
- [ ] Pages only consume canonical data
- [ ] `npm run build` passes
- [ ] UI remains unchanged

---

## 🧠 Final Outcome

> “My portfolio uses a centralized, typed data layer with derived metrics, zero duplication, and clean separation of content and presentation.”

This is **senior‑level frontend architecture**.

---

## END OF PLAN

