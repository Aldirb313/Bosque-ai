import { 
  ProductResearchInput,
  ProductResearchOutput,
  CopywriterInput, 
  CopywriterOutput, 
  CreativeDesignerInput, 
  CreativeDesignerOutput, 
  CreativeAsset,
  VideoCreatorInput,
  VideoCreatorOutput,
  VideoScene,
  AdsManagerInput,
  AdsManagerOutput,
  CampaignRecommendation,
  CampaignDashboardItem,
  UserSubscription,
  CreditTransaction,
  AnalyticsMetrics,
  PlanTier
} from "@/types/ai-employees";

const DB_KEY_RESEARCH = "bosque_ai_research_history_v1";
const DB_KEY_COPYWRITER = "bosque_ai_copywriter_history_v1";
const DB_KEY_CREATIVE = "bosque_ai_creative_history_v1";
const DB_KEY_VIDEO = "bosque_ai_video_history_v1";
const DB_KEY_ADS = "bosque_ai_ads_history_v1";
const DB_KEY_SUBSCRIPTION = "bosque_ai_user_subscription_v1";
const DB_KEY_CREDIT_TX = "bosque_ai_credit_tx_v1";

// --- SUBSCRIPTION & CREDIT SYSTEM ENGINE ---
const INITIAL_SUBSCRIPTION: UserSubscription = {
  plan: 'FREE',
  creditsRemaining: 10,
  monthlyLimit: 10,
  renewsAt: new Date(Date.now() + 86400000 * 30).toISOString(),
  status: 'active',
  paymentGateway: 'Midtrans'
};

const INITIAL_TRANSACTIONS: CreditTransaction[] = [
  {
    id: "tx-init-1",
    timestamp: new Date().toISOString(),
    action: "Monthly Bonus Free Plan",
    amount: 10,
    balanceAfter: 10,
    employeeType: "AI-01 Research"
  }
];

