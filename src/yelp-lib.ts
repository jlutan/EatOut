type TransactionValue = "pickup" | "delivery" | "restaurant_reservation";

export interface Business {
  name: string;
  phone: string;
  display_phone: string;
  distance: number;
  price: string;
  rating: number;
  review_count: number;
  url: string;
  transactions: Array<TransactionValue>;
  location: {
    address1: string;
    address2?: string;
    address3?: string;
    city: string;
    country: string;
    display_address: Array<string>;
    state: string;
    zip_code: string;
  };
  categories: Array<{
    alias: string;
    title: string;
  }>;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  id: string;
  alias: string;
  image_url: string;
  is_closed: boolean;
  region?: any;
}

export interface ResultsType {
  [key: string]: any;
  total: number;
  businesses: Array<Business>;
}

interface Categories {
  [key: string]: string;
}

const categories: Categories = {
  All: "all",
  "Acai Bowls": "acaibowls",
  Bagels: "bagels",
  Bakeries: "bakeries",
  "Beer, Wine & Sprits": "beer_and_wine",
  Bento: "bento",
  Breweries: "breweries",
  Brewpubs: "brewpubs",
  "Bubble Tea": "bubbletea",
  "Chimney Cakes": "chimneycakes",
  Churros: "churros",
  "Coffee & Tea": "coffee",
  "Coffee Roasteries": "coffeeroasteries",
  Cupcakes: "cupcakes",
  "Custom Cakes": "customcakes",
  Delicatessen: "delicatessen",
  Desserts: "desserts",
  Donairs: "donairs",
  Donuts: "donuts",
  Empanadas: "empanadas",
  Fishmonger: "fishmonger",
  "Food Delivery Services": "fooddeliveryservices",
  "Food Trucks": "foodtrucks",
  Friterie: "friterie",
  Gelato: "gelato",
  "Hawker Centre": "hawkercentre",
  "Ice Cream & Frozen Yogurt": "icecream",
  "Imported Food": "importedfood",
  "Internet Cafes": "internetcafe",
  "Japanese Sweets": "jpsweets",
  Taiyaki: "taiyaki",
  "Juice Bars & Smoothies": "juicebars",
  Kiosk: "kiosk",
  Kombucha: "kombucha",
  "Milkshake Bars": "milkshakebars",
  "Mulled Wine": "gluhwein",
  "Nasi Lemak": "nasilemak",
  "Organic Stores": "organic_stores",
  Panzerotti: "panzerotti",
  "Parent Cafes": "eltern_cafes",
  "Patisserie/Cake Shop": "cakeshop",
  Piadina: "piadina",
  Poke: "poke",
  Pretzels: "pretzels",
  Salumerie: "salumerie",
  "Shaved Ice": "shavedice",
  "Shaved Snow": "shavedsnow",
  Smokehouse: "smokehouse",
  "Specialty Food": "gourmet",
  "Street Vendors": "streetvendors",
  "Sugar Shacks": "sugarshacks",
  "Tea Rooms": "tea",
  Torshi: "torshi",
  Tortillas: "tortillas",
  Zapiekanka: "zapiekanka",
};

const getCategories = () => {
  return Object.keys(categories);
};

const toCategoryValue = (category: string): string | null => {
  if (category in categories) return categories[category];
  else return null;
};

const getSorts = () => {
  return [
    {
      label: "Best Match",
      value: "best_match",
    },
    {
      label: "Rating",
      value: "rating",
    },
    {
      label: "Review Count",
      value: "review_count",
    },
    {
      label: "Distance",
      value: "distance",
    },
  ];
};

export { getSorts, getCategories, toCategoryValue };
