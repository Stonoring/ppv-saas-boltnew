import type { PDFOptions } from '../types';
import type { CompanyData } from '@/lib/company';
import type { SimulationData } from '@/contexts/SimulationContext';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { PAYMENT_MODES } from '@/lib/calculator/constants';

export function generateSimulationContent(
  options: PDFOptions,
  companyData: CompanyData,
  simulationData: SimulationData
): void {
  const { doc, margin } = options;
  let { y } = options;

  // En-tête du document
  doc.setFontSize(24);
  doc.setTextColor(41, 98, 255);
  doc.text('Simulation PPV', margin, y);
  doc.setTextColor(128, 128, 128);
  doc.setFontSize(12);
  doc.text(format(new Date(), 'dd MMMM yyyy', { locale: fr }), margin, y + 10);
  y += 30;

  // Informations de l'entreprise
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text('Informations entreprise', margin, y);
  y += 10;

  doc.autoTable({
    startY: y,
    theme: 'striped',
    headStyles: { fillColor: [41, 98, 255] },
    head: [['Élément', 'Valeur']],
    body: [
      ['Nom', companyData.nom_entreprise],
      ['Effectif', companyData.effectifs],
      ['Chiffre d\'affaires', formatCurrency(companyData.chiffre_affaires)],
      ['Date de création', companyData.date_creation],
      ['Ancienneté', `${companyData.annees_existence} ans`],
      ['Exercice comptable', companyData.debut_exercice_comptable],
    ],
  });

  y = (doc as any).lastAutoTable.finalY + 20;

  // Objectifs et besoins
  if (simulationData.selectedNeeds?.length) {
    doc.setFontSize(16);
    doc.text('Objectifs', margin, y);
    y += 10;

    const needsRows = simulationData.selectedNeeds.map(need => [need.label]);
    if (simulationData.otherNeed) {
      needsRows.push([simulationData.otherNeed]);
    }

    doc.autoTable({
      startY: y,
      theme: 'striped',
      headStyles: { fillColor: [41, 98, 255] },
      head: [['Besoins identifiés']],
      body: needsRows,
    });

    y = (doc as any).lastAutoTable.finalY + 20;
  }

  // Calculs des montants
  const montantTotal = simulationData.totalAmount || 0;
  const nombreBeneficiaires = simulationData.employees || 1;
  const primeParEmploye = montantTotal / nombreBeneficiaires;
  const coutTotal = primeParEmploye > 3000 && !simulationData.hasIncentive 
    ? montantTotal * 1.2 
    : montantTotal;
  const montantNetSalarie = (montantTotal * 0.8 * 0.9) / nombreBeneficiaires;

  // Détails de la prime
  doc.setFontSize(16);
  doc.text('Détails de la prime', margin, y);
  y += 10;

  doc.autoTable({
    startY: y,
    theme: 'striped',
    headStyles: { fillColor: [41, 98, 255] },
    head: [['Élément', 'Valeur']],
    body: [
      ['Montant total', formatCurrency(montantTotal)],
      ['Nombre de bénéficiaires', nombreBeneficiaires.toString()],
      ['Prime moyenne par employé', formatCurrency(primeParEmploye)],
      ['Coût total employeur', formatCurrency(coutTotal)],
      ['Montant net perçu par employé', formatCurrency(montantNetSalarie)],
    ],
  });

  y = (doc as any).lastAutoTable.finalY + 20;

  // Comparatif des modes de versement
  doc.setFontSize(16);
  doc.text('Comparatif des modes de versement', margin, y);
  y += 10;

  doc.autoTable({
    startY: y,
    theme: 'striped',
    headStyles: { fillColor: [41, 98, 255] },
    head: [['Mode de versement', 'Montant prime', 'Coût employeur', 'Montant net']],
    body: PAYMENT_MODES.map(mode => [
      mode.name,
      formatCurrency(mode.primeAmount),
      formatCurrency(mode.employerCost),
      formatCurrency(mode.netAmount),
    ]),
  });

  y = (doc as any).lastAutoTable.finalY + 20;

  // Méthode de distribution
  if (simulationData.distributionCriteria) {
    doc.setFontSize(16);
    doc.text('Méthode de distribution', margin, y);
    y += 10;

    const distributionRows = [
      ['Type de distribution', simulationData.distributionCriteria === 'equal' 
        ? 'Distribution égalitaire' 
        : 'Distribution pondérée'],
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
      theme: 'striped',
      headStyles: { fillColor: [41, 98, 255] },
      head: [['Critère', 'Valeur']],
      body: distributionRows,
    });

    y = (doc as any).lastAutoTable.finalY + 20;
  }

  // Informations légales
  doc.setFontSize(16);
  doc.text('Informations légales', margin, y);
  y += 10;

  const hasIncentive = simulationData.hasIncentive;
  const legalInfo = [
    ['Dispositif d\'intéressement', hasIncentive ? 'Oui' : 'Non'],
    ['Plafond d\'exonération', formatCurrency(hasIncentive ? 6000 : 3000)],
    ['Régime social', 'Exonération de cotisations sociales'],
    ['Régime fiscal', 'Soumis à l\'impôt sur le revenu'],
  ];

  doc.autoTable({
    startY: y,
    theme: 'striped',
    headStyles: { fillColor: [41, 98, 255] },
    head: [['Élément', 'Détail']],
    body: legalInfo,
  });

  // Pied de page
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(128);
    doc.text(
      `Page ${i} sur ${pageCount}`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }
}