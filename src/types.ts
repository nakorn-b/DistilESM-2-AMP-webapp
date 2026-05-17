export interface Analysis {
  id: string;
  name: string;
  timestamp: string;
  status: 'Completed' | 'Processing' | 'Failed';
  ampProbability: number;
  predictedClass: string;
}

export type Page = 'home' | 'single' | 'batch' | 'metadata' | 'authors';
