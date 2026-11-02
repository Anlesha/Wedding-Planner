import { 
  VendorProfile, 
  WeddingDetails, 
  Expense, 
  WeddingTask, 
  Guest, 
  Enquiry, 
  Review, 
  Notification,
  VerificationRequest,
  AuditLog,
  ModerationReport,
  PlatformUser,
  PlatformSettings
} from '../types';

export const INITIAL_WEDDING: WeddingDetails = {
  id: 'wed-001',
  customerId: 'cust-001',
  coupleNames: 'Aarav & Meera',
  partner1Name: 'Aarav Sharma',
  partner2Name: 'Meera Kulkarni',
  weddingDate: '2026-12-18',
  city: 'Pune',
  venueName: 'The Corinthians Resort & Club',
  totalBudget: 2500000, // ₹25 Lakhs
  estimatedGuests: 350,
  weddingStyle: 'Royal Maharashtrian Elegance',
  priorities: ['Venue', 'Photography', 'Catering', 'Decoration'],
  createdAt: '2026-09-01T10:00:00Z',
};

export const MOCK_VENDORS: VendorProfile[] = [
  {
    id: 'ven-001',
    userId: 'u-ven-001',
    businessName: 'Rohan Deshpande Photography',
    category: 'Photography',
    tagline: 'Story-driven cinematic wedding visuals & timeless candids',
    description: 'Lead wedding photographer with 8+ years and 150+ weddings across Maharashtra, Goa, and Rajasthan. We specialize in capturing authentic emotional rituals, heirloom portraits, and cinematic 4K wedding films with a discreet 3-person professional crew.',
    city: 'Pune',
    address: 'Koregaon Park, Pune, Maharashtra 411001',
    serviceArea: 'Pune, Mumbai, Goa, Destination',
    startingPrice: 65000,
    phone: '+91 98230 45678',
    email: 'rohan@deshpandephoto.com',
    website: 'https://rohandeshpande.photography',
    experienceYears: 8,
    rating: 4.9,
    reviewCount: 42,
    isVerified: true,
    verificationStatus: 'verified',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80'
    ],
    services: [
      {
        id: 'srv-001',
        vendorId: 'ven-001',
        title: 'Candid & Traditional Photo Coverage',
        description: 'Complete 2-day coverage of Haldi, Sangeet, Wedding, and Reception by 2 photographers.',
        startingPrice: 65000,
        inclusions: ['400+ color-graded images', 'Online gallery', 'Highlights reel', 'High-res deliverables within 4 weeks'],
        active: true
      },
      {
        id: 'srv-002',
        vendorId: 'ven-001',
        title: 'Cinematic 4K Wedding Film',
        description: 'Teaser film (3 mins) + full documentary ceremony film (25 mins) with drone aerial footage.',
        startingPrice: 50000,
        inclusions: ['4K Cinema cameras', 'Drone coverage (venue permitting)', 'Professional audio recording of vows/speeches'],
        active: true
      }
    ],
    packages: [
      {
        id: 'pkg-001',
        vendorId: 'ven-001',
        name: 'The Essential Story',
        description: 'Perfect for intimate 1-day weddings or main ceremony & reception.',
        price: 85000,
        features: ['1 Candid + 1 Traditional Photographer', 'Pre-wedding couple shoot (Pune)', '300 edited photos', '1 Premium Hardcover Photo Album'],
      },
      {
        id: 'pkg-002',
        vendorId: 'ven-001',
        name: 'Royal Heritage 2-Day Package',
        description: 'Our most sought-after full coverage for Sangeet, Haldi, Wedding, and Grand Reception.',
        price: 150000,
        isPopular: true,
        features: ['Lead Photographer Rohan + 2 Crew', 'Cinematic 4K Wedding Film + Teaser', 'Drone Aerials', '2 Luxury Handcrafted Albums', 'Raw files on SSD', 'Same-day edit preview (10 photos)']
      }
    ],
    availableDates: ['2026-11-20', '2026-12-05', '2026-12-18', '2027-01-14'],
    unavailableDates: ['2026-12-10', '2026-12-12', '2026-12-25']
  },
  {
    id: 'ven-002',
    userId: 'u-ven-002',
    businessName: 'The Corinthians Resort & Club',
    category: 'Venue',
    tagline: 'Egyptian architecture, lush manicured lawns, and grand banquet halls',
    description: 'A 5-star luxury resort nestled in the verdant hills of South Pune. Featuring grand open-air amphitheatres, banquet halls with capacity up to 1,500 guests, 140 luxury rooms, and dedicated bridal suites.',
    city: 'Pune',
    address: 'Nyati County, NIBM Undri Road, Pune 411060',
    serviceArea: 'Pune, Maharashtra',
    startingPrice: 350000,
    phone: '+91 20 2695 8888',
    email: 'events@thecorinthianspune.com',
    website: 'https://thecorinthianspune.com',
    experienceYears: 15,
    rating: 4.8,
    reviewCount: 89,
    isVerified: true,
    verificationStatus: 'verified',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80'
    ],
    services: [
      {
        id: 'srv-003',
        vendorId: 'ven-002',
        title: 'Grand Ballroom & Alexandria Lawn Rental',
        description: 'Full day venue hire with power backup, Valet parking for 300 cars, and 2 changing suites.',
        startingPrice: 350000,
        inclusions: ['Lawn + AC Ballroom', 'Green rooms for bride & groom', 'Generator backup 24x7', 'Security staff'],
        active: true
      }
    ],
    packages: [
      {
        id: 'pkg-003',
        vendorId: 'ven-002',
        name: 'Grand Wedding Weekend Package',
        description: 'Full 2-day access to Grand Lawn, Banquet Hall, plus 25 guest rooms for 1 night.',
        price: 850000,
        isPopular: true,
        features: ['25 Deluxe Rooms for wedding party', 'Both Alexandria Lawn & Colosseum Hall', 'Bridal Presidential Suite', 'Complimentary Food Tasting for 6']
      }
    ],
    availableDates: ['2026-12-17', '2026-12-18', '2027-01-22'],
    unavailableDates: ['2026-12-19', '2026-12-20']
  },
  {
    id: 'ven-003',
    userId: 'u-ven-003',
    businessName: 'Royal Peshwa Caterers',
    category: 'Catering',
    tagline: 'Authentic Maharashtrian & North Indian regal feasts',
    description: 'Serving traditional recipes passed down through generations. From classic Ukadiche Modak and Puran Poli to royal Awadhi Biryanis and live chaat counters.',
    city: 'Pune',
    address: 'Sadashiv Peth, Pune 411030',
    serviceArea: 'Pune, PCMC, Mumbai, Satara',
    startingPrice: 950,
    phone: '+91 94220 11223',
    email: 'info@royalpeshwacaterers.in',
    experienceYears: 20,
    rating: 4.7,
    reviewCount: 65,
    isVerified: true,
    verificationStatus: 'verified',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
    ],
    services: [
      {
        id: 'srv-004',
        vendorId: 'ven-003',
        title: 'Full Wedding Multi-Cuisine Buffet',
        description: 'Welcome drinks, 4 live counters, 6 main courses, dessert bar including traditional sweets.',
        startingPrice: 1200,
        inclusions: ['Uniformed staff', 'Chafing dishes & cutlery', 'Live tandoor and chaat counters', 'Mineral water setup'],
        active: true
      }
    ],
    packages: [
      {
        id: 'pkg-004',
        vendorId: 'ven-003',
        name: 'Maharaja Royal Feast (Per Plate)',
        description: 'Lavish spread including 4 appetizers, 3 live counters, 8 mains, and 4 specialty desserts.',
        price: 1450,
        isPopular: true,
        features: ['Live Jalebi & Rabdi counter', 'Authentic Puran Poli live stove', 'Mocktail & Coffee bar', 'Uniformed butler service']
      }
    ],
    availableDates: ['2026-12-18', '2026-12-25'],
    unavailableDates: []
  },
  {
    id: 'ven-004',
    userId: 'u-ven-004',
    businessName: 'Vriksh & Blooms Decorators',
    category: 'Decoration',
    tagline: 'Sustainable botanical mandaps, fairy-light canopies & royal stage sets',
    description: 'Award-winning wedding styling studio creating organic floral mandaps, floral chandeliers, brass thali decor, and illuminated entrance arches tailored to your palette.',
    city: 'Pune',
    address: 'Kalyani Nagar, Pune 411006',
    serviceArea: 'Pune, Mumbai, Lonavala',
    startingPrice: 120000,
    phone: '+91 99225 78901',
    email: 'hello@vrikshandblooms.com',
    experienceYears: 6,
    rating: 4.8,
    reviewCount: 31,
    isVerified: true,
    verificationStatus: 'verified',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80'
    ],
    services: [
      {
        id: 'srv-005',
        vendorId: 'ven-004',
        title: 'Floral Mandap & Stage Concept',
        description: 'Exotic Indian tuberose (rajnigandha), marigolds, and orchids with ambient warm focus lighting.',
        startingPrice: 150000,
        inclusions: ['4-pillar carved mandap', 'Floral backdrop (24x12 ft)', 'Hawan kund decor', 'Seating cushions with silk brocade'],
        active: true
      }
    ],
    packages: [
      {
        id: 'pkg-005',
        vendorId: 'ven-004',
        name: 'The Royal Marigold & Brass Set',
        description: 'Cohesive theme across Entrance, Walkway, Photo Booth, Mandap, and Dining Area.',
        price: 280000,
        isPopular: true,
        features: ['Grand floral entrance arch', 'Mandap with 5,000 fresh marigold strings', 'Fairy light tunnel (60 ft)', 'Photo-op booth with couple monogram']
      }
    ],
    availableDates: ['2026-12-18'],
    unavailableDates: ['2026-12-19']
  },
  {
    id: 'ven-005',
    userId: 'u-ven-005',
    businessName: 'Ananya Makeovers & Bridal Styling',
    category: 'Makeup',
    tagline: 'HD Airbrush bridal glow, saree draping & bespoke hair styling',
    description: 'Certified from London School of Makeup. Specializes in luminous bridal glam that lasts through long ceremony hours, intricate hair jewelry weaving, and traditional nauvari saree draping.',
    city: 'Pune',
    address: 'Aundh, Pune 411007',
    serviceArea: 'Pune, Mumbai',
    startingPrice: 18000,
    phone: '+91 97654 32109',
    email: 'ananya@ananyamakeover.in',
    experienceYears: 7,
    rating: 4.9,
    reviewCount: 54,
    isVerified: true,
    verificationStatus: 'verified',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80'
    ],
    services: [
      {
        id: 'srv-006',
        vendorId: 'ven-005',
        title: 'Bridal HD Makeup & Styling',
        description: 'Complete bridal look with Temptu airbrush base, false lashes, hair styling, and saree/lehenga draping.',
        startingPrice: 22000,
        inclusions: ['Premium international brands', 'Hairstyling with floral accessories', 'Saree / Dupatta pinning', 'Touch-up kit provided'],
        active: true
      }
    ],
    packages: [
      {
        id: 'pkg-006',
        vendorId: 'ven-005',
        name: 'Bridal Dream Trio (Sangeet + Wedding + Reception)',
        description: 'Three distinct customized looks for the bride plus trial session.',
        price: 55000,
        isPopular: true,
        features: ['3 Full Bridal Makeup looks', 'Pre-wedding skin consultation', 'Trial makeup session', 'Complimentary makeup for Mother of Bride']
      }
    ],
    availableDates: ['2026-12-18'],
    unavailableDates: []
  },
  // Budget-friendly alternative vendors for comparison & overrun savings
  {
    id: 'ven-006',
    userId: 'u-ven-006',
    businessName: 'ShutterMoments Studios',
    category: 'Photography',
    tagline: 'Affordable, heartfelt wedding memories for sensible budgets',
    description: 'A dedicated team of energetic photographers offering crisp traditional coverage and candid portraits at honest, budget-conscious rates without compromising on warmth or reliability.',
    city: 'Pune',
    address: 'Kothrud, Pune 411038',
    serviceArea: 'Pune, PCMC',
    startingPrice: 38000,
    phone: '+91 98901 23456',
    email: 'contact@shutterpmoments.in',
    experienceYears: 5,
    rating: 4.6,
    reviewCount: 28,
    isVerified: true,
    verificationStatus: 'verified',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80'
    ],
    services: [
      {
        id: 'srv-007',
        vendorId: 'ven-006',
        title: 'Wedding Day Essential Photography',
        description: '1 Candid + 1 Traditional Photographer for 8 hours with digital album deliverable.',
        startingPrice: 38000,
        inclusions: ['250 high-res edited pictures', 'Digital delivery in 2 weeks', 'Full raw dump provided'],
        active: true
      }
    ],
    packages: [
      {
        id: 'pkg-007',
        vendorId: 'ven-006',
        name: 'Smart Value Couple Package',
        description: 'Full day coverage with photo album included.',
        price: 52000,
        features: ['1 Traditional + 1 Candid', 'Coffee-table album (150 photos)', 'Short highlight reel']
      }
    ],
    availableDates: ['2026-12-18', '2026-12-19'],
    unavailableDates: []
  },
  {
    id: 'ven-007',
    userId: 'u-ven-007',
    businessName: 'Utsav Mandap & Floral Arts',
    category: 'Decoration',
    tagline: 'Traditional elegance with budget-conscious floral setups',
    description: 'Providing classic marigold canopies, fabric drapes, traditional entrance arches, and budget-friendly stage setups across Pune & Maharashtra.',
    city: 'Pune',
    address: 'Swargate, Pune 411042',
    serviceArea: 'Pune, PCMC, Rural Pune',
    startingPrice: 65000,
    phone: '+91 98221 98765',
    email: 'utsavmandap@gmail.com',
    experienceYears: 12,
    rating: 4.5,
    reviewCount: 38,
    isVerified: false,
    verificationStatus: 'pending',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80'
    ],
    services: [
      {
        id: 'srv-008',
        vendorId: 'ven-007',
        title: 'Traditional Floral Mandap setup',
        description: 'Complete mandap setup with marigold hangings, brass diyas, and backdrop fabric.',
        startingPrice: 65000,
        inclusions: ['Mandap setup with fresh flowers', 'Red carpet entrance', 'Hawan kund enclosure'],
        active: true
      }
    ],
    packages: [
      {
        id: 'pkg-008',
        vendorId: 'ven-007',
        name: 'Classic Maharashtrian Mandap & Stage',
        description: 'All essential decor for ceremony and dinner area.',
        price: 110000,
        features: ['Mandap with fresh marigold + jasmine', 'Reception backdrop with LED names', 'Entrance floral arch']
      }
    ],
    availableDates: ['2026-12-18'],
    unavailableDates: []
  },
  {
    id: 'ven-008',
    userId: 'u-ven-008',
    businessName: 'Sangeet Beats DJ & Sound Production',
    category: 'Music & DJ',
    tagline: 'High-energy Bollywood, Punjabi & Regional wedding music setups',
    description: 'State of the art JBL line array sound systems, intelligent beam moving heads, haze machines, and master DJs who keep the dance floor packed until the early hours.',
    city: 'Pune',
    address: 'Baner, Pune 411045',
    serviceArea: 'Pune, Mumbai, Lonavala',
    startingPrice: 40000,
    phone: '+91 99700 88776',
    email: 'bookings@sangeetbeats.com',
    experienceYears: 9,
    rating: 4.8,
    reviewCount: 47,
    isVerified: true,
    verificationStatus: 'verified',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80'
    ],
    services: [
      {
        id: 'srv-009',
        vendorId: 'ven-008',
        title: 'Sangeet Night DJ & Intelligent Lighting',
        description: 'Professional DJ with console, 4 JBL tops + 2 subs, 8 sharpie beams, and CO2 blast.',
        startingPrice: 45000,
        inclusions: ['5 hours performance', 'Wireless microphones for anchors', 'Sound engineer on site'],
        active: true
      }
    ],
    packages: [
      {
        id: 'pkg-009',
        vendorId: 'ven-008',
        name: 'The Big Sangeet Bash',
        description: 'Full concert-grade experience for up to 500 guests.',
        price: 80000,
        features: ['JBL Line Array setup', 'LED wall (12x8 ft) for visual backdrop', 'Dry ice fog entry for bride & groom', 'Celebrity DJ performance']
      }
    ],
    availableDates: ['2026-12-17', '2026-12-18'],
    unavailableDates: []
  }
];

