export interface TableColumn {
  key: string;
  label: string;
  width?: number | string;
}

export interface TableProps<Row = Record<string, unknown>> {
  columns: TableColumn[];
  data: Row[];
  isSortable?: boolean;
  isSelectable?: boolean;
}

export const Table = {
  defaultProps: {
    isSortable: true,
    isSelectable: false
  } as Required<Pick<TableProps, 'isSortable' | 'isSelectable'>>
};
