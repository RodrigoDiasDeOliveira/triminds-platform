<img width="1536" height="1024" alt="ChatGPT Image 2 de jun  de 2026, 11_48_33" src="https://github.com/user-attachments/assets/71b45feb-79fe-4d71-a635-32df23dbcabc" />


# Triminds Platform

**Internal UI Framework** developed by Triminds to standardize and accelerate the development of all internal applications.

---

## 🎯 Goal

Create a consistent, reusable, and easily adaptable **internal design system** that eliminates code duplication and ensures a unified user experience across all applications.

---

## ✨ Key Features

- **Rich and accessible components** (Built on top of Radix UI)
- **Powerful theming system** (colors, branding, radius, density per project)
- **Consistent Layout System** (AppShell, Sidebar, Header, etc.)
- **Fully configurable** per application
- **Monorepo** architecture with Turborepo + pnpm
- **Unit testing** included (Vitest)

---

## 📁 Project Structure

```bash
triminds-platform/
├── apps/                    # Applications (ex: dashboard, client-portal, etc.)
├── packages/
│   └── ui-core/             # ← Main UI Framework
│       ├── src/
│       │   ├── components/
│       │   ├── layout/
│       │   ├── theme/
│       │   └── utils/
│       └── package.json
├── turbo.json
├── pnpm-workspace.yaml
└── README.md

🚀 Installation & Setup
1. Install dependencies
Bashpnpm install
2. Development
Bash# Run UI Core in watch mode
pnpm --filter @triminds/ui-core dev

# Run all apps
pnpm dev
3. Build
Bashpnpm build:ui          # Build only the UI Core
pnpm build             # Full build

📦 How to Use @triminds/ui-core
Install in your application
Bashpnpm add @triminds/ui-core
Basic Usage Example
tsximport { ThemeProvider, Button, Card, AppShell } from '@triminds/ui-core'

const projectConfig = {
  theme: {
    colors: {
      primary: '#7c3aed',        // Purple example
    },
    radius: {
      lg: '12px'
    }
  },
  branding: {
    companyName: "Triminds OCL"
  }
}

function App() {
  return (
    <ThemeProvider initialConfig={projectConfig}>
      <AppShell>
        <Button variant="default" size="lg">
          Hello World
        </Button>

        <Card>
          <h2>My Card</h2>
        </Card>
      </AppShell>
    </ThemeProvider>
  )
}

🛠️ Tech Stack

React + TypeScript
Tailwind CSS v4
Radix UI (Headless primitives)
Class Variance Authority (for variants)
Vitest + Testing Library
Turborepo (Monorepo)


📋 Roadmap

 Storybook documentation
 Advanced components (Charts, DataTable, Upload Zone, etc.)
 Full dark mode support
 Form integration (React Hook Form + Zod)
 Complete Example App
 Automated versioning and releases


👨‍💻 Contributing

Fork the project
Create your feature branch (feature/amazing-feature)
Follow the existing component patterns
Add tests
Submit a Pull Request


📄 License
Internal — Triminds © 2026

Made with ❤️ by Triminds Team
