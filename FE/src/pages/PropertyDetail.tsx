import { useState, useLayoutEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Map, MapMarker, MapControls } from '@/components/ui/map';
import {
  MapPin, Bed, Bath, Maximize, Heart, Share2, Star, Phone, Mail,
  ChevronLeft, ChevronRight, Calendar, Shield, Building2, Compass,
  Car, Layers, CheckCircle, ArrowLeft, MessageCircle, Image, CalendarCheck,
} from 'lucide-react';
import { motion } from 'framer-motion';

// ─── Extended mock data ──────────────────────────────────
const ALL_PROPERTIES = [
  {
    id: 1,
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop',
    ],
    price: '3.2 billion',
    title: 'Luxury 2BR Apartment Vinhomes Central Park',
    address: 'Binh Thanh District, Ho Chi Minh City',
    beds: 2,
    baths: 2,
    area: 85,
    type: 'Apartment',
    yearBuilt: 2022,
    floor: '15th / 25 floors',
    facing: 'South-East',
    legal: 'Sổ hồng',
    furniture: 'Full furnished',
    parking: '1 Space',
    status: 'Ready to move in',
    description: 'Experience luxury living in this stunning 2-bedroom apartment at Vinhomes Central Park. Featuring floor-to-ceiling windows with panoramic city views, modern Italian kitchen, and premium finishes throughout. The apartment comes fully furnished with designer furniture and smart home features. Building amenities include infinity pool, gym, spa, and 24/7 concierge.',
    features: ['Swimming Pool', 'Gym', 'Smart Home', '24/7 Security', 'Sky Garden', 'Playground'],
    photos: [
      { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop', caption: 'Spacious living room with natural lighting and panoramic city views' },
      { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop', caption: 'Modern open kitchen with premium Italian appliances and marble countertops' },
      { src: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop', caption: 'Master bedroom with private balcony facing South-East for cool breeze' },
      { src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&auto=format&fit=crop', caption: 'Infinity pool on the rooftop with stunning skyline views' },
      { src: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&auto=format&fit=crop', caption: 'Second bedroom with built-in wardrobe and work desk area' },
    ],
    lat: 10.7944,
    lng: 106.7216,
    agent: {
      name: 'Sarah Nguyen',
      avatar: '',
      phone: '0901 234 567',
      email: 'sarah.nguyen@bluesky.vn',
      rating: 4.9,
      reviews: 128,
      listings: 45,
      experience: '5 years',
    },
  },
  {
    id: 2,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop',
    ],
    price: '8.5 billion',
    title: 'Garden Villa Ecopark',
    address: 'Van Giang, Hung Yen',
    beds: 4,
    baths: 3,
    area: 200,
    type: 'Villa',
    yearBuilt: 2021,
    floor: '3 floors',
    facing: 'North-East',
    legal: 'Sổ hồng',
    furniture: 'Full furnished',
    parking: '2 Spaces',
    status: 'Ready to move in',
    description: 'A magnificent garden villa nestled in the prestigious Ecopark township. This 4-bedroom villa features a private garden, spacious living areas, and modern architecture that blends harmoniously with nature. The property includes a dedicated parking area, outdoor BBQ space, and access to Ecopark\'s world-class amenities.',
    features: ['Private Garden', 'BBQ Area', 'Garage', 'Smart Home', '24/7 Security', 'Lake View'],
    photos: [
      { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop', caption: 'Grand entrance with landscaped front garden and water feature' },
      { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop', caption: 'Open-plan living and dining area with double-height ceiling' },
      { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop', caption: 'Private backyard garden with BBQ station and outdoor seating' },
      { src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop', caption: 'Spacious master suite with walk-in closet and ensuite bathroom' },
    ],
    lat: 20.9489,
    lng: 105.9566,
    agent: {
      name: 'Minh Tran',
      avatar: '',
      phone: '0912 345 678',
      email: 'minh.tran@bluesky.vn',
      rating: 4.8,
      reviews: 95,
      listings: 32,
      experience: '7 years',
    },
  },
  {
    id: 3,
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
    ],
    price: '5.8 billion',
    title: 'Phu My Hung Townhouse',
    address: 'District 7, Ho Chi Minh City',
    beds: 3,
    baths: 3,
    area: 120,
    type: 'Townhouse',
    yearBuilt: 2023,
    floor: '4 floors',
    facing: 'West',
    legal: 'Sổ hồng',
    furniture: 'Basic furnished',
    parking: '1 Space',
    status: 'Ready to move in',
    description: 'Modern townhouse in the heart of Phu My Hung urban area, District 7. This beautifully designed 3-bedroom townhouse offers contemporary living with easy access to international schools, shopping malls, and restaurants. Features include an open-plan living area, rooftop terrace, and a compact front garden.',
    features: ['Rooftop Terrace', 'Front Garden', 'Garage', '24/7 Security', 'Near International School'],
    photos: [
      { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop', caption: 'Bright living room with minimalist design and wooden accents' },
      { src: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&auto=format&fit=crop', caption: 'Rooftop terrace with panoramic views of Phu My Hung skyline' },
      { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop', caption: 'Contemporary kitchen with integrated dining counter' },
    ],
    lat: 10.7298,
    lng: 106.7220,
    agent: {
      name: 'Linh Pham',
      avatar: '',
      phone: '0923 456 789',
      email: 'linh.pham@bluesky.vn',
      rating: 4.7,
      reviews: 67,
      listings: 28,
      experience: '4 years',
    },
  },
  {
    id: 4,
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop',
    ],
    price: '2.1 billion',
    title: '1BR River View Apartment Masteri Thao Dien',
    address: 'Thu Duc City (District 2), HCMC',
    beds: 1,
    baths: 1,
    area: 50,
    type: 'Apartment',
    yearBuilt: 2020,
    floor: '22nd / 40 floors',
    facing: 'South',
    legal: 'Sổ hồng',
    furniture: 'Full furnished',
    parking: '1 Space',
    status: 'Ready to move in',
    description: 'Charming 1-bedroom apartment with stunning Saigon River views at Masteri Thao Dien. Ideal for singles or young couples, this unit features a modern open kitchen, premium bathroom fixtures, and a cozy balcony perfect for relaxing while watching the river. Building offers resort-style pool, gym, and co-working spaces.',
    features: ['River View', 'Swimming Pool', 'Gym', 'Co-working Space', '24/7 Security'],
    photos: [
      { src: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop', caption: 'Cozy bedroom with river-facing balcony and warm lighting' },
      { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop', caption: 'Compact yet fully-equipped modern kitchen with bar counter' },
      { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop', caption: 'Living area with floor-to-ceiling windows overlooking Saigon River' },
    ],
    lat: 10.8020,
    lng: 106.7416,
    agent: {
      name: 'Sarah Nguyen',
      avatar: '',
      phone: '0901 234 567',
      email: 'sarah.nguyen@bluesky.vn',
      rating: 4.9,
      reviews: 128,
      listings: 45,
      experience: '5 years',
    },
  },
  {
    id: 5,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop',
    ],
    price: '12.5 billion',
    title: 'Compound Villa An Phu An Khanh',
    address: 'Thu Duc City (District 2), HCMC',
    beds: 5,
    baths: 4,
    area: 350,
    type: 'Villa',
    yearBuilt: 2019,
    floor: '3 floors',
    facing: 'East',
    legal: 'Sổ hồng',
    furniture: 'Full furnished',
    parking: '3 Spaces',
    status: 'Ready to move in',
    description: 'Prestigious compound villa in An Phu An Khanh, Thu Duc City. This grand 5-bedroom villa sits on a generous 350m² plot within a gated community with 24/7 security. Features include a private swimming pool, landscaped garden, spacious entertainment area, and premium Italian marble flooring throughout.',
    features: ['Private Pool', 'Garden', 'Garage', 'Smart Home', '24/7 Security', 'Compound', 'BBQ Area'],
    photos: [
      { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop', caption: 'Private swimming pool surrounded by tropical landscaping' },
      { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop', caption: 'Grand living room with Italian marble flooring and chandelier' },
      { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop', caption: 'Exterior view of the villa within the secure compound' },
      { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop', caption: 'Spacious entertainment area with garden access and outdoor kitchen' },
    ],
    lat: 10.7958,
    lng: 106.7478,
    agent: {
      name: 'Duc Le',
      avatar: '',
      phone: '0934 567 890',
      email: 'duc.le@bluesky.vn',
      rating: 5.0,
      reviews: 156,
      listings: 52,
      experience: '10 years',
    },
  },
  {
    id: 6,
    images: [
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595435193556-32af683b9e92?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800&auto=format&fit=crop',
    ],
    price: '1.8 billion',
    title: 'Residential Land Binh Chanh',
    address: 'Binh Chanh, Ho Chi Minh City',
    beds: 0,
    baths: 0,
    area: 100,
    type: 'Land',
    yearBuilt: 0,
    floor: 'N/A',
    facing: 'South',
    legal: 'Sổ đỏ',
    furniture: 'N/A',
    parking: 'N/A',
    status: 'Available',
    description: 'Prime residential land plot in the fast-developing Binh Chanh district. This 100m² plot is perfectly positioned near the upcoming metro line extension and major road infrastructure projects. Ideal for building your dream home or as a strategic investment as prices in this area are projected to increase 15-20% annually.',
    features: ['Near Metro Line', 'Road Access', 'Residential Zone', 'Clean Legal Docs'],
    photos: [
      { src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop', caption: 'Aerial view of the land plot and surrounding development area' },
      { src: 'https://images.unsplash.com/photo-1595435193556-32af683b9e92?w=800&auto=format&fit=crop', caption: 'Road access to the property with new infrastructure nearby' },
      { src: 'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800&auto=format&fit=crop', caption: 'Neighboring residential area showing completed developments' },
    ],
    lat: 10.6697,
    lng: 106.5963,
    agent: {
      name: 'Hoa Vu',
      avatar: '',
      phone: '0945 678 901',
      email: 'hoa.vu@bluesky.vn',
      rating: 4.6,
      reviews: 43,
      listings: 18,
      experience: '3 years',
    },
  },
];

// ─── Main Page Component ─────────────────────────────────
const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'details'>('overview');
  const [isSaved, setIsSaved] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [id]);

  const property = ALL_PROPERTIES.find(p => p.id === Number(id));

  if (!property) {
    return (
      <div className="min-h-screen bg-[#F6F7F9]">
        <Header />
        <div className="pt-28 pb-16 max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="text-center py-20">
            <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-800 font-['Inter'] mb-2">Property Not Found</h1>
            <p className="text-slate-500 mb-6">The property you're looking for doesn't exist or has been removed.</p>
            <Link to="/">
              <Button className="h-11 px-6"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Home</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const agent = property.agent;
  const detailRows = [
    { label: 'Property Type', value: property.type, icon: Building2 },
    { label: 'Year Built', value: property.yearBuilt || 'N/A', icon: Calendar },
    { label: 'Floor', value: property.floor, icon: Layers },
    { label: 'Facing', value: property.facing, icon: Compass },
    { label: 'Parking', value: property.parking, icon: Car },
    { label: 'Legal Status', value: property.legal, icon: Shield },
    { label: 'Furniture', value: property.furniture, icon: CheckCircle },
    { label: 'Status', value: property.status, icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-[#F6F7F9] font-['Josefin_Sans']">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;600;700&display=swap');`}</style>
      <Header />

      <div role="main" className="pt-24 pb-16">
        {/* Breadcrumb */}
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 mb-6">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="hover:text-teal-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/listings" className="hover:text-teal-600 transition-colors">Listings</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold truncate max-w-[300px]">{property.title}</span>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* ════════ LEFT COLUMN ════════ */}
            <div className="flex-1 min-w-0">

              {/* ─── Image Gallery ─── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                {/* Main Image */}
                <div className="relative rounded-2xl overflow-hidden mb-3 group">
                  <img
                    src={property.images[activeImage]}
                    alt={property.title}
                    className="w-full h-[320px] md:h-[460px] object-cover transition-transform duration-500"
                  />
                  {/* Nav arrows */}
                  <button
                    onClick={() => setActiveImage(i => i === 0 ? property.images.length - 1 : i - 1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-700" />
                  </button>
                  <button
                    onClick={() => setActiveImage(i => i === property.images.length - 1 ? 0 : i + 1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5 text-slate-700" />
                  </button>
                  {/* Actions */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all cursor-pointer">
                      <Share2 className="w-5 h-5 text-slate-600" />
                    </button>
                    <button
                      onClick={() => setIsSaved(!isSaved)}
                      className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all cursor-pointer"
                    >
                      <Heart className={`w-5 h-5 ${isSaved ? 'text-red-500 fill-red-500' : 'text-slate-600'}`} />
                    </button>
                  </div>
                  {/* Image counter */}
                  <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
                    {activeImage + 1} / {property.images.length}
                  </div>
                </div>

                {/* Thumbnails — show first 3 only */}
                <div className="flex gap-2">
                  {property.images.slice(0, 3).map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative rounded-xl overflow-hidden flex-1 h-20 cursor-pointer transition-all ${
                        activeImage === i
                          ? 'ring-2 ring-teal-500 ring-offset-2'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* ─── Title & Price ─── */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 mb-6"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-teal-50 text-teal-700 mb-3">
                      {property.type}
                    </span>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 font-['Inter'] leading-tight">
                      {property.title}
                    </h1>
                  </div>
                  <div className="flex-shrink-0">
                    <p className="text-2xl md:text-3xl font-bold text-teal-700 font-['Inter'] whitespace-nowrap">
                      {property.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-5">
                  <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span>{property.address}</span>
                </div>

                {/* Specs row */}
                <div className="flex flex-wrap gap-3">
                  {property.beds > 0 && (
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5">
                      <Bed className="w-4 h-4 text-teal-600" />
                      <span className="text-sm font-semibold text-slate-700">{property.beds} Bedrooms</span>
                    </div>
                  )}
                  {property.baths > 0 && (
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5">
                      <Bath className="w-4 h-4 text-teal-600" />
                      <span className="text-sm font-semibold text-slate-700">{property.baths} Bathrooms</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5">
                    <Maximize className="w-4 h-4 text-teal-600" />
                    <span className="text-sm font-semibold text-slate-700">{property.area} m²</span>
                  </div>
                </div>
              </motion.div>

              {/* ─── Tabs: Overview / Details ─── */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 mb-6"
              >
                <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-6">
                  {(['overview', 'details'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-2.5 text-sm font-bold rounded-lg capitalize transition-all cursor-pointer ${
                        activeTab === tab
                          ? 'bg-white text-teal-700 shadow-sm'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-['Inter'] mb-3">Description</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">{property.description}</p>

                    <h3 className="text-lg font-bold text-slate-900 font-['Inter'] mb-3">Features & Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {property.features.map(f => (
                        <span key={f} className="inline-flex items-center gap-1.5 text-sm font-semibold bg-teal-50 text-teal-700 px-3 py-1.5 rounded-full">
                          <CheckCircle className="w-3.5 h-3.5" />
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'details' && (
                  <div className="space-y-0">
                    {detailRows.map((row, i) => {
                      const Icon = row.icon;
                      return (
                        <div
                          key={row.label}
                          className={`flex items-center justify-between py-3.5 ${
                            i < detailRows.length - 1 ? 'border-b border-slate-100' : ''
                          }`}
                        >
                          <div className="flex items-center gap-2.5 text-slate-500">
                            <Icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{row.label}</span>
                          </div>
                          <span className="text-sm font-bold text-slate-800">{String(row.value)}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>

              {/* ─── Property Photos ─── */}
              {property.photos && property.photos.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 mb-6"
                >
                  <h3 className="text-lg font-bold text-slate-900 font-['Inter'] mb-4 flex items-center gap-2">
                    <Image className="w-5 h-5 text-teal-600" />
                    Property Photos
                  </h3>
                  <div className="space-y-4">
                    {property.photos.map((photo, i) => (
                      <div key={i} className="rounded-xl overflow-hidden border border-slate-100 group">
                        <img
                          src={photo.src}
                          alt={photo.caption}
                          className="w-full h-56 md:h-72 object-cover group-hover:scale-[1.02] transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="px-4 py-3 bg-slate-50 border-t border-slate-100">
                          <p className="text-sm text-slate-600 font-medium">{photo.caption}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ─── Location Map ─── */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8"
              >
                <h3 className="text-lg font-bold text-slate-900 font-['Inter'] mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-teal-600" />
                  Location
                </h3>
                <p className="text-sm text-slate-500 mb-4">{property.address}</p>
                <div className="h-72 w-full rounded-xl overflow-hidden border border-slate-100">
                  <Map
                    viewport={{
                      center: [property.lng, property.lat],
                      zoom: 14,
                      bearing: 0,
                      pitch: 0,
                    }}
                    className="w-full h-full"
                  >
                    <MapMarker longitude={property.lng} latitude={property.lat}>
                      <div className="relative h-5 w-5 rounded-full border-[3px] border-white bg-teal-500 shadow-lg" />
                    </MapMarker>
                    <MapControls position="bottom-right" />
                  </Map>
                </div>
              </motion.div>
            </div>

            {/* ════════ RIGHT COLUMN — AGENT SIDEBAR ════════ */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="w-full lg:w-[380px] flex-shrink-0"
            >
              <div className="sticky top-24 space-y-6">

                {/* Agent Card */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Listing Agent</h3>

                  <div className="flex items-center gap-4 mb-5">
                    <Avatar className="w-14 h-14 border-2 border-teal-100">
                      <AvatarImage src={agent.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-teal-500 to-sky-500 text-white font-bold text-lg">
                        {agent.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 font-['Inter']">{agent.name}</h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < Math.floor(agent.rating)
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-semibold text-slate-500">
                          {agent.rating} ({agent.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Agent stats */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-slate-50 rounded-xl px-3 py-2.5 text-center">
                      <p className="text-lg font-bold text-slate-800">{agent.listings}</p>
                      <p className="text-xs font-semibold text-slate-500">Listings</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl px-3 py-2.5 text-center">
                      <p className="text-lg font-bold text-slate-800">{agent.experience}</p>
                      <p className="text-xs font-semibold text-slate-500">Experience</p>
                    </div>
                  </div>

                  {/* Agent contact info */}
                  <div className="space-y-2.5 mb-6">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
                        <Phone className="w-4 h-4 text-teal-600" />
                      </div>
                      <span className="font-medium">{agent.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
                        <Mail className="w-4 h-4 text-teal-600" />
                      </div>
                      <span className="font-medium">{agent.email}</span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <Button className="w-full h-12 text-base font-bold rounded-xl bg-teal-600 hover:bg-teal-700 cursor-pointer">
                      <CalendarCheck className="w-5 h-5 mr-2" />
                      Booking
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full h-12 text-base font-bold rounded-xl border-2 border-slate-200 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700 cursor-pointer"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Contact
                    </Button>
                  </div>
                </div>



              </div>
            </motion.div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