export const INITIAL_EXPENSES: Expense[] = [
  {
    id: 'exp-001',
    weddingId: 'wed-001',
    title: 'The Corinthians Resort - Venue Hire & Deposit',
    category: 'Venue',
    vendorId: 'ven-002',
    vendorName: 'The Corinthians Resort & Club',
    estimatedCost: 850000,
    actualCost: 850000,
    paidAmount: 300000,
    dueDate: '2026-11-15',
    paymentStatus: 'partially_paid',
    notes: 'Advance paid. Balance due 30 days prior to event.',
    createdAt: '2026-09-02T12:00:00Z',
  },
  {
    id: 'exp-002',
    weddingId: 'wed-001',
    title: 'Royal Peshwa Caterers (350 Guests)',
    category: 'Catering',
    vendorId: 'ven-003',
    vendorName: 'Royal Peshwa Caterers',
    estimatedCost: 500000,
    actualCost: 507500, // 350 * ₹1450
    paidAmount: 150000,
    dueDate: '2026-11-30',
    paymentStatus: 'partially_paid',
    notes: 'Includes Maharaja feast and welcome live stations.',
    createdAt: '2026-09-05T14:30:00Z',
  },
  {
    id: 'exp-003',
    weddingId: 'wed-001',
    title: 'Rohan Deshpande - 2-Day Photography & Cinema',
    category: 'Photography',
    vendorId: 'ven-001',
    vendorName: 'Rohan Deshpande Photography',
    estimatedCost: 150000,
    actualCost: 150000,
    paidAmount: 50000,
    dueDate: '2026-12-01',
    paymentStatus: 'partially_paid',
    notes: 'Booking token transferred. Final balance on wedding day.',
    createdAt: '2026-09-10T16:00:00Z',
  },
  {
    id: 'exp-004',
    weddingId: 'wed-001',
    title: 'Vriksh & Blooms - Royal Marigold Mandap & Decor',
    category: 'Decoration',
    vendorId: 'ven-004',
    vendorName: 'Vriksh & Blooms Decorators',
    estimatedCost: 250000,
    actualCost: 280000,
    paidAmount: 80000,
    dueDate: '2026-11-25',
    paymentStatus: 'partially_paid',
    notes: 'Added entrance flower tunnel (+₹30,000).',
    createdAt: '2026-09-12T11:00:00Z',
  },
  {
    id: 'exp-005',
    weddingId: 'wed-001',
    title: 'Ananya Makeovers - Bridal Trio Package',
    category: 'Makeup',
    vendorId: 'ven-005',
    vendorName: 'Ananya Makeovers & Bridal Styling',
    estimatedCost: 55000,
    actualCost: 55000,
    paidAmount: 20000,
    dueDate: '2026-12-10',
    paymentStatus: 'partially_paid',
    notes: 'Advance paid. Trial scheduled for Nov 10.',
    createdAt: '2026-09-15T15:20:00Z',
  },
  {
    id: 'exp-006',
    weddingId: 'wed-001',
    title: 'Bridal Paithani & Groom Kurta Set',
    category: 'Clothing',
    vendorName: 'Kala Niketan Silk Heritage',
    estimatedCost: 180000,
    actualCost: 195000,
    paidAmount: 195000,
    dueDate: '2026-10-01',
    paymentStatus: 'paid',
    notes: 'Pure zari pure silk authentic Yeola Paithani.',
    createdAt: '2026-09-20T10:00:00Z',
  },
  {
    id: 'exp-007',
    weddingId: 'wed-001',
    title: 'Sangeet Beats DJ & Sound Console',
    category: 'Music & DJ',
    vendorId: 'ven-008',
    vendorName: 'Sangeet Beats DJ',
    estimatedCost: 80000,
    actualCost: 80000,
    paidAmount: 30000,
    dueDate: '2026-12-05',
    paymentStatus: 'partially_paid',
    notes: 'Includes LED backdrop screen.',
    createdAt: '2026-09-22T09:15:00Z',
  }
];

