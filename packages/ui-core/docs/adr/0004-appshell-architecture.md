# ADR-0004: AppShell Architecture

## Status

Accepted

## Date

2026-06

## Decision Makers

* Rodrigo Dias de Oliveira

---

# Context

Triminds Platform supports multiple applications (OCL, Satellite, Vector AI).

Historically, each application defines its own:

* navigation
* layout structure
* sidebar
* header
* routing patterns

This leads to fragmentation in user experience and duplicated frontend logic.

A unified application shell is required to ensure consistency across all products.

---

# Decision

Triminds will implement a **shared AppShell system** inside `ui-core`.

The AppShell becomes the **single structural container for all applications**.

---

# Architecture

## AppShell Responsibilities

The AppShell is responsible for:

* Global layout structure
* Sidebar navigation
* Header / top bar
* User context area
* Workspace composition
* Responsive behavior

It is NOT responsible for:

* business logic
* page content
* API calls
* domain rules

---

## Structure

```text id="appshell-structure"
AppShell
 ├── Sidebar
 ├── Header
 ├── Content Area
 ├── Footer (optional)
```

---

## Navigation Model

Navigation is configuration-driven.

Example:

```ts id="nav-config"
const navigation = [
  {
    label: "Dashboard",
    route: "/dashboard",
    icon: "grid"
  },
  {
    label: "Data",
    route: "/data",
    icon: "table"
  }
];
```

---

## App Composition Model

```tsx id="appshell-example"
<ThemeProvider theme="ocl">
  <AppShell navigation={navigation}>
    <DashboardPage />
  </AppShell>
</ThemeProvider>
```

---

# Rules

## Rule 1 — AppShell is shared

All applications must use the same AppShell implementation.

---

## Rule 2 — No custom shells per product

Forbidden:

* OCLShell
* SatelliteShell
* VectorShell

---

## Rule 3 — Navigation is externalized

Navigation must be passed as configuration.

AppShell must not hardcode routes.

---

## Rule 4 — Layout consistency

All apps must share:

* sidebar behavior
* header structure
* spacing rules
* responsiveness rules

---

# Rationale

## Benefits

* Unified UX across all products
* Faster product creation
* Reduced layout duplication
* Easier onboarding
* Centralized navigation control

---

# Consequences

## Positive

* Consistent application structure
* Strong platform identity
* Easier maintenance of layout logic

## Negative

* Reduced flexibility for extreme layout customization
* Requires careful design of navigation abstraction

Mitigation:

* Allow slot-based customization
* Support layout variants (minimal, full, dashboard)

---

# Outcome

AppShell becomes the structural backbone of all Triminds applications.
