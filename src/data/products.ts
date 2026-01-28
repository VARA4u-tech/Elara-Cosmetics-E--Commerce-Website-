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

  // ==================== EXISTING PRODUCTS ====================
  
  // Face Products
  {
    id: "1",
    name: "Soundarya Radiance Cream",
    category: "face",
    subcategory: "Moisturizers",
    price: 4975,
    originalPrice: 5500,
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop",
    ],
    rating: 4.8,
    reviews: 234,
    description: "A luxurious anti-aging cream enriched with 24K Gold and precious Ayurvedic herbs. This potent formulation helps reduce fine lines and wrinkles while imparting a radiant, youthful glow to your skin.",
    ingredients: "24K Gold Bhasma, Kumkumadi Tailam, Saffron, Sandalwood, Manjistha, Almond Oil, Vitamin E",
    howToUse: "Apply a small amount on cleansed face and neck. Gently massage in upward circular motions until fully absorbed. Use twice daily for best results.",
    size: "50g",
    tags: ["anti-aging", "radiance", "luxury"],
    isBestseller: true,
    concern: ["Anti-Aging", "Radiance", "Hydration"],
  },
  {
    id: "2",
    name: "Rasa Kasturi Ubtan",
    category: "face",
    subcategory: "Cleansers",
    price: 1650,
    image: "https://images.unsplash.com/photo-1608979048467-6194bbc7a0ce?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1608979048467-6194bbc7a0ce?w=600&h=600&fit=crop",
    ],
    rating: 4.6,
    reviews: 189,
    description: "A traditional Ayurvedic facial cleanser made with pure Kasturi turmeric and sandalwood. This gentle ubtan removes impurities while brightening and evening out skin tone.",
    ingredients: "Kasturi Turmeric, Sandalwood Powder, Rose Petals, Gram Flour, Neem, Tulsi",
    howToUse: "Mix with rose water or milk to form a paste. Apply on damp face and gently massage. Rinse with lukewarm water.",
    size: "100g",
    tags: ["brightening", "natural", "traditional"],
    isNew: true,
    concern: ["Brightening", "Cleansing", "Even Tone"],
  },
  {
    id: "3",
    name: "Tejasvi Kumkumadi Face Serum",
    category: "face",
    subcategory: "Serums",
    price: 3250,
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1617897903246-719242758050?w=600&h=600&fit=crop",
    ],
    rating: 4.9,
    reviews: 312,
    description: "An intensive treatment serum featuring the legendary Kumkumadi oil blend. This precious formulation brightens skin, reduces dark spots, and imparts a natural luminosity.",
    ingredients: "Kumkumadi Tailam, Saffron, Lotus, Manjistha, Licorice, Sesame Oil",
    howToUse: "Apply 3-4 drops on cleansed face before moisturizer. Gently pat into skin. Use nightly for best results.",
    size: "30ml",
    tags: ["brightening", "serum", "treatment"],
    isBestseller: true,
    concern: ["Dark Spots", "Brightening", "Radiance"],
  },
  {
    id: "4",
    name: "Madhura Jasmine Body Silk",
    category: "body",
    subcategory: "Body Lotions",
    price: 2450,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop",
    ],
    rating: 4.7,
    reviews: 156,
    description: "A silky, fast-absorbing body lotion infused with pure jasmine and precious botanicals. Deeply hydrates while leaving skin soft, supple, and delicately fragranced.",
    ingredients: "Jasmine Extract, Shea Butter, Almond Oil, Vitamin E, Kokum Butter, Aloe Vera",
    howToUse: "Apply generously all over body after bath. Massage gently until absorbed.",
    size: "200ml",
    tags: ["hydrating", "jasmine", "luxury"],
    concern: ["Dryness", "Hydration", "Softness"],
  },
  {
    id: "5",
    name: "Kesharaja Hair Vitalizer",
    category: "hair",
    subcategory: "Hair Oils",
    price: 1850,
    originalPrice: 2100,
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600&h=600&fit=crop",
    ],
    rating: 4.8,
    reviews: 278,
    description: "A potent Ayurvedic hair oil crafted with rare herbs to strengthen hair roots, reduce hair fall, and promote healthy, lustrous growth.",
    ingredients: "Bhringraj, Amla, Brahmi, Coconut Oil, Sesame Oil, Hibiscus, Neem",
    howToUse: "Warm the oil slightly. Massage into scalp and hair. Leave for at least 2 hours or overnight. Wash with mild shampoo.",
    size: "130ml",
    tags: ["hair growth", "strengthening", "ayurvedic"],
    isBestseller: true,
    concern: ["Hair Fall", "Scalp Health", "Hair Growth"],
  },
  {
    id: "6",
    name: "Nayantara Eye Contour Cream",
    category: "face",
    subcategory: "Eye Care",
    price: 2875,
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=600&h=600&fit=crop",
    ],
    rating: 4.5,
    reviews: 98,
    description: "A delicate eye cream enriched with precious botanicals to diminish dark circles, reduce puffiness, and smooth fine lines around the eyes.",
    ingredients: "Almond Oil, Cucumber Extract, Rose Extract, Vitamin E, Licorice, Saffron",
    howToUse: "Dab a small amount around the eye area using ring finger. Pat gently until absorbed. Use morning and night.",
    size: "15g",
    tags: ["eye care", "anti-aging", "brightening"],
    isNew: true,
    concern: ["Dark Circles", "Puffiness", "Fine Lines"],
  },
  {
    id: "7",
    name: "Saundarya Rose Petal Toner",
    category: "face",
    subcategory: "Toners",
    price: 1250,
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=600&h=600&fit=crop",
    ],
    rating: 4.6,
    reviews: 167,
    description: "A refreshing alcohol-free toner made with steam-distilled rose water. Hydrates, tones, and prepares skin for optimal absorption of serums and moisturizers.",
    ingredients: "Rose Water, Aloe Vera, Witch Hazel, Glycerin, Vitamin B5",
    howToUse: "After cleansing, spray or apply with cotton pad all over face and neck. Follow with serum and moisturizer.",
    size: "130ml",
    tags: ["toner", "rose", "hydrating"],
    concern: ["Hydration", "Pore Minimizing", "Refreshing"],
  },
  {
    id: "8",
    name: "Chandanadi Sandalwood Body Oil",
    category: "body",
    subcategory: "Body Oils",
    price: 3150,
    image: "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=600&h=600&fit=crop",
    ],
    rating: 4.9,
    reviews: 145,
    description: "A luxurious body oil infused with pure Mysore sandalwood. This ancient formulation deeply nourishes skin while calming the mind with its divine fragrance.",
    ingredients: "Mysore Sandalwood Oil, Sesame Oil, Almond Oil, Vitamin E, Turmeric",
    howToUse: "Warm a generous amount between palms. Massage all over body in long, flowing strokes. Best used after bath on damp skin.",
    size: "200ml",
    tags: ["sandalwood", "luxury", "nourishing"],
    isBestseller: true,
    concern: ["Nourishment", "Relaxation", "Hydration"],
  },
  {
    id: "9",
    name: "Rakta Chandan Face Masque",
    category: "face",
    subcategory: "Masks",
    price: 1975,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop",
    ],
    rating: 4.7,
    reviews: 203,
    description: "A cooling face mask with red sandalwood and natural clays. Deeply purifies pores, reduces excess oil, and leaves skin refreshed and radiant.",
    ingredients: "Red Sandalwood, Multani Mitti, Rose Water, Neem, Tulsi, Honey",
    howToUse: "Apply evenly on cleansed face avoiding eye area. Leave for 15-20 minutes until dry. Rinse with cool water.",
    size: "60g",
    tags: ["mask", "purifying", "sandalwood"],
    concern: ["Oily Skin", "Acne", "Pore Cleansing"],
  },
  {
    id: "10",
    name: "Bhringraj Hair Cleanser",
    category: "hair",
    subcategory: "Shampoos",
    price: 1450,
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&h=600&fit=crop",
    ],
    rating: 4.5,
    reviews: 189,
    description: "A gentle, sulfate-free shampoo enriched with Bhringraj and Shikakai. Cleanses without stripping natural oils while strengthening hair from root to tip.",
    ingredients: "Bhringraj, Shikakai, Reetha, Amla, Hibiscus, Neem",
    howToUse: "Wet hair thoroughly. Apply shampoo and massage into scalp. Rinse and repeat if necessary. Follow with conditioner.",
    size: "200ml",
    tags: ["shampoo", "sulfate-free", "ayurvedic"],
    concern: ["Hair Fall", "Scalp Health", "Gentle Cleansing"],
  },
  {
    id: "11",
    name: "Parijat Body Wash",
    category: "body",
    subcategory: "Body Washes",
    price: 1350,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop",
    ],
    rating: 4.6,
    reviews: 134,
    description: "A fragrant body wash infused with night jasmine (Parijat) and nourishing botanicals. Creates a rich lather while gently cleansing and moisturizing skin.",
    ingredients: "Parijat Extract, Coconut Oil, Aloe Vera, Honey, Vitamin E",
    howToUse: "Apply on wet skin using loofah or hands. Massage gently to create lather. Rinse thoroughly.",
    size: "250ml",
    tags: ["body wash", "floral", "moisturizing"],
    isNew: true,
    concern: ["Cleansing", "Moisturizing", "Fragrance"],
  },
  {
    id: "12",
    name: "Sugandha Diffuser Oil Set",
    category: "wellness",
    subcategory: "Aromatherapy",
    price: 2650,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop",
    ],
    rating: 4.8,
    reviews: 87,
    description: "A collection of three pure essential oil blends for aromatherapy. Includes calming, energizing, and meditation blends crafted from the finest botanicals.",
    ingredients: "Lavender, Eucalyptus, Lemongrass, Sandalwood, Frankincense, Rose",
    howToUse: "Add 4-6 drops to diffuser with water. Can also be added to bath water or massage oils.",
    size: "3 x 15ml",
    tags: ["aromatherapy", "essential oils", "wellness"],
    concern: ["Relaxation", "Stress Relief", "Mood Enhancement"],
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
