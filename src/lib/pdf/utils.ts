import { jsPDF } from 'jspdf';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { PDFOptions } from './types';

export function createHeader(options: PDFOptions, title: string): number {
  const { doc, pageWidth, margin } = options;
  
  // Header background
  doc.setFillColor(41, 98, 255);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text(title, margin, 28);
  
  // Date
  doc.setFontSize(12);
  doc.text(format(new Date(), 'dd MMMM yyyy', { locale: fr }), pageWidth - margin - 50, 28);
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
  
  return 60; // Return next Y position
}

export function addPageNumbers(doc: jsPDF): void {
  const pageCount = doc.internal.getNumberOfPages();
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128);
    doc.text(
      `Page ${i} sur ${pageCount}`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }
}

export function generateFilename(title: string): string {
  return `${title}_${format(new Date(), 'yyyy-MM-dd_HH-mm')}.pdf`;
}