import type { CompanyData } from '../company';
import type { SimulationData } from '@/contexts/SimulationContext';
import type { jsPDF } from 'jspdf';

export interface PDFOptions {
  doc: jsPDF;
  pageWidth: number;
  margin: number;
  y: number;
}

export interface DocumentData {
  type: 'accord' | 'decision' | 'lettre' | 'simulation';
  title: string;
  data: Record<string, any>;
  companyData?: CompanyData;
  simulationData?: SimulationData;
}

export interface TableConfig {
  head: string[][];
  body: (string | number)[][];
  margin: { left: number };
  theme: string;
  headStyles: { fillColor: number[] };
}