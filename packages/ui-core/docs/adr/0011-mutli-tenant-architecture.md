# ADR-0011: Multi-Tenant Architecture (White-label System)

## Status

Accepted

## Date

2026-06

## Decision Makers

* Rodrigo Dias de Oliveira

---

# Context

Triminds Platform currently supports multiple internal products:

* OCL
* Satellite
* Vector AI

These products share a unified Design System, AppShell, and Page Patterns architecture.

However, all applications are still treated as **separate deployments with implicit configuration differences**.

As the platform evolves toward a commercial direction, this model introduces limitations:

* duplicated deployment logic per product
* lack of runtime customization
* difficulty scaling to external clients
* tight coupling between codebase and product identity
* inability to support white-label scenarios

A new architectural model is required to support **multi-tenant runtime configuration**.

---

# Decision

Triminds Platform will adopt a **Multi-Tenant Architecture**, where a single codebase supports multiple logical “tenants” (products or clients).

Each tenant is defined by configuration, not code divergence.

---

# Core Principle

> One platform. Many tenants. Zero forks.

---

# Tenant Model

Each tenant represents a fully configured instance of the platform.

Example:

```ts id="tenant-model"
const tenant = {
  id: "ocl",
  name: "OCL Logistics",
  theme: "ocl",
  mode: "light",
  features: {
    aiChat: true,
    analytics: true,
    dataTables: true
  },
  navigation: [
    { label: "Dashboard", route: "/dashboard" },
    { label: "Data", route: "/data" }
  ]
};
```

---

# Architecture

## Tenant Resolution Layer

The system resolves the active tenant at runtime.

Sources:

* domain (ocl.triminds.com)
* environment variable
* authentication context
* deployment config

---

## Layered Execution Model

```text id="tenant-flow"
Request
  ↓
Tenant Resolver
  ↓
ThemeProvider (ui-themes)
  ↓
AppShell (configured by tenant)
  ↓
Page Patterns
  ↓
UI Rendering
```

---

## Configuration Layers

### 1. Identity Layer

* name
* logo
* branding
* domain mapping

---

### 2. Theme Layer

* design tokens
* color system
* typography
* radius
* density

Provided by `ui-themes`.

---

### 3. Feature Layer

Controls feature availability per tenant:

* AI Chat enabled/disabled
* analytics modules
* dashboards
* experimental features

---

### 4. Navigation Layer

Defines AppShell structure per tenant:

```ts id="nav-layer"
navigation: [
  { label: "Dashboard", route: "/dashboard" },
  { label: "AI", route: "/ai" }
];
```

---

# AppShell Integration

AppShell becomes tenant-aware but not tenant-dependent.

```tsx id="appshell-tenant"
<ThemeProvider theme={tenant.theme}>
  <AppShell navigation={tenant.navigation}>
    <RouteRenderer tenant={tenant} />
  </AppShell>
</ThemeProvider>
```

---

# Rules

## Rule 1 — No tenant-specific code branches in UI core

Forbidden:

```tsx id="bad-tenant-if"
if (tenant.id === "ocl") {
  ...
}
```

---

## Rule 2 — All customization must be configuration-driven

Allowed:

* theme
* navigation
* feature flags
* layout density

---

## Rule 3 — UI Core remains tenant-agnostic

`ui-core` must not know:

* which tenant is active
* which product is running
* business rules

---

## Rule 4 — Features must be declarative

Features must be toggled via config, not conditional logic inside components.

---

# Rationale

## 1. Scalability

Enables unlimited number of tenants without code duplication.

---

## 2. Product Velocity

New “products” become configuration, not new codebases.

---

## 3. White-label readiness

Supports external clients with custom branding and UI behavior.

---

## 4. Separation of concerns

* Core system = stable
* Tenant layer = dynamic

---

# Consequences

## Positive

* Single deployable platform
* Strong reuse of all UI infrastructure
* Enables SaaS commercialization
* Faster onboarding of new clients/products

---

## Negative

* Increased complexity in configuration system
* Requires robust validation of tenant configs
* Debugging requires awareness of active tenant context

---

## Mitigation

* Strict tenant schema validation (Zod)
* Default fallback tenant
* Dev tooling to simulate tenants
* Clear documentation per tenant config layer

---

# Extension Path (Future)

This architecture naturally evolves into:

* dynamic feature flags system
* tenant-level plugins (ADR-0009 integration)
* marketplace for extensions
* per-tenant analytics and observability

---

# Outcome

Triminds Platform becomes a fully **multi-tenant frontend operating system**, capable of serving multiple products and clients from a single codebase, differentiated entirely by configuration and theming.