export const INITIAL_TASKS: WeddingTask[] = [
  {
    id: 'tsk-001',
    weddingId: 'wed-001',
    title: 'Finalize and book wedding venue deposit',
    description: 'Signed agreement with Corinthians and transferred initial ₹3,00,000 advance.',
    category: 'Venue',
    dueDate: '2026-09-15',
    priority: 'high',
    status: 'completed',
    completedAt: '2026-09-14T18:00:00Z'
  },
  {
    id: 'tsk-002',
    weddingId: 'wed-001',
    title: 'Select wedding photographer & videographer team',
    description: 'Booked Rohan Deshpande Photography after review of Pune portfolio.',
    category: 'Photography',
    dueDate: '2026-09-25',
    priority: 'high',
    status: 'completed',
    completedAt: '2026-09-24T12:00:00Z'
  },
  {
    id: 'tsk-003',
    weddingId: 'wed-001',
    title: 'Finalize tasting session with Royal Peshwa Caterers',
    description: 'Taste 6 desserts and live chaat options with parents.',
    category: 'Catering',
    dueDate: '2026-10-25',
    priority: 'high',
    status: 'in_progress'
  },
  {
    id: 'tsk-004',
    weddingId: 'wed-001',
    title: 'Send digital save-the-date cards to VIP relatives & friends',
    description: 'WhatsApp invitation video and digital RSVP link.',
    category: 'Invitations',
    dueDate: '2026-10-30',
    priority: 'medium',
    status: 'todo'
  },
  {
    id: 'tsk-005',
    weddingId: 'wed-001',
    title: 'Bridal makeup trial with Ananya',
    description: 'Test airbrush base and hairstyle options for wedding and reception.',
    category: 'Makeup',
    dueDate: '2026-11-10',
    priority: 'medium',
    status: 'todo'
  },
  {
    id: 'tsk-006',
    weddingId: 'wed-001',
    title: 'Mandap & stage floral walkthrough at Corinthians venue',
    description: 'Meet Vriksh & Blooms at the lawn to measure stage width & verify night lighting.',
    category: 'Decoration',
    dueDate: '2026-11-15',
    priority: 'high',
    status: 'todo'
  },
  {
    id: 'tsk-007',
    weddingId: 'wed-001',
    title: 'Collate final guest RSVP headcounts for catering audit',
    description: 'Confirm counts for lodging rooms and buffet plates.',
    category: 'General',
    dueDate: '2026-12-01',
    priority: 'high',
    status: 'todo'
  }
];

