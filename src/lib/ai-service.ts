import { CopywriterInput, CopywriterOutput, CreativeDesignerInput, CreativeDesignerOutput, CreativeAsset } from "@/types/ai-employees";

const DB_KEY_COPYWRITER = "bosque_ai_copywriter_history_v1";
const DB_KEY_CREATIVE = "bosque_ai_creative_history_v1";

// Default Initial History for Copywriter
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
    marketplaceDescription: `🌟 GLOWSKIN TRIPLE C VITAMIN SERUM 20ML 🌟
100% ORIGINAL | BPOM APPROVED (NA18230199887) | HALAL CERTIFIED

Apakah kamu punya masalah kulit kusam, noda hitam, atau garis halus? 
GlowSkin Triple C Serum adalah jawaban sempurna untuk mengembalikan kecerahan alami kulitmu!

KEUNGGULAN PRODUK:
- Micro-Encapsulated Technology: Mengunci keaktifan Vitamin C agar tidak cepat teroksidasi.
- Triple Action Formula: Mencerahkan, Menghidrasi, dan Meremajakan kulit.
- Ringan & Cepat Meresap: Tidak lengket dan sangat nyaman dipakai pagi & malam.

CARA PENGGUNAAN:
1. Bersihkan wajah dengan cleanser.
2. Teteskan 3-4 tetes GlowSkin Serum pada telapak tangan/wajah.
3. Usap merata dan tepuk-tepuk lembut hingga meresap sempurna.
4. Gunakan moisturizer dan sunscreen di pagi hari.

Dapatkan BONUS Pouch Skincare Eksklusif untuk 100 Pembeli Pertama Hari Ini!
Yuk checkout sekarang sebelum kehabisan stok!`,
    emailMarketing: [
      {
        subject: "[Rahasia] Cara Memudarkan Flek Hitam Dalam 7 Hari Tanpa Klinik 🤫",
        body: "Halo Sis,\n\nPernahkah kamu merasa kurang percaya diri saat bercermin karena noda hitam atau kulit kusam yang sulit hilang?\n\nKami mengerti betapa melelahkannya mencoba berbagai produk skincare yang menjanjikan hasil cepat namun berujung kekecewaan.\n\nItulah mengapa kami menciptakan GlowSkin Vitamin C Serum! Dengan kombinasi Micro-Encapsulated Vitamin C dan Hyaluronic 3D, kulit kamu bisa kembali sehat, kenyal, dan glowing secara alami.\n\nKhusus untuk pembaca email ini, dapatkan Diskon Rahasia 50% + Free Shipping dengan memasukan kode: GLOWSECRET saat checkout.\n\nKlik tombol di bawah ini untuk mengklaim promo kamu sekarang!"
      }
    ],
    whatsAppBroadcast: [
      "Halo Sis! 👋 Ada kabar gembira buat kamu yang pengen wajah glowing bening bebas flek hitam!\n\nGlowSkin Serum lagi ada PROMO KILAT DISKON 50% harganya cuma Rp 149.000 aja (Harga normal Rp 299.000)! 😱\n\nStok terbatas cuma buat 30 pembeli pertama hari ini. Mau amankan kupon diskonnya sekarang?",
      "Sis, mau tanya dong... Masih sering kesel sama noda kusam di wajah yang susah hilang? 🥲\n\nNyobain GlowSkin Triple C Serum yuk! Sudah terbukti 98% pelanggan kami merasa kulit lebih cerah & kenyal dalam 7 hari.\n\nOrder hari ini dapet GRATIS ONGKIR + BONUS pouch eksklusif! Balas 'MAU' untuk pesan yaa ✨"
    ]
  }
];

// Helper to get Copywriter history
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
    console.error("Failed to read copywriter history:", e);
    return INITIAL_COPYWRITER_HISTORY;
  }
}

// Save Copywriter Result
export function saveCopywriterResult(item: CopywriterOutput): CopywriterOutput[] {
  const current = getCopywriterHistory();
  const updated = [item, ...current];
  if (typeof window !== "undefined") {
    localStorage.setItem(DB_KEY_COPYWRITER, JSON.stringify(updated));
  }
  return updated;
}

