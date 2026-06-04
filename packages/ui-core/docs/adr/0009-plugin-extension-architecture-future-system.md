# ADR-0009: Plugin & Extension Architecture

## Status

Proposed

## Date

2026-06

## Decision Makers

* Rodrigo Dias de Oliveira

---

# Context

As Triminds Platform evolves, applications like:

* Vector AI
* OCL dashboards
* Satellite analytics

will require extensibility beyond static UI patterns.

Future needs include:

* AI-driven UI components
* dynamic dashboards
* feature injection per product
* third-party or internal extensions
* optional enterprise modules

A rigid UI system will not scale to these requirements.

---

# Decision

Triminds Platform will support a **plugin-based architecture layer** on top of:

* ui-core
* AppShell
* Page Patterns

Plugins will extend functionality without modifying core packages.

---

# Architecture

## Plugin Structure

A plugin is a self-contained module that can provide:

* UI components
* pages
* AppShell extensions
* hooks
* actions

Example structure:

```text id="plugin-structure"
plugins/
  analytics/
  ai-assistant/
  dashboard-widgets/
```

---

## Plugin Capabilities

Plugins may register:

### 1. Pages

```ts id="plugin-pages"
routes: [
  { path: "/analytics", component: AnalyticsPage }
]
```

---

### 2. UI Extensions

* widgets
* panels
* sidebar entries

---

### 3. AppShell Extensions

* navigation injection
* header actions
* contextual menus

---

## Plugin Registry

The system will include a registry:

```ts id="plugin-registry"
registerPlugin({
  name: "analytics",
  routes,
  components
});
```

---

# Rules

## Rule 1 — Core is immutable

Plugins must never modify:

* ui-core
* AppShell internals
* design tokens

---

## Rule 2 — Plugins are optional

Applications must work without any plugin installed.

---

## Rule 3 — Strict boundaries

Plugins must communicate only through:

* defined APIs
* event system (future)
* shared hooks

No direct internal imports.

---

# Rationale

## Benefits

* extensibility without core complexity explosion
* supports AI-driven UI evolution
* enables product-specific modules
* future-proof architecture

---

# Consequences

## Positive

* scalable plugin ecosystem
* safe extensibility
* decoupled feature development

## Negative

* increased architectural complexity
* requires strict governance model

Mitigation:

* plugin validation system
* strict typing contracts
* registry control layer

---

# Outcome

Triminds Platform becomes extensible, allowing new capabilities without modifying the core design system.
