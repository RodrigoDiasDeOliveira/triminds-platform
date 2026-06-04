# ADR-0002: Theming Strategy

## Status

Accepted

## Date

2026-06

## Decision Makers

* Rodrigo Dias de Oliveira

---

# Context

Triminds Platform serves as the shared frontend foundation for multiple products, including:

* OCL
* Satellite
* Vector AI
* Future Triminds applications

Although these products require different branding and visual identities, maintaining separate component implementations would introduce duplication, increased maintenance costs, and architectural fragmentation.

The platform therefore requires a theming strategy that allows visual customization while preserving a single component ecosystem.

---

# Decision

Triminds Platform will adopt a token-based theming architecture using CSS Variables.

All products will share:

* The same component library
* The same layout primitives
* The same page patterns
* The same AppShell architecture

Product customization will occur exclusively through theme configuration.

---

# Theme Architecture

## Shared Components

Components belong to the `ui-core` package.

Examples:

* Button
* Card
* Input
* Dialog
* Sidebar
* DashboardPage
* AIChatPage

Components must not contain product-specific logic.

---

## Design Tokens

Visual properties are defined through semantic tokens.

Examples:

```css
--color-primary
--color-secondary

--radius-sm
--radius-md

--font-family

--spacing-sm
--spacing-md
```

Components consume tokens rather than hardcoded values.

---

## Theme Packages

Themes are maintained separately from components.

```text
packages/
├── ui-core/
├── ui-themes/
│   ├── default
│   ├── ocl
│   ├── satellite
│   └── vector-ai
```

Each theme provides values for the shared token set.

---

## Theme Provider

Applications select themes through ThemeProvider.

```tsx
<ThemeProvider theme="ocl">
  <App />
</ThemeProvider>
```

The ThemeProvider is responsible for loading and applying CSS variables.

---

# Rules

## Rule 1

Components must not contain product-specific conditionals.

Forbidden:

```tsx
if (theme === "ocl") { ... }
```

---

## Rule 2

Themes may override tokens only.

Themes must not modify component source code.

---

## Rule 3

New products require new themes, not new components.

Preferred:

```text
new-theme/
```

Avoid:

```text
NewProductButton
NewProductCard
NewProductTable
```

---

## Rule 4

Dark mode is independent from product themes.

Supported dimensions:

```text
theme
+
mode
```

Examples:

* ocl + light
* ocl + dark
* satellite + light
* vector-ai + dark

---

# Consequences

## Positive

* Single component ecosystem
* Consistent user experience
* Lower maintenance cost
* Easier onboarding
* Faster product creation
* Stronger platform governance

---

## Negative

* Some visual customization becomes constrained by the token system.
* New requirements may require expanding the token model.

These limitations are considered acceptable because they preserve platform consistency.

---

# Success Criteria

This decision is successful if:

* Multiple products share the same components.
* Product-specific component forks are avoided.
* New themes can be introduced without changing component implementations.
* Visual consistency remains high across all Triminds products.

---

# Related Documents

* architecture.md
* roadmap.md
* ADR-0001-design-system-monorepo.md
