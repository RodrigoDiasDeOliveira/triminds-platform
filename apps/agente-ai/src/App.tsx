import { useState } from 'react';
import {
  ThemeProvider,
  AppShell,
  Sidebar,
  Header,
  AIPromptLayout,
  type ChatMessage,
  type NavigationItem,
} from '@triminds/ui-core';
import { sendChat } from './lib/api';

const nav: NavigationItem[] = [
  { label: 'Chat', path: '/chat' },
  { label: 'Conversations', path: '/conversations' },
  { label: 'Settings', path: '/settings' },
];

// Per-app config: theme + branding. This is all that changes between apps.
const themeConfig = {
  theme: {
    colors: {
      primary: '#4F46E5',
      primaryForeground: '#ffffff',
      secondary: '#A78BFA',
      accent: '#EEF2FF',
      background: '#ffffff',
      foreground: '#111827',
      border: '#E2E8F0',
      muted: '#F1F5F9',
      destructive: '#EF4444',
    },
    density: 'compact' as const,
  },
};

function newId(): string {
  return Math.random().toString(36).slice(2);
}

export default function App() {
  const [active, setActive] = useState('/chat');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const onSend = async (text: string) => {
    const userMsg: ChatMessage = { id: newId(), role: 'user', content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setLoading(true);
    const reply = await sendChat(
      text,
      next.map((m) => ({ role: m.role, content: m.content }))
    );
    setMessages((m) => [...m, { id: newId(), role: 'assistant', content: reply }]);
    setLoading(false);
  };

  return (
    <ThemeProvider initialConfig={themeConfig}>
      <AppShell
        header={
          <Header
            title="Agente AI"
            subtitle="Built entirely with @triminds/ui-core"
            actions={
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                theme: vector-ai
              </span>
            }
          />
        }
        sidebar={
          <Sidebar
            items={nav}
            activePath={active}
            onNavigate={setActive}
            header={
              <div className="flex items-center gap-2 text-lg font-bold text-primary">
                <span>◆</span>
                <span>Triminds</span>
              </div>
            }
            footer={
              <div className="text-xs text-muted-foreground">
                v0.1.0 · demo app
              </div>
            }
          />
        }
      >
        {active === '/chat' ? (
          <AIPromptLayout
            messages={messages}
            onSend={onSend}
            loading={loading}
            promptPlaceholder="Ask the agent anything…"
          />
        ) : (
          <div className="grid h-full place-items-center text-muted-foreground">
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">
                {nav.find((n) => n.path === active)?.label}
              </div>
              <p className="mt-1 text-sm">This page is a placeholder in the demo app.</p>
            </div>
          </div>
        )}
      </AppShell>
    </ThemeProvider>
  );
}
