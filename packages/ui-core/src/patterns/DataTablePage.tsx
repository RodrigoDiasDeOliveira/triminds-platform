export interface DataTablePageProps {
  title?: string;
  rowsPerPage?: number;
}

export const DataTablePage = {
  defaultProps: {
    title: 'Data Table',
    rowsPerPage: 20
  } as Required<DataTablePageProps>
};
