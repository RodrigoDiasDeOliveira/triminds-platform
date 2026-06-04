# ADR-0010: Routing Strategy (AppShell + Patterns Integration)

## Status

Accepted

## Date

2026-06

## Decision Makers

* Rodrigo Dias de Oliveira

---

# Context

Triminds Platform is composed of:

* AppShell (global layout system)
* Page Patterns (DashboardPage, DataTablePage, AIChatPage, etc.)
* Multiple applications (OCL, Satellite, Vector AI)

As the platform evolves, routing becomes a critical architectural concern.

Without a unified routing strategy, common issues arise:

* duplicated routing logic per application
* inconsistent navigation behavior
* tight coupling between pages and shell
* difficulty scaling to multiple products
* unclear ownership of route definitions

A consistent routing model is required to unify:

* AppShell navigation
* Page Patterns rendering
* application-level routing

---

# Decision

Triminds will adopt a **Shell-Owned Routing + Pattern-Based Page Composition model**.

Routing responsibility is centralized in the **AppShell layer**, while page rendering is delegated to **Page Patterns and application modules**.

---

# Architecture Model

## 1. Single Source of Navigation Truth

The AppShell owns all top-level routes.

Example:

```ts id="routes-config"
const routes = [
  { path: "/dashboard", pattern: "DashboardPage" },
  { path: "/data", pattern: "DataTablePage" },
  { path: "/ai", pattern: "AIChatPage" },
  { path: "/auth", pattern: "AuthPage" }
];
```

---

## 2. Shell-Owned Router

The routing system lives inside AppShell.

Responsibilities:

* URL parsing
* route matching
* layout persistence
* pattern resolution

The shell does NOT implement page logic.

---

## 3. Pattern Resolver

Routes map to Page Patterns instead of raw components.

Example:

```tsx id="pattern-resolver"
function RouteRenderer({ route }) {
  switch (route.pattern) {
    case "DashboardPage":
      return <DashboardPage />;
    case "DataTablePage":
      return <DataTablePage />;
    case "AIChatPage":
      return <AIChatPage />;
  }
}
```

---

## 4. Application Layer Injection

Applications only provide:

* data
* configuration
* feature-specific components (optional overrides)

They do NOT define routing structure.

Example:

```tsx id="app-example"
<ThemeProvider theme="ocl">
  <AppShell routes={routes}>
    <RouteRenderer />
  </AppShell>
</ThemeProvider>
```

---

# Routing Principles

## Rule 1 — AppShell owns routing

All route definitions must exist in or be consumed by AppShell.

Applications cannot define independent routers.

---

## Rule 2 — Pages are patterns, not routes

Routes do not map to components directly.

They map to:

* DashboardPage
* DataTablePage
* AIChatPage
* AuthPage

This enforces consistency across products.

---

## Rule 3 — Patterns are layout-aware but route-agnostic

Page Patterns:

* do not know the URL
* do not handle navigation
* do not define route structure

They only define UI composition.

---

## Rule 4 — Navigation is declarative

Routes are defined as configuration, not imperative logic.

No:

```tsx
navigate("/dashboard");
```

inside structural components.

Navigation is handled at shell level.

---

# Integration Model (AppShell + Patterns)

## Flow

```text id="flow"
URL
 ↓
AppShell Router
 ↓
Pattern Resolver
 ↓
Page Pattern
 ↓
UI Composition
```

---

## Example

```tsx id="integration-example"
<ThemeProvider theme="satellite">
  <AppShell
    routes={routes}
  >
    <RouteRenderer />
  </AppShell>
</ThemeProvider>
```

---

# Rationale

## 1. Consistency Across Products

All applications share identical navigation behavior.

---

## 2. Separation of Concerns

* AppShell → routing + layout
* Patterns → UI composition
* Apps → data + configuration

---

## 3. Scalability

New applications do not introduce new routing systems.

They only plug into existing patterns.

---

## 4. Reduced Complexity

Eliminates:

* per-app routers
* duplicated navigation logic
* inconsistent route structures

---

# Consequences

## Positive

* Strong UX consistency across Triminds products
* Centralized routing logic
* Easier onboarding for developers
* Predictable navigation system
* Tight integration between AppShell and Page Patterns

---

## Negative

* Reduced freedom for per-app routing customization
* Requires strong discipline in pattern design
* AppShell becomes a critical dependency

Mitigation:

* slot-based overrides in AppShell
* escape hatch to custom pages (controlled exception)
* strict ADR governance for routing changes

---

# Extension Strategy (Future Consideration)

In advanced stages, routing may evolve to support:

* dynamic route injection from plugins (ADR-0009)
* per-tenant route mapping (white-label SaaS)
* feature-flagged routes

However, the core principle remains:

> AppShell always owns routing authority

---

# Outcome

Triminds Platform establishes a unified routing architecture where:

* AppShell controls navigation
* Page Patterns control UI structure
* Applications control data and composition

This creates a stable foundation for scaling multiple products without routing fragmentation.
