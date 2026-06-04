# ADR-0003: Component Layering Architecture

## Status

Accepted

## Date

2026-06

## Decision Makers

* Rodrigo Dias de Oliveira

---

# Context

As a shared frontend platform, Triminds must support multiple applications:

* OCL
* Satellite
* Vector AI
* Future internal and external products

Without a strict component hierarchy, Design Systems tend to degrade into:

* inconsistent abstractions
* duplicated UI logic
* unclear ownership of components
* mixed responsibilities between UI and business logic

To prevent this, the platform requires a clearly defined component layering model.

---

# Decision

Triminds Platform will adopt a **strict layered component architecture** inside `ui-core`.

Each layer has a defined responsibility and dependency direction.

---

# Architecture Layers

## Layer 1 — Design Tokens (Foundation Layer)

The lowest level of the system.

### Responsibility

Define all visual primitives as semantic values.

### Examples

* colors
* spacing
* typography
* radius
* shadows
* motion

### Rule

Design tokens must not depend on components.

---

## Layer 2 — Primitive UI Components

Basic reusable components with no business logic.

### Examples

* Button
* Input
* Select
* Checkbox
* Card
* Dialog
* Tooltip

### Characteristics

* Stateless or minimally stateful
* Fully theme-driven
* No domain knowledge
* Built using Radix UI primitives

### Rule

Primitive components must depend only on:

* design tokens
* utility functions

---

## Layer 3 — Layout System

Defines structural composition of applications.

### Examples

* AppShell
* Sidebar
* Header
* PageContainer
* Grid
* Section

### Responsibility

Provide consistent layout structure across all applications.

### Rule

Layout components must depend only on primitives and tokens.

---

## Layer 4 — Domain-Agnostic Patterns

Reusable “product-level building blocks”.

These are not business-specific, but already more complex than primitives.

### Examples

* DashboardPage
* DataTablePage
* FormPage
* AuthPage
* AIChatPage

### Responsibility

Encapsulate UI composition patterns, not business logic.

### Rule

Patterns may depend on:

* primitives
* layout system

Patterns must NOT contain:

* API logic
* product-specific rules
* conditional product behavior

---

## Layer 5 — Application Layer

Final composition layer consumed by products.

### Examples

* OCL App
* Satellite App
* Vector AI App

### Responsibility

Compose:

* ThemeProvider
* AppShell
* Page Patterns
* Application-specific data

### Example

```tsx id="app-layer-example"
<ThemeProvider theme="ocl">
  <AppShell>
    <DashboardPage data={dashboardData} />
  </AppShell>
</ThemeProvider>
```

---

# Dependency Rules

Dependencies must always flow downward:

```text id="dependency-flow"
Applications
   ↓
Patterns
   ↓
Layout System
   ↓
Primitives
   ↓
Design Tokens
```

---

## Forbidden Dependencies

### 1. Reverse Dependency

```text id="bad1"
tokens → components
components → patterns
patterns → apps
```

### 2. Cross-Layer Logic

```tsx id="bad2"
if (product === "ocl") { ... }
```

### 3. Business Logic in UI Core

UI Core must never contain:

* API calls
* product rules
* feature flags per product
* domain logic

---

# Rationale

This layering model ensures:

## 1. Predictability

Every developer knows where logic belongs.

## 2. Scalability

New components do not break existing structure.

## 3. Reusability

Patterns can be reused across all applications.

## 4. Maintainability

Changes in one layer do not cascade unpredictably.

## 5. Strong Separation of Concerns

UI Core remains purely presentational and composable.

---

# Consequences

## Positive

* Clear architecture boundaries
* Easier onboarding
* Reduced architectural drift
* Better scalability for multiple products
* Strong Design System discipline

---

## Negative

* Requires discipline to maintain layering rules
* Slight overhead when creating new patterns
* Developers must understand architecture boundaries

Mitigation:

* Documentation
* ESLint architectural rules (future)
* Code review enforcement
* Storybook structure mirroring layers

---

# Enforcement Strategy (Future)

To prevent architectural drift, the following will be introduced:

* ESLint boundary rules
* Folder-level constraints
* Storybook layer separation
* CI validation for imports

---

# Related Decisions

* ADR-0001: Monorepo + Design System adoption
* ADR-0002: Theming Strategy

---

# Outcome

This layering model becomes the structural backbone of `ui-core`, ensuring that Triminds Platform evolves without architectural degradation over time.
