export interface RawLead {
  title: string;
  totalScore: string;
  reviewsCount: string;
  street: string;
  city: string;
  state: string;
  countryCode: string;
  website: string;
  phone: string;
  'categories/0': string;
  'categories/1': string;
  'categories/2': string;
  'categories/3': string;
  'categories/4': string;
  'categories/5': string;
  'categories/6': string;
  'categories/7': string;
  'categories/8': string;
  url: string;
  categoryName: string;
}

export interface EnrichedLead {
  slug: string;
  nome: string;
  telefone: string;
  endereco: string;
  categoria: string;
  total_avaliacoes: number;
  nota: number;
  headline: string;
  subheadline: string;
  beneficios: string[];
  cta: string;
  estilo_visual: string;
  cores: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
}

export interface ProcessedLead {
  raw: RawLead;
  enriched?: EnrichedLead;
  html?: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  error?: string;
}
