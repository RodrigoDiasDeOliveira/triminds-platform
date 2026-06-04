import { useMemo, useState, type ReactNode } from 'react';
import { cn } from '@/utils/cn';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

export interface DataTableColumn<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  align?: 'left' | 'right' | 'center';
}

export interface DataTablePageProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  rowKey?: (row: T) => string;
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  pageSize?: number;
  /** Controlled search (server-side). When omitted, filtering is client-side. */
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  /** Controlled pagination (server-side). When omitted, paging is client-side. */
  page?: number;
  total?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

const alignClass = {
  left: 'text-left',
  right: 'text-right',
  center: 'text-center',
} as const;

export function DataTablePage<T>({
  columns,
  data,
  rowKey,
  loading = false,
  error = null,
  emptyMessage = 'No records found.',
  searchable = false,
  searchPlaceholder = 'Search…',
  pageSize = 10,
  searchValue,
  onSearchChange,
  page,
  total,
  onPageChange,
  className,
}: DataTablePageProps<T>) {
  const controlledSearch = onSearchChange !== undefined;
  const controlledPage = onPageChange !== undefined;

  const [internalQuery, setInternalQuery] = useState('');
  const [internalPage, setInternalPage] = useState(1);

  const query = controlledSearch ? searchValue ?? '' : internalQuery;
  const currentPage = controlledPage ? page ?? 1 : internalPage;

  const filtered = useMemo(() => {
    if (controlledSearch || !searchable || !query) return data;
    const q = query.toLowerCase();
    return data.filter((row) =>
      Object.values(row as Record<string, unknown>).some((v) =>
        String(v).toLowerCase().includes(q)
      )
    );
  }, [controlledSearch, searchable, query, data]);

  const totalRows = controlledPage ? total ?? filtered.length : filtered.length;
  const pageCount = Math.max(1, Math.ceil(totalRows / pageSize));
  const pageRows = controlledPage
    ? data
    : filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const setQuery = (v: string) => {
    if (controlledSearch) onSearchChange!(v);
    else {
      setInternalQuery(v);
      setInternalPage(1);
    }
  };
  const goToPage = (p: number) => {
    const clamped = Math.min(Math.max(1, p), pageCount);
    if (controlledPage) onPageChange!(clamped);
    else setInternalPage(clamped);
  };

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {searchable && (
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full max-w-sm rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
        />
      )}

      <div className="overflow-hidden rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className={col.align ? alignClass[col.align] : undefined}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="py-10 text-center text-muted-foreground">
                  Loading…
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="py-10 text-center text-destructive">
                  {error}
                </TableCell>
              </TableRow>
            ) : pageRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="py-10 text-center text-muted-foreground">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              pageRows.map((row, i) => (
                <TableRow key={rowKey ? rowKey(row) : i}>
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      className={col.align ? alignClass[col.align] : undefined}
                    >
                      {col.render
                        ? col.render(row)
                        : String((row as Record<string, unknown>)[col.key] ?? '')}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {totalRows} {totalRows === 1 ? 'row' : 'rows'}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
            className="rounded-md border border-input px-3 py-1 text-foreground disabled:opacity-40"
          >
            Prev
          </button>
          <span>
            Page {currentPage} / {pageCount}
          </span>
          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= pageCount}
            className="rounded-md border border-input px-3 py-1 text-foreground disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
