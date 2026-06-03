# Triminds Platform - Documentação de Arquitetura

## Visão Geral
Design System + UI Framework interno da Triminds.

## Princípios de Arquitetura
- **Atomic Design** + Component Composition
- **Design Tokens** centralizados
- **Acessibilidade** primeiro (Radix UI)
- **Type Safety** rigorosa
- **Performance** (Tree-shaking, minimal bundle)

## Estrutura de Pastas
```
packages/ui-core/
├── src/
│   ├── theme/           → ThemeProvider + tokens
│   ├── components/ui/   → Componentes base (shadcn/ui style)
│   ├── layout/          → Layout primitives
│   ├── patterns/        → Padrões compostos (Dashboard, AIChat, etc)
│   ├── hooks/           → Hooks customizados
│   ├── utils/           → Utilitários (cn, etc)
│   └── index.ts
```

## Decisões Técnicas
- **Styling**: Tailwind CSS v4 + CSS Variables
- **Variants**: Class Variance Authority (CVA)
- **Forms**: React Hook Form + Zod
- **Monorepo**: Turborepo + pnpm workspaces
- **Build**: Vite Library Mode

## Theming Strategy
Suporte a múltiplos temas (OCL, Satellite, Vector AI) via CSS Variables.
