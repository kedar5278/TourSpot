export type Package = {
  slug: string;
  name: string;
  location: string;
  image: string;
  gallery: string[];
  price: string;
  originalPrice?: string;
  discount?: string;
  duration: string;
  rating: number;
  reviews: number;
  category: string;
  highlights: string[];
  groupSize: string;
  featured?: boolean;
  description: string;
  bestTime: string;
  itinerary: { day: string; title: string; text: string }[];
  inclusions: string[];
  exclusions: string[];
};

export const allPackages: Package[] = [
  {
    slug: "nainital",
    name: "Nainital",
    location: "Uttarakhand, India",
    image:
      "/packages_images/Nainital2.jpeg",
    gallery: [
      "/packages_images/Nainital3.jpeg",
      "/packages_images/Nainital4",
      "/packages_images/Nainital5",
    ],
    price: "₹5,499",
    originalPrice: "₹7,499",
    discount: "27% OFF",
    duration: "3 Days / 2 Nights",
    rating: 4.7,
    reviews: 312,
    category: "Mountain",
    highlights: ["Lake Boating", "Mall Road", "Snow View"],
    groupSize: "2–12",
    featured: true,
    bestTime: "October – June",
    description:
      "Nestled in the Kumaon foothills of the Himalayas, Nainital is a charming hill station wrapped around the emerald Naini Lake. Explore colonial-era architecture, ride the aerial ropeway to Snow View for panoramic Himalayan vistas, and stroll the bustling Mall Road lined with shops and cafés.",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Lake Tour",
        text: "Arrive in Nainital, check in to hotel. Evening boat ride on Naini Lake followed by a walk along Mall Road.",
      },
      {
        day: "Day 2",
        title: "Sightseeing Extravaganza",
        text: "Visit Snow View Point via ropeway, Eco Cave Gardens, and Tiffin Top. Enjoy local Kumaoni cuisine for lunch.",
      },
      {
        day: "Day 3",
        title: "Bhimtal & Departure",
        text: "Drive to nearby Bhimtal Lake for boating, visit the aquarium island, then depart for home.",
      },
    ],
    inclusions: [
      "2 nights hotel accommodation",
      "Daily breakfast & dinner",
      "Airport / station transfers",
      "Naini Lake boat ride",
      "Snow View ropeway tickets",
      "Local sightseeing by cab",
    ],
    exclusions: [
      "Travel to / from Nainital",
      "Lunch not included",
      "Personal expenses & tips",
      "Adventure activities",
    ],
  },
  {
    slug: "jaipur",
    name: "Jaipur",
    location: "Rajasthan, India",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80",
    gallery: [
      "/packages_images/Jaipur2.jpeg",
      "/packages_images/Jaipur3.webp",
      "https://images.unsplash.com/photo-1545126222-f6b43f9d3e62?w=900&q=80",
    ],
    price: "₹6,000",
    originalPrice: "₹8,500",
    discount: "29% OFF",
    duration: "4 Days / 3 Nights",
    rating: 4.8,
    reviews: 489,
    category: "Heritage",
    highlights: ["Amber Fort", "Hawa Mahal", "City Palace"],
    groupSize: "2–16",
    featured: true,
    bestTime: "November – February",
    description:
      "The Pink City of Jaipur is a vibrant tapestry of Rajputana heritage, where majestic forts, ornate palaces, and bustling bazaars come alive with colour and history. From the hilltop Amber Fort to the iconic Hawa Mahal, Jaipur is a journey through India's royal past.",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & City Palace",
        text: "Arrive in Jaipur, check in. Visit City Palace and Jantar Mantar observatory. Evening stroll through Johari Bazaar.",
      },
      {
        day: "Day 2",
        title: "Amber Fort & Nahargarh",
        text: "Morning elephant/jeep ride up to Amber Fort. Afternoon visit to Jaigarh and Nahargarh Forts for sunset views.",
      },
      {
        day: "Day 3",
        title: "Hawa Mahal & Culture",
        text: "Photo stop at Hawa Mahal, explore Albert Hall Museum. Afternoon Rajasthani cooking class, evening folk show at Chokhi Dhani.",
      },
      {
        day: "Day 4",
        title: "Shopping & Departure",
        text: "Morning visit to block-printing workshop, free time for shopping in Bapu Bazaar, then depart.",
      },
    ],
    inclusions: [
      "3 nights heritage hotel stay",
      "Daily breakfast",
      "Private AC cab for sightseeing",
      "Amber Fort entry & jeep ride",
      "Cooking class experience",
      "English-speaking guide",
    ],
    exclusions: [
      "Travel to / from Jaipur",
      "Monument entry fees",
      "Lunch & dinner",
      "Personal expenses",
    ],
  },
  {
    slug: "kerala",
    name: "Kerala",
    location: "South India",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80",
    gallery: [
      "/packages_images/Kerala2.jpeg",
      "/packages_images/Kerla3.webp",
      "https://images.unsplash.com/photo-1512336831938-6a0ef5f79162?w=900&q=80",
    ],
    price: "₹7,500",
    originalPrice: "₹10,000",
    discount: "25% OFF",
    duration: "5 Days / 4 Nights",
    rating: 4.9,
    reviews: 621,
    category: "Beach",
    highlights: ["Backwaters", "Munnar Hills", "Ayurveda"],
    groupSize: "2–10",
    featured: true,
    bestTime: "September – March",
    description:
      "God's Own Country — Kerala — is a lush tropical paradise where misty tea plantations, tranquil backwaters, and pristine beaches create an unforgettable experience. Cruise a houseboat through the Alleppey backwaters, trek the Munnar hills, and rejuvenate with a traditional Ayurvedic spa treatment.",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Kochi",
        text: "Arrive in Kochi, explore Fort Kochi, Chinese fishing nets, and St. Francis Church. Evening Kathakali dance show.",
      },
      {
        day: "Day 2",
        title: "Munnar Tea Country",
        text: "Drive to Munnar through winding ghats. Visit tea museum, Eravikulam National Park, and Mattupetty Dam.",
      },
      {
        day: "Day 3",
        title: "Munnar Trek & Spice Garden",
        text: "Morning nature trek through tea estates, visit spice plantation and chocolate factory. Evening bonfire.",
      },
      {
        day: "Day 4",
        title: "Alleppey Houseboat",
        text: "Drive to Alleppey, board a private houseboat. Cruise the backwaters, enjoy freshly cooked Kerala meals on board.",
      },
      {
        day: "Day 5",
        title: "Ayurveda & Departure",
        text: "Morning Ayurvedic spa session, visit Marari Beach, then depart from Kochi.",
      },
    ],
    inclusions: [
      "4 nights accommodation (hotel + houseboat)",
      "Daily breakfast + houseboat meals",
      "Private AC cab for all transfers",
      "Kathakali show tickets",
      "Ayurvedic spa session",
      "Tea estate & spice garden visit",
    ],
    exclusions: [
      "Travel to / from Kochi",
      "Lunch & dinner (except houseboat)",
      "National park entry fees",
      "Personal expenses",
    ],
  },
  {
    slug: "ujjain",
    name: "Ujjain",
    location: "Madhya Pradesh, India",
    image:
      "/images/Ujjain.jpg",
    gallery: [
      "/packages_images/Ujjain2.jpeg",
      "/packages_images/ujjain3.jpeg",
      "/packages_images/Ujjain4.jpeg",
    ],
    price: "₹3,500",
    originalPrice: "₹5,000",
    discount: "30% OFF",
    duration: "2 Days / 1 Night",
    rating: 4.5,
    reviews: 198,
    category: "Pilgrimage",
    highlights: ["Mahakaleshwar", "Shipra River", "Ram Ghat"],
    groupSize: "2–20",
    bestTime: "October – March",
    description:
      "One of the seven sacred cities of India, Ujjain is a spiritual powerhouse home to the revered Mahakaleshwar Jyotirlinga. Witness the grand Bhasma Aarti at dawn, take a holy dip in the Shipra River at Ram Ghat, and explore the rich cultural heritage of this ancient city.",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Darshan",
        text: "Arrive in Ujjain, check in. Visit Mahakaleshwar Temple for Bhasma Aarti, explore Ram Ghat and Kal Bhairav Temple.",
      },
      {
        day: "Day 2",
        title: "Temples & Departure",
        text: "Visit Harsiddhi Mata Temple, Sandipani Ashram, and Vedhshala observatory. Holy dip at Shipra ghat, then depart.",
      },
    ],
    inclusions: [
      "1 night hotel accommodation",
      "Breakfast & dinner",
      "Station transfers",
      "Temple darshan assistance",
      "Local sightseeing cab",
      "Aarti pass arrangement",
    ],
    exclusions: [
      "Travel to / from Ujjain",
      "Lunch",
      "Temple donations",
      "Personal expenses",
    ],
  },
  {
    slug: "varanasi",
    name: "Varanasi",
    location: "Uttar Pradesh, India",
    image:
      "/images/Varanasi.jpg",
    gallery: [
      "/packages_images/varnasi2.jpeg",
      "/packages_images/varanasi3.jpeg",
    ],
    price: "₹4,999",
    originalPrice: "₹7,499",
    discount: "33% OFF",
    duration: "3 Days / 2 Nights",
    rating: 4.6,
    reviews: 410,
    category: "Pilgrimage",
    highlights: ["Ganga Aarti", "Boat Ride", "Sarnath"],
    groupSize: "2–15",
    featured: true,
    bestTime: "October – March",
    description:
      "The spiritual capital of India, Varanasi is one of the oldest living cities in the world. Witness the mesmerizing Ganga Aarti at Dashashwamedh Ghat, take a sunrise boat ride along the sacred river, and explore the ancient Buddhist site of Sarnath where Buddha gave his first sermon.",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Ganga Aarti",
        text: "Arrive in Varanasi, check in. Evening visit to Dashashwamedh Ghat for the spectacular Ganga Aarti ceremony.",
      },
      {
        day: "Day 2",
        title: "Sunrise Boat & Sarnath",
        text: "Pre-dawn boat ride on the Ganges. Visit Kashi Vishwanath Temple. Afternoon excursion to Sarnath — Dhamek Stupa and museum.",
      },
      {
        day: "Day 3",
        title: "Silk & Departure",
        text: "Visit Banaras silk weaving workshop, Tulsi Manas Temple, and BHU campus. Free time for shopping, then depart.",
      },
    ],
    inclusions: [
      "2 nights hotel stay",
      "Daily breakfast",
      "Airport / station transfers",
      "Sunrise boat ride",
      "Sarnath excursion with guide",
      "Ganga Aarti ghat seating",
    ],
    exclusions: [
      "Travel to / from Varanasi",
      "Lunch & dinner",
      "Monument entry fees",
      "Personal expenses & tips",
    ],
  },
  {
    slug: "northeast-india",
    name: "Northeast India",
    location: "Seven Sisters, India",
    image:
      "/images/North India.jpg",
    gallery: [
      "/packages_images/North India2.webp",
      "/packages_images/North India3.jpeg",
      "/packages_images/Northeast3.jpeg",
    ],
    price: "₹9,999",
    originalPrice: "₹12,000",
    discount: "17% OFF",
    duration: "7 Days / 6 Nights",
    rating: 4.8,
    reviews: 276,
    category: "Adventure",
    highlights: ["Kaziranga", "Tawang", "Living Root Bridge"],
    groupSize: "4–12",
    bestTime: "October – April",
    description:
      "The Seven Sisters of Northeast India are a land of misty mountains, pristine forests, and vibrant tribal cultures. Spot the one-horned rhino at Kaziranga, marvel at the living root bridges of Meghalaya, and explore the mystical monasteries of Tawang in Arunachal Pradesh.",
    itinerary: [
      {
        day: "Day 1-2",
        title: "Guwahati & Kaziranga",
        text: "Arrive in Guwahati, visit Kamakhya Temple. Drive to Kaziranga National Park for jeep and elephant safaris.",
      },
      {
        day: "Day 3-4",
        title: "Shillong & Cherrapunji",
        text: "Drive to Shillong — the Scotland of the East. Visit Umiam Lake, then Cherrapunji — living root bridges and waterfalls.",
      },
      {
        day: "Day 5-6",
        title: "Tawang Monastery",
        text: "Fly to Tezpur, drive to Tawang. Visit the ancient Tawang Monastery, Sela Pass, and Madhuri Lake.",
      },
      {
        day: "Day 7",
        title: "Departure",
        text: "Morning visit to Tawang War Memorial and local market, then depart.",
      },
    ],
    inclusions: [
      "6 nights hotel / resort accommodation",
      "Daily breakfast & dinner",
      "All transfers by AC vehicle",
      "Kaziranga safari permits",
      "Inner Line Permits",
      "Experienced local guide",
    ],
    exclusions: [
      "Flights to / from Guwahati",
      "Lunch",
      "Camera fees at parks",
      "Personal expenses",
      "Travel insurance",
    ],
  },
  {
    slug: "statue-of-unity",
    name: "Statue of Unity",
    location: "Gujarat, India",
    image:
      "/images/Statue of Unity.jpg",
    gallery: [
      "/packages_images/Statue Of Unity2.jpeg",
      "/packages_images/Statue Of Unity3.jpeg",
      "/packages_images/Statue of Unity4.jpeg",
    ],
    price: "₹5,999",
    originalPrice: "₹7,999",
    discount: "25% OFF",
    duration: "2 Days / 1 Night",
    rating: 4.4,
    reviews: 345,
    category: "Heritage",
    highlights: ["Observation Deck", "Valley View", "Light Show"],
    groupSize: "2–20",
    bestTime: "October – February",
    description:
      "Standing 182 metres tall, the Statue of Unity is the world's tallest statue — a tribute to Sardar Vallabhbhai Patel. Located on the banks of the Narmada, the site includes a stunning valley view, the Sardar Sarovar Dam, and a spectacular evening laser light show.",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Statue Visit",
        text: "Arrive at Ekta Nagar, visit the Statue of Unity observation deck, Memorial, and Museum. Evening laser light show.",
      },
      {
        day: "Day 2",
        title: "Nature & Departure",
        text: "Visit Valley View, Sardar Sarovar Dam, butterfly garden, and cactus garden. Depart by afternoon.",
      },
    ],
    inclusions: [
      "1 night hotel stay",
      "Breakfast & dinner",
      "Statue of Unity entry tickets",
      "Observation deck access",
      "Local sightseeing transfers",
      "Light show seating",
    ],
    exclusions: [
      "Travel to / from Ekta Nagar",
      "Lunch",
      "Extra activity fees",
      "Personal expenses",
    ],
  },
  {
    slug: "lakshadweep",
    name: "Lakshadweep",
    location: "Union Territory, India",
    image:
      "/images/Lakshdweep.jpg",
    gallery: [
      "/packages_images/lakashdweep2.jpeg",
      "/packages_images/Lakashdweep3.jpeg",
      "/packages_images/Lakshadweep4.jpeg",
    ],
    price: "₹22,000",
    originalPrice: "₹38,000",
    discount: "42% OFF",
    duration: "5 Days / 4 Nights",
    rating: 4.9,
    reviews: 189,
    category: "Beach",
    highlights: ["Scuba Diving", "Coral Reefs", "Island Hop"],
    groupSize: "2–8",
    featured: true,
    bestTime: "October – May",
    description:
      "A pristine archipelago of 36 islands in the Arabian Sea, Lakshadweep is India's hidden tropical paradise. Crystal-clear turquoise waters, vibrant coral reefs, and untouched white-sand beaches make it a dream destination for snorkellers, divers, and peace seekers.",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival at Agatti Island",
        text: "Fly from Kochi to Agatti Island. Check in to resort. Relax on the beach, evening sunset cruise.",
      },
      {
        day: "Day 2",
        title: "Scuba & Snorkelling",
        text: "Morning scuba diving session, afternoon snorkelling at coral reefs. Visit lighthouse viewpoint.",
      },
      {
        day: "Day 3",
        title: "Island Hopping",
        text: "Day trip to Bangaram and Thinnakara islands. Beach picnic, kayaking, and glass-bottom boat ride.",
      },
      {
        day: "Day 4",
        title: "Water Sports Day",
        text: "Full day of water sports — jet ski, parasailing, deep-sea fishing. Evening beach barbecue.",
      },
      {
        day: "Day 5",
        title: "Departure",
        text: "Morning at leisure, visit local village and mosque, then fly back to Kochi.",
      },
    ],
    inclusions: [
      "4 nights beach resort stay",
      "All meals included",
      "Scuba diving session",
      "Snorkelling equipment",
      "Island hopping boat transfers",
      "Kochi–Agatti return flights",
    ],
    exclusions: [
      "Travel to / from Kochi",
      "Extra water sports beyond package",
      "Alcoholic beverages",
      "Travel insurance",
    ],
  },
  {
    slug: "goa",
    name: "Goa",
    location: "West India",
    image:
      "/images/Goa.jpg",
    gallery: [
      "/packages_images/Goa2.jpeg",
      "/packages_images/Goa3.jpeg",
      "/packages_images/goa4.jpeg",
    ],
    price: "₹6,500",
    originalPrice: "₹9,000",
    discount: "28% OFF",
    duration: "4 Days / 3 Nights",
    rating: 4.7,
    reviews: 743,
    category: "Beach",
    highlights: ["Beach Party", "Fort Aguada", "Water Sports"],
    groupSize: "2–16",
    bestTime: "November – February",
    description:
      "India's favourite beach destination, Goa is a sun-soaked paradise where Portuguese heritage blends with vibrant nightlife. From the lively shores of Baga to the serene beaches of Palolem, explore historic forts, savour Goan cuisine, and dance the night away at beachside shacks.",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & North Goa",
        text: "Arrive in Goa, check in. Visit Baga and Calangute beaches, enjoy water sports. Evening at Tito's Lane.",
      },
      {
        day: "Day 2",
        title: "Heritage & Forts",
        text: "Visit Fort Aguada, Chapora Fort, and Basilica of Bom Jesus. Explore Anjuna Flea Market. Sunset at Vagator.",
      },
      {
        day: "Day 3",
        title: "South Goa & Cruise",
        text: "Drive to Colva and Palolem beaches. Afternoon spice plantation tour. Evening Mandovi River dinner cruise.",
      },
      {
        day: "Day 4",
        title: "Beach & Departure",
        text: "Morning at leisure on the beach, visit Dudhsagar Falls (optional), then depart.",
      },
    ],
    inclusions: [
      "3 nights beachside hotel",
      "Daily breakfast",
      "Private AC cab for sightseeing",
      "Water sports combo",
      "Mandovi cruise tickets",
      "Airport transfers",
    ],
    exclusions: [
      "Travel to / from Goa",
      "Lunch & dinner",
      "Club entry fees",
      "Dudhsagar trip (optional)",
      "Personal expenses",
    ],
  },
  {
    slug: "manali",
    name: "Manali",
    location: "Himachal Pradesh, India",
    image:
      "/images/Manali.jpg",
    gallery: [
      "/packages_images/Manali2.jpeg",
      "/packages_images/Manali3.jpeg",
      "/packages_images/Manali4.jpeg",
    ],
    price: "₹7,999",
    originalPrice: "₹11,000",
    discount: "27% OFF",
    duration: "5 Days / 4 Nights",
    rating: 4.8,
    reviews: 567,
    category: "Mountain",
    highlights: ["Rohtang Pass", "Solang Valley", "River Rafting"],
    groupSize: "2–14",
    bestTime: "October – June",
    description:
      "A paradise in the Kullu Valley, Manali is where snow-capped peaks meet gushing rivers and lush pine forests. From the adrenaline rush of Solang Valley's adventure sports to the serenity of Old Manali's cafés, this hill station offers something for every traveller.",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Mall Road",
        text: "Arrive in Manali, check in. Explore Mall Road, Hadimba Temple, and Vashisht hot springs.",
      },
      {
        day: "Day 2",
        title: "Rohtang Pass",
        text: "Full-day excursion to Rohtang Pass (subject to permits). Snow activities, scenic drives, and photo stops.",
      },
      {
        day: "Day 3",
        title: "Solang Valley Adventures",
        text: "Visit Solang Valley for paragliding, zorbing, and ATV rides. Evening at Old Manali cafés.",
      },
      {
        day: "Day 4",
        title: "River Rafting & Temples",
        text: "Morning river rafting on the Beas. Visit Manu Temple, Jogini Waterfall trek. Evening bonfire.",
      },
      {
        day: "Day 5",
        title: "Kullu & Departure",
        text: "Drive to Kullu, visit shawl factories and apple orchards, then depart.",
      },
    ],
    inclusions: [
      "4 nights hotel / cottage stay",
      "Daily breakfast & dinner",
      "All transfers by private cab",
      "Rohtang Pass permit & cab",
      "River rafting session",
      "Solang Valley sightseeing",
    ],
    exclusions: [
      "Travel to / from Manali",
      "Lunch",
      "Adventure activity charges beyond package",
      "Personal expenses",
    ],
  },
  {
    slug: "rishikesh",
    name: "Rishikesh",
    location: "Uttarakhand, India",
    image:
      "/images/Rishikesh.jpg",
    gallery: [
      "/packages_images/Rishikesh.webp",
      "/packages_images/Rishikesh2.webp",
      "/packages_images/Rishikesh4.jpeg",
    ],
    price: "₹4,500",
    originalPrice: "₹6,500",
    discount: "31% OFF",
    duration: "3 Days / 2 Nights",
    rating: 4.6,
    reviews: 398,
    category: "Adventure",
    highlights: ["River Rafting", "Bungee Jump", "Yoga Retreat"],
    groupSize: "2–18",
    bestTime: "September – November & February – May",
    description:
      "The Yoga Capital of the World and India's adventure sports hub, Rishikesh is where spirituality meets adrenaline. Set on the banks of the Ganges, it offers world-class river rafting, bungee jumping, cliff camping, and a vibrant ashram culture for inner peace.",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Rafting",
        text: "Arrive in Rishikesh, check in. Afternoon river rafting (9 km stretch) with body surfing. Evening Ganga Aarti at Triveni Ghat.",
      },
      {
        day: "Day 2",
        title: "Adventure Day",
        text: "Morning bungee jumping at Jumpin Heights. Afternoon cliff camping and waterfall rappelling. Night camping by the Ganges.",
      },
      {
        day: "Day 3",
        title: "Yoga & Departure",
        text: "Sunrise yoga session at ashram. Visit Beatles Ashram and Ram Jhula. Shopping for souvenirs, then depart.",
      },
    ],
    inclusions: [
      "2 nights camping / hotel stay",
      "All meals included",
      "River rafting session",
      "Bungee jumping pass",
      "Yoga session",
      "All transfers from Haridwar",
    ],
    exclusions: [
      "Travel to / from Haridwar",
      "Extra adventure activities",
      "Camera charges",
      "Personal expenses",
    ],
  },
  {
    slug: "darjeeling",
    name: "Darjeeling",
    location: "West Bengal, India",
    image:
      "/packages_images/Darjling.jpeg",
    gallery: [
      "/packages_images/Darjling2.jpeg",
      "/packages_images/Darjling3.jpeg",
      "/packages_images/Darjeeling3.webp",
    ],
    price: "₹6,999",
    originalPrice: "₹9,500",
    discount: "26% OFF",
    duration: "4 Days / 3 Nights",
    rating: 4.7,
    reviews: 432,
    category: "Mountain",
    highlights: ["Tiger Hill", "Toy Train", "Tea Gardens"],
    groupSize: "2–12",
    bestTime: "October – March",
    description:
      "The Queen of the Hills — Darjeeling — is a misty mountain town famous for its world-renowned tea, the UNESCO-listed Toy Train, and the breathtaking sunrise over Kanchenjunga from Tiger Hill. Explore rolling tea estates, colonial charm, and the warm hospitality of the Eastern Himalayas.",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Mall Road",
        text: "Arrive at Bagdogra/NJP, transfer to Darjeeling. Check in, explore Mall Road and Observatory Hill.",
      },
      {
        day: "Day 2",
        title: "Tiger Hill & Monasteries",
        text: "Pre-dawn drive to Tiger Hill for Kanchenjunga sunrise. Visit Batasia Loop, Ghoom Monastery. Afternoon tea garden tour.",
      },
      {
        day: "Day 3",
        title: "Toy Train & Culture",
        text: "Ride the Darjeeling Himalayan Railway (Toy Train). Visit Himalayan Mountaineering Institute, zoo, and Peace Pagoda.",
      },
      {
        day: "Day 4",
        title: "Mirik & Departure",
        text: "Drive to Mirik Lake for boating, visit Pashupati Market (Nepal border), then depart.",
      },
    ],
    inclusions: [
      "3 nights hotel with mountain view",
      "Daily breakfast & dinner",
      "Bagdogra / NJP transfers",
      "Toy Train tickets",
      "Tiger Hill sunrise trip",
      "Tea garden guided tour",
    ],
    exclusions: [
      "Travel to / from Bagdogra or NJP",
      "Lunch",
      "Zoo & museum entry fees",
      "Mirik boating charges",
      "Personal expenses",
    ],
  },
];
