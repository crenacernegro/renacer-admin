"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type PostColumn = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export const columns: ColumnDef<PostColumn>[] = [
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "content",
    header: "Contenido",
  },
  {
    accessorKey: "createdAt",
    header: "Fecha de creación",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
