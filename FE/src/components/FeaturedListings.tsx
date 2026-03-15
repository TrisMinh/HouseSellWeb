import { useState } from 'react';
import { motion } from 'framer-motion';
import { PropertyCard } from './PropertyCard';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

const filterChips = ['All', 'Apartment', 'Townhouse', 'Land', 'Office'];

const mockListings = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop',
    price: '3.2 billion',
    title: 'Luxury 2BR Apartment Vinhomes Central Park',
    address: 'Binh Thanh District, HCMC',
    beds: 2,
    baths: 2,
    area: 85,
    isVerified: true,
    isNew: true,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop',
    price: '8.5 billion',
    title: 'Garden Villa Ecopark',
    address: 'Van Giang, Hung Yen',
    beds: 4,
    baths: 3,
    area: 200,
    isVerified: true,
    isNew: false,
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop',
    price: '5.8 billion',
    title: 'Phu My Hung Townhouse',
    address: 'District 7, HCMC',
    beds: 3,
    baths: 3,
    area: 120,
    isVerified: false,
    isNew: true,
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
    price: '2.1 billion',
    title: '1BR River View Apartment Masteri Thao Dien',
    address: 'District 2, HCMC',
    beds: 1,
    baths: 1,
    area: 50,
    isVerified: true,
    isNew: false,
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop',
    price: '12.5 billion',
    title: 'Compound Villa An Phu An Khanh',
    address: 'District 2, HCMC',
    beds: 5,
    baths: 4,
    area: 350,
    isVerified: true,
    isNew: true,
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&auto=format&fit=crop',
    price: '1.8 billion',
    title: 'Residential Land Binh Chanh',
    address: 'Binh Chanh, HCMC',
    beds: 0,
    baths: 0,
    area: 100,
    isVerified: false,
    isNew: false,
  },
];

export const FeaturedListings = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <section className="section-padding bg-surface">
      <div className="max-w-content mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="section-header">
          <div>
            <h2 className="mb-2">Featured Listings</h2>
            <p className="text-muted-foreground">
              Discover the most popular real estate listings
            </p>
          </div>
          <a href="/listings" className="text-accent font-medium flex items-center gap-1 hover:gap-2 transition-all">
            View all
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filterChips.map((chip) => (
            <button
              key={chip}
              onClick={() => setActiveFilter(chip)}
              className={cn(
                "chip",
                activeFilter === chip ? "chip-active" : "chip-default"
              )}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Listings Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {mockListings.map((listing) => (
            <motion.div
              key={listing.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <PropertyCard {...listing} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
