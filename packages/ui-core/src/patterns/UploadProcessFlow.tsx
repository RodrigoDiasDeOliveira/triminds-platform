import { useRef, useState, type DragEvent, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

export type UploadStepStatus = 'pending' | 'active' | 'done' | 'error';

export interface UploadStep {
  label: string;
  status: UploadStepStatus;
}

export interface UploadProcessFlowProps {
  onUpload: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  steps?: UploadStep[];
  busy?: boolean;
  error?: string | null;
  result?: ReactNode;
  hint?: ReactNode;
  dropLabel?: string;
  className?: string;
}

const stepDot: Record<UploadStepStatus, string> = {
  pending: 'border-border text-muted-foreground',
  active: 'border-primary text-primary animate-pulse',
  done: 'border-primary bg-primary text-primary-foreground',
  error: 'border-destructive text-destructive',
};

export function UploadProcessFlow({
  onUpload,
  accept,
  multiple = false,
  steps = [],
  busy = false,
  error = null,
  result,
  hint,
  dropLabel = 'Drag & drop a file here, or click to browse',
  className,
}: UploadProcessFlowProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [selected, setSelected] = useState<File[]>([]);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList);
    setSelected(files);
    onUpload(files);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => !busy && inputRef.current?.click()}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && !busy && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={cn(
          'grid cursor-pointer place-items-center rounded-lg border-2 border-dashed p-10 text-center transition-colors',
          dragOver ? 'border-primary bg-accent' : 'border-border bg-card',
          busy && 'pointer-events-none opacity-60'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="text-sm font-medium text-foreground">{dropLabel}</div>
        {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
        {selected.length > 0 && (
          <div className="mt-3 text-xs text-primary">
            {selected.map((f) => f.name).join(', ')}
          </div>
        )}
      </div>

      {error && (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      {steps.length > 0 && (
        <ol className="flex flex-col gap-3">
          {steps.map((step, i) => (
            <li key={i} className="flex items-center gap-3">
              <span
                className={cn(
                  'grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs font-semibold',
                  stepDot[step.status]
                )}
              >
                {step.status === 'done' ? '✓' : i + 1}
              </span>
              <span
                className={cn(
                  'text-sm',
                  step.status === 'pending' ? 'text-muted-foreground' : 'text-foreground'
                )}
              >
                {step.label}
              </span>
            </li>
          ))}
        </ol>
      )}

      {result}
    </div>
  );
}
