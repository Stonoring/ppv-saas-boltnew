import type { PDFOptions } from '../types';
import { getTemplate, replacePlaceholders } from '../templates';

export function generateDocumentContent(
  options: PDFOptions,
  type: 'accord' | 'decision' | 'lettre',
  data: Record<string, any>
): void {
  const { doc, margin, y } = options;
  let content = '';

  if (type === 'accord' || type === 'lettre') {
    const template = getTemplate(type);
    content = replacePlaceholders(template, data);
  } else {
    content = Object.entries(data)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
  }

  // Split content into lines to handle page breaks
  const lines = content.split('\n');
  const lineHeight = 7;
  let currentY = y;
  const maxY = doc.internal.pageSize.getHeight() - margin;

  doc.setFontSize(11);
  lines.forEach(line => {
    if (currentY > maxY) {
      doc.addPage();
      currentY = margin;
    }

    doc.text(line, margin, currentY);
    currentY += lineHeight;
  });
}