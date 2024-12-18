import { toast } from '@/hooks/use-toast';

export interface CompanyData {
  effectifs: string;
  date_creation: string;
  nom_entreprise: string;
  annees_existence: string;
  chiffre_affaires: string;
  debut_exercice_comptable: string;
}

const CACHE_KEY = 'company_data_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface CacheEntry {
  data: CompanyData;
  timestamp: number;
}

function isCacheValid(timestamp: number): boolean {
  return Date.now() - timestamp < CACHE_DURATION;
}

function getCachedData(siret: string): CompanyData | null {
  try {
    const cache = localStorage.getItem(`${CACHE_KEY}_${siret}`);
    if (cache) {
      const { data, timestamp }: CacheEntry = JSON.parse(cache);
      if (isCacheValid(timestamp)) {
        return data;
      }
      // Clear expired cache
      localStorage.removeItem(`${CACHE_KEY}_${siret}`);
    }
  } catch (error) {
    console.error('Cache read error:', error);
  }
  return null;
}

function setCachedData(siret: string, data: CompanyData): void {
  try {
    const cacheEntry: CacheEntry = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(`${CACHE_KEY}_${siret}`, JSON.stringify(cacheEntry));
  } catch (error) {
    console.error('Cache write error:', error);
  }
}

// Extract SIREN from SIRET (first 9 digits)
function extractSiren(siret: string): string {
  const cleanSiret = siret.replace(/\D/g, '');
  return cleanSiret.slice(0, 9);
}

export async function fetchCompanyData(siret: string): Promise<CompanyData | null> {
  try {
    // Check cache first
    const cachedData = getCachedData(siret);
    if (cachedData) {
      return cachedData;
    }

    // If not in cache, fetch from API
    const siren = extractSiren(siret);
    const response = await fetch('https://hook.eu2.make.com/f6x7e0iil8lffh1fmd9r7fiyf4seedtl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ siren }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données');
    }

    const data = await response.json();
    
    // Cache the new data
    setCachedData(siret, data);
    
    return data;
  } catch (error) {
    toast({
      title: "Erreur",
      description: "Impossible de récupérer les informations de l'entreprise",
      variant: "destructive",
    });
    return null;
  }
}