export const INITIAL_GUESTS: Guest[] = [
  {
    id: 'gst-001',
    weddingId: 'wed-001',
    name: 'Suresh & Sunita Kulkarni',
    group: 'Bride Family',
    phone: '+91 98220 12345',
    email: 'suresh.k@gmail.com',
    rsvpStatus: 'confirmed',
    plusOnes: 2,
    dietaryRestrictions: 'Pure Vegetarian (Jain)',
    tableNumber: 'Table 1 - Family VIP'
  },
  {
    id: 'gst-002',
    weddingId: 'wed-001',
    name: 'Rajesh & Kavita Sharma',
    group: 'Groom Family',
    phone: '+91 98110 54321',
    email: 'sharma.rajesh@outlook.com',
    rsvpStatus: 'confirmed',
    plusOnes: 3,
    dietaryRestrictions: 'Vegetarian',
    tableNumber: 'Table 2 - Family VIP'
  },
  {
    id: 'gst-003',
    weddingId: 'wed-001',
    name: 'Vikram Joshi',
    group: 'Friends',
    phone: '+91 99234 56789',
    email: 'vikram.j@techcorp.in',
    rsvpStatus: 'confirmed',
    plusOnes: 1,
    tableNumber: 'Table 6 - College Friends'
  },
  {
    id: 'gst-004',
    weddingId: 'wed-001',
    name: 'Pooja Iyer',
    group: 'Friends',
    phone: '+91 98810 99887',
    email: 'pooja.iyer@gmail.com',
    rsvpStatus: 'pending',
    plusOnes: 0
  },
  {
    id: 'gst-005',
    weddingId: 'wed-001',
    name: 'Anand Deshmukh & Family',
    group: 'Colleagues',
    phone: '+91 97650 33445',
    rsvpStatus: 'pending',
    plusOnes: 3
  },
  {
    id: 'gst-006',
    weddingId: 'wed-001',
    name: 'Dr. Ashok Patwardhan',
    group: 'VIP',
    phone: '+91 94225 11000',
    rsvpStatus: 'confirmed',
    plusOnes: 1,
    tableNumber: 'Table 1 - Family VIP'
  }
];

