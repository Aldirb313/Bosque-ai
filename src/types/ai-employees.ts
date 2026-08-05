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
