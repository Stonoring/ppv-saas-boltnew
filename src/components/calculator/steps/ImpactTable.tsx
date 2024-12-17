import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PAYMENT_MODES } from '@/lib/calculator/constants';
import { formatCurrency } from '@/lib/utils';

export function ImpactTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[30%]">Mode de versement</TableHead>
          <TableHead>Montant de la prime</TableHead>
          <TableHead>Coût employeur</TableHead>
          <TableHead>Montant net reçu</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {PAYMENT_MODES.map((mode) => (
          <TableRow key={mode.id}>
            <TableCell className="font-medium">{mode.name}</TableCell>
            <TableCell>{formatCurrency(mode.primeAmount)}</TableCell>
            <TableCell>{formatCurrency(mode.employerCost)}</TableCell>
            <TableCell>{formatCurrency(mode.netAmount)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}