export const INITIAL_BOOKINGS: Enquiry[] = [
  {
    id: 'enq-001',
    weddingId: 'wed-001',
    customerId: 'cust-001',
    customerName: 'Aarav & Meera',
    customerPhone: '+91 98220 99999',
    customerEmail: 'aarav.meera@marryon.app',
    vendorId: 'ven-001',
    vendorName: 'Rohan Deshpande Photography',
    vendorCategory: 'Photography',
    proposedDate: '2026-12-18',
    guestCount: 350,
    estimatedBudget: 150000,
    selectedPackage: 'Royal Heritage 2-Day Package',
    message: 'We loved your work at Corinthians last winter. We want full 2-day coverage for Sangeet on Dec 17 evening and Wedding on Dec 18 morning.',
    quotationAmount: 150000,
    quotationNotes: 'Special festive inclusion: Complimentary aerial drone shots & photo album upgrade.',
    status: 'confirmed',
    createdAt: '2026-09-08T10:00:00Z',
    updatedAt: '2026-09-10T16:00:00Z'
  },
  {
    id: 'enq-002',
    weddingId: 'wed-001',
    customerId: 'cust-001',
    customerName: 'Aarav & Meera',
    customerPhone: '+91 98220 99999',
    customerEmail: 'aarav.meera@marryon.app',
    vendorId: 'ven-004',
    vendorName: 'Vriksh & Blooms Decorators',
    vendorCategory: 'Decoration',
    proposedDate: '2026-12-18',
    guestCount: 350,
    estimatedBudget: 250000,
    selectedPackage: 'The Royal Marigold & Brass Set',
    message: 'Looking for a sustainable marigold and brass aesthetic with warm fairy lights for Alexandria Lawn.',
    quotationAmount: 280000,
    quotationNotes: 'Quotation includes custom entrance canopy + stage backdrop.',
    status: 'accepted',
    createdAt: '2026-09-11T12:00:00Z',
    updatedAt: '2026-09-12T11:00:00Z'
  },
  {
    id: 'enq-003',
    weddingId: 'wed-001',
    customerId: 'cust-001',
    customerName: 'Aarav & Meera',
    customerPhone: '+91 98220 99999',
    customerEmail: 'aarav.meera@marryon.app',
    vendorId: 'ven-008',
    vendorName: 'Sangeet Beats DJ & Sound Production',
    vendorCategory: 'Music & DJ',
    proposedDate: '2026-12-17',
    guestCount: 200,
    estimatedBudget: 80000,
    selectedPackage: 'The Big Sangeet Bash',
    message: 'Need DJ, sound, lighting, and dry-ice fog for couple dance entry on Dec 17 evening.',
    quotationAmount: 80000,
    status: 'confirmed',
    createdAt: '2026-09-21T14:00:00Z',
    updatedAt: '2026-09-22T09:15:00Z'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-001',
    vendorId: 'ven-001',
    customerId: 'c-old-1',
    customerName: 'Tanvi & Rohit Sane',
    rating: 5,
    comment: 'Rohan and his crew were exceptional! They blended into our ceremonies so seamlessly, never once made us pose uncomfortably, and the wedding teaser made both our families tear up. Worth every single rupee!',
    eventDate: '2025-11-24',
    createdAt: '2025-12-05T14:00:00Z'
  },
  {
    id: 'rev-002',
    vendorId: 'ven-001',
    customerId: 'c-old-2',
    customerName: 'Neha Deshpande',
    rating: 5,
    comment: 'Super professional, punctual, and delivered our photo albums 2 weeks ahead of scheduled timeline. Rohan’s eye for lighting during golden hour is magical.',
    eventDate: '2026-01-18',
    createdAt: '2026-02-02T10:00:00Z'
  },
  {
    id: 'rev-003',
    vendorId: 'ven-002',
    customerId: 'c-old-3',
    customerName: 'Gaurav Agarwal',
    rating: 5,
    comment: 'Our guests still talk about the stunning Egyptian ambience at Corinthians. The staff was courteous and handling 700 guests felt effortless.',
    eventDate: '2026-02-14',
    createdAt: '2026-02-20T11:00:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-001',
    userId: 'cust-001',
    title: 'Booking Confirmed!',
    message: 'Rohan Deshpande Photography accepted and confirmed your wedding booking for 18 Dec 2026.',
    type: 'booking',
    link: '/app/bookings',
    read: false,
    createdAt: '2026-09-10T16:05:00Z'
  },
  {
    id: 'notif-002',
    userId: 'cust-001',
    title: 'Smart Savings Alert 💡',
    message: 'Your decor estimate was revised. You can save up to ₹1,40,000 by comparing with verified florists in Pune.',
    type: 'budget',
    link: '/app/budget',
    read: false,
    createdAt: '2026-09-12T11:15:00Z'
  },
  {
    id: 'notif-003',
    userId: 'cust-001',
    title: 'Upcoming Payment Deadline',
    message: 'The Corinthians venue interim installment of ₹5,50,000 is due on 15 Nov 2026.',
    type: 'budget',
    link: '/app/budget/expenses',
    read: true,
    createdAt: '2026-10-01T09:00:00Z'
  }
];

