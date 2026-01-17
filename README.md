# GSD for Antigravity

> **Get Shit Done** — A spec-driven, context-engineered development methodology adapted for Google Antigravity.

[![Based on GSD](https://img.shields.io/badge/based%20on-GSD-blue)](https://github.com/glittercowboy/get-shit-done)

---

## 🚀 Installation (New Project)

### Option 1: Clone and Copy (Recommended)

```powershell
# 1. Clone the GSD template
git clone https://github.com/toonight/get-shit-done-for-antigravity.git gsd-template

# 2. Copy to your project
cd your-project
Copy-Item -Recurse gsd-template\.agent .\
Copy-Item -Recurse gsd-template\.gemini .\
Copy-Item -Recurse gsd-template\.gsd .\

# 3. Clean up
Remove-Item -Recurse -Force gsd-template

# 4. Initialize your SPEC.md
# Edit .gsd/SPEC.md with your project vision
```

### Option 2: Git Subtree

```powershell
# Add as subtree (keeps connection for updates)
git subtree add --prefix=.gsd-source https://github.com/toonight/get-shit-done-for-antigravity.git main --squash

# Copy files to correct locations
Copy-Item -Recurse .gsd-source\.agent .\
Copy-Item -Recurse .gsd-source\.gemini .\
Copy-Item -Recurse .gsd-source\.gsd .\
```

### Option 3: Manual Download

1. Download ZIP from https://github.com/toonight/get-shit-done-for-antigravity
2. Extract `.agent/`, `.gemini/`, `.gsd/` to your project root
3. Delete the rest

---

## 📋 Quick Start (After Installation)

```
1. Edit .gsd/SPEC.md         → Define vision, goals, mark FINALIZED
2. /map                      → Analyze existing codebase (if any)
3. /plan 1                   → Create Phase 1 plans
4. /execute 1                → Implement Phase 1
5. /verify 1                 → Confirm it works
6. Repeat for each phase
```

---

## 🎮 Commands

| Command | Role | Purpose |
|---------|------|---------|
| `/map` | The Architect | Analyze codebase → ARCHITECTURE.md |
| `/plan [N]` | The Strategist | Create PLAN.md files for phase N |
| `/execute [N]` | The Engineer | Wave-based execution with atomic commits |
| `/verify [N]` | The Auditor | Must-haves validation with proof |
| `/debug [desc]` | The Debugger | Systematic debugging (3-strike rule) |
| `/progress` | Navigator | Show current position |
| `/pause` | — | Save state for session handoff |
| `/resume` | — | Restore from last session |
| `/add-todo` | — | Quick capture idea |
| `/check-todos` | — | List pending items |

---

## 🔒 Core Rules (GEMINI.md)

| Rule | Enforcement |
|------|-------------|
| 🔒 Planning Lock | No code until SPEC.md is FINALIZED |
| 💾 State Persistence | Update STATE.md after every task |
| 🧹 Context Hygiene | 3 failures → state dump → fresh session |
| ✅ Empirical Validation | Proof required, no "it should work" |

---

## 📁 File Structure

```
your-project/
├── .agent/
│   ├── workflows/     # 10 slash commands
│   └── skills/        # 8 agent specializations
├── .gemini/
│   └── GEMINI.md      # Rules enforcement
├── .gsd/
│   ├── SPEC.md        # ← START HERE (define & finalize)
│   ├── ROADMAP.md     # Phases (created by /plan)
│   ├── STATE.md       # Session memory
│   ├── ARCHITECTURE.md
│   ├── STACK.md
│   ├── DECISIONS.md
│   ├── JOURNAL.md
│   ├── TODO.md
│   ├── templates/     # Reusable templates
│   └── examples/      # Usage examples
└── (your code)
```

---

## 🗒️ XML Task Structure

Plans use semantic XML for precision:

```xml
<task type="auto">
  <name>Create login endpoint</name>
  <files>src/api/auth/login.ts</files>
  <action>
    POST endpoint accepting {email, password}.
    AVOID: jsonwebtoken (CommonJS issues)
    USE: jose library instead
  </action>
  <verify>curl -X POST localhost:3000/api/login returns 200</verify>
  <done>Valid creds → 200 + cookie, invalid → 401</done>
</task>
```

---

## 📚 Examples

See `.gsd/examples/` for:
- [workflow-example.md](.gsd/examples/workflow-example.md) — Complete walkthrough
- [quick-reference.md](.gsd/examples/quick-reference.md) — Printable card

---

## 🧠 Philosophy

- **Plan before building** — Specs matter (but no enterprise theater)
- **Fresh context > polluted context** — State dumps prevent hallucinations
- **Proof over trust** — Screenshots and command outputs, not "looks right"
- **Aggressive atomicity** — 2-3 tasks per plan, atomic commits

---

*Adapted from [glittercowboy/get-shit-done](https://github.com/glittercowboy/get-shit-done) for Google Antigravity*