// Generate Copywriter Content (Mock AI Engine)
export function generateCopywriterAI(input: CopywriterInput): CopywriterOutput {
  const { product, targetCustomer, painPoint, price, usp, tone } = input;

  const tonePrefix = 
    tone === 'Hard Selling' ? '🔥 PROMO GEMPAR! ' :
    tone === 'Premium' ? '✨ Exclusive Elegance: ' :
    tone === 'Emotional' ? '💖 Sentuhan Kasih: ' :
    tone === 'Soft Selling' ? '💡 Tahukah Kamu? ' : '🚀 VIRAL ALERT! ';

  const hooks: string[] = [
    `${tonePrefix}Stoppp beli ${product} yang biasa aja kalau kamu belum tau teknologi USP ini!`,
    `Siapa lagi yang mau mengatasi ${painPoint} tanpa perlu keluar biaya mahal?`,
    `Awas ketagihan! Ini alasan kenapa ${product} lagi jadi perbincangan hangat di kalangan ${targetCustomer}.`,
    `Jujur, kamu udah berapa kali coba produk tapi ${painPoint} tetep gak sembuh-sembuh?`,
    `Hanya ${price}! Kembalikan senyum percaya dirimu dengan ${product}.`,
    `Resep rahasia ${targetCustomer} tampil makin keren dan bebas dari masalah ${painPoint}.`,
    `Bayangkan jika dalam hitungan hari, ${painPoint} kamu hilang total berkat ${usp}!`,
    `Tolong jangan abaikan pesan ini kalau kamu termasuk ${targetCustomer}!`,
    `Gak nyangka ${price} bisa dapet kualitas ${product} berkelas dunia kayak gini!`,
    `Solusi radikal buat kamu yang udah capek sama ${painPoint}. Wajib kepoin!`,
    `VIRAL! Kenapa ${targetCustomer} pada rebutan produk ${product} ini?`,
    `Jangan sampai nyesel belakangan karena kehabisan stok promo ${product}!`,
    `Tips instan mengakhiri masalah ${painPoint} dengan formula ${usp}.`,
    `Apakah kamu salah satu ${targetCustomer} yang butuh perubahan nyata hari ini?`,
    `Rahasia terbongkar! Ini cara ampuh terbebas dari ${painPoint} tanpa ribet.`,
    `Review jujur pengguna ${product}: Hasilnya beneran di luar ekspektasi!`,
    `Cuma ${price} hari ini! Investasi terbaik untuk penampilan & kenyamananmu.`,
    `Kalau kamu punya masalah ${painPoint}, ini produk yang tak boleh kamu lewati.`,
    `Gak perlu khawatir lagi! ${product} hadir membawa keunggulan ${usp}.`,
    `Spesial promo kilat! Dapatkan ${product} dengan penawaran fantastis hari ini!`
  ];

  const headlines: string[] = [
    `${product}: Solusi Terbaik Mengatasi ${painPoint} Secara Efektif!`,
    `Dapatkan ${product} Sekarang Dengan Harga Spesial ${price}`,
    `Inovasi Unggulan ${usp} Khusus Untuk ${targetCustomer}`,
    `Bebas dari ${painPoint} Lebih Cepat & Aman Bersama ${product}`,
    `Tingkatkan Kualitas Hidupmu Bersama ${product} Sekarang Juga!`,
    `Nikmati Keunggulan ${usp} Dalam Satu Genggaman Anda`,
    `Pilihan Utama Para ${targetCustomer}: ${product} Berkualitas Premium`,
    `Say Goodbye Pada ${painPoint} Dan Rasakan Perubahan Nyata!`,
    `Hemat Luar Biasa! Dapatkan ${product} Cuma ${price}`,
    `${product} - Rahasia Keberhasilan Mengatasi ${painPoint}`,
    `Formulasi Teruji ${usp} Untuk Hasil Maksimal Tanpa Kompromi`,
    `Ubah Penampilan & Harimu Bersama ${product} Pilihan Terbaik`,
    `Terbukti Efektif! ${product} Solusi Tepat Masalah ${painPoint}`,
    `Pesan ${product} Hari Ini & Klaim Bonus Eksklusif Khusus Pelanggan`,
    `Teknologi Terbaru ${usp} Dalam ${product} Yang Mengagumkan`,
    `Jangan Biarkan ${painPoint} Mengganggu Aktivitasmu Lagi!`,
    `Pilihan Cerdas ${targetCustomer} Indonesia: ${product}`,
    `Kemudahan & Hasil Nyata Dalam Satu Produk ${product}`,
    `Harga Terbaik ${price} Untuk Kualitas ${product} Terbaik`,
    `Bergabunglah Bersama Ribuan Pengguna ${product} Yang Puas!`
  ];

  const primaryTextMetaAds = [
    `Apakah kamu merasa lelah dengan masalah ${painPoint}? 😔\n\nKini hadir ${product}, solusi inovatif yang dirancang khusus untuk ${targetCustomer}. Dengan keunggulan ${usp}, produk ini siap memberikan hasil nyata yang memuaskan!\n\n✨ Mengapa Harus Pilih ${product}?\n✅ Efektif mengatasi ${painPoint}\n✅ Kualitas terjamin dengan harga terjangkau (${price})\n✅ Dipercaya oleh ribuan pelanggan puas!\n\n🔥 Promo terbatas hari ini! Klik tombol 'Beli Sekarang' dan dapatkan penawaran spesial sebelum harga kembali normal!`,
    `Impian kamu untuk bebas dari ${painPoint} akhirnya jadi kenyataan! 🌟\n\nDengan ${product}, kamu bisa merasakan manfaat ${usp} secara maksimal. Khusus untuk ${targetCustomer} yang menginginkan solusi praktis, cepat, dan terbukti aman.\n\nDapatkan penawaran istimewa seharga ${price} saja hari ini. Stok sangat terbatas, order sekarang!`
  ];

  const landingPage = {
    heroSection: {
      badge: `🔥 PILIHAN UTAMA ${targetCustomer.toUpperCase()}`,
      h1: `Atasi ${painPoint} Secara Efektif Dengan ${product}`,
      subheadline: `Hadir dengan keunggulan ${usp}. Solusi cepat, aman, dan terjangkau hanya ${price}.`,
      ctaButton: `PESAN ${product.toUpperCase()} SEKARANG`
    },
    problem: {
      heading: `Apakah Kamu Sering Mengalami Ini?`,
      points: [
        `Frustrasi dengan masalah ${painPoint} yang tak kunjung selesai.`,
        `Merasa rugi membeli produk mahal tapi tidak ada hasil yang memuaskan.`,
        `Bingung mencari solusi yang beneran cocok untuk ${targetCustomer}.`,
        `Kekhawatiran akan kualitas produk yang tidak terjamin di pasaran.`
      ]
    },
    solution: {
      heading: `${product} Hadir Sebagai Solusi Terbaik Untukmu`,
      description: `Dirancang secara profesional untuk menjawab semua keresahanmu tentang ${painPoint} menggunakan formulasi ${usp}.`
    },
    benefits: [
      { title: "Hasil Terbukti", desc: "Membantu mengatasi masalah dengan cepat dan bertahan lama." },
      { title: "Keunggulan USP", desc: `Diperkaya dengan ${usp} yang aman dan efektif.` },
      { title: "Harga Terjangkau", desc: `Dapatkan manfaat maksimal hanya dengan ${price}.` }
    ],
    features: [
      { title: "Kualitas Premium", desc: "Dibuat dari bahan standar tinggi dan higienis." },
      { title: "Mudah Digunakan", desc: "Praktis untuk pemakaian sehari-hari tanpa repot." },
      { title: "Jaminan Kepuasan", desc: "Dipercaya oleh ribuan pengguna di seluruh Indonesia." }
    ],
    cta: {
      heading: `Jangan Tunda Lagi! Saatnya Beralih ke ${product}`,
      subheading: `Dapatkan penawaran terbatas khusus hari ini saja.`,
      buttonText: `DAPATKAN DISKON SEKARANG (${price})`,
      urgencyText: `⚡ Stok Promo Terbatas! Amankan Pesananmu Sekarang.`
    }
  };

  const marketplaceDescription = `🛒 ${product.toUpperCase()} - SOLUSI TERBAIK UNTUK ${targetCustomer.toUpperCase()} 🛒

Apakah Anda mengalami masalah ${painPoint}? 
${product} adalah pilihan paling tepat untuk Anda!

KEUNGGULAN UTAMA:
- Formula khusus dengan ${usp}
- Efektif & aman digunakan
- Penawaran harga terbaik: ${price}

SPESIFIKASI & CARA PAKAI:
1. Pakai secara teratur sesuai petunjuk penggunaan.
2. Rasakan perubahan positif setelah pemakaian konsisten.

Dapatkan garansi kepuasan & pengiriman cepat ke seluruh Indonesia.
Yuk checkout sekarang sebelum promo berakhir!`;

  const emailMarketing = [
    {
      subject: `[Penawaran Khusus] Solusi Bebas ${painPoint} Dalam Satu Langkah ✨`,
      body: `Halo,\n\nApakah ${painPoint} sering mengganggu aktivitas harianmu?\n\nKami punya kabar baik! ${product} kini hadir membawa inovasi ${usp} yang terbukti membantu ${targetCustomer} mendapatkan hasil maksimal.\n\nSpesial hari ini, kamu bisa mendapatkan ${product} hanya seharga ${price}!\n\nKlik tautan di bawah ini untuk memesan sebelum promo habis.\n\nSalam hangat,\nTim ${product}`
    }
  ];

  const whatsAppBroadcast = [
    `Halo Ka! 👋 Mau tanya dong, masih sering pusing sama masalah ${painPoint}? 🥹\n\nKenalin nih ${product} yang lagi hits! Punya keunggulan ${usp} yang efektif banget.\n\nHari ini lagi ada promo cuma ${price} aja lho Ka! Mau ambil kupon promonya sekarang?`,
    `Promo Spesial ${product}! 🔥\n\nSolusi tepat buat kamu (${targetCustomer}) yang mau terbebas dari ${painPoint}.\n\nHarga promo khusus hari ini hanya ${price}. Balas 'MAU' sekarang untuk pemesanan ya Kak! ✨`
  ];

  const result: CopywriterOutput = {
    id: `cp-${Date.now()}`,
    createdAt: new Date().toISOString(),
    input,
    hooks,
    headlines,
    primaryTextMetaAds,
    landingPage,
    marketplaceDescription,
    emailMarketing,
    whatsAppBroadcast
  };

  saveCopywriterResult(result);
  return result;
}

