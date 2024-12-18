import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { CompanyData } from './company';
import type { SimulationData } from '@/contexts/SimulationContext';
import { formatCurrency } from './utils';

export async function generatePPVReport(
  companyData: CompanyData,
  simulationData: SimulationData
): Promise<void> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = margin;

  // Header
  doc.setFillColor(41, 98, 255);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text('Rapport de Simulation PPV', margin, 28);
  doc.setFontSize(12);
  doc.text(format(new Date(), 'dd MMMM yyyy', { locale: fr }), pageWidth - margin - 50, 28);

  // Reset text color for content
  doc.setTextColor(0, 0, 0);
  y = 60;

  // Company Information
  doc.setFontSize(16);
  doc.text('Informations Entreprise', margin, y);
  y += 20;

  doc.autoTable({
    startY: y,
    head: [['Élément', 'Valeur']],
    body: [
      ['Nom', companyData.nom_entreprise],
      ['Effectif', companyData.effectifs],
      ['Chiffre d\'affaires', formatCurrency(companyData.chiffre_affaires)],
      ['Date de création', companyData.date_creation],
      ['Ancienneté', `${companyData.annees_existence} ans`],
      ['Exercice comptable', companyData.debut_exercice_comptable],
    ],
    margin: { left: margin },
    theme: 'striped',
    headStyles: { fillColor: [41, 98, 255] },
  });

  y = (doc as any).lastAutoTable.finalY + 30;

  // Simulation Details
  doc.setFontSize(16);
  doc.text('Détails de la Prime', margin, y);
  y += 20;

  const montantTotal = simulationData.totalAmount || 0;
  const nombreBeneficiaires = simulationData.employees || 1;
  const primeParEmploye = montantTotal / nombreBeneficiaires;
  const coutTotal = primeParEmploye > 3000 && !simulationData.hasIncentive 
    ? montantTotal * 1.2 
    : montantTotal;

  doc.autoTable({
    startY: y,
    head: [['Élément', 'Valeur']],
    body: [
      ['Montant total', formatCurrency(montantTotal)],
      ['Nombre de bénéficiaires', nombreBeneficiaires.toString()],
      ['Prime moyenne par employé', formatCurrency(primeParEmploye)],
      ['Coût total employeur', formatCurrency(coutTotal)],
      ['Méthode recommandée', primeParEmploye > 3000 ? 'PPV avec intéressement' : 'PPV classique'],
    ],
    margin: { left: margin },
    theme: 'striped',
    headStyles: { fillColor: [41, 98, 255] },
  });

  y = (doc as any).lastAutoTable.finalY + 30;

  // Distribution Method
  if (simulationData.distributionCriteria) {
    doc.setFontSize(16);
    doc.text('Méthode de Distribution', margin, y);
    y += 20;

    const distributionRows = [
      ['Type de distribution', simulationData.distributionCriteria === 'equal' ? 'Distribution égalitaire' : 'Distribution pondérée'],
    ];

    if (simulationData.distributionCriteria === 'weighted' && simulationData.criteriaWeights) {
      Object.entries(simulationData.criteriaWeights).forEach(([criteria, weight]) => {
        const criteriaLabel = 
          criteria === 'seniority' ? 'Ancienneté' :
          criteria === 'classification' ? 'Classification' :
          'Temps de travail';
        distributionRows.push([criteriaLabel, `${weight}%`]);
      });
    }

    doc.autoTable({
      startY: y,
      head: [['Critère', 'Valeur']],
      body: distributionRows,
      margin: { left: margin },
      theme: 'striped',
      headStyles: { fillColor: [41, 98, 255] },
    });
  }

  // Add page numbers
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128);
    doc.text(
      `Page ${i} sur ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  // Save the document
  const filename = `Simulation_PPV_${format(new Date(), 'yyyy-MM-dd_HH-mm')}.pdf`;
  doc.save(filename);
}

export async function generatePDF(
  type: 'accord' | 'decision' | 'lettre' | 'simulation',
  data: Record<string, any>
): Promise<void> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = margin;

  // Header
  doc.setFillColor(41, 98, 255);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);

  const title = type === 'simulation' ? 'Rapport de Simulation PPV' :
               type === 'accord' ? 'Accord d\'intéressement' :
               type === 'decision' ? 'Décision unilatérale' :
               'Lettre de versement';

  doc.text(title, margin, 28);
  doc.setFontSize(12);
  doc.text(format(new Date(), 'dd MMMM yyyy', { locale: fr }), pageWidth - margin - 50, 28);

  // Reset text color for content
  doc.setTextColor(0, 0, 0);
  y = 60;

  if (type === 'simulation') {
    // Company Information
    doc.setFontSize(16);
    doc.text('Informations Entreprise', margin, y);
    y += 20;

    const companyData = data.companyData as CompanyData;
    doc.autoTable({
      startY: y,
      head: [['Élément', 'Valeur']],
      body: [
        ['Nom', companyData.nom_entreprise],
        ['Effectif', companyData.effectifs],
        ['Chiffre d\'affaires', formatCurrency(companyData.chiffre_affaires)],
        ['Date de création', companyData.date_creation],
        ['Ancienneté', `${companyData.annees_existence} ans`],
        ['Exercice comptable', companyData.debut_exercice_comptable],
      ],
      margin: { left: margin },
      theme: 'striped',
      headStyles: { fillColor: [41, 98, 255] },
    });

    y = (doc as any).lastAutoTable.finalY + 30;

    // Simulation Details
    doc.setFontSize(16);
    doc.text('Détails de la Prime', margin, y);
    y += 20;

    const simulationData = data as SimulationData;
    const montantTotal = simulationData.totalAmount || 0;
    const nombreBeneficiaires = simulationData.employees || 1;
    const primeParEmploye = montantTotal / nombreBeneficiaires;
    const coutTotal = primeParEmploye > 3000 && !simulationData.hasIncentive 
      ? montantTotal * 1.2 
      : montantTotal;

    doc.autoTable({
      startY: y,
      head: [['Élément', 'Valeur']],
      body: [
        ['Montant total', formatCurrency(montantTotal)],
        ['Nombre de bénéficiaires', nombreBeneficiaires.toString()],
        ['Prime moyenne par employé', formatCurrency(primeParEmploye)],
        ['Coût total employeur', formatCurrency(coutTotal)],
        ['Méthode recommandée', primeParEmploye > 3000 ? 'PPV avec intéressement' : 'PPV classique'],
      ],
      margin: { left: margin },
      theme: 'striped',
      headStyles: { fillColor: [41, 98, 255] },
    });

    y = (doc as any).lastAutoTable.finalY + 30;

    // Distribution Method
    if (simulationData.distributionCriteria) {
      doc.setFontSize(16);
      doc.text('Méthode de Distribution', margin, y);
      y += 20;

      const distributionRows = [
        ['Type de distribution', simulationData.distributionCriteria === 'equal' ? 'Distribution égalitaire' : 'Distribution pondérée'],
      ];

      if (simulationData.distributionCriteria === 'weighted' && simulationData.criteriaWeights) {
        Object.entries(simulationData.criteriaWeights).forEach(([criteria, weight]) => {
          const criteriaLabel = 
            criteria === 'seniority' ? 'Ancienneté' :
            criteria === 'classification' ? 'Classification' :
            'Temps de travail';
          distributionRows.push([criteriaLabel, `${weight}%`]);
        });
      }

      doc.autoTable({
        startY: y,
        head: [['Critère', 'Valeur']],
        body: distributionRows,
        margin: { left: margin },
        theme: 'striped',
        headStyles: { fillColor: [41, 98, 255] },
      });
    }
  } else {
    // Handle other document types (accord, decision, lettre)
    const content = Object.entries(data)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
    
    doc.setFontSize(12);
    doc.text(content, margin, y);
  }

  // Add page numbers
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128);
    doc.text(
      `Page ${i} sur ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  // Save the document
  const filename = `${title}_${format(new Date(), 'yyyy-MM-dd_HH-mm')}.pdf`;
  doc.save(filename);
}