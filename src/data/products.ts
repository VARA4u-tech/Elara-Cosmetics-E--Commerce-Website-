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
    subcategories: ["Shampoos", "Conditioners", "Hair Oils", "Hair Masks", "Scalp Care"],
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

export const products: Product[] = [
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
