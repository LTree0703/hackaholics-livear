const tourData = [
  //   {
  //     id: 1,
  //     title: "Victoria Harbour Skyline Experience",
  //     description:
  //       "Soar above Hong Kong's iconic Victoria Harbour with breathtaking views of the world-famous skyline and bustling harbor.",
  //     startLocation: "Central Helipad",
  //     endLocation: "Tsim Sha Tsui Terminal",
  //     date: "2025-11-16",
  //     time: "14:00",
  //     duration: "45 minutes",
  //     price: 2299,
  //     totalSeats: 4,
  //     availableSeats: 2,
  //     imageUrl: "/images/tours/scheduled/victoria-harbour-skyline.jpg",
  //     highlights: [
  //       "IFC Tower",
  //       "Bank of China Tower",
  //       "Peak Tram",
  //       "Star Ferry Pier",
  //     ],
  //     difficulty: "Beginner",
  //     weather: "Clear",
  //     extendedDetails: {
  //       fullDescription:
  //         "Embark on a breathtaking aerial journey above Hong Kong's iconic Victoria Harbour, where towering skyscrapers meet the shimmering waters in perfect harmony. This immersive AR-enhanced flight showcases the city's architectural marvels, from the gleaming IFC Tower to the historic Star Ferry Terminal. Experience the pulse of one of the world's busiest harbors while our advanced AR overlay reveals hidden stories, architectural secrets, and real-time harbor activity.",
  //       itinerary: [
  //         {
  //           time: "14:00",
  //           activity: "Departure from Central Helipad",
  //           description: "Safety briefing and AR equipment setup",
  //         },
  //         {
  //           time: "14:05",
  //           activity: "IFC Tower Flyby",
  //           description: "Close-up views of Hong Kong's second tallest building",
  //         },
  //         {
  //           time: "14:15",
  //           activity: "Victoria Harbour Circuit",
  //           description: "360-degree harbor views with AR historical overlay",
  //         },
  //         {
  //           time: "14:25",
  //           activity: "Bank of China Tower Approach",
  //           description: "Architectural marvel designed by I.M. Pei",
  //         },
  //         {
  //           time: "14:35",
  //           activity: "Star Ferry Terminal Landing Zone",
  //           description: "Views of historic ferry operations",
  //         },
  //         {
  //           time: "14:45",
  //           activity: "Arrival at Tsim Sha Tsui Terminal",
  //           description: "Tour completion and equipment return",
  //         },
  //       ],
  //       inclusions: [
  //         "Professional pilot and AR tour guide",
  //         "State-of-the-art AR headset and audio system",
  //         "Safety equipment and pre-flight briefing",
  //         "Complimentary refreshments at departure lounge",
  //         "Digital photo package of your flight experience",
  //         "Certificate of completion",
  //       ],
  //       restrictions: [
  //         "Minimum age: 12 years old",
  //         "Maximum weight: 120kg per passenger",
  //         "No pregnant passengers",
  //         "Weather dependent (alternative dates offered)",
  //         "Valid ID required for all passengers",
  //       ],
  //       coordinates: {
  //         start: [22.2855, 114.1577], // Central Helipad
  //         end: [22.2938, 114.1722], // Tsim Sha Tsui Terminal
  //         waypoints: [
  //           [22.2855, 114.1577], // Central Helipad
  //           [22.2871, 114.1583], // IFC Tower
  //           [22.283, 114.162], // Mid-harbour
  //           [22.2799, 114.1677], // Bank of China Tower area
  //           [22.2938, 114.1722], // Tsim Sha Tsui Terminal
  //         ],
  //       },
  //     },
  //   },
  {
    id: 2,
    title: "Cultural Heritage & Temple Journey",
    description:
      "Discover Hong Kong's rich cultural tapestry through AR-enhanced views of ancient temples, traditional markets, and heritage sites.",
    startLocation: "Wong Tai Sin Helipad",
    endLocation: "Man Mo Temple Landing",
    date: "2025-11-16",
    time: "16:30",
    duration: "60 minutes",
    price: 2699,
    totalSeats: 4,
    availableSeats: 1,
    imageUrl: "/images/tours/scheduled/cultural-heritage-temple.jpg",
    highlights: [
      "Wong Tai Sin Temple",
      "Man Mo Temple",
      "Temple Street Night Market",
      "Chi Lin Nunnery",
      "Nan Lian Garden",
    ],
    difficulty: "Intermediate",
    weather: "Partly Cloudy",
    extendedDetails: {
      fullDescription:
        "Discover the spiritual heart of Hong Kong through this unique aerial journey that combines ancient traditions with modern cityscapes. Soar above sacred temples, traditional markets, and cultural heritage sites while our AR technology reveals the fascinating stories, legends, and cultural significance of each landmark. This tour offers a rare perspective on Hong Kong's rich multicultural heritage and the harmonious blend of East and West.",
      itinerary: [
        {
          time: "16:30",
          activity: "Departure from Wong Tai Sin Helipad",
          description: "Traditional blessing ceremony and equipment setup",
        },
        {
          time: "16:35",
          activity: "Wong Tai Sin Temple Overview",
          description: "AR-enhanced views of the colorful Taoist temple",
        },
        {
          time: "16:45",
          activity: "Chi Lin Nunnery Approach",
          description: "Tang Dynasty architecture and lotus pond gardens",
        },
        {
          time: "16:55",
          activity: "Temple Street Market Flyover",
          description: "Bustling night market preparation views",
        },
        {
          time: "17:05",
          activity: "Man Mo Temple District",
          description: "Historic Hollywood Road temple complex",
        },
        {
          time: "17:30",
          activity: "Landing at Man Mo Temple Area",
          description: "Ground-level temple visit opportunity",
        },
      ],
      inclusions: [
        "Cultural heritage specialist guide",
        "Advanced AR system with historical recreations",
        "Traditional tea ceremony at departure",
        "Temple blessing and good luck charm",
        "Professional photography service",
        "Cultural heritage guidebook",
      ],
      restrictions: [
        "Minimum age: 16 years old",
        "Respectful attire required",
        "No flash photography near temples",
        "Cultural sensitivity briefing mandatory",
        "Weather and air traffic dependent",
      ],
      coordinates: {
        start: [22.3411, 114.1944], // Wong Tai Sin Helipad
        end: [22.2829, 114.1504], // Man Mo Temple Landing
        waypoints: [
          [22.3411, 114.1944], // Wong Tai Sin Helipad
          [22.34, 114.1925], // Wong Tai Sin Temple
          [22.3407, 114.1918], // Chi Lin Nunnery
          [22.3064, 114.1717], // Temple Street Market
          [22.2829, 114.1504], // Man Mo Temple Landing
        ],
      },
    },
  },
  {
    id: 3,
    title: "Symphony of Lights Sunset Flight",
    description:
      "Experience the magical golden hour over Victoria Harbour, culminating with the world's largest permanent light show.",
    startLocation: "Ocean Terminal Helipad",
    endLocation: "Convention Centre Landing",
    date: "2025-11-16",
    time: "18:00",
    duration: "50 minutes",
    price: 3099,
    totalSeats: 4,
    availableSeats: 3,
    imageUrl: "/images/tours/scheduled/symphony-lights-sunset.jpg",
    highlights: [
      "Symphony of Lights",
      "Hong Kong Island Skyline",
      "Kowloon Waterfront",
      "Clock Tower",
    ],
    difficulty: "Beginner",
    weather: "Clear",
  },
  {
    id: 4,
    title: "The Peak & Mid-Levels Adventure",
    description:
      "Explore Hong Kong's exclusive residential areas and the famous Victoria Peak with AR overlays showcasing the city's evolution.",
    startLocation: "Peak Helipad",
    endLocation: "Mid-Levels Terminal",
    date: "2025-11-17",
    time: "10:00",
    duration: "55 minutes",
    price: 2549,
    totalSeats: 4,
    availableSeats: 4,
    imageUrl: "/images/tours/scheduled/peak-midlevels-adventure.jpg",
    highlights: [
      "Victoria Peak",
      "Sky Terrace 428",
      "Mid-Levels Escalator",
      "Lion Pavilion",
    ],
    difficulty: "Intermediate",
    weather: "Clear",
  },
  {
    id: 5,
    title: "New Territories Green Corridor",
    description:
      "Journey through Hong Kong's natural side, exploring country parks, traditional villages, and sustainable developments.",
    startLocation: "Sha Tin Helipad",
    endLocation: "Tai Po Landing",
    date: "2025-11-17",
    time: "12:30",
    duration: "40 minutes",
    price: 2199,
    totalSeats: 4,
    availableSeats: 2,
    imageUrl: "/images/tours/scheduled/new-territories-green.jpg",
    highlights: [
      "Shing Mun Reservoir",
      "Ten Thousand Buddhas Monastery",
      "Tai Po Market",
      "Science Park",
    ],
    difficulty: "Beginner",
    weather: "Clear",
  },
  {
    id: 6,
    title: "Neon Nights & Street Life Spectacular",
    description:
      "Experience Hong Kong's vibrant nightlife from above with AR-enhanced views of neon signs, night markets, and bustling streets.",
    startLocation: "Mong Kok Night Terminal",
    endLocation: "Causeway Bay Landing",
    date: "2025-11-17",
    time: "19:30",
    duration: "45 minutes",
    price: 2799,
    totalSeats: 4,
    availableSeats: 1,
    imageUrl: "/images/tours/scheduled/neon-nights-street.jpg",
    highlights: [
      "Mong Kok Neon Signs",
      "Ladies' Market",
      "Times Square",
      "Lan Kwai Fong",
    ],
    difficulty: "Intermediate",
    weather: "Clear",
  },
];

export default tourData;
