import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronDown, LayoutGrid, List } from 'lucide-react';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { DetailPanel } from '@/components/listings/DetailPanel';
import {
  DEFAULT_LISTING_FILTERS,
  FilterSidebar,
  ListingFiltersState,
} from '@/components/listings/FilterSidebar';
import { ListingCard } from '@/components/listings/ListingCard';
import { ListingRow } from '@/components/listings/ListingRow';
import { Pagination } from '@/components/listings/Pagination';
import { cn } from '@/lib/utils';
import { getImageUrl, getProperties, normalizeListResponse, Property } from '@/lib/propertiesApi';

type ViewMode = 'grid' | 'list';
type SortBy = 'newest' | 'price-asc' | 'price-desc';

interface ListingViewModel {
  id: number;
  image: string;
  price: string;
  rawPrice: number;
  title: string;
  address: string;
  beds: number;
  baths: number;
  area: number;
  type: string;
  city: string;
  district: string;
  listingType: 'sale' | 'rent';
  propertyType: 'house' | 'apartment' | 'land' | 'villa' | 'other';
  latitude: number | null;
  longitude: number | null;
}

const ITEMS_PER_PAGE = 30;

const formatVndPrice = (price: number): string => {
  if (!Number.isFinite(price)) return 'N/A';
  return `${new Intl.NumberFormat('vi-VN').format(price)} VND`;
};

const mapPropertyToListing = (property: Property): ListingViewModel => {
  const rawPrice = Number(property.price || 0);
  return {
    id: property.id,
    image: property.primary_image
      ? getImageUrl(property.primary_image)
      : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop',
    price: formatVndPrice(rawPrice),
    rawPrice,
    title: property.title,
    address: [property.address, property.district, property.city].filter(Boolean).join(', '),
    beds: property.bedrooms ?? 0,
    baths: property.bathrooms ?? 0,
    area: Number(property.area || 0),
    type: property.property_type_display || property.property_type || 'Property',
    city: property.city || '',
    district: property.district || '',
    listingType: property.listing_type,
    propertyType: property.property_type,
    latitude: property.latitude ?? null,
    longitude: property.longitude ?? null,
  };
};