export const INITIAL_VERIFICATIONS: VerificationRequest[] = [
  {
    id: 'ver-001',
    vendorId: 'ven-001',
    businessName: 'Rohan Deshpande Photography',
    category: 'Photography',
    submittedAt: '2026-08-10T11:00:00Z',
    documentType: 'GST_Certificate',
    documentName: 'GSTIN_27AAAPD9876Q1Z5.pdf',
    status: 'verified',
    reviewerNotes: 'Verified against Maharashtra GST portal. Active registration and valid tax compliance.',
    reviewedAt: '2026-08-11T14:30:00Z',
    reviewedBy: 'Admin Moderator'
  },
  {
    id: 'ver-002',
    vendorId: 'ven-007',
    businessName: 'Utsav Mandap & Floral Arts',
    category: 'Decoration',
    submittedAt: '2026-10-12T09:30:00Z',
    documentType: 'Business_License',
    documentName: 'Pune_ShopAct_License_2026.pdf',
    status: 'pending',
    reviewerNotes: 'Awaiting administrator verification review.',
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud-001',
    adminId: 'adm-001',
    adminName: 'SuperAdmin',
    action: 'VENDOR_VERIFIED',
    target: 'Rohan Deshpande Photography (ven-001)',
    details: 'Approved GST Certificate and assigned Verified Partner badge.',
    timestamp: '2026-08-11T14:30:00Z'
  },
  {
    id: 'aud-002',
    adminId: 'adm-001',
    adminName: 'SuperAdmin',
    action: 'PLATFORM_SETTINGS_UPDATED',
    target: 'Currency & Commission',
    details: 'Set default base currency to INR (₹) and enabled Smart Overrun Savings Engine.',
    timestamp: '2026-09-01T08:00:00Z'
  }
];

