"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface ImpactTableProps {
  monthlyAmount: number
  yearlyAmount: number
}

export function ImpactTable({ monthlyAmount, yearlyAmount }: ImpactTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Période</TableHead>
            <TableHead className="text-right">Montant</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Mensuel</TableCell>
            <TableCell className="text-right">{monthlyAmount.toLocaleString()}€</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Annuel</TableCell>
            <TableCell className="text-right">{yearlyAmount.toLocaleString()}€</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
