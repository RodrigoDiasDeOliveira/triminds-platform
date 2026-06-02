export interface AIPromptLayoutProps {
  promptPlaceholder?: string;
  showContextPanel?: boolean;
}

export const AIPromptLayout = {
  defaultProps: {
    promptPlaceholder: 'Type your prompt...',
    showContextPanel: true
  } as Required<AIPromptLayoutProps>
};
