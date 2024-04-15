"use client";

import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { z } from "zod";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Student = {
  id: number;
  gender: string;
  name: string;
  maths: number;
  chemistry: number;
  physics: number;
  english: number;
};

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "id",
    header: "Edit",
    cell: ({ row }) => {
      const id = row.getValue<number>("id");
      return (
        <Link href={`/students/${id}`} className="font-medium">
          <FontAwesomeIcon icon={faPenToSquare} />
        </Link>
      );
    },
  },
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "maths",
    header: "maths",
    cell: ({ row }) => {
      const numbers = parseFloat(row.getValue("maths"));
      return <div className="font-medium">{numbers}/100</div>;
    },
  },
  {
    accessorKey: "physics",
    header: "physics",
    cell: ({ row }) => {
      const numbers = parseFloat(row.getValue("physics"));
      return <div className="font-medium">{numbers}/100</div>;
    },
  },
  {
    accessorKey: "chemistry",
    header: "Chemistry",
    cell: ({ row }) => {
      const numbers = parseFloat(row.getValue("chemistry"));
      return <div className="font-medium">{numbers}/100</div>;
    },
  },
  {
    accessorKey: "english",
    header: "English",
    cell: ({ row }) => {
      const numbers = parseFloat(row.getValue("english"));
      return <div className="font-medium">{numbers}/100</div>;
    },
  },
];