export const INITIAL_PLATFORM_USERS: PlatformUser[] = [
  {
    id: 'cust-001',
    email: 'aarav.meera@marryon.app',
    name: 'Aarav & Meera',
    role: 'customer',
    status: 'active',
    city: 'Pune',
    phone: '+91 98220 99999',
    bookingsCount: 3,
    lastLogin: '2026-10-15T18:30:00Z',
    createdAt: '2026-09-01T10:00:00Z'
  },
  {
    id: 'cust-002',
    email: 'priya.karan@gmail.com',
    name: 'Priya & Karan',
    role: 'customer',
    status: 'active',
    city: 'Mumbai',
    phone: '+91 98111 22334',
    bookingsCount: 1,
    lastLogin: '2026-10-14T11:20:00Z',
    createdAt: '2026-09-15T14:00:00Z'
  },
  {
    id: 'cust-003',
    email: 'ananya.rohit@outlook.com',
    name: 'Ananya & Rohit',
    role: 'customer',
    status: 'active',
    city: 'Jaipur',
    phone: '+91 97222 33445',
    bookingsCount: 0,
    lastLogin: '2026-10-12T09:10:00Z',
    createdAt: '2026-10-01T09:30:00Z'
  },
  {
    id: 'u-ven-001',
    email: 'rohan@deshpandephoto.com',
    name: 'Rohan Deshpande (Photography)',
    role: 'vendor',
    status: 'active',
    city: 'Pune',
    phone: '+91 98230 45678',
    bookingsCount: 8,
    lastLogin: '2026-10-15T20:15:00Z',
    createdAt: '2026-08-01T10:00:00Z'
  },
  {
    id: 'u-ven-002',
    email: 'contact@tajheritage.com',
    name: 'The Corinthians Palace & Resort',
    role: 'vendor',
    status: 'active',
    city: 'Pune',
    phone: '+91 20 2697 1234',
    bookingsCount: 12,
    lastLogin: '2026-10-15T17:00:00Z',
    createdAt: '2026-07-15T11:00:00Z'
  },
  {
    id: 'adm-001',
    email: 'admin@marryon.app',
    name: 'MarryOn Operations Admin',
    role: 'admin',
    status: 'active',
    city: 'Mumbai',
    phone: '+91 98000 11223',
    lastLogin: '2026-10-16T02:00:00Z',
    createdAt: '2026-07-01T10:00:00Z'
  }
];

