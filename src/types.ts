export interface Benefit {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  details: string[];
  iconName: string;
  highlighted: boolean;
}

export interface Coach {
  id: string;
  name: string;
  position: 'TOP' | 'JUG' | 'MID' | 'ADC' | 'SUP';
  roleIcon: string;
  tier: string;
  winRate: string;
  description: string;
  intro: string;
  specialties: string[];
  stars: number;
}

export interface Review {
  id: string;
  author: string;
  serviceType: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  growth: {
    from: string;
    to: string;
  };
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
