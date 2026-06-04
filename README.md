# Triminds Platform

The official Design System and Frontend Platform of Triminds.

## Overview

Triminds Platform is a shared UI ecosystem designed to accelerate the development of all Triminds products through a unified Design System, reusable components, centralized theming, and modern frontend architecture.

The platform provides:

* Consistent user experience across products
* Shared UI components
* Multi-theme support
* Accessibility-first design
* High performance and scalability
* Reduced frontend technical debt

---

## Why Triminds Platform?

After developing multiple products such as:

* OCL Logistics
* Satellite Classification Platform
* AI Agents
* Vector AI
* Future commercial products

we identified recurring challenges:

* UI inconsistency
* Duplicate components
* Different frontend architectures
* Slow delivery of new products
* Weak brand standardization

Triminds Platform solves these issues by creating a single source of truth for frontend development.

---

## Core Principles

### Design System First

Every component follows a centralized design language.

### Composition over Configuration

Small reusable primitives compose complex interfaces.

### Accessibility by Default

Built on Radix UI primitives.

### Type Safety

Strict TypeScript typing.

### Performance

* Tree shaking
* Code splitting
* Optimized bundles
* Vite library mode

### Multi-product Theming

Support for independent themes:

* OCL
* Satellite
* Vector AI
* Future Triminds products

---

## Technology Stack

| Layer           | Technology            |
| --------------- | --------------------- |
| Framework       | React 19              |
| Language        | TypeScript            |
| Styling         | Tailwind CSS v4       |
| Components      | Radix UI              |
| Variants        | CVA                   |
| Forms           | React Hook Form + Zod |
| Build           | Vite                  |
| Monorepo        | Turborepo             |
| Package Manager | pnpm                  |
| Testing         | Vitest + RTL          |
| Documentation   | Storybook (planned)   |

---

## Project Structure

```bash
triminds-platform/
├── apps/
│   └── demo/
│
├── packages/
│   ├── ui-core/
│   ├── ui-themes/
│   └── shared-utils/
│
├── docs/
├── .github/
└── turbo.json
```

---

## Quick Start

```bash
pnpm install

pnpm dev

pnpm build
```

---

## Example

```tsx
import { Button, Card, ThemeProvider } from '@triminds/ui-core';

export default function App() {
  return (
    <ThemeProvider theme="satellite">
      <Card variant="elevated">
        <Button variant="primary">
          Launch Mission
        </Button>
      </Card>
    </ThemeProvider>
  );
}
```

---

## Roadmap

### Phase 1

* Design Tokens
* Theme Provider
* Core Components
* Initial Product Integration

### Phase 2

* Storybook
* DataTable
* Charts
* AI Components
* Dark Mode

### Phase 3

* React Native Support
* Tauri Support
* Figma Token Sync

---

## Documentation

* docs/architecture.md
* docs/adr/

---

## License

Copyright © Triminds.
All rights reserved.


# Triminds Platform

**Internal UI Framework** developed by Triminds to standardize and accelerate the development of all internal applications.

---

## ✨ Key Features

- **Rich and accessible components** (Built on top of Radix UI)
- **Powerful theming system** (colors, branding, radius, density per project)
- **Consistent Layout System** (AppShell, Sidebar, Header, etc.)
- **Fully configurable** per application
- **Monorepo** architecture with Turborepo + pnpm
- **Unit testing** included (Vitest)

👨‍💻 Contributing

Fork the project
Create your feature branch (feature/amazing-feature)
Follow the existing component patterns
Add tests
Submit a Pull Request


📄 License
Internal — Triminds © 2026

Made with ❤️ by Triminds Team
