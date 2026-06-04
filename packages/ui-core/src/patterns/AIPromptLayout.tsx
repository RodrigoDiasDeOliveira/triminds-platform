import { cn } from '@/utils/cn';
import { useState, type FormEvent, type ReactNode } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface AIPromptLayoutProps {
  messages: ChatMessage[];
  onSend: (text: string) => void;
  loading?: boolean;
  promptPlaceholder?: string;
  emptyState?: ReactNode;
  className?: string;
}

export function AIPromptLayout({
  messages,
  onSend,
  loading = false,
  promptPlaceholder = 'Type your prompt...',
  emptyState,
  className,
}: AIPromptLayoutProps) {
  const [value, setValue] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const text = value.trim();
    if (!text || loading) return;
    onSend(text);
    setValue('');
  };

  return (
    <div className={cn('flex h-full flex-col', className)}>
      <div className="flex-1 space-y-4 overflow-auto p-6">
        {messages.length === 0 &&
          (emptyState ?? (
            <div className="grid h-full place-items-center text-sm text-muted-foreground">
              Start the conversation…
            </div>
          ))}
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}
          >
            <div
              className={cn(
                'max-w-[75%] whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm',
                m.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground'
              )}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-muted px-4 py-2 text-sm text-muted-foreground">
              Thinking…
            </div>
          </div>
        )}
      </div>
      <form onSubmit={submit} className="border-t border-border p-4">
        <div className="flex items-center gap-2">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={promptPlaceholder}
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