// Initial Creative Designer History
const INITIAL_CREATIVE_HISTORY: CreativeDesignerOutput[] = [
  {
    id: "cr-sample-1",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    input: {
      product: "Kopi Kenangan Mantan - Cold Brew Botol",
      brandName: "Kopi Kenangan",
      style: "Modern Minimalist Modern",
      targetAudience: "Anak Muda, Pekerja Kantor, Gen Z"
    },
    assets: [
      {
        id: "asset-1",
        type: "Instagram Feed",
        title: "IG Post Aesthetic Dark Coffee",
        aspectRatio: "1:1",
        dimensions: "1080 x 1080 px",
        prompt: "Aesthetic premium cold brew coffee bottle on dark obsidian table with glowing neon amber light background, floating coffee beans, commercial photography style, 8k",
        headline: "SEGARKAN HARIMU",
        subtext: "100% Bijil Kopi Arabika Pilihan",
        ctaText: "ORDER SEKARANG",
        badge: "DISKON 30%",
        bgColor: "#0f172a",
        accentColor: "#f59e0b",
        imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&auto=format&fit=crop&q=80",
        elements: []
      },
      {
        id: "asset-2",
        type: "Banner Ads",
        title: "Meta Ads Landscape Banner",
        aspectRatio: "16:9",
        dimensions: "1200 x 628 px",
        prompt: "Cold brew coffee bottle product banner ad with sleek minimalist typography background, warm wooden aesthetic, soft studio lighting",
        headline: "BOOST ENERGIMU HARI INI!",
        subtext: "Sensasi Kopi Robusta & Arabika Blend Pas di Lidah",
        ctaText: "BELI 2 GRATIS 1",
        badge: "PROMO KILAT",
        bgColor: "#1e1b4b",
        accentColor: "#6366f1",
        imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80",
        elements: []
      },
      {
        id: "asset-3",
        type: "Marketplace Cover",
        title: "Tokopedia / Shopee Cover Product",
        aspectRatio: "1:1",
        dimensions: "1080 x 1080 px",
        prompt: "Clean marketplace cover mockup for cold brew coffee bottle with gradient luxury background, clear badges and benefit points",
        headline: "KOPI COLD BREW BOTOL 500ML",
        subtext: "Tahan 14 Hari di Kulkas - Asli Tanpa Pengawet",
        ctaText: "GRATIS ONGKIR",
        badge: "BEST SELLER",
        bgColor: "#064e3b",
        accentColor: "#10b981",
        imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
        elements: []
      },
      {
        id: "asset-4",
        type: "Product Poster",
        title: "Poster Promosi Cafe / Store",
        aspectRatio: "9:16",
        dimensions: "1080 x 1920 px",
        prompt: "Luxury high-end poster for premium cold brew coffee, dark mood lighting, ice cubes splashing, cinematic lighting",
        headline: "NIKMATNYA TIADA TARA",
        subtext: "Diracik Oleh Barista Profesional",
        ctaText: "KUNJUNGI OUTLET TERDEKAT",
        badge: "NEW FLAVOR",
        bgColor: "#450a0a",
        accentColor: "#ef4444",
        imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&auto=format&fit=crop&q=80",
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
    console.error("Failed to read creative history:", e);
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
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80"
  ];

  const assetTypes: ('Banner Ads' | 'Instagram Feed' | 'Marketplace Cover' | 'Thumbnail' | 'Product Poster' | 'Logo Concept')[] = [
    'Instagram Feed',
    'Banner Ads',
    'Marketplace Cover',
    'Product Poster',
    'Thumbnail',
    'Logo Concept'
  ];

  const assets: CreativeAsset[] = assetTypes.map((type, idx) => {
    let aspectRatio: '1:1' | '9:16' | '16:9' | '4:5' = '1:1';
    let dimensions = '1080 x 1080 px';

    if (type === 'Banner Ads') {
      aspectRatio = '16:9';
      dimensions = '1200 x 628 px';
    } else if (type === 'Product Poster') {
      aspectRatio = '9:16';
      dimensions = '1080 x 1920 px';
    } else if (type === 'Thumbnail') {
      aspectRatio = '16:9';
      dimensions = '1280 x 720 px';
    }

    return {
      id: `asset-${Date.now()}-${idx}`,
      type,
      title: `${type} - ${brandName}`,
      aspectRatio,
      dimensions,
      prompt: `Commercial product advertising photography of ${product} by ${brandName}, ${style} style, targeted for ${targetAudience}, high-resolution studio lighting, vibrant colors, 8k render`,
      headline: `${brandName.toUpperCase()}`,
      subtext: `Solusi Terbaik ${product} Untukmu`,
      ctaText: "BELI SEKARANG",
      badge: idx % 2 === 0 ? "SPECIAL OFFER" : "NEW ARRIVAL",
      bgColor: idx % 2 === 0 ? "#0f172a" : "#1e1b4b",
      accentColor: idx % 3 === 0 ? "#6366f1" : idx % 3 === 1 ? "#ec4899" : "#10b981",
      imageUrl: sampleImages[idx % sampleImages.length],
      elements: []
    };
  });

  const result: CreativeDesignerOutput = {
    id: `cr-${Date.now()}`,
    createdAt: new Date().toISOString(),
    input,
    assets
  };

  saveCreativeResult(result);
  return result;
}
