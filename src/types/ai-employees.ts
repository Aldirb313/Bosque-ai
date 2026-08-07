export interface ProductResearchInput {
  keyword: string;
  category: string;
  targetMarket: string;
  country: string;
  targetPrice: string;
}

export interface MarketplaceItem {
  platform: 'Shopee' | 'Tokopedia' | 'Amazon' | 'TikTok Shop' | 'Meta Ads Library & Shop';
  volumeText: string;
  searchVolume: number; // 0-100 scale
  avgPrice: string;
  competitionLevel: 'Low' | 'Medium' | 'High' | 'Very High';
  topStoresCount: number;
}

export interface TrendSignal {
  source: 'Google Trends' | 'TikTok Trend' | 'Meta Signals (FB & IG)' | 'Social Media Signal';
  score: number; // 0-100
  statusText: string;
  growthRate: string; // e.g. "+145% MoM"
}

export interface WinningProductRecommendation {
  id: string;
  name: string;
  category: string;
  trendStatus: string;
  estSupplierPrice: string;
  estSellingPrice: string;
  potentialProfitMargin: string;
  viralScore: number; // 0-100
  reasonWhyWinning: string;
}

export interface TargetAudienceBreakdown {
  persona: string;
  ageGroup: string;
  incomeLevel: string;
  painPoints: string[];
  buyingTriggers: string[];
}

export interface MarginEstimationDetails {
  supplierCostRange: string;
  recommendedSellingPrice: string;
  estimatedNetProfitUnit: string;
  grossMarginPercentage: number;
  breakEvenRoas: string;
}

export interface LaunchStrategyPlan {
  phase1TestDays: string;
  testBudgetMetaAds: string;
  influencerAngleTikTok: string;
  offerPackaging: string;
  actionChecklist: string[];
}

export interface ProductResearchOutput {
  id: string;
  createdAt: string;
  input: ProductResearchInput;
  productName: string;
  overallScore: number; // 0-100 Winning Score
  winningScoreParameters: {
    demandScore: number; // 0-100
    competitionScore: number; // 0-100
    marginScore: number; // 0-100
    trendScore: number; // 0-100
    advertisingOpportunityScore: number; // 0-100
  };
  details: {
    demandScore: number; // 0-100%
    competitionScore: number; // 0-100%
    profitMarginScore: number; // 0-100%
    viralPotentialScore: number; // 0-100%
    marketOpportunityScore: number; // 0-100%
  };
  marketplaces: MarketplaceItem[];
  trendAnalysis: TrendSignal[];
  targetAudience: TargetAudienceBreakdown;
  marginEstimation: MarginEstimationDetails;
  launchStrategy: LaunchStrategyPlan;
  aiRecommendation: string;
  estimatedProfitRange: string;
  winningAngles: string[];
  winningProducts: WinningProductRecommendation[];
  realtimeDataVerification: {
    metaAdsLibraryVerified: boolean;
    tiktokTrendsVerified: boolean;
    shopeeScanVerified: boolean;
    googleTrendsVerified: boolean;
    auditTimestamp: string;
  };
}

// SUBSCRIPTION & CREDIT SYSTEM TYPES
export type PlanTier = 'FREE' | 'PRO' | 'BUSINESS';

export interface UserSubscription {
  plan: PlanTier;
  creditsRemaining: number;
  monthlyLimit: number;
  renewsAt: string;
  status: 'active' | 'canceled' | 'past_due';
  paymentGateway: 'Stripe' | 'Midtrans';
}

export interface CreditTransaction {
  id: string;
  timestamp: string;
  action: string;
  amount: number; // negative for usage, positive for topup
  balanceAfter: number;
  employeeType: 'AI-01 Research' | 'AI-02 Copywriter' | 'AI-03 Designer' | 'AI-04 Video' | 'AI-05 Ads';
}

export interface AnalyticsMetrics {
  totalUsers: number;
  activeUsers: number;
  mrr: number; // Monthly Recurring Revenue (IDR/USD)
  churnRate: number; // percentage
  retentionRate: number; // percentage
  totalAiCreditsUsed: number;
  dailyUsageTrend: { date: string; usage: number }[];
  revenueTrend: { month: string; amount: number }[];
}

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
  hooks: string[]; // Min 10
  headlines: string[]; // Min 10
  marketingAngles: {
    angleName: string;
    description: string;
    exampleCopy: string;
  }[]; // Min 5
  ctaVariations: string[]; // Min 5
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
