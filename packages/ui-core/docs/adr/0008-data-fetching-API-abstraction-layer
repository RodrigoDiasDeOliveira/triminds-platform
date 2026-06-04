# ADR-0008: Data Fetching & API Abstraction Layer

## Status

Accepted

## Date

2026-06

## Decision Makers

* Rodrigo Dias de Oliveira

---

# Context

Triminds applications interact with multiple backend services:

* OCL API
* Satellite services
* Vector AI backend
* internal authentication services

Without a unified abstraction layer, this leads to:

* inconsistent API handling
* duplicated fetch logic
* poor error handling consistency
* tightly coupled UI and backend logic

---

# Decision

Triminds Platform will adopt a **standardized data access architecture** built on:

* TanStack Query (server state)
* API client abstraction layer
* domain-based service modules

---

# Architecture

## Layer 1 — API Client Core

A single HTTP client abstraction:

Responsibilities:

* request handling
* authentication headers
* error normalization
* base URL management

Example:

```ts id="api-client"
export const apiClient = {
  get: (url) => fetch(url).then(res => res.json()),
  post: (url, body) => fetch(url, { method: "POST", body: JSON.stringify(body) })
};
```

---

## Layer 2 — Domain Services

Each domain defines its own service layer:

Examples:

* userService
* dashboardService
* aiService

Example:

```ts id="domain-service"
export const userService = {
  getUsers: () => apiClient.get("/users"),
  getUserById: (id) => apiClient.get(`/users/${id}`)
};
```

---

## Layer 3 — Query Hooks

UI consumes data only via hooks:

```ts id="query-hook"
const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: userService.getUsers
  });
```

---

# Rules

## Rule 1 — No direct fetch in UI

Forbidden:

```ts id="bad-fetch"
fetch("/api/users");
```

---

## Rule 2 — UI never knows API structure

UI consumes hooks only.

---

## Rule 3 — Domain separation

Each domain service must remain independent.

No cross-domain service calls.

---

# Rationale

## Benefits

* consistent API access patterns
* improved caching and performance
* clean separation between UI and backend logic
* easier testing and mocking

---

# Consequences

## Positive

* predictable data flow
* reusable API logic
* scalable architecture for multiple apps

## Negative

* additional abstraction layer
* requires discipline to maintain boundaries

---

# Outcome

All data flow in Triminds Platform becomes structured, predictable, and fully decoupled from UI components.
