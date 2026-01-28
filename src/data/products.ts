// Mock product data for Forest Essentials-style e-commerce

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  description: string;
  ingredients: string;
  howToUse: string;
  size: string;
  tags: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  concern?: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
  subcategories: string[];
}

export const categories: Category[] = [
  {
    id: "face",
    name: "Face",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop",
    subcategories: ["Cleansers", "Toners", "Serums", "Moisturizers", "Face Oils", "Masks", "Eye Care"],
  },
  {
    id: "body",
    name: "Body",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=400&fit=crop",
    subcategories: ["Body Oils", "Body Lotions", "Body Scrubs", "Body Washes", "Hand Care"],
  },
  {
    id: "hair",
    name: "Hair",
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=400&h=400&fit=crop",
    subcategories: ["Shampoos", "Conditioners", "Hair Oils", "Hair Masks", "Scalp Care", "Hair Serums"],
  },
  {
    id: "wellness",
    name: "Wellness",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=400&fit=crop",
    subcategories: ["Aromatherapy", "Diffuser Oils", "Massage Oils", "Bath Rituals"],
  },
  {
    id: "makeup",
    name: "Makeup",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop",
    subcategories: ["Lips", "Eyes", "Face", "Nails"],
  },
  {
    id: "gifting",
    name: "Gifting",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop",
    subcategories: ["Gift Sets", "Luxury Hampers", "Travel Kits"],
  },
];

// Import Elara product images
import antiDandruffSerumImg from "@/assets/products/anti-dandruff-serum.jpg";
import avocadoArganConditionerImg from "@/assets/products/avocado-argan-conditioner.jpg";
import antiDandruffShampooImg from "@/assets/products/anti-dandruff-shampoo.jpg";
import hairGrowthSerumImg from "@/assets/products/hair-growth-serum.jpg";
import antiHairfallShampooImg from "@/assets/products/anti-hairfall-shampoo.jpg";
import goldenGlowEyeSerumImg from "@/assets/products/golden-glow-eye-serum.jpg";
import glowcellNmnSerumImg from "@/assets/products/glowcell-nmn-serum.jpg";
import snailMucinSerumImg from "@/assets/products/snail-mucin-serum.jpg";
import niacinGlowSerumImg from "@/assets/products/niacin-glow-serum.jpg";
import redAloeveraSplashImg from "@/assets/products/red-aloevera-splash.jpg";