const Listings = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const [allListings, setAllListings] = useState<ListingViewModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedListing, setSelectedListing] = useState<ListingViewModel | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>('newest');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [filters, setFilters] = useState<ListingFiltersState>(DEFAULT_LISTING_FILTERS);

  useEffect(() => {
    let mounted = true;
    const fetchListings = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await getProperties();
        const items = normalizeListResponse(response);
        const mapped = items.map(mapPropertyToListing);
        if (mounted) {
          setAllListings(mapped);
        }
      } catch (_err) {
        if (mounted) {
          setError('Khong tai duoc danh sach bat dong san tu he thong.');
          setAllListings([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchListings();
    return () => {
      mounted = false;
    };
  }, []);

  const cityOptions = useMemo(() => {
    return Array.from(new Set(allListings.map((item) => item.city).filter(Boolean))).sort((a, b) =>
      a.localeCompare(b, 'vi'),
    );
  }, [allListings]);

  const districtOptions = useMemo(() => {
    if (!filters.city) return [];
    return Array.from(
      new Set(
        allListings
          .filter((item) => item.city === filters.city)
          .map((item) => item.district)
          .filter(Boolean),
      ),
    ).sort((a, b) => a.localeCompare(b, 'vi'));
  }, [allListings, filters.city]);

  const filteredListings = useMemo(() => {
    const [minPriceBillion, maxPriceBillion] = filters.priceRange;
    const listingTypeValue = filters.listingType === 'buy' ? 'sale' : 'rent';

    return allListings.filter((item) => {
      const priceBillion = item.rawPrice / 1_000_000_000;
      if (item.listingType !== listingTypeValue) return false;
      if (priceBillion < minPriceBillion || priceBillion > maxPriceBillion) return false;
      if (filters.city && item.city !== filters.city) return false;
      if (filters.district && item.district !== filters.district) return false;
      if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(item.propertyType)) return false;
      return true;
    });
  }, [allListings, filters]);

  const sortedListings = useMemo(() => {
    const cloned = [...filteredListings];
    if (sortBy === 'price-asc') {
      cloned.sort((a, b) => a.rawPrice - b.rawPrice);
      return cloned;
    }
    if (sortBy === 'price-desc') {
      cloned.sort((a, b) => b.rawPrice - a.rawPrice);
      return cloned;
    }
    return cloned;
  }, [filteredListings, sortBy]);

  const totalResults = sortedListings.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedListings = sortedListings.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (!selectedListing) return;
    const exists = sortedListings.some((item) => item.id === selectedListing.id);
    if (!exists) {
      setSelectedListing(null);
    }
  }, [selectedListing, sortedListings]);

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <div className="bg-white">
        <Header />
      </div>

      <main className="max-w-[1440px] mx-auto px-6 pr-12 pt-40 pb-16">
        <div className="flex gap-8">
          <motion.aside
            className="hidden lg:block sticky top-40 h-[calc(100vh-160px)] overflow-y-auto w-[300px] flex-shrink-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pb-10 pr-3"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <FilterSidebar
              value={filters}
              cities={cityOptions}
              districts={districtOptions}
              onChange={setFilters}
            />
          </motion.aside>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{totalResults}</span> results
              </p>
              <div className="flex items-center gap-3">
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
                        onClick={() => {
                          setSortBy('newest');
                          setShowSortMenu(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-secondary transition-colors flex items-center justify-between"
                      >
                        Newest
                        {sortBy === 'newest' && <Check className="w-4 h-4 text-primary" />}
                      </button>
                      <button
                        onClick={() => {
                          setSortBy('price-asc');
                          setShowSortMenu(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-secondary transition-colors flex items-center justify-between"
                      >
                        Price: Low to High
                        {sortBy === 'price-asc' && <Check className="w-4 h-4 text-primary" />}
                      </button>
                      <button
                        onClick={() => {
                          setSortBy('price-desc');
                          setShowSortMenu(false);
                        }}
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
                      'p-1.5 rounded-md transition-colors',
                      viewMode === 'grid'
                        ? 'bg-secondary text-foreground shadow-sm'
                        : 'text-muted-foreground hover:bg-secondary/50',
                    )}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                      'p-1.5 rounded-md transition-colors',
                      viewMode === 'list'
                        ? 'bg-secondary text-foreground shadow-sm'
                        : 'text-muted-foreground hover:bg-secondary/50',
                    )}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {loading && (
              <div className="bg-white border border-border rounded-xl p-6 text-muted-foreground">
                Loading listings...
              </div>
            )}
            {!loading && error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700">{error}</div>
            )}

            {!loading && !error && (
              <>
                <motion.div
                  className={cn(
                    'pb-10 transition-all duration-300 ease-in-out',
                    viewMode === 'grid'
                      ? cn(
                          'grid gap-6',
                          selectedListing ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
                        )
                      : 'flex flex-col gap-4',
                  )}
                  key={viewMode}
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.08, delayChildren: 0.12 },
                    },
                  }}
                >
                  {paginatedListings.map((listing) => (
                    <motion.div
                      key={listing.id}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: {
                          opacity: 1,
                          y: 0,
                          transition: { type: 'spring', stiffness: 100, damping: 15 },
                        },
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

                <div className="mt-8">
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
              </>
            )}
          </div>

          {selectedListing && (
            <aside className="hidden xl:block w-[400px] flex-shrink-0 sticky top-40 h-[calc(100vh-160px)] overflow-hidden animate-in slide-in-from-right-10 fade-in duration-300">
              <DetailPanel listing={selectedListing} onClose={() => setSelectedListing(null)} />
            </aside>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Listings;
