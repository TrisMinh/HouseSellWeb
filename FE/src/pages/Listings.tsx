import { useState, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FilterSidebar } from '@/components/listings/FilterSidebar';
import { ListingCard } from '@/components/listings/ListingCard';
import { ListingRow } from '@/components/listings/ListingRow';
import { DetailPanel } from '@/components/listings/DetailPanel';
import { Pagination } from '@/components/listings/Pagination';
import { ChevronDown, LayoutGrid, List, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MOCK_LISTINGS = [
  {
    id: 1,
    title: "Luxury Waterfront Villa",
    price: "45 Billion",
    address: "Thao Dien, District 2, HCMC",
    beds: 5,
    baths: 6,
    area: 450,
    type: "Villa",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop",
    latitude: 10.8045,
    longitude: 106.7456
  },
  {
    id: 2,
    title: "Modern 3BR Apartment",
    price: "8.5 Billion",
    address: "Binh Thanh, HCMC",
    beds: 3,
    baths: 2,
    area: 110,
    type: "Apartment",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop",
    latitude: 10.7954,
    longitude: 106.7218
  },
  {
    id: 3,
    title: "Eco Green Penthouse",
    price: "12 Billion",
    address: "District 7, HCMC",
    beds: 4,
    baths: 3,
    area: 180,
    type: "Apartment",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
    latitude: 10.7327,
    longitude: 106.7099
  },
  {
    id: 4,
    title: "Commercial Office Space",
    price: "25 Billion",
    address: "District 1, HCMC",
    beds: 0,
    baths: 2,
    area: 200,
    type: "Office",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop",
    latitude: 10.7769,
    longitude: 106.7009
  },
  {
    id: 5,
    title: "Garden Townhouse",
    price: "15 Billion",
    address: "District 9, HCMC",
    beds: 4,
    baths: 4,
    area: 250,
    type: "Townhouse",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop"
  }
];

const ITEMS_PER_PAGE = 30;

const Listings = () => {
    useLayoutEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }, []);

    const [selectedListing, setSelectedListing] = useState<typeof MOCK_LISTINGS[0] | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');
    const [showSortMenu, setShowSortMenu] = useState(false);
    
    const totalResults = 125;
    const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);

    const sortedListings = [...MOCK_LISTINGS].sort((a, b) => {
        if (sortBy === 'price-asc') {
            const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
            const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
            return priceA - priceB;
        } else if (sortBy === 'price-desc') {
            const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
            const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
            return priceB - priceA;
        }
        return 0; // newest - default order
    });

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedListings = sortedListings;

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <div className="bg-white">
        <Header />
      </div>
      
      <main className="pt-40 pb-16 max-w-[1440px] mx-auto px-6 pr-12">
        <div className="flex gap-8">
            {/* Left Sidebar - Filters */}
            <motion.aside 
                className="hidden lg:block sticky top-40 h-[calc(100vh-160px)] overflow-y-auto w-[300px] flex-shrink-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pb-10 pr-3"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <FilterSidebar />
            </motion.aside>

            {/* Center - Results */}
            <div className="flex-1 min-w-0">
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-muted-foreground">Showing <span className="font-semibold text-foreground">{totalResults}</span> results</p>
                    <div className="flex items-center gap-3">
                        {/* Sort Dropdown */}
                        <div className="relative">
                            <Button 
                                variant="outline" 
                                className="h-9 gap-2"
                                onClick={() => setShowSortMenu(!showSortMenu)}
                            >
                                {sortBy === 'newest' && 'Newest'}
                                {sortBy === 'price-asc' && 'Price: Low to High'}
                                {sortBy === 'price-desc' && 'Price: High to Low'}
                                <ChevronDown className="w-4 h-4" />
                            </Button>
                            {showSortMenu && (
                                <div className="absolute top-full mt-2 right-0 bg-white border border-border rounded-lg shadow-lg py-1 min-w-[180px] z-10">
                                    <button
                                        onClick={() => { setSortBy('newest'); setShowSortMenu(false); }}
                                        className="w-full px-4 py-2 text-left text-sm hover:bg-secondary transition-colors flex items-center justify-between"
                                    >
                                        Newest
                                        {sortBy === 'newest' && <Check className="w-4 h-4 text-primary" />}
                                    </button>
                                    <button
                                        onClick={() => { setSortBy('price-asc'); setShowSortMenu(false); }}
                                        className="w-full px-4 py-2 text-left text-sm hover:bg-secondary transition-colors flex items-center justify-between"
                                    >
                                        Price: Low to High
                                        {sortBy === 'price-asc' && <Check className="w-4 h-4 text-primary" />}
                                    </button>
                                    <button
                                        onClick={() => { setSortBy('price-desc'); setShowSortMenu(false); }}
                                        className="w-full px-4 py-2 text-left text-sm hover:bg-secondary transition-colors flex items-center justify-between"
                                    >
                                        Price: High to Low
                                        {sortBy === 'price-desc' && <Check className="w-4 h-4 text-primary" />}
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center bg-white rounded-lg border border-border p-1">
                            <button 
                                onClick={() => setViewMode('grid')}
                                className={cn(
                                    "p-1.5 rounded-md transition-colors",
                                    viewMode === 'grid' ? "bg-secondary text-foreground shadow-sm" : "text-muted-foreground hover:bg-secondary/50"
                                )}
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                            <button 
                                onClick={() => setViewMode('list')}
                                className={cn(
                                    "p-1.5 rounded-md transition-colors",
                                    viewMode === 'list' ? "bg-secondary text-foreground shadow-sm" : "text-muted-foreground hover:bg-secondary/50"
                                )}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Grid/List View */}
                <motion.div 
                    className={cn(
                        "pb-10 transition-all duration-300 ease-in-out",
                        viewMode === 'grid' 
                            ? cn(
                                "grid gap-6",
                                selectedListing 
                                    ? "grid-cols-1 md:grid-cols-2" 
                                    : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                              )
                            : "flex flex-col gap-4"
                    )}
                    key={viewMode}
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.2
                            }
                        }
                    }}
                >
                    {paginatedListings.map((listing, index) => (
                        <motion.div
                            key={listing.id}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                show: { 
                                    opacity: 1, 
                                    y: 0,
                                    transition: {
                                        type: "spring" as const,
                                        stiffness: 100,
                                        damping: 15
                                    }
                                }
                            }}
                        >
                            {viewMode === 'grid' ? (
                                <ListingCard 
                                    {...listing}
                                    isSelected={selectedListing?.id === listing.id}
                                    onClick={() => setSelectedListing(listing)}
                                />
                            ) : (
                                <ListingRow 
                                    {...listing}
                                    isSelected={selectedListing?.id === listing.id}
                                    onClick={() => setSelectedListing(listing)}
                                />
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Pagination */}
                <div className="mt-8">
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>

            {/* Right Sidebar - Detail Panel */}
            {selectedListing && (
                <aside className="hidden xl:block w-[400px] flex-shrink-0 sticky top-40 h-[calc(100vh-160px)] overflow-hidden animate-in slide-in-from-right-10 fade-in duration-300">
                    <DetailPanel 
                        listing={selectedListing} 
                        onClose={() => setSelectedListing(null)}
                    />
                </aside>
            )}
        </div>
      </main>


      <Footer />
    </div>
  );
};

export default Listings;