export const products: Product[] = [
  // ==================== ELARA COSMETICS PRODUCTS ====================
  
  // Hair Care - Scalp Care
  {
    id: "elara-anti-dandruff-serum",
    name: "Anti-Dandruff Serum",
    category: "hair",
    subcategory: "Scalp Care",
    price: 1299,
    originalPrice: 1499,
    image: antiDandruffSerumImg,
    images: [antiDandruffSerumImg],
    rating: 4.8,
    reviews: 156,
    description: "An advanced scalp treatment serum formulated to combat dandruff, soothe itchy scalp, and restore the skin's natural microbiome. Enriched with piroctone olamine and a powerful blend of botanical extracts.",
    ingredients: "Aqua, Piroctone Olamine, Extract Blend Of (Spinach, Kale, Cinnamon, Witch Hazel, Mallow, Thyme, Garden Nasturtium, Willow Bark, Ziziphus Joazeiro, Nasturtium Officinale, Rosmarinus Officinalis, Azadirachta Indica, Salvia Officinalis, Zingiber Officinale), Bacillus Ferment, Alpha-Glucan Oligosaccharide, Biosaccharide Gum, Biotin, Niacin, Zinc Peptide, Melaleuca Alternifolia Oil, Benzyl Alcohol, Benzoic Acid, Dehydroacetic Acid, Tocopherol",
    howToUse: "Apply on scalp. Massage gently. Use the product overnight for best results.",
    size: "100ml",
    tags: ["scalp care", "anti-dandruff", "treatment"],
    isNew: true,
    isBestseller: true,
    concern: ["Dandruff", "Itchy Scalp", "Scalp Health"],
  },
  
  // Hair Care - Conditioners
  {
    id: "elara-avocado-argan-conditioner",
    name: "Avocado & Argan Oil Conditioner",
    category: "hair",
    subcategory: "Conditioners",
    price: 899,
    originalPrice: 1099,
    image: avocadoArganConditionerImg,
    images: [avocadoArganConditionerImg],
    rating: 4.7,
    reviews: 203,
    description: "A nourishing conditioner enriched with avocado hydrosol and argan oil for soft, free de-tangled hair. Suitable for all hair types, this formula deeply conditions while adding shine and manageability.",
    ingredients: "DM Water, Avocado Hydrosol, BTMS 50, Coconut Oil, Argan Oil, CAPB, Cetyl Alcohol, Hydrolyzed Wheat Protein, Glycerine, D-Panthenol, Cetrimonium Chloride, Polyquat 7, Phenoxyethanol",
    howToUse: "Wash your hair well with shampoo, squeeze out excess water. Take a required amount of conditioner and apply it to the lengths of your hair. Leave it for 2-3 minutes. Rinse off the conditioner and you are done!",
    size: "100ml",
    tags: ["conditioner", "hydrating", "detangling"],
    isNew: true,
    concern: ["Dryness", "Frizz", "Hair Health"],
  },
  
  // Hair Care - Shampoos
  {
    id: "elara-anti-dandruff-shampoo",
    name: "Anti-Dandruff Shampoo",
    category: "hair",
    subcategory: "Shampoos",
    price: 799,
    originalPrice: 999,
    image: antiDandruffShampooImg,
    images: [antiDandruffShampooImg],
    rating: 4.6,
    reviews: 287,
    description: "A powerful yet gentle anti-dandruff shampoo that fights dandruff while leaving your scalp clean and smooth. Helps detangle hair and is 100% effective against flakes.",
    ingredients: "Aqua, Sodium C14-16 Olefin Sulfonate, Polyquaternium-81, Polyquaternium-88, Hydroxypropyl Guar Hydroxypropyl Trimonium Chloride, Coco Amido Propyl Betaine, Cocamido Propyl Hydroxysultaine, Sodium Cocoamphoacetate, Ethylene Glycol Distearate, Glycerin, Panthanol, Cocamido Propyl PG-Dimonium Chloride Phosphate, Hydrolized Wheat Protein, Piroctone Olamine, Extract Blend, Bacillus Ferment, Biotin, Melaleuca Alternifolia Oil, Isoamyl Laurate, Glyceryl Oleate, Menthol, Menthyl Lactate, Benzyl Alcohol, Benzoic Acid, Dehydroacetic Acid, Tocopherol",
    howToUse: "Apply to wet hair, lather & rinse. Use Elara conditioner every time you shampoo for shinier hair.",
    size: "100ml",
    tags: ["shampoo", "anti-dandruff", "cleansing"],
    concern: ["Dandruff", "Scalp Health", "Cleansing"],
  },
  
  // Hair Care - Scalp Care (Serums)
  {
    id: "elara-hair-growth-serum",
    name: "Advance Hair Growth Serum",
    category: "hair",
    subcategory: "Scalp Care",
    price: 1599,
    originalPrice: 1899,
    image: hairGrowthSerumImg,
    images: [hairGrowthSerumImg],
    rating: 4.9,
    reviews: 324,
    description: "An advanced hair growth serum powered by Anagain, Baicapil, and Redensyl - clinically proven ingredients that regenerate hair growth and increase hair density. Formulated with amla and rosemary hydrosols for optimal scalp nourishment.",
    ingredients: "DM Water, Amla Hydrosol, Rosemary Hydrosol, Glycerine, Anagain, Baicapil, Redensyl, Rosemary Extract, Hydrolysed Keratin Protein, Polysorbate 80, D-Panthenol, Phenoxyethanol, Sodium Gluconate",
    howToUse: "Use 1ml with the dropper AM or PM daily close to hair roots and massage gently for enhanced absorption. Continue application for 2-3 months for best results.",
    size: "30ml",
    tags: ["hair growth", "serum", "treatment"],
    isNew: true,
    isBestseller: true,
    concern: ["Hair Fall", "Hair Growth", "Hair Density"],
  },
  
  // Hair Care - Shampoos
  {
    id: "elara-root-revive-shampoo",
    name: "Root Revive Anti-Hairfall Shampoo",
    category: "hair",
    subcategory: "Shampoos",
    price: 849,
    originalPrice: 1049,
    image: antiHairfallShampooImg,
    images: [antiHairfallShampooImg],
    rating: 4.7,
    reviews: 198,
    description: "A paraben, sulphate, and chemical-free anti-hairfall shampoo enriched with Gotu Kola (Centella Asiatica) and Onion extracts. Effectively reduces hair fall while providing deep scalp nourishment. Suitable for all hair types.",
    ingredients: "DM Water, Alpha Olefin Sulfonate, Cocamidopropyl Betaine, Decyl Glucoside, Glycerine, Glycol Stearate, Polyquaternium-7, Glyceryl Cocoate, Centella Asiatica Extract, Allium Cepa (Onion) Bulb Extract, Phenoxyethanol, Xanthan Gum, Fragrance, Sodium Gluconate, Colour",
    howToUse: "Apply to wet hair, lather & rinse. Use Elara conditioner every time you shampoo for shinier hair.",
    size: "100ml",
    tags: ["shampoo", "anti-hairfall", "natural"],
    concern: ["Hair Fall", "Scalp Health", "Strengthening"],
  },
  
  // Face - Eye Care
  {
    id: "elara-golden-glow-eye-serum",
    name: "Golden Glow Under Eye Serum",
    category: "face",
    subcategory: "Eye Care",
    price: 1199,
    originalPrice: 1399,
    image: goldenGlowEyeSerumImg,
    images: [goldenGlowEyeSerumImg],
    rating: 4.8,
    reviews: 267,
    description: "A luxurious under eye serum formulated with powerful peptides and botanical extracts to target dark circles, crow's feet, puffiness, redness, and expression wrinkles. Features bakuchiol and sodium hyaluronate for intense hydration and anti-aging benefits.",
    ingredients: "Aqua, Aloe Barbadensis Leaf Extract, Pentylene Glycol, Palmitoyl Tripeptide-1, Palmitoyl Tetrapeptide-7, Biotin, Niacinamide, Acetyl Tetrapeptide-5, Jasminum Sambac Flower Extract, Crataegus Monogyna Flower Extract, Caffeine, Aesculus Hippocastanum Extract, Oryza Sativa Peptide, Trehalose, Bakuchiol, Sodium Hyaluronate, Bacillus Ferment, Glyceryl Glucoside",
    howToUse: "Apply a small amount around the eye area using ring finger. Pat gently until absorbed. Use morning and night for best results.",
    size: "15ml",
    tags: ["eye care", "anti-aging", "dark circles"],
    isNew: true,
    isBestseller: true,
    concern: ["Dark Circles", "Puffiness", "Fine Lines", "Anti-Aging"],
  },
  
  // Face - Serums (GlowCell NMN)
  {
    id: "elara-glowcell-nmn-serum",
    name: "GlowCell™ NMN Serum",
    category: "face",
    subcategory: "Serums",
    price: 2499,
    originalPrice: 2999,
    image: glowcellNmnSerumImg,
    images: [glowcellNmnSerumImg],
    rating: 4.9,
    reviews: 189,
    description: "A next-generation skincare formula powered by Nicotinamide Mononucleotide (NMN) and Copper Peptides. Supports skin renewal, improves elasticity, and enhances natural radiance. Designed to work at the cellular level for smoother, healthier-looking skin.",
    ingredients: "Water, Glycerin, Betaine, Nicotinamide Mononucleotide (NMN), Copper Tripeptide-1, Copper Glycerophosphate, Hydrolyzed Soy Protein, Allantoin, Sodium Hyaluronate, Melaleuca Alternifolia Tea Tree Leaf Oil, Pentylene Glycol, Lecithin, Hydroxyethyl Cellulose, Phenoxyethanol",
    howToUse: "Apply 2-3 drops to clean face and neck. Gently massage until absorbed. Use once or twice daily. Follow with moisturizer. Use sunscreen during daytime.",
    size: "30ml",
    tags: ["anti-aging", "cellular renewal", "firming"],
    isNew: true,
    isBestseller: true,
    concern: ["Anti-Aging", "Firming", "Radiance", "Elasticity"],
  },
  
  // Face - Serums (Snail Mucin)
  {
    id: "elara-snail-mucin-serum",
    name: "97% Snail Mucin Advanced Serum",
    category: "face",
    subcategory: "Serums",
    price: 1899,
    originalPrice: 2299,
    image: snailMucinSerumImg,
    images: [snailMucinSerumImg],
    rating: 4.8,
    reviews: 276,
    description: "Experience hydration bliss with our advanced serum that quenches skin, leaving it silky-smooth, plump, and irresistibly glowing. Infused with 97% Snail Mucin Filtrate and Bifida Ferment Lysate for instant results.",
    ingredients: "Snail Secretion Filtrate, Bifida Ferment Lysate, Sodium Hyaluronate, Glycerin, Betaine, Stearyl Alcohol, Isostearyl Neopentanoate, Arginine, Sodium PCA, Panthenol, Allantoin, Hydroxyethylcellulose, Xanthan Gum, 1,2-Hexanediol, Carbomer, BCC (Benzyl Alcohol), Salicylic Acid, Glycine, Sorbic Acid",
    howToUse: "Apply 2-3 drops of serum to clean, dry skin. Pat in gently for better absorption. Use daily AM & PM followed by moisturizer.",
    size: "30ml",
    tags: ["hydrating", "snail mucin", "plumping"],
    isNew: true,
    concern: ["Hydration", "Plumping", "Skin Barrier", "Texture"],
  },
  
  // Face - Serums (Niacin Glow)
  {
    id: "elara-niacin-glow-serum",
    name: "Niacin Glow Niacinamide Face Serum",
    category: "face",
    subcategory: "Serums",
    price: 1499,
    originalPrice: 1799,
    image: niacinGlowSerumImg,
    images: [niacinGlowSerumImg],
    rating: 4.8,
    reviews: 312,
    description: "A powerful 15% Niacinamide serum with Zinc and Copper Peptide (GHK-Cu). Effectively reduces acne, fades scarring, and promotes skin regeneration. Suitable for all skin types and ages.",
    ingredients: "Aqua, Niacinamide PC, Propanediol, Pisum Sativum Seed Extract, GHK-Cu, Dimethyl Isosorbide, Zinc Pyrrolidone Carboxylic Acid, Acetyl Glucosamine, Phenoxyethanol, Sodium Hyaluronate, Trehalose, Sodium Gluconate",
    howToUse: "Use your palms to spread the serum all over your face. Suitable for all skin types and ages. Infants can also use.",
    size: "30ml",
    tags: ["niacinamide", "acne care", "brightening"],
    isNew: true,
    isBestseller: true,
    concern: ["Acne", "Scarring", "Pores", "Skin Regeneration"],
  },
  
  // Body/Hair - Multi-Purpose (Red Aloevera Splash)
  {
    id: "elara-red-aloevera-splash",
    name: "Red Aloevera Splash",
    category: "body",
    subcategory: "Body Washes",
    price: 699,
    originalPrice: 899,
    image: redAloeveraSplashImg,
    images: [redAloeveraSplashImg],
    rating: 4.7,
    reviews: 178,
    description: "A unique multi-purpose splash infused with fermented Red Aloe Vera and Bifida Ferment Lysate. Perfect for both hair and skin, this soothing formula hydrates, nourishes, and refreshes. Suitable for all skin types and ages.",
    ingredients: "Fermented Aloe Sanguinalis Juice, Bifida Ferment Lysate, Glycerin, Chondrus Crispus Extract, Alkanna Tinctoria Extract, Gluconolactone, Sodium Benzoate, Calcium Gluconate",
    howToUse: "Apply anytime on hair and skin. Suitable for all skin types and ages. Infants can also use.",
    size: "100gm",
    tags: ["aloe vera", "multi-purpose", "hydrating"],
    isNew: true,
    concern: ["Hydration", "Soothing", "Skin Health", "Hair Health"],
  },
];

export const concerns = [
  "Anti-Aging",
  "Brightening",
  "Hydration",
  "Acne",
  "Dark Spots",
  "Hair Fall",
  "Dryness",
  "Oily Skin",
  "Sensitive Skin",
  "Radiance",
  "Dandruff",
  "Hair Growth",
  "Scalp Health",
  "Puffiness",
  "Fine Lines",
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter((p) => p.category === categoryId);
};

export const getBestsellers = (): Product[] => {
  return products.filter((p) => p.isBestseller);
};

export const getNewArrivals = (): Product[] => {
  return products.filter((p) => p.isNew);
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(price);
};
