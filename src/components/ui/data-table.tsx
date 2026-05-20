import { useContext, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  type ColumnDef,
  type FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { LanguageContext } from "@/contexts/language-context";
import { text } from "@/components/ui/text";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  globalFilter: string;
  globalFilterFn: FilterFn<TData>;
  sorting?: SortingState;
}

interface PaginationProps<TData> {
  table: ReturnType<typeof useReactTable<TData>>;
}

function Pagination<TData>({ table }: PaginationProps<TData>) {
  const { lang } = useContext(LanguageContext);

  const { pageIndex, pageSize } = table.getState().pagination;
  const totalRows = table.getFilteredRowModel().rows.length;

  const showingStart = Math.min(pageIndex * pageSize + 1, totalRows);
  const showingEnd = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div className="flex border rounded-md items-center justify-between px-4 py-2">
      <span className="text-muted-foreground text-xs">
        {text.datatable.pagination[lang]
          .replace("${showingStart}", String(showingStart))
          .replace("${showingEnd}", String(showingEnd))
          .replace("${totalRows}", String(totalRows))}
      </span>
      <div className="flex items-center space-x-2">
        <Button
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="bg-noirlab-primary-blue hover:bg-noirlab-primary-blue/80"
        >
          <ChevronLeft />
        </Button>
        <Button
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="bg-noirlab-primary-blue hover:bg-noirlab-primary-blue/80"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

export function DataTable<TData, TValue>({
  columns,
  data,
  globalFilter,
  globalFilterFn,
  sorting = [],
}: DataTableProps<TData, TValue>) {
  const { lang } = useContext(LanguageContext);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter,
      sorting,
    },
    globalFilterFn,
  });

  useEffect(() => {
    table.setSorting(table.getState().sorting);
  }, [globalFilter, table]);

  return (
    <div className="h-full flex flex-col gap-2 overflow-hidden">
      <div className="h-full border rounded-md overflow-y-scroll overflow-x-hidden no-scrollbar">
        <Table className="h-full">
          <TableHeader className="sticky top-0 bg-cover shadow-xs select-none bg-noirlab-primary-blue">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-white">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-44 text-center"
                >
                  {text.datatable.noResults[lang]}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination table={table} />
    </div>
  );
}
