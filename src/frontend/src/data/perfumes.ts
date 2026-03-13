export interface LocalPerfume {
  id: number;
  name: string;
  price: string;
  description: string;
  shortDescription: string;
  category: string;
  topNotes: string;
  heartNotes: string;
  baseNotes: string;
  longevity: number;
  projection: number;
  isBestSeller: boolean;
  image: string;
}

export const perfumeImages: Record<number, string> = {
  1: "/assets/generated/perfume-1.dim_600x800.jpg",
  2: "/assets/generated/perfume-2.dim_600x800.jpg",
  3: "/assets/generated/perfume-3.dim_600x800.jpg",
  4: "/assets/generated/perfume-4.dim_600x800.jpg",
  5: "/assets/generated/perfume-5.dim_600x800.jpg",
  6: "/assets/generated/perfume-6.dim_600x800.jpg",
  7: "/assets/generated/perfume-7.dim_600x800.jpg",
  8: "/assets/generated/perfume-8.dim_600x800.jpg",
};

export function getPerfumeImage(id: number): string {
  const imgId = ((id - 1) % 8) + 1;
  return perfumeImages[imgId];
}

export const localPerfumes: LocalPerfume[] = [
  {
    id: 1,
    name: "Chanel No. 5 EDP",
    price: "₹8,500",
    description:
      "The world's most iconic fragrance. A timeless floral aldehyde that has defined femininity since 1921. Rich, powdery, and utterly sophisticated.",
    shortDescription: "The world's most iconic floral aldehyde fragrance.",
    category: "Designer",
    topNotes: "Neroli, Ylang-ylang, Aldehydes",
    heartNotes: "Jasmine, Rose de Mai, Iris",
    baseNotes: "Vetiver, Sandalwood, Musk, Amberwood",
    longevity: 8,
    projection: 7,
    isBestSeller: true,
    image: "/assets/generated/perfume-1.dim_600x800.jpg",
  },
  {
    id: 2,
    name: "Tom Ford Oud Wood",
    price: "₹14,200",
    description:
      "A rare and precious woody oriental. Exotic oud wood mingles with sandalwood, rose, and cardamom for a deeply sensual, smoky masterpiece.",
    shortDescription: "Rare oud wood with sandalwood and exotic spices.",
    category: "Niche",
    topNotes: "Oud, Rosewood, Cardamom",
    heartNotes: "Sandalwood, Vetiver, Tonka Bean",
    baseNotes: "Amber, Musk, Vanilla",
    longevity: 9,
    projection: 8,
    isBestSeller: true,
    image: "/assets/generated/perfume-2.dim_600x800.jpg",
  },
  {
    id: 3,
    name: "Dior Sauvage EDP",
    price: "₹9,800",
    description:
      "Wild and noble. An invigorating masculine fragrance inspired by wide-open spaces. Fresh pepper and bergamot evolve into a sensual, magnetic trail.",
    shortDescription: "Wild and noble with fresh pepper and bergamot.",
    category: "Designer",
    topNotes: "Bergamot, Black Pepper",
    heartNotes: "Sichuan Pepper, Lavender, Geranium",
    baseNotes: "Ambroxan, Cedar, Labdanum",
    longevity: 9,
    projection: 9,
    isBestSeller: true,
    image: "/assets/generated/perfume-3.dim_600x800.jpg",
  },
  {
    id: 4,
    name: "Jo Malone Peony & Blush Suede",
    price: "₹12,000",
    description:
      "Sheer, feminine, and softly sensual. The opulence of peonies infused with the whisper of soft suede. A floral so fresh it's alive.",
    shortDescription: "Opulent peonies with the whisper of soft suede.",
    category: "Niche",
    topNotes: "Red Apple, Peony",
    heartNotes: "Jasmine, Rose",
    baseNotes: "Suede, Plum, Wood",
    longevity: 7,
    projection: 6,
    isBestSeller: false,
    image: "/assets/generated/perfume-4.dim_600x800.jpg",
  },
  {
    id: 5,
    name: "Arabian Oud Malaki",
    price: "₹7,500",
    description:
      "A majestic oriental tapestry of rich oud, precious woods and resins. Deep, complex, and hauntingly beautiful — the essence of Arabian royalty.",
    shortDescription: "Majestic oriental oud, precious woods and resins.",
    category: "Niche",
    topNotes: "Bergamot, Cardamom, Cinnamon",
    heartNotes: "Oud, Rose, Jasmine",
    baseNotes: "Amber, Sandalwood, Musk, Incense",
    longevity: 10,
    projection: 9,
    isBestSeller: true,
    image: "/assets/generated/perfume-5.dim_600x800.jpg",
  },
  {
    id: 6,
    name: "Creed Aventus",
    price: "₹19,500",
    description:
      "A powerhouse of masculine strength and determination. Blackcurrant and Italian bergamot top notes fade into a heart of birch and patchouli.",
    shortDescription: "Powerhouse blackcurrant and birch masculine legend.",
    category: "Niche",
    topNotes: "Blackcurrant, Bergamot, Apple",
    heartNotes: "Birch, Patchouli, Jasmine, Rose",
    baseNotes: "Musk, Oak Moss, Ambergris, Vanilla",
    longevity: 9,
    projection: 9,
    isBestSeller: true,
    image: "/assets/generated/perfume-6.dim_600x800.jpg",
  },
  {
    id: 7,
    name: "Chanel Chance Eau Tendre",
    price: "₹11,200",
    description:
      "A light and delicate floral-fruity fragrance. Grapefruit and quince blend with jasmine and white musk for a tender, spontaneous femininity.",
    shortDescription: "Light floral-fruity with grapefruit and jasmine.",
    category: "Designer",
    topNotes: "Grapefruit, Quince",
    heartNotes: "Jasmine, Hyacinth, White Musk",
    baseNotes: "Iris, Ambrette, Cedar",
    longevity: 7,
    projection: 6,
    isBestSeller: false,
    image: "/assets/generated/perfume-7.dim_600x800.jpg",
  },
  {
    id: 8,
    name: "Byredo Gypsy Water",
    price: "₹16,800",
    description:
      "A bohemian fantasy of lemon, bergamot, pepper and incense. Fresh pine needles and amber create a dreamy, ethereal, utterly addictive composition.",
    shortDescription: "Bohemian fantasy with bergamot, pine and incense.",
    category: "Niche",
    topNotes: "Bergamot, Lemon, Pepper",
    heartNotes: "Incense, Pine Needles, Orris",
    baseNotes: "Amber, Sandalwood, Vanilla",
    longevity: 8,
    projection: 7,
    isBestSeller: false,
    image: "/assets/generated/perfume-8.dim_600x800.jpg",
  },
  {
    id: 9,
    name: "Giorgio Armani Acqua di Gio",
    price: "₹6,800",
    description:
      "A hymn to the sea. Fresh aquatic notes mingling with marine accords and woody ambery notes create an irresistible Mediterranean spirit.",
    shortDescription: "Fresh aquatic sea breeze with woody amber base.",
    category: "Designer",
    topNotes: "Calabrian Bergamot, Green Tangerine",
    heartNotes: "Marine Accord, Sage, Rose",
    baseNotes: "Cedarwood, Labdanum, Musk",
    longevity: 7,
    projection: 7,
    isBestSeller: false,
    image: "/assets/generated/perfume-1.dim_600x800.jpg",
  },
  {
    id: 10,
    name: "Yves Saint Laurent Black Opium",
    price: "₹8,200",
    description:
      "An intense and captivating addiction. Electrifying coffee awakens your senses while white flowers, vanilla and warm woods lead you astray.",
    shortDescription: "Electrifying coffee and white floral addiction.",
    category: "Designer",
    topNotes: "Pink Pepper, Coffee, Pear",
    heartNotes: "White Flowers, Jasmine",
    baseNotes: "Vanilla, Patchouli, Cedarwood, Cashmere Wood",
    longevity: 8,
    projection: 7,
    isBestSeller: true,
    image: "/assets/generated/perfume-2.dim_600x800.jpg",
  },
  {
    id: 11,
    name: "Maison Margiela Replica Jazz Club",
    price: "₹15,500",
    description:
      "The warm and inviting scent of a New York jazz club. Rum, musk and tobacco leaf create an enveloping, sophisticated masculine composition.",
    shortDescription: "Warm rum, tobacco and musk jazz club atmosphere.",
    category: "Niche",
    topNotes: "Rum, Musk, Vetiver",
    heartNotes: "Clary Sage, Jasmine, Tobacco",
    baseNotes: "Vanilla, Tonka Bean, Patchouli",
    longevity: 8,
    projection: 6,
    isBestSeller: false,
    image: "/assets/generated/perfume-3.dim_600x800.jpg",
  },
  {
    id: 12,
    name: "Attar Collection Khaltat Night",
    price: "₹4,500",
    description:
      "A luxurious oriental tester. Rich oud and amber mingle with rose petals and saffron for a deeply opulent night fragrance. Full bottle quality.",
    shortDescription: "Luxurious oriental oud tester with saffron and rose.",
    category: "Tester",
    topNotes: "Saffron, Rose, Bergamot",
    heartNotes: "Oud, Patchouli, Iris",
    baseNotes: "Amber, Musk, Sandalwood",
    longevity: 9,
    projection: 8,
    isBestSeller: false,
    image: "/assets/generated/perfume-4.dim_600x800.jpg",
  },
];
