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
  All: "restaurants",
  Afghan: "afghani",
  African: "african",
  "American (New)": "newamerican",
  "American (Traditional)": "tradamerican",
  Andalusian: "andalusian",
  Arabian: "arabian",
  Argentine: "argentine",
  Armenian: "armenian",
  "Asian Fusion": "asianfusion",
  Asturian: "asturian",
  Australian: "australian",
  Austrian: "austrian",
  Baguettes: "baguettes",
  Bangladeshi: "bangladeshi",
  Barbeque: "bbq",
  Basque: "basque",
  Bavarian: "bavarian",
  "Beer Garden": "beergarden",
  "Beer Hall": "beerhall",
  Beisl: "beisl",
  Belgian: "belgian",
  Bistros: "bistros",
  "Black Sea": "blacksea",
  Brasseries: "brasseries",
  Brazilian: "brazilian",
  "Breakfast & Brunch": "breakfast_brunch",
  British: "british",
  Buffets: "buffets",
  Bulgarian: "bulgarian",
  Burgers: "burgers",
  Burmese: "burmese",
  Cafes: "cafes",
  Cafeteria: "cafeteria",
  "Cajun/Creole": "cajun",
  Cambodian: "cambodian",
  "Canadian (New)": "newcanadian",
  Canteen: "canteen",
  Caribbean: "caribbean",
  Catalan: "catalan",
  Cheesesteaks: "cheesesteaks",
  "Chicken Shop": "chickenshop",
  "Chicken Wings": "chicken_wings",
  Chilean: "chilean",
  Chinese: "chinese",
  "Comfort Food": "comfortfood",
  Corsican: "corsican",
  Creperies: "creperies",
  Cuban: "cuban",
  "Curry Sausage": "currysausage",
  Cypriot: "cypriot",
  Czech: "czech",
  "Czech/Slovakian": "czechslovakian",
  Danish: "danish",
  Delis: "delis",
  Diners: "diners",
  "Dinner Theater": "dinnertheater",
  Dumplings: "dumplings",
  "Eastern European": "eastern_european",
  Eritrean: "eritrean",
  Ethiopian: "ethiopian",
  "Fast Food": "hotdogs",
  Filipino: "filipino",
  Fischbroetchen: "fischbroetchen",
  "Fish & Chips": "fishnchips",
  Flatbread: "flatbread",
  Fondue: "fondue",
  "Food Court": "food_court",
  "Food Stands": "foodstands",
  Freiduria: "freiduria",
  French: "french",
  "French Southwest": "sud_ouest",
  Galician: "galician",
  "Game Meat": "gamemeat",
  Gastropubs: "gastropubs",
  Georgian: "georgian",
  German: "german",
  Giblets: "giblets",
  "Gluten-Free": "gluten_free",
  Greek: "greek",
  Guamanian: "guamanian",
  Halal: "halal",
  Hawaiian: "hawaiian",
  Heuriger: "heuriger",
  "Himalayan/Nepalese": "himalayan",
  Honduran: "honduran",
  "Hong Kong Style Cafe": "hkcafe",
  "Hot Pot": "hotpot",
  Hungarian: "hungarian",
  Iberian: "iberian",
  Indian: "indpak",
  Indonesian: "indonesian",
  International: "international",
  Irish: "irish",
  "Island Pub": "island_pub",
  Israeli: "israeli",
  Italian: "italian",
  Japanese: "japanese",
  Jewish: "jewish",
  Kebab: "kebab",
  Kopitiam: "kopitiam",
  Korean: "korean",
  Kosher: "kosher",
  Kurdish: "kurdish",
  Laos: "laos",
  Laotian: "laotian",
  "Latin American": "latin",
  "Raw Food": "raw_food",
  Lyonnais: "lyonnais",
  Malaysian: "malaysian",
  Meatballs: "meatballs",
  Mediterranean: "mediterranean",
  Mexican: "mexican",
  "Middle Eastern": "mideastern",
  "Milk Bars": "milkbars",
  "Modern Australian": "modern_australian",
  "Modern European": "modern_european",
  Mongolian: "mongolian",
  Moroccan: "moroccan",
  "New Mexican Cuisine": "newmexican",
  "New Zealand": "newzealand",
  Nicaraguan: "nicaraguan",
  "Night Food": "nightfood",
  Nikkei: "nikkei",
  Noodles: "noodles",
  Norcinerie: "norcinerie",
  "Open Sandwiches": "opensandwiches",
  Oriental: "oriental",
  "PF/Comercial": "pfcomercial",
  Pakistani: "pakistani",
  "Pan Asian": "panasian",
  "Parent Cafes": "eltern_cafes",
  Parma: "parma",
  "Persian/Iranian": "persian",
  Peruvian: "peruvian",
  Pita: "pita",
  Pizza: "pizza",
  Polish: "polish",
  Polynesian: "polynesian",
  "Pop-Up Restaurants": "popuprestaurants",
  Portuguese: "portuguese",
  Potatoes: "potatoes",
  Poutineries: "poutineries",
  "Pub Food": "pubfood",
  Rice: "riceshop",
  Romanian: "romanian",
  "Rotisserie Chicken": "rotisserie_chicken",
  Russian: "russian",
  Salad: "salad",
  Sandwiches: "sandwiches",
  Scandinavian: "scandinavian",
  Schnitzel: "schnitzel",
  Scottish: "scottish",
  Seafood: "seafood",
  "Serbo Croatian": "serbocroatian",
  "Signature Cuisine": "signature_cuisine",
  Singaporean: "singaporean",
  Slovakian: "slovakian",
  Somali: "somali",
  "Soul Food": "soulfood",
  Soup: "soup",
  Southern: "southern",
  Spanish: "spanish",
  "Sri Lankan": "srilankan",
  Steakhouses: "steak",
  "Supper Clubs": "supperclubs",
  "Sushi Bars": "sushi",
  Swabian: "swabian",
  Swedish: "swedish",
  "Swiss Food": "swissfood",
  Syrian: "syrian",
  Tabernas: "tabernas",
  Taiwanese: "taiwanese",
  "Tapas Bars": "tapas",
  "Tapas/Small Plates": "tapasmallplates",
  "Tavola Calda": "tavolacalda",
  "Tex-Mex": "tex-mex",
  Thai: "thai",
  "Traditional Norwegian": "norwegian",
  "Traditional Swedish": "traditional_swedish",
  Trattorie: "trattorie",
  Turkish: "turkish",
  Ukrainian: "ukrainian",
  Uzbek: "uzbek",
  Vegan: "vegan",
  Vegetarian: "vegetarian",
  Venison: "venison",
  Vietnamese: "vietnamese",
  Waffles: "waffles",
  Wok: "wok",
  Wraps: "wraps",
  Yugoslav: "yugoslav",
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