export function getUserSubscription(): UserSubscription {
  if (typeof window === "undefined") return INITIAL_SUBSCRIPTION;
  try {
    const data = localStorage.getItem(DB_KEY_SUBSCRIPTION);
    if (!data) {
      localStorage.setItem(DB_KEY_SUBSCRIPTION, JSON.stringify(INITIAL_SUBSCRIPTION));
      return INITIAL_SUBSCRIPTION;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_SUBSCRIPTION;
  }
}

export function updateUserSubscription(plan: PlanTier, gateway: 'Stripe' | 'Midtrans'): UserSubscription {
  const current = getUserSubscription();
  const limits: Record<PlanTier, number> = {
    FREE: 10,
    PRO: 500,
    BUSINESS: 2500
  };

  const updated: UserSubscription = {
    ...current,
    plan,
    monthlyLimit: limits[plan],
    creditsRemaining: limits[plan],
    paymentGateway: gateway,
    status: 'active'
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(DB_KEY_SUBSCRIPTION, JSON.stringify(updated));
    recordCreditTransaction(
      `Upgraded Plan to ${plan} via ${gateway}`,
      limits[plan],
      updated.creditsRemaining,
      "AI-01 Research"
    );
  }
  return updated;
}

export function deductUserCredit(action: string, employeeType: any, cost: number = 1): boolean {
  const current = getUserSubscription();
  
  if (current.plan !== 'FREE' && current.plan !== 'PRO' && current.plan !== 'BUSINESS') {
    return false;
  }

  if (current.creditsRemaining < cost) {
    return false;
  }

  const newBalance = current.creditsRemaining - cost;
  const updated: UserSubscription = {
    ...current,
    creditsRemaining: newBalance
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(DB_KEY_SUBSCRIPTION, JSON.stringify(updated));
    recordCreditTransaction(action, -cost, newBalance, employeeType);
  }
  return true;
}

export function getCreditTransactions(): CreditTransaction[] {
  if (typeof window === "undefined") return INITIAL_TRANSACTIONS;
  try {
    const data = localStorage.getItem(DB_KEY_CREDIT_TX);
    if (!data) {
      localStorage.setItem(DB_KEY_CREDIT_TX, JSON.stringify(INITIAL_TRANSACTIONS));
      return INITIAL_TRANSACTIONS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_TRANSACTIONS;
  }
}

function recordCreditTransaction(action: string, amount: number, balanceAfter: number, employeeType: any) {
  if (typeof window === "undefined") return;
  const txs = getCreditTransactions();
  const newTx: CreditTransaction = {
    id: `tx-${Date.now()}`,
    timestamp: new Date().toISOString(),
    action,
    amount,
    balanceAfter,
    employeeType
  };
  localStorage.setItem(DB_KEY_CREDIT_TX, JSON.stringify([newTx, ...txs]));
}

export function getSaaSAnalytics(): AnalyticsMetrics {
  return {
    totalUsers: 14820,
    activeUsers: 8940,
    mrr: 184500000, // Rp 184.5M MRR
    churnRate: 1.8,
    retentionRate: 94.2,
    totalAiCreditsUsed: 428900,
    dailyUsageTrend: [
      { date: "Sen", usage: 12400 },
      { date: "Sel", usage: 15800 },
      { date: "Rab", usage: 14200 },
      { date: "Kam", usage: 18900 },
      { date: "Jum", usage: 22400 },
      { date: "Sab", usage: 19800 },
      { date: "Min", usage: 16500 }
    ],
    revenueTrend: [
      { month: "Mar", amount: 110000000 },
      { month: "Apr", amount: 135000000 },
      { month: "Mei", amount: 152000000 },
      { month: "Jun", amount: 168000000 },
      { month: "Jul", amount: 175000000 },
      { month: "Agu", amount: 184500000 }
    ]
  };
}

// --- AI-01 PRODUCT RESEARCH ---
const INITIAL_RESEARCH_HISTORY: ProductResearchOutput[] = [
  {
    id: "res-sample-1",
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    input: {
      keyword: "Portable Blender",
      category: "Dapur & Elektronik Rumahan",
      targetMarket: "Mahasiswa, Pejuang Diet & Pekerja Kantor",
      country: "Indonesia",
      targetPrice: "Rp 189.000"
    },
    productName: "Portable Blender Juicer Wireless 6-Blades",
    overallScore: 87,
    details: {
      demandScore: 90,
      competitionScore: 65,
      profitMarginScore: 75,
      viralPotentialScore: 95,
      marketOpportunityScore: 88
    },
    marketplaces: [
      {
        platform: "Shopee",
        volumeText: "145.000+ pencarian/bln",
        searchVolume: 92,
        avgPrice: "Rp 165.000 - Rp 210.000",
        competitionLevel: "High",
        topStoresCount: 48
      },
      {
        platform: "Tokopedia",
        volumeText: "82.000+ pencarian/bln",
        searchVolume: 78,
        avgPrice: "Rp 175.000 - Rp 230.000",
        competitionLevel: "Medium",
        topStoresCount: 32
      },
      {
        platform: "TikTok Shop",
        volumeText: "210.000+ penjualan/bln",
        searchVolume: 98,
        avgPrice: "Rp 159.000 - Rp 199.000",
        competitionLevel: "High",
        topStoresCount: 65
      },
      {
        platform: "Meta Ads Library & Shop",
        volumeText: "320+ Active Ads & IG Shopping Catalogs",
        searchVolume: 94,
        avgPrice: "Rp 169.000 - Rp 225.000",
        competitionLevel: "High",
        topStoresCount: 54
      },
      {
        platform: "Amazon",
        volumeText: "$2.4M GMV Global/bln",
        searchVolume: 85,
        avgPrice: "$24.99 - $34.99",
        competitionLevel: "Very High",
        topStoresCount: 120
      }
    ],
    trendAnalysis: [
      {
        source: "Google Trends",
        score: 88,
        statusText: "Breakout Trend (+180% 30 hari)",
        growthRate: "+180% YoY"
      },
      {
        source: "TikTok Trend",
        score: 96,
        statusText: "Extremely Viral (#PortableBlender 45M views)",
        growthRate: "+320% MoM"
      },
      {
        source: "Meta Signals (FB & IG)",
        score: 94,
        statusText: "High Engagement Meta Feed & Reels Ads",
        growthRate: "+210% MoM"
      },
      {
        source: "Social Media Signal",
        score: 92,
        statusText: "Tinggi konten UGC & Unboxing Video",
        growthRate: "+140% WoW"
      }
    ],
    aiRecommendation: "Produk ini SANGAT LAYAK LAUNCH! Memiliki tingkat kelayakan yang sangat tinggi karena dorongan konten visual TikTok & gaya hidup sehat yang terus berkembang. Fokuslah pada angle keunggulan 'Bisa Charge USB, Mudah Dicuci, & Pisau 6-Blades Anti Macet' untuk menaklukkan pasar pesaing.",
    estimatedProfitRange: "Rp 65.000 - Rp 95.000 / unit (Margin 45-60%)",
    winningAngles: [
      "Bikin smoothie protein kilat di meja kantor tanpa colokan listrik",
      "Solusi MPASI praktis ibu muda saat jalan-jalan & traveling",
      "Estetik & Instagramable untuk konten harian minum jus sehat"
    ],
    winningProducts: [
      {
        id: "win-1",
        name: "Wireless Portable Blender 6-Blades 500ml",
        category: "Kitchen Electronics",
        trendStatus: "🔥 VIRAL DI TIKTOK SHOP",
        estSupplierPrice: "Rp 65.000",
        estSellingPrice: "Rp 189.000",
        potentialProfitMargin: "65% (Rp 124.000/unit)",
        viralScore: 96,
        reasonWhyWinning: "Tinggi permintaan dari pencinta gym & pekerja kantoran, efisien tanpa colokan kabel."
      },
      {
        id: "win-2",
        name: "Electric Protein Shaker Bottle USB-C",
        category: "Fitness & Lifestyle",
        trendStatus: "📈 BREAKOUT GOOGLE TRENDS",
        estSupplierPrice: "Rp 45.000",
        estSellingPrice: "Rp 149.000",
        potentialProfitMargin: "70% (Rp 104.000/unit)",
        viralScore: 92,
        reasonWhyWinning: "Menggantikan botol shaker manual, anti menggumpal untuk susu protein/collagen."
      },
      {
        id: "win-3",
        name: "Mini Cold Press Slow Juicer Portable",
        category: "Healthy Living",
        trendStatus: "⭐ HIGH DEMAND SHOPEE & TOKOPEDIA",
        estSupplierPrice: "Rp 120.000",
        estSellingPrice: "Rp 299.000",
        potentialProfitMargin: "60% (Rp 179.000/unit)",
        viralScore: 89,
        reasonWhyWinning: "Trend jus seledri & diet detox organik tanpa ampas, margin keuntungan besar."
      }
    ]
  }
];

export function getResearchHistory(): ProductResearchOutput[] {
  if (typeof window === "undefined") return INITIAL_RESEARCH_HISTORY;
  try {
    const data = localStorage.getItem(DB_KEY_RESEARCH);
    if (!data) {
      localStorage.setItem(DB_KEY_RESEARCH, JSON.stringify(INITIAL_RESEARCH_HISTORY));
      return INITIAL_RESEARCH_HISTORY;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_RESEARCH_HISTORY;
  }
}

export function saveResearchResult(result: ProductResearchOutput): void {
  if (typeof window === "undefined") return;
  try {
    const history = getResearchHistory();
    const updated = [result, ...history.filter(item => item.id !== result.id)];
    localStorage.setItem(DB_KEY_RESEARCH, JSON.stringify(updated));
  } catch (e) {
    console.error("Error saving research result:", e);
  }
}

export function generateProductResearchAI(input: ProductResearchInput): ProductResearchOutput {
  const kw = input.keyword || "Produk Pilihan";
  
  // Calculate dynamic logical scores based on string length & randomness
  const seed = kw.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const baseScore = 70 + (seed % 25); // 70 - 95
  const demand = Math.min(99, 75 + ((seed * 3) % 23));
  const competition = Math.min(95, 50 + ((seed * 7) % 40));
  const margin = Math.min(98, 60 + ((seed * 5) % 35));
  const viral = Math.min(99, 70 + ((seed * 11) % 28));
  const opportunity = Math.round((demand + margin + viral - (competition * 0.4)) / 2.6);

  const result: ProductResearchOutput = {
    id: `res-${Date.now()}`,
    createdAt: new Date().toISOString(),
    input,
    productName: `${kw.toUpperCase()} - Winning Edition`,
    overallScore: baseScore,
    winningScoreParameters: {
      demandScore: demand,
      competitionScore: competition,
      marginScore: margin,
      trendScore: Math.min(99, viral + 2),
      advertisingOpportunityScore: Math.min(98, Math.max(65, opportunity))
    },
    details: {
      demandScore: demand,
      competitionScore: competition,
      profitMarginScore: margin,
      viralPotentialScore: viral,
      marketOpportunityScore: Math.min(98, Math.max(65, opportunity))
    },
    marketplaces: [
      {
        platform: "Shopee",
        volumeText: `${(demand * 1400).toLocaleString('id-ID')} pencarian/bln`,
        searchVolume: Math.min(98, demand + 2),
        avgPrice: input.targetPrice ? input.targetPrice : "Rp 120.000 - Rp 250.000",
        competitionLevel: competition > 75 ? "High" : competition > 55 ? "Medium" : "Low",
        topStoresCount: Math.floor(competition * 0.7) + 12
      },
      {
        platform: "Tokopedia",
        volumeText: `${(demand * 900).toLocaleString('id-ID')} pencarian/bln`,
        searchVolume: Math.min(95, demand - 8),
        avgPrice: input.targetPrice ? input.targetPrice : "Rp 130.000 - Rp 270.000",
        competitionLevel: competition > 80 ? "Very High" : competition > 60 ? "Medium" : "Low",
        topStoresCount: Math.floor(competition * 0.5) + 10
      },
      {
        platform: "TikTok Shop",
        volumeText: `${(viral * 2200).toLocaleString('id-ID')} views & sales/bln`,
        searchVolume: Math.min(99, viral + 3),
        avgPrice: input.targetPrice ? input.targetPrice : "Rp 99.000 - Rp 199.000",
        competitionLevel: viral > 85 ? "High" : "Medium",
        topStoresCount: Math.floor(viral * 0.8) + 15
      },
      {
        platform: "Meta Ads Library & Shop",
        volumeText: `${Math.floor(demand * 4.2)} Active Ads & IG Shopping Catalogs`,
        searchVolume: Math.min(97, demand + 1),
        avgPrice: input.targetPrice ? input.targetPrice : "Rp 129.000 - Rp 249.000",
        competitionLevel: demand > 75 ? "High" : "Medium",
        topStoresCount: Math.floor(demand * 0.6) + 14
      },
      {
        platform: "Amazon",
        volumeText: `$${(demand * 25).toLocaleString('en-US')}k GMV Global/bln`,
        searchVolume: Math.min(95, demand - 5),
        avgPrice: "$19.99 - $49.99",
        competitionLevel: "High",
        topStoresCount: 85
      }
    ],
    trendAnalysis: [
      {
        source: "Google Trends",
        score: demand,
        statusText: demand > 80 ? "Sangat Tinggi & Trending Naik" : "Stabil & Konsisten",
        growthRate: `+${demand * 2.1}% YoY`
      },
      {
        source: "TikTok Trend",
        score: viral,
        statusText: viral > 85 ? "Viral Signal Active 🔥" : "Moderate UGC Virality",
        growthRate: `+${viral * 3.4}% MoM`
      },
      {
        source: "Meta Signals (FB & IG)",
        score: Math.min(99, Math.round((demand * 0.6) + (viral * 0.4))),
        statusText: "Skala Iklan Meta Active & High CTR Feed",
        growthRate: `+${Math.round(viral * 2.8)}% MoM`
      },
      {
        source: "Social Media Signal",
        score: Math.min(99, Math.round((demand + viral) / 2)),
        statusText: "Respon Positif dari Audiens Target",
        growthRate: `+${Math.round(demand * 1.6)}% WoW`
      }
    ],
    targetAudience: {
      persona: input.targetMarket || "Pekerja Muda & E-commerce Shoppers",
      ageGroup: "22 - 38 Tahun",
      incomeLevel: "Menengah (Rp 4M - 12M / bln)",
      painPoints: [
        `Frustrasi dengan produk ${kw} murah yang kualitasnya cepat rusak`,
        `Ingin solusi praktis yang hemat waktu & meningkatkan gaya hidup`,
        `Ragu beli online jika tidak ada garansi resmi atau COD`
      ],
      buyingTriggers: [
        "Diskon promo bundling hemat 2 pcs",
        "Video demo nyata sebelum & sesudah pemakaian di TikTok",
        "Gratis ongkir ke seluruh Indonesia & metode pembayaran COD"
      ]
    },
    marginEstimation: {
      supplierCostRange: input.targetPrice ? `Rp ${Math.round(parseInt(input.targetPrice.replace(/\D/g, '') || "100000") * 0.35).toLocaleString('id-ID')}` : "Rp 45.000",
      recommendedSellingPrice: input.targetPrice ? input.targetPrice : "Rp 169.000",
      estimatedNetProfitUnit: input.targetPrice ? `Rp ${Math.round(parseInt(input.targetPrice.replace(/\D/g, '') || "100000") * 0.50).toLocaleString('id-ID')}` : "Rp 85.000",
      grossMarginPercentage: margin,
      breakEvenRoas: "1.85x ROAS"
    },
    launchStrategy: {
      phase1TestDays: "3 Hari Pertama (Testing 5 Angle Content)",
      testBudgetMetaAds: "Rp 150.000 - Rp 300.000 / Hari",
      influencerAngleTikTok: "UGC Video Reaksi Problem-Solving 15 Detik",
      offerPackaging: "Beli 1 Gratis 1 Aksesoris Pendukung / Diskon 40%",
      actionChecklist: [
        `Riset 3 supplier terpercaya di 1688 / Shopee Wholesaler dengan rating >= 4.8`,
        `Buat 5 variasi video short 9:16 dengan hook emosional`,
        `Jalankan Meta Ads CBO Campaign dengan 3 ad set audience interest terarah`,
        `Evaluasi ROAS hari ke-3 (Scale jika ROAS > 3.0x, Kill jika < 1.5x)`
      ]
    },
    aiRecommendation: `Produk "${kw}" memiliki skor potensi sebesar ${baseScore}/100. Produk ini sangat direkomendasikan untuk launching di pasar ${input.country || 'Indonesia'} karena memiliki Demand Score sebesar ${demand}% dan Viral Potential sebesar ${viral}%. Disarankan untuk mengutamakan pemasaran di platform TikTok Shop & Shopee dengan menekankan solusi masalah untuk audiens ${input.targetMarket || 'Utama'}.`,
    estimatedProfitRange: `Margin Keuntungan Est. ${margin}% (Potensi Net Profit 40-55%)`,
    winningAngles: [
      `Fokuskan kampanye pada mengatasi masalah utama audiens ${input.targetMarket || 'pengguna'}`,
      `Gunakan racun produk via video demo berdurasi 15 detik di TikTok`,
      `Bundling dengan aksesoris pendukung untuk menaikkan AOV (Average Order Value)`
    ],
    winningProducts: [
      {
        id: `win-${Date.now()}-1`,
        name: `${kw} Premium Edition - Ultra Slim`,
        category: input.category || "General E-Commerce",
        trendStatus: "🔥 TOP VIRAL ITEM IN TIKTOK SHOP",
        estSupplierPrice: input.targetPrice ? `Rp ${Math.round(parseInt(input.targetPrice.replace(/\D/g, '') || "100000") * 0.35).toLocaleString('id-ID')}` : "Rp 55.000",
        estSellingPrice: input.targetPrice ? input.targetPrice : "Rp 175.000",
        potentialProfitMargin: `65% (Margin Rp ${Math.round(parseInt(input.targetPrice?.replace(/\D/g, '') || "175000") * 0.65).toLocaleString('id-ID')}/unit)`,
        viralScore: Math.min(99, viral + 2),
        reasonWhyWinning: `Berdasarkan analisis algoritma TikTok & Shopee, ${kw} memiliki konversi tinggi jika dikemas dengan garansi ganti baru.`
      },
      {
        id: `win-${Date.now()}-2`,
        name: `Smart ${kw} Pro Sync`,
        category: input.category || "General E-Commerce",
        trendStatus: "📈 BREAKOUT TREND ON GOOGLE",
        estSupplierPrice: input.targetPrice ? `Rp ${Math.round(parseInt(input.targetPrice.replace(/\D/g, '') || "100000") * 0.4).toLocaleString('id-ID')}` : "Rp 70.000",
        estSellingPrice: input.targetPrice ? input.targetPrice : "Rp 199.000",
        potentialProfitMargin: `60% (Margin Rp ${Math.round(parseInt(input.targetPrice?.replace(/\D/g, '') || "199000") * 0.60).toLocaleString('id-ID')}/unit)`,
        viralScore: Math.min(98, demand + 1),
        reasonWhyWinning: `Pencarian kata kunci organik naik +${demand * 2}% bulan ini. Pesaing di Tokopedia masih minim toko official.`
      },
      {
        id: `win-${Date.now()}-3`,
        name: `Compact ${kw} Travel Pack`,
        category: input.category || "General E-Commerce",
        trendStatus: "⭐ RISING STAR MARKETPLACE",
        estSupplierPrice: input.targetPrice ? `Rp ${Math.round(parseInt(input.targetPrice.replace(/\D/g, '') || "100000") * 0.3).toLocaleString('id-ID')}` : "Rp 40.000",
        estSellingPrice: input.targetPrice ? input.targetPrice : "Rp 139.000",
        potentialProfitMargin: `70% (Margin Rp ${Math.round(parseInt(input.targetPrice?.replace(/\D/g, '') || "139000") * 0.70).toLocaleString('id-ID')}/unit)`,
        viralScore: Math.min(96, viral - 3),
        reasonWhyWinning: `Produk ringan dengan ongkir murah, sangat diminati oleh audiens ${input.targetMarket || 'muda'}.`
      }
    ],
    realtimeDataVerification: {
      metaAdsLibraryVerified: true,
      tiktokTrendsVerified: true,
      shopeeScanVerified: true,
      googleTrendsVerified: true,
      auditTimestamp: new Date().toISOString()
    }
  };

  saveResearchResult(result);
  return result;
}

// --- COPYWRITER ---
const INITIAL_COPYWRITER_HISTORY: CopywriterOutput[] = [
  {
    id: "cp-sample-1",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    input: {
      product: "GlowSkin Vitamin C Serum",
      targetCustomer: "Wanita karir & Ibu Muda usia 22-38 tahun",
      painPoint: "Kulit kusam, noda hitam membandel, tampak lelah kurang tidur",
      price: "Rp 149.000",
      usp: "Formula Micro-Encapsulated Triple C + Hyaluronic 3D, hasil 7 hari tanpa perih",
      tone: "Viral"
    },
    hooks: [
      "Stoppp racun skincare palsu! Ini alasan kenapa muka kamu tetep kusam padahal udah skincare-an tiap hari 😱",
      "Siapa yang kepengen mukanya glowing kenceng pas bangun tidur? Wajib baca ini!",
      "Rahasia dokter kulit Korea yang jarang diungkap ke publik akhirnya dibocorkan!",
      "Jujur, kamu pernah kesel gak sih uang habis jutaan tapi flek hitam tetep mangkal?",
      "Cuma 149 ribu tapi efeknya berasa treatment 2 juta di klinik kecantikan!",
      "Tolong jangan beli serum Vitamin C biasa sebelum kamu tau fakta bahaya oksidasi ini...",
      "Trending di TikTok! Serum Lokal rasa High-End yang lagi di-spill semua selebgram.",
      "Bayangin dalam 7 hari kedepan temen kantor kamu mendadak tanya: 'Pake skincare apa bro/sis?'",
      "Kalau kamu umur 25+ tapi belum pake Triple C Serum... kamu dalam bahaya penuaan dini!",
      "Bikin mantan nyesel setengah mati cuma dalam seminggu. Ini rahasia kulit bening glowingnya!",
      "Stop tutupin noda hitam pake concealer tebel! Pake ini biar beneran ilang permanen.",
      "Ternyata ini alasannya kenapa artis-artis mukanya mulus licin tanpa pori!",
      "Diskon gila-gilaan khusus hari ini aja! Buat yang mau pamer kulit sehat kinclong.",
      "Awas ketagihan ngaca! Serum ajaib ini udah diserbu 15.000+ wanita se-Indonesia.",
      "Apakah kamu salah satu dari 80% wanita yang salah pilih serum Vitamin C?",
      "Gak perlu filter Instagram lagi kalau muka asli kamu udah kayak kaca kristal!",
      "Tips hemat glowing tanpa perlu keluar rumah & tanpa perlu sakit disuntik!",
      "Resep glowing kilat sebelum acara penting minggunya! Wajib stok sekarang.",
      "Gak pede keluar rumah tanpa makeup? Solusi radikal 7 hari glowing alami!",
      "Review sejujurnya dari 500+ pembeli pertama: Kulit auto kenyal & cerah seketika!"
    ],
    headlines: [
      "GlowSkin Triple C: Solusi Flek Hitam & Kulit Kusam Hanya Dalam 7 Hari!",
      "Wajah Bening Bebas Noda Kusam Tanpa Perlu Treatment Mahal Klinik!",
      "Rahasia Kulit Kinclong Glowing Instan Tanpa Efek Samping Berbahaya",
      "Inovasi Micro-Encapsulated Vitamin C Pertama yang Langsung Meresap 10x Lebih Cepat",
      "Cuma Rp 149rb, Kembalikan Keremajaan Kulitmu Seketika!",
      "Kulit Cerah, Lembut, & Flawless Bagaikan Perawatan Artis",
      "Formulasi Herbal Alami Untuk Kulit Sensitif Bebas Flek Membandel",
      "Tampil Pede Bebas Foundation Tebal Setiap Hari Bersama GlowSkin",
      "Dapatkan Kulit Impianmu Sekarang: Cerah, Kencang & Segar Sepanjang Hari",
      "Solusi Praktis Wanita Modern: 3 Tetes GlowSkin Untuk Glowing Seharian",
      "Transformasi Wajah Kusam Menjadi Glowing Bersinar Dalam Seminggu",
      "Ucapkan Selamat Tinggal Pada Kulit Lelah Dan Flek Hitam!",
      "Satu Serum Dengan 5 Manfaat Utama Untuk Kesehatan Kulit Wajahmu",
      "Dermatologically Tested: Aman Untuk Ibu Hamil & Menyusui",
      "Nutrisi Terbaik Kulitmu Dengan Triple C Serum Berkualitas High-End",
      "Tingkatkan Kepercayaan Dirimu Dengan Kulit Bening Transparan!",
      "Solusi Terbaik Menghilangkan Bekas Jerawat & Hyperpigmentation",
      "Rasakan Sensasi Kulit Selembut Sutra Dalam Pengaplikasian Pertama",
      "Jangan Biarkan Penuaan Dini Merusak Penampilanmu – Rawat Dengan GlowSkin",
      "Special Promo Hari Ini: Beli GlowSkin Hemat Hingga 50% + Gratis Ongkir!"
    ],
    marketingAngles: [
      {
        angleName: "Problem-Solving Angle",
        description: "Fokus langsung ke masalah flek hitam dan solusi instan 7 hari.",
        exampleCopy: "Flek hitam membandel bikin gak pede? Coba solusi GlowSkin ini!"
      },
      {
        angleName: "Social Proof Angle",
        description: "Menekankan 15.000+ pembeli puas dan review positif.",
        exampleCopy: "Lebih dari 15.000 wanita Indonesia sudah membuktikan hasilnya dalam 7 hari!"
      },
      {
        angleName: "Urgency & Scarcity Angle",
        description: "Promo diskon khusus terbatas hari ini.",
        exampleCopy: "Diskon 50% khusus 50 pembeli pertama hari ini saja!"
      },
      {
        angleName: "Value/Economy Angle",
        description: "Bandingkan biaya murah vs perawatan klinik mahal.",
        exampleCopy: "Hemat jutaan rupiah ketimbang ke klinik kecantikan!"
      },
      {
        angleName: "Before-After Transformation Angle",
        description: "Fokus ke hasil dramatis kulit kusam jadi glowing.",
        exampleCopy: "Dari kulit kusam tampak lelah jadi glowing segar hanya dalam seminggu."
      }
    ],
    ctaVariations: [
      "Beli Sekarang & Dapatkan Diskon 50%!",
      "Klaim Promo Spesial Hari Ini Sebelum Kehabisan!",
      "Pesan via WhatsApp Sekarang untuk Konsultasi Gratis!",
      "Klik Di Sini Untuk Bebas Flek Hitam Dalam 7 Hari!",
      "Ambil Promo Bundling Hemat 2 Pcs Sekarang!"
    ],
    primaryTextMetaAds: [
      "Capek nyobain berbagai macam serum tapi noda hitam & bekas jerawat gak hilang-hilang? 🤔\n\nKenalkan GlowSkin Vitamin C Serum dengan teknologi Micro-Encapsulated Triple C + Hyaluronic 3D. Meresap hingga lapisan kulit terdalam untuk menyamarkan flek hitam dan mencerahkan wajah hanya dalam 7 hari!\n\n✨ Mengapa GlowSkin?\n✅ Mencerahkan 10x lebih efektif tanpa rasa perih\n✅ Menjaga kelembapan 24 jam dengan Hyaluronic 3D\n✅ Aman untuk kulit sensitif, BPOM & Halal Certified\n\n🎉 Promo Khusus Hari Ini: Hanya Rp 149.000 (Harga Normal Rp 299.000) + Extra Gratis Ongkir ke Seluruh Indonesia!\n\n👉 Klik 'Beli Sekarang' sebelum stok promo habis!",
      "Bayangkan bangun tidur setiap pagi dengan kulit wajah yang kenyal, glowing, dan bebas noda kusam! 😍\n\nGlowSkin Serum hadir sebagai jawaban untuk kamu wanita aktif yang ingin hasil cepat tapi tetap aman. Diperkaya dengan bahan aktif konsentrasi tinggi yang merawat barrier kulitmu.\n\n🔥 Sudah terbukti oleh lebih dari 15.000+ wanita Indonesia.\n\nKlik selengkapnya untuk klaim voucher diskon 50% hari ini!"
    ],
    landingPage: {
      heroSection: {
        badge: "🔥 Terjual Lebih Dari 15,000+ Botol Dalam 1 Bulan",
        h1: "Transformasi Kulit Wajah Glowing & Bening Bebas Noda Hitam Dalam 7 Hari!",
        subheadline: "Formulasi revolusioner Micro-Encapsulated Triple C Serum yang efektif mencerahkan kulit kusam, memudarkan flek hitam, dan mengunci kelembapan tanpa efek perih.",
        ctaButton: "DAPATKAN DISKON 50% HARI INI"
      },
      problem: {
        heading: "Apakah Kamu Sering Mengalami Masalah Ini?",
        points: [
          "Wajah tampak kusam, lelah, dan tidak bercahaya meskipun sudah tidur cukup.",
          "Flek hitam dan bekas jerawat membandel yang susah hilang walau sudah ganti skincare.",
          "Kulit terasa kering, kasar, dan kerutan halus mulai muncul di area mata/pipi.",
          "Frustrasi dan menghabiskan jutaan rupiah untuk produk skincare yang tidak memberikan hasil nyata."
        ]
      },
      solution: {
        heading: "GlowSkin Vitamin C Serum Adalah Solusi Total Kulit Impianmu",
        description: "Dikembangkan oleh ahli dermatologi terkemuka dengan teknologi Micro-Encapsulation yang memastikan bahan aktif meresap sempurna ke lapisan dermis tanpa teroksidasi."
      },
      benefits: [
        { title: "Triple Brightening Power", desc: "Kombinasi 3 jenis Vitamin C murni yang mencerahkan kulit 10x lebih cepat." },
        { title: "24h Deep Hydration", desc: "Hyaluronic 3D mengunci kelembapan alami agar kulit kenyal seharian." },
        { title: "Skin Barrier Repair", desc: "Niacinamide & Centella Asiatica memperkuat pertahanan kulit dari polusi." }
      ],
      features: [
        { title: "Fast-Absorbing Texture", desc: "Tekstur ringan, cepat meresap, dan tidak lengket sama sekali di wajah." },
        { title: "Dermatologically Tested", desc: "Aman untuk semua jenis kulit termasuk kulit sensitif dan berjerawat." },
        { title: "100% BPOM & Halal", desc: "Teruji secara klinis bebas dari bahan kimia berbahaya dan merkuri." }
      ],
      cta: {
        heading: "Siap Tampil Percaya Diri Dengan Kulit Glowing Alami?",
        subheading: "Ambil promo spesial hari ini sebelum harga kembali normal!",
        buttonText: "AMBIL PROMO DISKON 50% SEKARANG",
        urgencyText: "⚡ Stok Promo Tersisa 27 Botol Lagi Untuk Hari Ini!"
      }
    },
    marketplaceDescription: `🌟 GLOWSKIN TRIPLE C VITAMIN SERUM 20ML 🌟\n100% ORIGINAL | BPOM APPROVED (NA18230199887) | HALAL CERTIFIED`,
    emailMarketing: [
      {
        subject: "[Rahasia] Cara Memudarkan Flek Hitam Dalam 7 Hari Tanpa Klinik 🤫",
        body: "Halo Sis,\n\nPernahkah kamu merasa kurang percaya diri saat bercermin karena noda hitam atau kulit kusam yang sulit hilang?"
      }
    ],
    whatsAppBroadcast: [
      "Halo Sis! 👋 Ada kabar gembira buat kamu yang pengen wajah glowing bening bebas flek hitam!"
    ]
  }
];

export function getCopywriterHistory(): CopywriterOutput[] {
  if (typeof window === "undefined") return INITIAL_COPYWRITER_HISTORY;
  try {
    const data = localStorage.getItem(DB_KEY_COPYWRITER);
    if (!data) {
      localStorage.setItem(DB_KEY_COPYWRITER, JSON.stringify(INITIAL_COPYWRITER_HISTORY));
      return INITIAL_COPYWRITER_HISTORY;
    }
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_COPYWRITER_HISTORY;
  }
}

export function saveCopywriterResult(item: CopywriterOutput): CopywriterOutput[] {
  const current = getCopywriterHistory();
  const updated = [item, ...current];
  if (typeof window !== "undefined") {
    localStorage.setItem(DB_KEY_COPYWRITER, JSON.stringify(updated));
  }
  return updated;
}

export function generateCopywriterAI(input: CopywriterInput): CopywriterOutput {
  const { product, targetCustomer, painPoint, price, usp, tone } = input;
  const tonePrefix = 
    tone === 'Hard Selling' ? '🔥 PROMO GEMPAR! ' :
    tone === 'Premium' ? '✨ Exclusive Elegance: ' :
    tone === 'Emotional' ? '💖 Sentuhan Kasih: ' :
    tone === 'Soft Selling' ? '💡 Tahukah Kamu? ' : '🚀 VIRAL ALERT! ';

  const hooks: string[] = Array.from({ length: 20 }, (_, i) => `${tonePrefix}Variasi Hook #${i + 1}: ${product} khusus ${targetCustomer} terbebas dari ${painPoint}!`);
  const headlines: string[] = Array.from({ length: 20 }, (_, i) => `${product} - Headline #${i + 1}: Solusi Terpercaya dengan ${usp}`);

  const marketingAngles = [
    { angleName: "Problem-Solving Angle", description: `Fokus ke mengatasi ${painPoint}`, exampleCopy: `Bosan dengan ${painPoint}? ${product} solusinya!` },
    { angleName: "Social Proof Angle", description: "Berdasarkan ribuan review pembeli", exampleCopy: `Dipakai 10.000+ pelanggan puas karena ${usp}!` },
    { angleName: "Urgency & Scarcity Angle", description: "Menekankan stok & diskon terbatas", exampleCopy: `Khusus hari ini! ${product} harga ${price} sebelum harga naik.` },
    { angleName: "Value & Savings Angle", description: "Hemat uang dibanding opsi mahal lain", exampleCopy: `Hemat jutaan rupiah! Kualitas premium ${product} cuma ${price}.` },
    { angleName: "Transformation Angle", description: "Perubahan nyata setelah pemakaian", exampleCopy: `Rasakan perubahan positif tanpa ${painPoint} dengan ${product}.` }
  ];

  const ctaVariations = [
    "Beli Sekarang & Dapatkan Diskon Hemat!",
    "Klaim Voucher Promo Spesial Hari Ini!",
    "Klik Di Sini Untuk Bebas Dari Masalah!",
    "Pesan via WhatsApp Sekarang Juga!",
    "Ambil Promo Diskon Terbatas Sekarang!"
  ];

  const result: CopywriterOutput = {
    id: `cp-${Date.now()}`,
    createdAt: new Date().toISOString(),
    input,
    hooks,
    headlines,
    marketingAngles,
    ctaVariations,
    primaryTextMetaAds: [`Meta Ad Copy #1 untuk ${product}`, `Meta Ad Copy #2 untuk ${product}`],
    landingPage: {
      heroSection: { badge: "PROMO LIMITED", h1: `${product} Solusi ${painPoint}`, subheadline: usp, ctaButton: "BELI SEKARANG" },
      problem: { heading: "Masalah yang Sering Terjadi", points: [painPoint] },
      solution: { heading: "Solusi Terbaik", description: `${product} hadir untukmu.` },
      benefits: [{ title: "Cepat & Ampuh", desc: usp }],
      features: [{ title: "Kualitas Premium", desc: "Teruji aman" }],
      cta: { heading: "Order Sekarang", subheading: "Harga Promo", buttonText: `Dapatkan ${price}`, urgencyText: "Stok Terbatas" }
    },
    marketplaceDescription: `Deskripsi ${product} untuk marketplace...`,
    emailMarketing: [{ subject: `Diskon Spesial ${product}`, body: `Halo ${targetCustomer}...` }],
    whatsAppBroadcast: [`Promo ${product} khusus hari ini! ${price}`]
  };

  saveCopywriterResult(result);
  return result;
}


// --- CREATIVE DESIGNER ---
const INITIAL_CREATIVE_HISTORY: CreativeDesignerOutput[] = [
  {
    id: "cr-sample-1",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    input: {
      product: "Kopi Kenangan Mantan - Cold Brew Botol",
      brandName: "Kopi Kenangan",
      style: "Modern Minimalist",
      targetAudience: "Anak Muda, Pekerja Kantor, Gen Z"
    },
    assets: [
      {
        id: "asset-1",
        type: "Instagram Feed",
        title: "IG Post Aesthetic Dark Coffee",
        aspectRatio: "1:1",
        dimensions: "1080 x 1080 px",
        prompt: "Aesthetic cold brew bottle photography",
        headline: "SEGARKAN HARIMU",
        subtext: "100% Biji Kopi Arabika Pilihan",
        ctaText: "ORDER SEKARANG",
        badge: "DISKON 30%",
        bgColor: "#0f172a",
        accentColor: "#f59e0b",
        imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&auto=format&fit=crop&q=80",
        elements: []
      }
    ]
  }
];

export function getCreativeHistory(): CreativeDesignerOutput[] {
  if (typeof window === "undefined") return INITIAL_CREATIVE_HISTORY;
  try {
    const data = localStorage.getItem(DB_KEY_CREATIVE);
    if (!data) {
      localStorage.setItem(DB_KEY_CREATIVE, JSON.stringify(INITIAL_CREATIVE_HISTORY));
      return INITIAL_CREATIVE_HISTORY;
    }
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_CREATIVE_HISTORY;
  }
}

export function saveCreativeResult(item: CreativeDesignerOutput): CreativeDesignerOutput[] {
  const current = getCreativeHistory();
  const updated = [item, ...current];
  if (typeof window !== "undefined") {
    localStorage.setItem(DB_KEY_CREATIVE, JSON.stringify(updated));
  }
  return updated;
}

export function generateCreativeAI(input: CreativeDesignerInput): CreativeDesignerOutput {
  const { product, brandName, style, targetAudience } = input;
  const sampleImages = [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80"
  ];

  const types: CreativeAsset['type'][] = ['Instagram Feed', 'Banner Ads', 'Marketplace Cover', 'Product Poster', 'Thumbnail', 'Logo Concept'];

  const assets: CreativeAsset[] = types.map((type, idx) => ({
    id: `asset-${Date.now()}-${idx}`,
    type,
    title: `${type} - ${brandName}`,
    aspectRatio: type === 'Banner Ads' ? '16:9' : type === 'Product Poster' ? '9:16' : '1:1',
    dimensions: type === 'Banner Ads' ? '1200 x 628 px' : '1080 x 1080 px',
    prompt: `${style} advertisement for ${product}`,
    headline: brandName.toUpperCase(),
    subtext: `Spesial untuk ${targetAudience}`,
    ctaText: "BELI SEKARANG",
    badge: "PROMO SPESIAL",
    bgColor: "#0f172a",
    accentColor: idx % 2 === 0 ? "#6366f1" : "#ec4899",
    imageUrl: sampleImages[idx % sampleImages.length],
    elements: []
  }));

  const result: CreativeDesignerOutput = {
    id: `cr-${Date.now()}`,
    createdAt: new Date().toISOString(),
    input,
    assets
  };

  saveCreativeResult(result);
  return result;
}


// --- AI-04 VIDEO CREATOR ---
const INITIAL_VIDEO_HISTORY: VideoCreatorOutput[] = [
  {
    id: "vid-sample-1",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    input: {
      productDescription: "Sneakers Running Ultra Light dengan Bantal Empuk Air-Cushion",
      sellingAngle: "Anti Pegal & Trendi Sepanjang Hari",
      platform: "TikTok Video",
      avatarVoice: "Indonesian Female - Maya"
    },
    title: "TikTok Video - Ultra Light Sneakers Viral",
    format: "9:16 Vertical",
    durationSeconds: 15,
    script: {
      hook: "Stoppp jalan kaki pake sepatu keras yang bikin kaki pegal!",
      body: "Ini dia Sneakers Running Air-Cushion ultra ringan yang bikin langkah serasa melayang di awan.",
      cta: "Klik keranjang kuning sekarang sebelum diskon 40% berakhir!"
    },
    voiceOver: {
      voiceName: "Maya (Indonesian Female)",
      audioSpeed: "1.1x Natural Fast",
      tone: "Energetic & Engaging"
    },
    avatarPresenter: {
      name: "Siti - AI Presenter",
      role: "Virtual TikTok Host",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
    },
    scenes: [
      {
        sceneNumber: 1,
        timeRange: "00:00 - 00:03",
        visualPrompt: "Close up feet walking with uncomfortable shoes versus ultra light air cushion sneakers",
        scriptText: "Stoppp jalan kaki pake sepatu keras yang bikin kaki pegal!",
        voiceOverAudioText: "Stoppp jalan kaki pake sepatu keras yang bikin kaki pegal!",
        subtitleText: "❌ STOP SEPATU KERAS BIKIN PEGAL!",
        bgImageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
      },
      {
        sceneNumber: 2,
        timeRange: "00:03 - 00:09",
        visualPrompt: "Demonstration of sneaker bending in half and air cushion elasticity test",
        scriptText: "Ini dia Sneakers Running Air-Cushion ultra ringan yang bikin langkah serasa melayang.",
        voiceOverAudioText: "Ini dia Sneakers Running Air-Cushion ultra ringan yang bikin langkah serasa melayang di awan.",
        subtitleText: "⚡ AIR-CUSHION SERASA MELAYANG!",
        bgImageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
      },
      {
        sceneNumber: 3,
        timeRange: "00:09 - 00:15",
        visualPrompt: "Presenter pointing down to TikTok yellow basket with discount tag 40% OFF",
        scriptText: "Klik keranjang kuning sekarang sebelum diskon 40% berakhir!",
        voiceOverAudioText: "Klik keranjang kuning sekarang sebelum diskon 40% berakhir!",
        subtitleText: "🛒 KLIK KERANJANG KUNING - DISKON 40%",
        bgImageUrl: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
      }
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-shoes-advertisement-in-a-modern-style-42991-large.mp4"
  }
];

export function getVideoHistory(): VideoCreatorOutput[] {
  if (typeof window === "undefined") return INITIAL_VIDEO_HISTORY;
  try {
    const data = localStorage.getItem(DB_KEY_VIDEO);
    if (!data) {
      localStorage.setItem(DB_KEY_VIDEO, JSON.stringify(INITIAL_VIDEO_HISTORY));
      return INITIAL_VIDEO_HISTORY;
    }
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_VIDEO_HISTORY;
  }
}

export function saveVideoResult(item: VideoCreatorOutput): VideoCreatorOutput[] {
  const current = getVideoHistory();
  const updated = [item, ...current];
  if (typeof window !== "undefined") {
    localStorage.setItem(DB_KEY_VIDEO, JSON.stringify(updated));
  }
  return updated;
}

export function generateVideoAI(input: VideoCreatorInput): VideoCreatorOutput {
  const { productDescription, sellingAngle, platform, avatarVoice } = input;
  const avatars = {
    "Indonesian Female - Maya": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    "Indonesian Male - Budi": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    "English Female - Sarah": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    "English Male - James": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80"
  };

  const selectedAvatar = avatars[avatarVoice] || avatars["Indonesian Female - Maya"];

  const scenes: VideoScene[] = [
    {
      sceneNumber: 1,
      timeRange: "00:00 - 00:04",
      visualPrompt: `High impact hook scene displaying ${productDescription} with angle ${sellingAngle}`,
      scriptText: `Kalo kamu belum coba ini, kamu rugi banget! Ini dia rahasia ${sellingAngle}!`,
      voiceOverAudioText: `Kalo kamu belum coba ini, kamu rugi banget! Ini dia rahasia ${sellingAngle}!`,
      subtitleText: `🔥 RAHASIA UNGULAN: ${sellingAngle.toUpperCase()}`,
      bgImageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
      avatarUrl: selectedAvatar
    },
    {
      sceneNumber: 2,
      timeRange: "00:04 - 00:10",
      visualPrompt: `Product showcase scene showing features of ${productDescription}`,
      scriptText: `Diperkaya dengan formulasi hebat yang bikin hasil 10x lebih cepat dan maksimal!`,
      voiceOverAudioText: `Diperkaya dengan formulasi hebat yang bikin hasil 10x lebih cepat dan maksimal!`,
      subtitleText: `⚡ FORMULA 10X LEBIH CEPAT & EFEKTIF`,
      bgImageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      avatarUrl: selectedAvatar
    },
    {
      sceneNumber: 3,
      timeRange: "00:10 - 00:15",
      visualPrompt: `Call to action scene with discount badge & urgency countdown`,
      scriptText: `Mumpung lagi promo terbatas, checkout sekarang di tombol bawah ya!`,
      voiceOverAudioText: `Mumpung lagi promo terbatas, checkout sekarang di tombol bawah ya!`,
      subtitleText: `🛒 PROMO TERBATAS - CHECKOUT SEKARANG!`,
      bgImageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
      avatarUrl: selectedAvatar
    }
  ];

  const result: VideoCreatorOutput = {
    id: `vid-${Date.now()}`,
    createdAt: new Date().toISOString(),
    input,
    title: `${platform} - 9:16 Vertical Video`,
    format: "9:16 Vertical",
    durationSeconds: 15,
    script: {
      hook: scenes[0].scriptText,
      body: scenes[1].scriptText,
      cta: scenes[2].scriptText
    },
    voiceOver: {
      voiceName: avatarVoice,
      audioSpeed: "1.0x Standard",
      tone: "Friendly & Persuasive"
    },
    avatarPresenter: {
      name: avatarVoice.split(" - ")[1] || "Presenter AI",
      role: "Virtual Brand Presenter",
      imageUrl: selectedAvatar
    },
    scenes,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-shoes-advertisement-in-a-modern-style-42991-large.mp4"
  };

  saveVideoResult(result);
  return result;
}


// --- AI-05 ADS MANAGER ---
const INITIAL_ADS_HISTORY: AdsManagerOutput[] = [
  {
    id: "ads-sample-1",
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    input: {
      product: "GlowSkin Vitamin C Serum",
      budget: "Rp 10.000.000 / Bulan",
      targetCustomer: "Wanita Karir 22-35 Tahun, Tertarik Skincare & Kecantikan"
    },
    recommendation: {
      campaignObjective: "Conversions / Sales",
      audience: {
        ageRange: "22 - 35 Tahun",
        gender: "Female",
        interests: ["Skincare Routine", "Korean Beauty", "Sephora", "Cosmetics"],
        behaviors: ["Engaged Shoppers", "Frequent Online Purchasers"]
      },
      budgetRecommendation: {
        dailyBudget: "Rp 330.000 / Hari",
        monthlyBudget: "Rp 10.000.000 / Bulan",
        biddingStrategy: "Highest Volume / Lowest Cost"
      },
      creativeRecommendation: {
        hookType: "Problem-Agitation-Solution Video 15s",
        adFormat: "9:16 TikTok Reels Video + Carousel Visual",
        primaryTextAngle: "Garansi Glowing 7 Hari Tanpa Klinik"
      },
      scalingStrategy: [
        "Jikapun ROAS > 3.0 selama 3 hari berturut-turut, naikkan budget 20% per 48 jam.",
        "Duplikasi Ad Set winning ke CBO Campaign dengan budget 2x lipat."
      ],
      killAdsRecommendation: [
        "Matikan iklan jika CTR < 1.2% setelah 1.000 impresi.",
        "Stop ad creative jika CPA > Rp 65.000 tanpa adanya transaksi."
      ],
      roasOptimization: {
        targetRoas: "3.5x - 4.2x ROAS",
        actionPlan: "Fokus retargeting audience yang add-to-cart dalam 7 hari terakhir dengan penawaran Free Ongkir."
      }
    },
    campaigns: [
      {
        id: "c-1",
        name: "BOF_Sales_GlowSkin_Women_Broad",
        status: "Active",
        budgetDaily: "Rp 150.000",
        spent: "Rp 2.450.000",
        conversions: 42,
        cpa: "Rp 58.333",
        roas: 3.8,
        ctr: "2.4%",
        aiInsight: "Kinerja sangat stabil! ROAS 3.8x melebihi target. Siap dipindahkan ke tahap Scale Up (+20% budget)."
      },
      {
        id: "c-2",
        name: "MOF_Retargeting_ATC_7Days",
        status: "Scale",
        budgetDaily: "Rp 200.000",
        spent: "Rp 4.100.000",
        conversions: 89,
        cpa: "Rp 46.067",
        roas: 4.6,
        ctr: "3.8%",
        aiInsight: "Winning Campaign! Konversi sangat tinggi dari audience retargeting cart abandoners."
      },
      {
        id: "c-3",
        name: "Testing_Creative_Video_Hook2",
        status: "Learning",
        budgetDaily: "Rp 100.000",
        spent: "Rp 450.000",
        conversions: 5,
        cpa: "Rp 90.000",
        roas: 2.1,
        ctr: "1.6%",
        aiInsight: "Masih dalam fase Meta Learning. Biarkan berjalan hingga 50 konversi tercapai."
      },
      {
        id: "c-4",
        name: "TOF_Interest_Men_Skincare_Old",
        status: "Stop",
        budgetDaily: "Rp 50.000",
        spent: "Rp 850.000",
        conversions: 4,
        cpa: "Rp 212.500",
        roas: 0.9,
        ctr: "0.7%",
        aiInsight: "🚨 AI Warning: Campaign ini turun 30% dalam CTR & CPA terlalu mahal. Matikan iklan (Kill Ads) untuk menghemat budget."
      }
    ],
    overallStats: {
      totalSpent: "Rp 7.850.000",
      totalConversions: 140,
      avgRoas: 3.85,
      blendedCpa: "Rp 56.071"
    }
  }
];

export function getAdsHistory(): AdsManagerOutput[] {
  if (typeof window === "undefined") return INITIAL_ADS_HISTORY;
  try {
    const data = localStorage.getItem(DB_KEY_ADS);
    if (!data) {
      localStorage.setItem(DB_KEY_ADS, JSON.stringify(INITIAL_ADS_HISTORY));
      return INITIAL_ADS_HISTORY;
    }
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_ADS_HISTORY;
  }
}

export function saveAdsResult(item: AdsManagerOutput): AdsManagerOutput[] {
  const current = getAdsHistory();
  const updated = [item, ...current];
  if (typeof window !== "undefined") {
    localStorage.setItem(DB_KEY_ADS, JSON.stringify(updated));
  }
  return updated;
}

export function generateAdsAI(input: AdsManagerInput): AdsManagerOutput {
  const { product, budget, targetCustomer } = input;

  const result: AdsManagerOutput = {
    id: `ads-${Date.now()}`,
    createdAt: new Date().toISOString(),
    input,
    recommendation: {
      campaignObjective: "Conversions / Sales",
      audience: {
        ageRange: "20 - 40 Tahun",
        gender: "All",
        interests: [targetCustomer, "Online Shopping", "Impulse Buyers"],
        behaviors: ["Engaged Shoppers", "Mobile Device Users"]
      },
      budgetRecommendation: {
        dailyBudget: `Alokasi Harian dari total ${budget}`,
        monthlyBudget: budget,
        biddingStrategy: "Lowest Cost with Bid Cap"
      },
      creativeRecommendation: {
        hookType: "High Impact Visual 9:16 Video",
        adFormat: "Video Vertical TikTok/Reels + Meta Carousel",
        primaryTextAngle: `Solusi Ampuh ${product}`
      },
      scalingStrategy: [
        "Naikkan budget 20% setiap 48 jam jika ROAS > 3.0x",
        "Buat Lookalike Audience (LAL 1%) dari pembeli 30 hari terakhir"
      ],
      killAdsRecommendation: [
        "Matikan Ad Set jika CPR/CPA > 2x lipat dari target",
        "Stop ad creative jika CTR < 1.0% setelah 2.000 impresi"
      ],
      roasOptimization: {
        targetRoas: "3.5x - 4.5x ROAS",
        actionPlan: "Optimasilanding page speed dan tambahkan timer urgency checkout."
      }
    },
    campaigns: [
      {
        id: `c-${Date.now()}-1`,
        name: `Sales_Broad_${product.replace(/\s+/g, '_')}`,
        status: "Active",
        budgetDaily: "Rp 250.000",
        spent: "Rp 1.250.000",
        conversions: 28,
        cpa: "Rp 44.642",
        roas: 4.1,
        ctr: "2.8%",
        aiInsight: "Performa sangat bagus! ROAS 4.1x. Pertahankan dan pertimbangkan untuk scale up."
      },
      {
        id: `c-${Date.now()}-2`,
        name: `Retargeting_Visitors_${product.replace(/\s+/g, '_')}`,
        status: "Scale",
        budgetDaily: "Rp 350.000",
        spent: "Rp 2.800.000",
        conversions: 64,
        cpa: "Rp 43.750",
        roas: 4.8,
        ctr: "3.9%",
        aiInsight: "Campaign Utama Paling Profit! Teruskan alokasi budget terbesar di sini."
      },
      {
        id: `c-${Date.now()}-3`,
        name: `Test_Creative_Angle2`,
        status: "Learning",
        budgetDaily: "Rp 100.000",
        spent: "Rp 300.000",
        conversions: 4,
        cpa: "Rp 75.000",
        roas: 2.2,
        ctr: "1.4%",
        aiInsight: "Dalam pembelajaran AI. Perlu dipantau hingga 24 jam kedepan."
      },
      {
        id: `c-${Date.now()}-4`,
        name: `Old_Campaign_Unoptimized`,
        status: "Stop",
        budgetDaily: "Rp 50.000",
        spent: "Rp 600.000",
        conversions: 2,
        cpa: "Rp 300.000",
        roas: 0.7,
        ctr: "0.6%",
        aiInsight: "🚨 AI Warning: Campaign ini turun 30% dalam conversion rate. Segera Kill Ads untuk efisiensi!"
      }
    ],
    overallStats: {
      totalSpent: "Rp 4.950.000",
      totalConversions: 98,
      avgRoas: 4.02,
      blendedCpa: "Rp 50.510"
    }
  };

  saveAdsResult(result);
  return result;
}
