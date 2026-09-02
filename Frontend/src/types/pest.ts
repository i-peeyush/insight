export interface PestItem {
  id: string;
  slug: string;
  name: string;
  commonName: string;
  scientificName: string;
  category: string;
  riskLevel: string;
  description: string;
  signsOfInfestation: string[];
  commonLocations: string[];
  healthRisks: string;
  preventionTips: string[];
  treatmentApproach: string;
  relatedServices: string[];
}
