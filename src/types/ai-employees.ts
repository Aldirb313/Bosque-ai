export interface CopywriterInput {
  product: string;
  targetCustomer: string;
  painPoint: string;
  price: string;
  usp: string;
  tone: 'Hard Selling' | 'Soft Selling' | 'Premium' | 'Emotional' | 'Viral';
}

export interface LandingPageCopy {
  heroSection: {
    badge: string;
    h1: string;
    subheadline: string;
    ctaButton: string;
  };
  problem: {
    heading: string;
    points: string[];
  };
  solution: {
    heading: string;
    description: string;
  };
  benefits: {
    title: string;
    desc: string;
  }[];
  features: {
    title: string;
    desc: string;
  }[];
  cta: {
    heading: string;
    subheading: string;
    buttonText: string;
    urgencyText: string;
  };
}

export interface CopywriterOutput {
  id: string;
  createdAt: string;
  input: CopywriterInput;
  hooks: string[]; // Min 20
  headlines: string[]; // Min 20
  primaryTextMetaAds: string[];
  landingPage: LandingPageCopy;
  marketplaceDescription: string;
  emailMarketing: {
    subject: string;
    body: string;
  }[];
  whatsAppBroadcast: string[];
}

export interface CreativeDesignerInput {
  product: string;
  brandName: string;
  style: string;
  targetAudience: string;
}

export interface CreativeAsset {
  id: string;
  type: 'Banner Ads' | 'Instagram Feed' | 'Marketplace Cover' | 'Thumbnail' | 'Product Poster' | 'Logo Concept';
  title: string;
  aspectRatio: '1:1' | '9:16' | '16:9' | '4:5';
  dimensions: string;
  prompt: string;
  headline: string;
  subtext: string;
  ctaText: string;
  badge?: string;
  bgColor: string;
  accentColor: string;
  imageUrl?: string;
  elements: {
    type: 'text' | 'shape' | 'badge' | 'button';
    content: string;
    x: number; // %
    y: number; // %
    style?: string;
  }[];
}

export interface CreativeDesignerOutput {
  id: string;
  createdAt: string;
  input: CreativeDesignerInput;
  assets: CreativeAsset[];
}

// AI-04 VIDEO CREATOR TYPES
export interface VideoCreatorInput {
  productDescription: string;
  sellingAngle: string;
  productImage?: string;
  platform: 'TikTok Video' | 'Instagram Reel' | 'YouTube Shorts';
  avatarVoice: 'Indonesian Female - Maya' | 'Indonesian Male - Budi' | 'English Female - Sarah' | 'English Male - James';
}

export interface VideoScene {
  sceneNumber: number;
  timeRange: string; // e.g. "00:00 - 00:04"
  visualPrompt: string;
  scriptText: string;
  voiceOverAudioText: string;
  subtitleText: string;
  bgImageUrl: string;
  avatarUrl: string;
}

export interface VideoCreatorOutput {
  id: string;
  createdAt: string;
  input: VideoCreatorInput;
  title: string;
  format: '9:16 Vertical';
  durationSeconds: number;
  script: {
    hook: string;
    body: string;
    cta: string;
  };
  voiceOver: {
    voiceName: string;
    audioSpeed: string;
    tone: string;
  };
  avatarPresenter: {
    name: string;
    role: string;
    imageUrl: string;
  };
  scenes: VideoScene[];
  videoUrl: string; // Simulated render output MP4
}

// AI-05 ADS MANAGER TYPES
export interface AdsManagerInput {
  product: string;
  budget: string; // e.g. "Rp 5.000.000 / Bulan"
  targetCustomer: string;
}

export interface CampaignRecommendation {
  campaignObjective: 'Conversions / Sales' | 'Lead Generation' | 'Traffic' | 'Brand Awareness';
  audience: {
    ageRange: string;
    gender: 'All' | 'Female' | 'Male';
    interests: string[];
    behaviors: string[];
  };
  budgetRecommendation: {
    dailyBudget: string;
    monthlyBudget: string;
    biddingStrategy: string;
  };
  creativeRecommendation: {
    hookType: string;
    adFormat: string;
    primaryTextAngle: string;
  };
  scalingStrategy: string[];
  killAdsRecommendation: string[];
  roasOptimization: {
    targetRoas: string;
    actionPlan: string;
  };
}

export interface CampaignDashboardItem {
  id: string;
  name: string;
  status: 'Active' | 'Learning' | 'Scale' | 'Stop';
  budgetDaily: string;
  spent: string;
  conversions: number;
  cpa: string;
  roas: number;
  ctr: string;
  aiInsight: string;
}

export interface AdsManagerOutput {
  id: string;
  createdAt: string;
  input: AdsManagerInput;
  recommendation: CampaignRecommendation;
  campaigns: CampaignDashboardItem[];
  overallStats: {
    totalSpent: string;
    totalConversions: number;
    avgRoas: number;
    blendedCpa: string;
  };
}
