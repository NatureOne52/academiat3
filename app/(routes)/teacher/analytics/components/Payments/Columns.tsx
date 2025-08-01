
"use client"
import { ColumnDef } from "@tanstack/react-table";


export type   PurchasesWithCourse = {
  id: string;
  courseId: string;
  userId: string;
  createdAt: Date;
  price: number;
  updatedAt: Date;
  userEmail: string;
  course: {
    title: string;
    slug: string;
    imageUrl: string;
    price: string;
  }
}



export const columns: ColumnDef<PurchasesWithCourse>[] = [
  {
    accessorKey: "createdAtFormatted",
    header: "Fecha de compra",
    cell: ({row}) => {
      const date = new Date(row.original.createdAt).toLocaleDateString("es-ES");
      return <div className="font-medium">{date}</div>;
    },
  },
  {
    accessorKey: "userEmail",
    header: "Cliente",
  },
  {
    accessorKey: "course.title",
    header: "Curso",
  },
  {
    accessorKey: "price",
    header: "Precio",
    cell: ({row}) => {
      const price = row.original.price;
      return <div>${price}</div>;
    }
  }
];