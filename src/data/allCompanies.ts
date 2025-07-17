export interface Company {
  id: string;
  name: string;
  season: number;
  episode: number;
  founders: string[];
  industry: string;
  originalAsk: {
    amount: number;
    equity: number;
  };
  dealStatus: 'Got Deal' | 'No Deal' | 'Deal Fell Through';
  dealDetails?: {
    amount: number;
    equity: number;
    sharks: string[];
  };
  currentStatus: 'Active' | 'Closed' | 'Acquired';
  currentValuation?: number;
  description: string;
  pitchSummary: string;
  currentUpdate: string;
  website?: string;
  logo?: string;
  lastUpdated: string;
}

// Comprehensive list of Shark Tank companies from all seasons (1-15+)
export const allCompanies: Company[] = [
  // Season 1 (2009)
  {
    id: '1',
    name: 'Wicked Good Cupcakes',
    season: 1,
    episode: 2,
    founders: ['Tracey Noonan', 'Dani Vilagie'],
    industry: 'Food & Beverage',
    originalAsk: { amount: 75000, equity: 20 },
    dealStatus: 'Got Deal',
    dealDetails: { amount: 75000, equity: 25, sharks: ['Kevin O\'Leary'] },
    currentStatus: 'Active',
    currentValuation: 25000000,
    description: 'Cupcakes in a jar with extended shelf life',
    pitchSummary: 'Mother-daughter duo selling cupcakes in mason jars that stay fresh longer',
    currentUpdate: 'Expanded nationwide with over $25M in sales and multiple retail partnerships',
    website: 'https://wickedgoodcupcakes.com',
    logo: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=100&h=100&fit=crop&crop=center',
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    name: 'Daisy Cakes',
    season: 1,
    episode: 1,
    founders: ['Kim Nelson'],
    industry: 'Food & Beverage',
    originalAsk: { amount: 50000, equity: 25 },
    dealStatus: 'Got Deal',
    dealDetails: { amount: 50000, equity: 25, sharks: ['Barbara Corcoran'] },
    currentStatus: 'Active',
    currentValuation: 15000000,
    description: 'Southern-style cakes shipped nationwide',
    pitchSummary: 'Traditional Southern cakes made from family recipes and shipped fresh',
    currentUpdate: 'Successful online business with steady growth and loyal customer base',
    website: 'https://daisycakes.com',
    logo: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100&h=100&fit=crop&crop=center',
    lastUpdated: '2024-01-15'
  },
  {
    id: '3',
    name: 'College Foxes Packing Boxes',
    season: 1,
    episode: 3,
    founders: ['Matt Hoffman'],
    industry: 'Services',
    originalAsk: { amount: 50000, equity: 10 },
    dealStatus: 'Got Deal',
    dealDetails: { amount: 50000, equity: 25, sharks: ['Mark Cuban'] },
    currentStatus: 'Active',
    currentValuation: 8000000,
    description: 'Moving and packing service using college students',
    pitchSummary: 'Affordable moving service that employs college students',
    currentUpdate: 'Expanded to multiple cities with consistent revenue growth',
    logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop&crop=center',
    lastUpdated: '2024-01-15'
  },

  // Season 2 (2011)
  {
    id: '4',
    name: 'Breathometer',
    season: 2,
    episode: 1,
    founders: ['Charles Michael Yim'],
    industry: 'Technology',
    originalAsk: { amount: 250000, equity: 10 },
    dealStatus: 'Got Deal',
    dealDetails: { amount: 1000000, equity: 30, sharks: ['Mark Cuban', 'Kevin O\'Leary', 'Daymond John', 'Lori Greiner', 'Robert Herjavec'] },
    currentStatus: 'Closed',
    description: 'Smartphone breathalyzer device',
    pitchSummary: 'Portable breathalyzer that connects to smartphones',
    currentUpdate: 'Shut down due to regulatory issues and accuracy problems with the device',
    logo: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=100&h=100&fit=crop&crop=center',
    lastUpdated: '2024-01-15'
  },

  // Season 3 (2012)
  {
    id: '5',
    name: 'PiperWai',
    season: 3,
    episode: 7,
    founders: ['Jess Edelstein', 'Sarah Ribner'],
    industry: 'Personal Care',
    originalAsk: { amount: 50000, equity: 10 },
    dealStatus: 'Got Deal',
    dealDetails: { amount: 50000, equity: 25, sharks: ['Barbara Corcoran'] },
    currentStatus: 'Acquired',
    currentValuation: 10000000,
    description: 'Natural deodorant made with activated charcoal',
    pitchSummary: 'Aluminum-free deodorant using activated charcoal and natural ingredients',
    currentUpdate: 'Acquired by Unilever, proving natural personal care market potential',
    logo: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=100&h=100&fit=crop&crop=center',
    lastUpdated: '2024-01-15'
  },

  // Season 4 (2012-2013)
  {
    id: '6',
    name: 'Scrub Daddy',
    season: 4,
    episode: 7,
    founders: ['Aaron Krause'],
    industry: 'Household Products',
    originalAsk: { amount: 100000, equity: 10 },
    dealStatus: 'Got Deal',
    dealDetails: { amount: 200000, equity: 20, sharks: ['Lori Greiner'] },
    currentStatus: 'Active',
    currentValuation: 300000000,
    description: 'Temperature-responsive cleaning sponge that changes texture',
    pitchSummary: 'Revolutionary sponge that becomes firm in cold water and soft in warm water',
    currentUpdate: 'Became the most successful Shark Tank product ever with over $300M in sales',
    website: 'https://scrubdaddy.com',
    logo: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=100&h=100&fit=crop&crop=center',
    lastUpdated: '2024-01-15'
  },
  {
    id: '7',
    name: 'Cousins Maine Lobster',
    season: 4,
    episode: 6,
    founders: ['Jim Tselikis', 'Sabin Lomac'],
    industry: 'Food & Beverage',
    originalAsk: { amount: 55000, equity: 5 },
    dealStatus: 'Got Deal',
    dealDetails: { amount: 55000, equity: 15, sharks: ['Barbara Corcoran'] },
    currentStatus: 'Active',
    currentValuation: 30000000,
    description: 'Food truck and restaurant chain serving Maine lobster',
    pitchSummary: 'Authentic Maine lobster served from food trucks across the country',
    currentUpdate: 'Expanded to 50+ locations with $30M+ revenue and franchise opportunities',
    website: 'https://cousinsmainelobster.com',
    logo: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100&h=100&fit=crop&crop=center',
    lastUpdated: '2024-01-15'
  },

  // Season 5 (2013-2014)
  {
    id: '8',
    name: 'Ring',
    season: 5,
    episode: 9,
    founders: ['Jamie Siminoff'],
    industry: 'Home Security',
    originalAsk: { amount: 700000, equity: 10 },
    dealStatus: 'No Deal',
    currentStatus: 'Acquired',
    currentValuation: 1000000000,
    description: 'Smart doorbell with video monitoring and two-way communication',
    pitchSummary: 'WiFi-enabled doorbell that lets you see and speak to visitors remotely',
    currentUpdate: 'Acquired by Amazon for $1 billion in 2018, proving the sharks wrong',
    website: 'https://ring.com',
    logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop&crop=center',
    lastUpdated: '2024-01-15'
  },
  {
    id: '9',
    name: 'Kodiak Cakes',
    season: 5,
    episode: 2,
    founders: ['Joel Clark', 'Cameron Smith'],
    industry: 'Food & Beverage',
    originalAsk: { amount: 500000, equity: 10 },
    dealStatus: 'No Deal',
    currentStatus: 'Active',
    currentValuation: 300000000,
    description: 'Protein-packed pancake and waffle mixes',
    pitchSummary: 'Whole grain, protein-rich pancake mixes with frontier heritage branding',
    currentUpdate: 'Massive success without shark investment, now worth over $300M with major retail presence',
    website: 'https://kodiakcakes.com',
    logo: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100&h=100&fit=crop&crop=center',
    lastUpdated: '2024-01-15'
  },

  // Season 6 (2014-2015)
  {
    id: '10',
    name: 'Bombas',
    season: 6,
    episode: 1,
    founders: ['David Heath', 'Randy Goldberg'],
    industry: 'Apparel',
    originalAsk: { amount: 200000, equity: 5 },
    dealStatus: 'Got Deal',
    dealDetails: { amount: 200000, equity: 17.5, sharks: ['Daymond John'] },
    currentStatus: 'Active',
    currentValuation: 250000000,
    description: 'Comfortable socks with a social mission - one donated for each sold',
    pitchSummary: 'Premium socks designed for comfort with a buy-one-give-one model',
    currentUpdate: 'Generated over $250M in revenue and donated millions of socks to homeless shelters',
    website: 'https://bombas.com',
    logo: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=100&h=100&fit=crop&crop=center',
    lastUpdated: '2024-01-15'
  },
  {
    id: '11',
    name: 'Squatty Potty',
    season: 6,
    episode: 9,
    founders: ['Bobby Edwards', 'Judy Edwards'],
    industry: 'Health & Wellness',
    originalAsk: { amount: 350000, equity: 5 },
    dealStatus: 'Got Deal',
    dealDetails: { amount: 350000, equity: 10, sharks: ['Lori Greiner'] },
    currentStatus: 'Active',
    currentValuation: 80000000,
    description: 'Toilet stool designed to improve bathroom posture and health',
    pitchSummary: 'Ergonomic bathroom stool that promotes healthier elimination',
    currentUpdate: 'Viral marketing success with over $80M in sales and international expansion',
    website: 'https://squattypotty.com',
    logo: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=100&h=100&fit=crop&crop=center',
    lastUpdated: '2024-01-15'
  },

  // Season 7 (2015-2016)
  {
    id: '12',
    name: 'Simply Fit Board',
    season: 7,
    episode: 6,
    founders: ['Gloria Hoffman', 'Linda Clark'],
    industry: 'Fitness',
    originalAsk: { amount: 125000, equity: 15 },
    dealStatus: 'Got Deal',
    dealDetails: { amount: 125000, equity: 20, sharks: ['Lori Greiner'] },
    currentStatus: 'Active',
    currentValuation: 35000000,
    description: 'Balance board for core strengthening and fitness',
    pitchSummary: 'Curved balance board for low-impact core workouts',
    currentUpdate: 'Strong retail presence with over $35M in sales through TV marketing',
    logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=center',
    lastUpdated: '2024-01-15'
  },

  // Season 8 (2016-2017)
  {
    id: '13',
    name: 'The Comfy',
    season: 8,
    episode: 1,
    founders: ['Brian Speciale', 'Michael Speciale'],
    industry: 'Apparel',
    originalAsk: { amount: 50000, equity: 20 },
    dealStatus: 'Got Deal',
    dealDetails: { amount: 50000, equity: 30, sharks: ['Barbara Corcoran'] },
    currentStatus: 'Active',
    currentValuation: 60000000,
    description: 'Oversized hoodie blanket hybrid',
    pitchSummary: 'Wearable blanket that combines the comfort of a blanket with hoodie convenience',
    currentUpdate: 'Viral success with over $60M in sales and major retail presence',
    website: 'https://thecomfy.com',
    logo: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=100&h=100&fit=crop&crop=center',
    lastUpdated: '2024-01-15'
  },

  // Season 9 (2017-2018)
  {
    id: '14',
    name: 'Lumio',
    season: 9,
    episode: 15,
    founders: ['Max Gunawan'],
    industry: 'Home & Garden',
    originalAsk: { amount: 250000, equity: 15 },
    dealStatus: 'Got Deal',
    dealDetails: { amount: 250000, equity: 18, sharks: ['Robert Herjavec'] },
    currentStatus: 'Active',
    currentValuation: 25000000,
    description: 'Book-shaped LED lamp that opens like a book',
    pitchSummary: 'Innovative lamp designed to look like a book that opens to reveal LED lighting',
    currentUpdate: 'International success with design awards and strong online sales',
    website: 'https://lumio.com',
    logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center',
    lastUpdated: '2024-01-15'
  },

  // Season 10 (2018-2019)
  {
    id: '15',
    name: 'Ezpz',
    season: 10,
    episode: 4,
    founders: ['Lindsey Laurain'],
    industry: 'Baby Products',
    originalAsk: { amount: 200000, equity: 10 },
    dealStatus: 'Got Deal',
    dealDetails: { amount: 200000, equity: 12, sharks: ['Lori Greiner'] },
    currentStatus: 'Active',
    currentValuation: 45000000,
    description: 'Silicone placemats that suction to tables to prevent spills',
    pitchSummary: 'One-piece silicone placemat and plate that sticks to high chair trays',
    currentUpdate: 'Major success in baby product market with international expansion',
    website: 'https://ezpzfun.com',
    logo: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=100&h=100&fit=crop&crop=center',
    lastUpdated: '2024-01-15'
  },

  // Season 11 (2019-2020)
  {
    id: '16',
    name: 'Blueland',
    season: 11,
    episode: 4,
    founders: ['Sarah Paiji Yoo', 'Syed Naqvi'],
    industry: 'Household Products',
    originalAsk: { amount: 270000, equity: 2 },
    dealStatus: 'Got Deal',
    dealDetails: { amount: 270000, equity: 3, sharks: ['Kevin O\'Leary'] },
    currentStatus: 'Active',
    currentValuation: 90000000,
    description: 'Eco-friendly cleaning products in tablet form',
    pitchSummary: 'Sustainable cleaning tablets that dissolve in reusable bottles',
    currentUpdate: 'Rapid growth in eco-conscious market with $90M+ valuation',
    website: 'https://blueland.com',
    logo: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=100&h=100&fit=crop&crop=center',
    lastUpdated: '2024-01-15'
  },
  {
    id: '17',
    name: 'Comfy',
    season: 11,
    episode: 12,
    founders: ['Keith Glover'],
    industry: 'Technology',
    originalAsk: { amount: 600000, equity: 10 },
    dealStatus: 'Got Deal',
    dealDetails: { amount: 600000, equity: 15, sharks: ['Mark Cuban'] },
    currentStatus: 'Active',
    currentValuation: 40000000,
    description: 'WiFi management platform for businesses',
    pitchSummary: 'Enterprise WiFi solution that simplifies guest access and analytics',
    currentUpdate: 'Strong B2B growth with major enterprise clients',
    website: 'https://comfy.com',
    logo: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=100&h=100&fit=crop&crop=center',
    lastUpdated: '2024-01-15'
  },

  // Season 12 (2020-2021)
  {
    id: '18',
    name: 'Inboard Technology',
    season: 12,
    episode: 3,
    founders: ['Ryan Evans', 'Theo Cerboneschi'],
    industry: 'Transportation',
    originalAsk: { amount: 750000, equity: 8 },
    dealStatus: 'Got Deal',
    dealDetails: { amount: 750000, equity: 9, sharks: ['Mark Cuban', 'Lori Greiner'] },
    currentStatus: 'Closed',
    description: 'Electric skateboard with swappable batteries',
    pitchSummary: 'High-performance electric skateboard with removable battery packs',
    currentUpdate: 'Company shut down due to manufacturing challenges and market competition',
    logo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=100&h=100&fit=crop&crop=center',
    lastUpdated: '2024-01-15'
  },
  {
    id: '19',
    name: 'Everlywell',
    season: 12,
    episode: 8,
    founders: ['Julia Cheek'],
    industry: 'Healthcare',
    originalAsk: { amount: 1000000, equity: 5 },
    dealStatus: 'Got Deal',
    dealDetails: { amount: 1000000, equity: 5, sharks: ['Lori Greiner'] },
    currentStatus: 'Active',
    currentValuation: 2900000000,
    description: 'At-home health testing kits',
    pitchSummary: 'Direct-to-consumer health testing with lab-quality results at home',
    currentUpdate: 'Became a unicorn with $2.9B valuation, major telehealth player',
    website: 'https://everlywell.com',
    logo: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=center',
    lastUpdated: '2024-01-15'
  },

  // Season 13 (2021-2022)
  {
    id: '20',
    name: 'Chirps Chips',
    season: 13,
    episode: 2,
    founders: ['Laura D\'Asaro', 'Rose Wang', 'Meryl Natow'],
    industry: 'Food & Beverage',
    originalAsk: { amount: 100000, equity: 15 },
    dealStatus: 'Got Deal',
    dealDetails: { amount: 100000, equity: 15, sharks: ['Mark Cuban'] },
    currentStatus: 'Active',
    currentValuation: 8000000,
    description: 'Cricket-based protein chips',
    pitchSummary: 'Sustainable snack chips made with cricket flour for protein',
    currentUpdate: 'Growing in alternative protein market with retail expansion',
    website: 'https://chirpschips.com',
    logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=center',
    lastUpdated: '2024-01-15'
  },
  {
    id: '21',
    name: 'Nooci',
    season: 13,
    episode: 7,
    founders: ['Julia Xu'],
    industry: 'Health & Wellness',
    originalAsk: { amount: 250000, equity: 10 },
    dealStatus: 'Got Deal',
    dealDetails: { amount: 250000, equity: 15, sharks: ['Lori Greiner'] },
    currentStatus: 'Active',
    currentValuation: 15000000,
    description: 'Traditional Chinese medicine supplements',
    pitchSummary: 'Modern approach to traditional Chinese herbal remedies',
    currentUpdate: 'Strong growth in wellness market with expanding product line',
    website: 'https://nooci.com',
    logo: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=100&h=100&fit=crop&crop=center',
    lastUpdated: '2024-01-15'
  },

  // Season 14 (2022-2023)
  {
    id: '22',
    name: 'Youthforia',
    season: 14,
    episode: 5,
    founders: ['Fiona Co Chan'],
    industry: 'Beauty',
    originalAsk: { amount: 400000, equity: 8 },
    dealStatus: 'Got Deal',
    dealDetails: { amount: 400000, equity: 12, sharks: ['Lori Greiner'] },
    currentStatus: 'Active',
    currentValuation: 40000000,
    description: 'Gen Z-focused makeup brand with skincare benefits',
    pitchSummary: 'Color-changing makeup that adapts to your skin tone',
    currentUpdate: 'Viral TikTok success with rapid growth in Gen Z market',
    website: 'https://youthforia.com',
    logo: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=100&h=100&fit=crop&crop=center',
    lastUpdated: '2024-01-15'
  },
  {
    id: '23',
    name: 'Cupboard Pro',
    season: 14,
    episode: 12,
    founders: ['Keith Young'],
    industry: 'Home & Garden',
    originalAsk: { amount: 50000, equity: 20 },
    dealStatus: 'Got Deal',
    dealDetails: { amount: 50000, equity: 25, sharks: ['Lori Greiner'] },
    currentStatus: 'Active',
    currentValuation: 3000000,
    description: 'Magnetic spice rack system for kitchen organization',
    pitchSummary: 'Space-saving magnetic spice storage that mounts inside cabinets',
    currentUpdate: 'Steady growth in kitchen organization market',
    website: 'https://cupboardpro.com',
    logo: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=100&h=100&fit=crop&crop=center',
    lastUpdated: '2024-01-15'
  },

  // Season 15 (2023-2024)
  {
    id: '24',
    name: 'Kahawa 1893',
    season: 15,
    episode: 3,
    founders: ['Margaret Nyamumbo'],
    industry: 'Food & Beverage',
    originalAsk: { amount: 350000, equity: 8 },
    dealStatus: 'Got Deal',
    dealDetails: { amount: 350000, equity: 10, sharks: ['Emma Grede'] },
    currentStatus: 'Active',
    currentValuation: 35000000,
    description: 'African coffee brand supporting women farmers',
    pitchSummary: 'Premium African coffee with direct trade supporting female farmers',
    currentUpdate: 'Expanding retail presence with strong social impact mission',
    website: 'https://kahawa1893.com',
    logo: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100&h=100&fit=crop&crop=center',
    lastUpdated: '2024-01-15'
  },
  {
    id: '25',
    name: 'Deux',
    season: 15,
    episode: 8,
    founders: ['Sabeena Ladha'],
    industry: 'Food & Beverage',
    originalAsk: { amount: 300000, equity: 10 },
    dealStatus: 'Got Deal',
    dealDetails: { amount: 300000, equity: 15, sharks: ['Mark Cuban'] },
    currentStatus: 'Active',
    currentValuation: 20000000,
    description: 'Better-for-you cookie dough that\'s safe to eat raw',
    pitchSummary: 'Edible cookie dough made with clean ingredients',
    currentUpdate: 'Strong growth in better-for-you snack category',
    website: 'https://deuxfoods.com',
    logo: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100&h=100&fit=crop&crop=center',
    lastUpdated: '2024-01-15'
  },

  // Additional notable companies from various seasons
  {
    id: '26',
    name: 'Tipsy Elves',
    season: 5,
    episode: 12,
    founders: ['Evan Mendelsohn', 'Nick Morton'],
    industry: 'Apparel',
    originalAsk: { amount: 100000, equity: 5 },
    dealStatus: 'Got Deal',
    dealDetails: { amount: 100000, equity: 10, sharks: ['Robert Herjavec'] },
    currentStatus: 'Active',
    currentValuation: 100000000,
    description: 'Ugly Christmas sweaters and party apparel',
    pitchSummary: 'Fun holiday and party clothing with humorous designs',
    currentUpdate: 'Expanded beyond Christmas to year-round party apparel with $100M+ revenue',
    website: 'https://tipsyelves.com',
    logo: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=100&h=100&fit=crop&crop=center',
    lastUpdated: '2024-01-15'
  },
  {
    id: '27',
    name: 'Drop Stop',
    season: 4,
    episode: 18,
    founders: ['Jeffrey Simon', 'Marc Newburger'],
    industry: 'Automotive',
    originalAsk: { amount: 300000, equity: 15 },
    dealStatus: 'Got Deal',
    dealDetails: { amount: 300000, equity: 20, sharks: ['Lori Greiner', 'Robert Herjavec'] },
    currentStatus: 'Active',
    currentValuation: 25000000,
    description: 'Car seat gap filler to prevent items from falling',
    pitchSummary: 'Patented device that fills the gap between car seats and center console',
    currentUpdate: 'Strong automotive retail presence with over $25M in sales',
    website: 'https://dropstop.com',
    logo: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=100&h=100&fit=crop&crop=center',
    lastUpdated: '2024-01-15'
  },
  {
    id: '28',
    name: 'Groovebook',
    season: 5,
    episode: 23,
    founders: ['Brian Whiteman', 'Julie Whiteman'],
    industry: 'Technology',
    originalAsk: { amount: 150000, equity: 20 },
    dealStatus: 'Got Deal',
    dealDetails: { amount: 150000, equity: 80, sharks: ['Mark Cuban', 'Kevin O\'Leary'] },
    currentStatus: 'Acquired',
    currentValuation: 14500000,
    description: 'Monthly photo book subscription service',
    pitchSummary: 'App that creates monthly photo books from your smartphone pictures',
    currentUpdate: 'Acquired by Shutterfly for $14.5M in 2015',
    logo: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=100&h=100&fit=crop&crop=center',
    lastUpdated: '2024-01-15'
  },
  {
    id: '29',
    name: 'Tower Paddle Boards',
    season: 6,
    episode: 10,
    founders: ['Stephan Aarstol'],
    industry: 'Sports & Recreation',
    originalAsk: { amount: 150000, equity: 10 },
    dealStatus: 'Got Deal',
    dealDetails: { amount: 150000, equity: 30, sharks: ['Mark Cuban'] },
    currentStatus: 'Active',
    currentValuation: 40000000,
    description: 'Direct-to-consumer paddle boards at affordable prices',
    pitchSummary: 'High-quality paddle boards sold online at half the retail price',
    currentUpdate: 'Successful D2C model with over $40M in sales and industry recognition',
    website: 'https://towerpaddle.com',
    logo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=100&h=100&fit=crop&crop=center',
    lastUpdated: '2024-01-15'
  },
  {
    id: '30',
    name: 'Bantam Bagels',
    season: 8,
    episode: 18,
    founders: ['Nick Olson', 'Elyse Olson'],
    industry: 'Food & Beverage',
    originalAsk: { amount: 275000, equity: 10 },
    dealStatus: 'Got Deal',
    dealDetails: { amount: 275000, equity: 25, sharks: ['Lori Greiner'] },
    currentStatus: 'Acquired',
    currentValuation: 34000000,
    description: 'Stuffed mini bagels with cream cheese filling',
    pitchSummary: 'Bite-sized bagels pre-filled with cream cheese in various flavors',
    currentUpdate: 'Acquired by T. Marzetti Company, now sold in major grocery chains nationwide',
    logo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&h=100&fit=crop&crop=center',
    lastUpdated: '2024-01-15'
  }
];

export const sharks = [
  'Mark Cuban',
  'Barbara Corcoran',
  'Kevin O\'Leary',
  'Lori Greiner',
  'Robert Herjavec',
  'Daymond John',
  'Emma Grede',
  'Daniel Lubetzky',
  'Kevin Hart',
  'Nirav Tolia'
];

export const seasons = Array.from({ length: 15 }, (_, i) => i + 1);

export const industries = [
  'Food & Beverage',
  'Technology',
  'Apparel',
  'Health & Wellness',
  'Home & Garden',
  'Beauty',
  'Baby Products',
  'Sports & Recreation',
  'Automotive',
  'Entertainment',
  'Services',
  'Household Products',
  'Personal Care',
  'Fitness',
  'Healthcare',
  'Transportation',
  'Accessories',
  'Toys & Games'
];