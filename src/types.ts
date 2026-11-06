export interface ProjectMetric {
  label: string;
  value: string;
  change?: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
  iconName: string;
}

export interface ProjectShard {
  id: string;
  title: string;
  titleEn: string;
  category: 'web' | 'mobile' | 'fullstack' | 'ai' | 'fintech';
  categoryLabel: string;
  year: string;
  client: string;
  tagline: string;
  description: string;
  fullOverview: string;
  tags: string[];
  colorAccent: string; // e.g. #a855f7, #c084fc, #8b5cf6
  shardAngle: number; // visual tilt of shard
  aspectRatio: string;
  clipPathIndex: number;
  metrics: ProjectMetric[];
  features: ProjectFeature[];
  interactiveDemoType: 'fintech' | 'saas' | 'health' | 'creative' | 'logistics' | 'ecommerce';
  mockupUrl?: string;
  qrImageUrl?: string;
  projectUrl?: string;
  projectCode?: number;
  telegramChatUrl?: string;
  quote?: {
    text: string;
    author: string;
    role: string;
  };
}

export type CategoryFilter = 'all' | 'web' | 'mobile' | 'fullstack' | 'ai' | 'fintech';
