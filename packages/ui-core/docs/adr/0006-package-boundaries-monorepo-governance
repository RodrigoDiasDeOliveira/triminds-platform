# ADR-0006: Package Boundaries & Monorepo Governance

## Status

Accepted

## Date

2026-06

## Decision Makers

* Rodrigo Dias de Oliveira

---

# Context

The Triminds Platform is structured as a monorepo containing:

* `ui-core`
* `ui-themes`
* `shared-utils`
* multiple applications

Without strict boundary rules, monorepos tend to degrade into:

* circular dependencies
* unclear ownership
* cross-package leakage
* architectural violations

A governance model is required to preserve long-term maintainability.

---

# Decision

Triminds will enforce **strict package boundaries** and **unidirectional dependency rules** across the monorepo.

---

# Package Responsibilities

## ui-core

Contains:

* Design System
* Components
* Layout system
* Page patterns

Must NOT contain:

* product logic
* API logic
* application state

---

## ui-themes

Contains:

* theme definitions
* design tokens per product
* CSS variable mappings

Must NOT contain:

* components
* layout logic
* business logic

---

## shared-utils

Contains:

* pure utilities
* formatting functions
* validation helpers

Must NOT depend on:

* ui-core
* ui-themes

---

## apps/*

Contains:

* product-specific composition
* routing
* data fetching
* feature logic

Must ONLY consume:

* ui-core
* ui-themes
* shared-utils

---

# Dependency Rules

## Allowed Flow

```text id="dep-flow"
apps
  ↓
ui-core
  ↓
ui-themes
  ↓
shared-utils
```

(utilities are isolated and may be consumed independently)

---

## Forbidden Rules

### 1. UI Core depending on apps

```text id="bad1"
ui-core → apps
```

---

### 2. Theme depending on components

```text id="bad2"
ui-themes → ui-core/components
```

---

### 3. Cross-app dependencies

```text id="bad3"
app A → app B
```

---

# Governance Rules

## Rule 1 — No circular dependencies

All dependencies must be acyclic.

---

## Rule 2 — Enforced via tooling

Future enforcement mechanisms:

* ESLint boundary rules
* TypeScript project references
* CI dependency checks

---

## Rule 3 — Ownership clarity

Each package has a single responsibility:

* UI system → ui-core
* Visual identity → ui-themes
* Utilities → shared-utils
* Business logic → apps

---

# Rationale

## Benefits

* Prevents architectural decay
* Improves scalability
* Enables independent evolution of packages
* Makes system predictable

---

# Consequences

## Positive

* Strong monorepo discipline
* Clear separation of concerns
* Easier maintenance at scale

## Negative

* Requires discipline and tooling enforcement
* Slight overhead in initial setup

Mitigation:

* Automated CI checks
* Strict review process
* Clear documentation

---

# Outcome

This ADR ensures that the Triminds monorepo remains scalable, predictable, and maintainable as the number of applications grows.