export const INITIAL_REPORTS: ModerationReport[] = [
  {
    id: 'rep-001',
    type: 'review',
    targetId: 'rev-001',
    targetTitle: 'Review on Rohan Deshpande Photography',
    reporterName: 'Vendor Partner',
    reporterEmail: 'rohan@deshpandephoto.com',
    reason: 'Client mistakenly submitted feedback meant for their previous caterer.',
    status: 'pending',
    createdAt: '2026-10-10T12:00:00Z'
  },
  {
    id: 'rep-002',
    type: 'vendor',
    targetId: 'ven-005',
    targetTitle: 'Virasat Luxury Decorators',
    reporterName: 'Sunita Rao',
    reporterEmail: 'sunita@gmail.com',
    reason: 'Listing displays sample photos that need copyright attribution confirmation.',
    status: 'pending',
    createdAt: '2026-10-11T16:45:00Z'
  }
];

export const INITIAL_PLATFORM_SETTINGS: PlatformSettings = {
  platformName: 'MarryOn — Smart Wedding Planner',
  supportEmail: 'support@marryon.app',
  commissionRate: 5.0,
  enableAiPlanner: true,
  autoApproveReviews: false,
  requireVendorGst: true,
  maintenanceMode: false,
  currency: 'INR (₹)'
};

