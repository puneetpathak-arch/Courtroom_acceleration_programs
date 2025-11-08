"use client";

import * as React from "react";
import Link from "next/link";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { PlusCircle, File, MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { cases as allCases, findHearing, findUser } from "@/lib/data";
import type { Case, CaseStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export const statusColors: Record<CaseStatus, string> = {
  filed: "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-400",
  listed: "border-purple-500/20 bg-purple-500/10 text-purple-700 dark:text-purple-400",
  hearing: "border-yellow-500/20 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  adjourned: "border-orange-500/20 bg-orange-500/10 text-orange-700 dark:text-orange-400",
  judgment: "border-green-500/20 bg-green-500/10 text-green-700 dark:text-green-400",
  closed: "border-gray-500/20 bg-gray-500/10 text-gray-700 dark:text-gray-400",
};

const columns: ColumnDef<Case>[] = [
  {
    accessorKey: "caseId",
    header: "Case ID",
    cell: ({ row }) => (
      <Link href={`/cases/${row.original.caseId}`} className="font-medium text-primary hover:underline">
        {row.getValue("caseId")}
      </Link>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as CaseStatus;
      return (
        <Badge
          variant="outline"
          className={cn("border", statusColors[status])}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "assignedJudgeId",
    header: "Assigned Judge",
    cell: ({ row }) => findUser(row.getValue("assignedJudgeId"))?.name || 'N/A',
  },
  {
    accessorKey: "nextHearingId",
    header: "Next Hearing",
    cell: ({ row }) => {
      const hearing = findHearing(row.getValue("nextHearingId"));
      return hearing ? format(new Date(hearing.startTime), "PPp") : "Not Scheduled";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const caseItem = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link href={`/cases/${caseItem.caseId}`} passHref>
              <DropdownMenuItem asChild><a>View Details</a></DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Generate Summary</DropdownMenuItem>
            <DropdownMenuItem>Request Adjournment</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function CaseTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [activeTab, setActiveTab] = React.useState("all");

  const data = React.useMemo(() => {
    if (activeTab === "all") return allCases;
    return allCases.filter(c => c.status !== 'closed' && c.status !== 'judgment');
  }, [activeTab]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <Tabs defaultValue="all" onValueChange={setActiveTab}>
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              File New Case
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value={activeTab}>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">
              {activeTab === 'all' ? 'All Cases' : 'Active Cases'}
            </CardTitle>
            <CardDescription>
              Manage and track all legal cases in the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
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
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
             <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                >
                Previous
                </Button>
                <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                >
                Next
                </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
