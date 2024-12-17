import { DISTRIBUTION_WEIGHTS } from './constants';

export function calculateDistributionWeights(selectedCriteria: string[]): Record<string, number> {
  const weight = selectedCriteria.length === 1 
    ? DISTRIBUTION_WEIGHTS.single 
    : selectedCriteria.length === 2 
      ? DISTRIBUTION_WEIGHTS.double 
      : DISTRIBUTION_WEIGHTS.triple;

  return selectedCriteria.reduce((acc, criteria) => ({
    ...acc,
    [criteria]: weight
  }), {});
}