# ADR-0007: State Management Strategy

## Status

Accepted

## Date

2026-06

## Decision Makers

* Rodrigo Dias de Oliveira

---

# Context

Triminds Platform consists of multiple applications built on a shared UI foundation.

These applications include:

* dashboards (OCL, Satellite)
* AI interfaces (Vector AI)
* data-heavy systems
* authentication-driven portals

A consistent state management strategy is required to avoid:

* fragmented state logic
* inconsistent patterns across apps
* over-engineering with multiple libraries
* coupling between UI and business logic

---

# Decision

Triminds Platform will adopt a **hybrid state management strategy**:

* Local UI state → React state
* Server state → TanStack Query
* Global UI state → lightweight store (Zustand)

No single global state solution will be used for everything.

---

# State Layers

## Layer 1 — Local State (React)

Used for:

* form inputs
* UI toggles
* component-level interactions

Example:

```tsx id="local-state"
const [open, setOpen] = useState(false);
```

---

## Layer 2 — Server State (TanStack Query)

Used for:

* API data fetching
* caching
* synchronization
* background refetching

Examples:

* user lists
* dashboard metrics
* AI responses
* configuration data

Rule:

Server state must NEVER be duplicated into global stores.

---

## Layer 3 — Global UI State (Zustand)

Used for:

* AppShell state
* sidebar open/close
* theme mode
* user session UI context
* cross-component UI coordination

Example:

```ts id="zustand-store"
const useUIStore = create((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen }))
}));
```

---

# Rules

## Rule 1 — No “everything global”

Global state must be minimal and UI-only.

Forbidden:

* storing API data in Zustand
* duplicating server state in global stores

---

## Rule 2 — Server state is authoritative

TanStack Query is the single source of truth for backend data.

---

## Rule 3 — Feature isolation

Each App Pattern or App Module may define its own:

* local state
* query hooks
* internal stores

No cross-module state sharing.

---

# Rationale

This hybrid model was chosen to balance:

## Simplicity

Avoids Redux-style boilerplate.

## Scalability

Each layer has a clear responsibility.

## Performance

Reduces unnecessary re-renders and duplication.

## Maintainability

Developers always know where state belongs.

---

# Consequences

## Positive

* Clear separation of concerns
* Less boilerplate than Redux-heavy architectures
* Better performance for large dashboards
* Easier onboarding for developers

---

## Negative

* Requires discipline to avoid misuse of Zustand
* Developers must understand state boundaries

Mitigation:

* documentation
* lint rules (future)
* architecture reviews

---

# Outcome

State management in Triminds Platform becomes predictable, layered, and scalable across all applications.
