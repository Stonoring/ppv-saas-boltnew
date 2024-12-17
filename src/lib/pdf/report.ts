import { jsPDF } from 'jspdf';
import type { CompanyData } from '../company';
import type { SimulationData } from '@/contexts/SimulationContext';
import { createHeader, addPageNumbers, generateFilename } from './utils';
import { generateSimulationContent } from './generators/simulation';

export async function generatePPVReport(
  companyData: CompanyData,
  simulationData: SimulationData
): Promise<void> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;

  const options = {
    doc,
    pageWidth,
    margin,
    y: createHeader({ doc, pageWidth, margin, y: margin }, 'Rapport de Simulation PPV'),
  };

  generateSimulationContent(options, companyData, simulationData);
  addPageNumbers(doc);
  doc.save(generateFilename('Simulation_PPV'));
}