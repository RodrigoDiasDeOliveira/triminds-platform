# ADR-0005: Page Patterns Architecture

## Status

Accepted

## Date

2026-06

## Decision Makers

* Rodrigo Dias de Oliveira

---

# Context

Applications built on Triminds Platform repeatedly implement the same UI structures:

* dashboards
* tables
* forms
* authentication flows
* AI chat interfaces

Without standardization, each application reimplements these patterns differently.

---

# Decision

Triminds will introduce **standardized Page Patterns** inside `ui-core`.

These patterns represent **reusable page-level compositions**, not business logic.

---

# Pattern Layer Definition

Page Patterns sit above layout components and below applications.

```text id="pattern-layer"
Apps
  ↓
Page Patterns
  ↓
Layout System
  ↓
Primitives
```

---

# Standard Patterns

## DashboardPage

Used for:

* metrics
* charts
* summaries
* widgets

---

## DataTablePage

Used for:

* CRUD interfaces
* lists
* filtering
* pagination

---

## FormPage

Used for:

* data entry
* configuration screens
* structured inputs

---

## AuthPage

Used for:

* login
* registration
* password recovery

---

## AIChatPage

Used for:

* conversational interfaces
* LLM interactions
* assistant workflows

---

# Rules

## Rule 1 — No business logic in patterns

Patterns must not:

* call APIs directly
* contain product-specific rules
* include feature flags

---

## Rule 2 — Patterns are composable

Patterns must accept:

* data
* callbacks
* configuration

Example:

```tsx id="pattern-example"
<DataTablePage
  data={users}
  columns={columns}
  onRowClick={handleClick}
/>
```

---

## Rule 3 — Patterns must be reusable across products

All products must be able to use the same pattern without modification.

---

# Rationale

## Benefits

* Faster application development
* Reduced UI duplication
* Consistent UX patterns
* Easier onboarding

---

# Consequences

## Positive

* Strong standardization at page level
* Predictable UI structure
* Reduced frontend complexity per app

## Negative

* Some flexibility trade-offs
* Requires careful API design for patterns

Mitigation:

* Slot-based pattern architecture
* Escape hatch to primitives

---

# Outcome

Page Patterns become the primary building blocks of application screens in Triminds Platform.
