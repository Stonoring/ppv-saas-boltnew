import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import type { DocumentData } from './types';
import { createHeader, addPageNumbers, generateFilename } from './utils';
import { generateSimulationContent } from './generators/simulation';
import { generateDocumentContent } from './generators/document';

export async function generatePDF(
  type: 'accord' | 'decision' | 'lettre' | 'simulation',
  data: Record<string, any>
): Promise<void> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;

  const title = type === 'simulation' ? 'Rapport de Simulation PPV' :
               type === 'accord' ? 'Accord d\'intéressement' :
               type === 'decision' ? 'Décision unilatérale' :
               'Lettre de versement';

  const options = {
    doc,
    pageWidth,
    margin,
    y: createHeader({ doc, pageWidth, margin, y: margin }, title),
  };

  if (type === 'simulation' && data.companyData) {
    generateSimulationContent(options, data.companyData, data);
  } else {
    generateDocumentContent(options, type, data);
  }

  addPageNumbers(doc);
  doc.save(generateFilename(title));
}

export { generatePPVReport } from './report';