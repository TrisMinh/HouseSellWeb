import { useState, useLayoutEffect, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, ArrowLeft, Save, Plus, X, Calendar as CalendarIcon, CheckCircle2, XCircle, MessageSquare, ImagePlus, User, Trash2, Upload } from 'lucide-react';
import { Map, MapMarker, MapControls, MarkerContent, useMap } from '@/components/ui/map';
import { cn } from '@/lib/utils';
import { format, addDays } from 'date-fns';
import { GlobalAvailabilityModal, AvailabilitySchedule } from '@/components/common/GlobalAvailabilityModal';
import { LOCATIONS } from '@/data/locations';

// Empty Data for New Property
const INITIAL_PROPERTY = {
  title: "",
  price: "",
  address: {
    street: "",
    district: "",
    city: ""
  },
  latitude: 10.762622,
  longitude: 106.660172,
  metrics: {
    beds: 0,
    baths: 0,
    area: 0
  },
  type: "For Sale",
  coverImage: "",
  features: [] as string[],
  overview: "",
  galleryObjects: [
    {
      url: "",
      caption: ""
    }
  ],
  specs: [
    { label: "Property Type", value: "" },
    { label: "Year Built", value: "" },
    { label: "Parking", value: "" },
    { label: "Floor", value: "" },
    { label: "Facing", value: "" },
    { label: "Legal", value: "" },
    { label: "Furniture", value: "" },
    { label: "Status", value: "" }
  ]
};

const PREDEFINED_FEATURES = [
  "Swimming Pool", "Private Pool", "Garden", "Smart Home", "24/7 Security", 
  "Balcony", "Terrace", "Rooftop", "Basement", "Gym", "BBQ Area", "Elevator", 
  "Parking Garage", "Bathtub", "Fully Furnished", "Semi Furnished", "Unfurnished",
  "Corner Unit", "High Floor", "Lake View", "City View", "Ocean View", 
  "River View", "Park View", "Mountain View", "Golf Course View", "Pet Friendly", 
  "Playground", "Tennis Court", "Clubhouse", "Near School", "Near Hospital", 
  "Near Supermarket", "Near Public Transport", "Villa", "Land", "Penthouse", 
  "Duplex", "Shophouse", "Townhouse"
];

// Helper component: click anywhere on the map to move the pin
function MapClickHandler({ onClickLocation }: { onClickLocation: (lng: number, lat: number) => void }) {
  const { map } = useMap();
  const onClickRef = useCallback(onClickLocation, [onClickLocation]);

  useEffect(() => {
    if (!map) return;
    const handler = (e: any) => {
      onClickRef(e.lngLat.lng, e.lngLat.lat);
    };
    map.on('click', handler);
    return () => { map.off('click', handler); };
  }, [map, onClickRef]);

  return null;
}

const AddProperty = () => {
  const navigate = useNavigate();

  // Scroll to top on mount
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  // Availability State
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);
  const [availabilitySchedule, setAvailabilitySchedule] = useState<AvailabilitySchedule>([
    { dayOfWeek: 'Monday', enabled: true, slots: [{ start: "09:00", end: "17:00" }] },
    { dayOfWeek: 'Tuesday', enabled: true, slots: [{ start: "09:00", end: "17:00" }] },
    { dayOfWeek: 'Wednesday', enabled: true, slots: [{ start: "09:00", end: "17:00" }] },
    { dayOfWeek: 'Thursday', enabled: true, slots: [{ start: "09:00", end: "17:00" }] },
    { dayOfWeek: 'Friday', enabled: true, slots: [{ start: "09:00", end: "17:00" }] },
    { dayOfWeek: 'Saturday', enabled: true, slots: [{ start: "10:00", end: "15:00" }] },
    { dayOfWeek: 'Sunday', enabled: false, slots: [] },
  ]);

  // Form State
  const [property, setProperty] = useState(INITIAL_PROPERTY);
  const [newFeature, setNewFeature] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const availableSuggestions = PREDEFINED_FEATURES.filter(f => 
      f.toLowerCase().includes(newFeature.toLowerCase()) && 
      !property.features.includes(f)
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => {
          setSaveSuccess(false);
          navigate('/profile?tab=sell'); // Return to profile after creating
      }, 1500);
    }, 1000);
  };

  const handleAddFeature = (feature: string) => {
    if (property.features.includes(feature)) return;
    setProperty(p => ({ ...p, features: [...p.features, feature] }));
    setNewFeature("");
    setShowSuggestions(false);
  };

  const handleRemoveFeature = (f: string) => {
    setProperty(p => ({ ...p, features: p.features.filter(x => x !== f) }));
  };

  const handleSpecChange = (index: number, val: string) => {
    const newSpecs = [...property.specs];
    newSpecs[index].value = val;
    setProperty({ ...property, specs: newSpecs });
  };

  const handleAddGalleryItem = () => {
    setProperty(p => ({
        ...p,
        galleryObjects: [...(p.galleryObjects || []), { url: "", caption: "" }]
    }));
  };

  const handleUpdateGalleryItem = (index: number, field: 'url' | 'caption', value: string) => {
    const newItems = [...(property.galleryObjects || [])];
    newItems[index][field] = value;
    setProperty({ ...property, galleryObjects: newItems });
  };

  const handleRemoveGalleryItem = (index: number) => {
    const newItems = [...(property.galleryObjects || [])];
    newItems.splice(index, 1);
    setProperty({ ...property, galleryObjects: newItems });
  };



  return (
    <div className="min-h-screen bg-[#F6F7F9] font-['Josefin_Sans']">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;600;700&display=swap');`}</style>
      <Header />

      <div role="main" className="pt-28 pb-16 max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* Header Navigation & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <button 
                onClick={() => navigate('/profile?tab=sell')}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-semibold"
            >
                <ArrowLeft className="w-5 h-5" />
                Back to Seller Dashboard
            </button>
            <h1 className="text-2xl font-bold text-slate-800 font-['Inter']">Add New Property</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT COLUMN: Editor */}
          <div className="flex-1 flex flex-col gap-6">
            
            {/* Hero Image Edit Box */}
            <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
                <div className="relative h-[300px] md:h-[400px] w-full bg-slate-100 group">
                    <img src={property.coverImage} className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80" alt="Cover" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[2px]">
                        <Button variant="secondary" className="shadow-lg backdrop-blur-md bg-white/90 font-bold hover:bg-white text-slate-800">
                            <ImagePlus className="w-5 h-5 mr-2" />
                            Change Cover Image
                        </Button>
                    </div>
                </div>
            </div>

            {/* Basic Info Editor */}
            <div className="bg-white rounded-2xl shadow-sm border border-border p-6 md:p-8">
                <h2 className="text-xl font-bold font-['Inter'] mb-6 border-b border-border pb-4">Basic Information</h2>
                
                <div className="grid gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Property Title</label>
                        <input 
                            type="text" 
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0F766E] focus:border-transparent outline-none font-medium text-slate-900 transition-all font-['Inter'] text-lg"
                            value={property.title}
                            onChange={(e) => setProperty({...property, title: e.target.value})}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Price Label</label>
                            <input 
                                type="text" 
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0F766E] focus:border-transparent outline-none font-bold text-[#0F766E] transition-all font-['Inter'] text-lg"
                                value={property.price}
                                onChange={(e) => setProperty({...property, price: e.target.value})}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Location / Address</label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="relative">
                                    <select 
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0F766E] focus:border-transparent outline-none font-semibold text-slate-800 transition-all appearance-none pr-10 hover:border-slate-300 cursor-pointer"
                                        value={property.address.city}
                                        onChange={(e) => {
                                            const newCity = e.target.value;
                                            const newDistrict = LOCATIONS.find(loc => loc.city === newCity)?.districts[0] || "";
                                            setProperty({...property, address: {...property.address, city: newCity, district: newDistrict}})
                                        }}
                                    >
                                        <option value="" disabled>Select Province / City</option>
                                        {LOCATIONS.map(loc => (
                                            <option key={loc.city} value={loc.city}>{loc.city}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    </div>
                                </div>
                                <div className="relative">
                                    <select 
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0F766E] focus:border-transparent outline-none font-semibold text-slate-800 transition-all appearance-none pr-10 hover:border-slate-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                        value={property.address.district}
                                        onChange={(e) => setProperty({...property, address: {...property.address, district: e.target.value}})}
                                        disabled={!property.address.city}
                                    >
                                        <option value="" disabled>Select District</option>
                                        {property.address.city && LOCATIONS.find(loc => loc.city === property.address.city)?.districts.map((district) => (
                                            <option key={district} value={district}>{district}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    </div>
                                </div>
                                <div className="relative">
                                    <MapPin className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                                    <input 
                                        type="text" 
                                        placeholder="Street Address..."
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0F766E] focus:border-transparent outline-none font-medium text-slate-800 transition-all"
                                        value={property.address.street}
                                        onChange={(e) => setProperty({...property, address: {...property.address, street: e.target.value}})}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* Map Block */}
                        <div className="md:col-span-2">
                             <label className="block text-sm font-semibold text-slate-700 mb-2">Pin on Map</label>
                             <p className="text-xs text-slate-500 mb-3">Click anywhere on the map to place the pin, or drag it to adjust.</p>
                             <div className="h-[300px] rounded-xl overflow-hidden border border-slate-200">
                                 <Map 
                                    viewport={{ 
                                        center: [property.longitude, property.latitude],
                                        zoom: 14,
                                        pitch: 0,
                                        bearing: 0
                                    }}
                                 >
                                    <MapClickHandler onClickLocation={(lng, lat) => setProperty({...property, longitude: lng, latitude: lat})} />
                                    <MapMarker 
                                        longitude={property.longitude} 
                                        latitude={property.latitude}
                                        draggable={true}
                                        onDragEnd={(lngLat) => setProperty({...property, longitude: lngLat.lng, latitude: lngLat.lat})}
                                    >
                                        <MarkerContent>
                                            <MapPin className="w-8 h-8 text-rose-500 drop-shadow-md -translate-y-1/2" />
                                        </MarkerContent>
                                    </MapMarker>
                                    <MapControls position="bottom-right" showZoom={true} />
                                 </Map>
                             </div>
                             <p className="text-xs text-slate-400 mt-2">Lat: {property.latitude.toFixed(6)}, Lng: {property.longitude.toFixed(6)}</p>
                        </div>

                        {/* New Metrics Fields: Beds, Baths, Area */}
                        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Bedrooms</label>
                                <div className="relative">
                                    <input 
                                        type="number" 
                                        min="0"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0F766E] focus:border-transparent outline-none font-bold text-slate-800 transition-all font-['Inter']"
                                        value={property.metrics.beds}
                                        onChange={(e) => setProperty({...property, metrics: {...property.metrics, beds: parseInt(e.target.value) || 0}})}
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-semibold text-slate-400 pointer-events-none">Beds</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Bathrooms</label>
                                <div className="relative">
                                    <input 
                                        type="number" 
                                        min="0"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0F766E] focus:border-transparent outline-none font-bold text-slate-800 transition-all font-['Inter']"
                                        value={property.metrics.baths}
                                        onChange={(e) => setProperty({...property, metrics: {...property.metrics, baths: parseInt(e.target.value) || 0}})}
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-semibold text-slate-400 pointer-events-none">Baths</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Total Area (m²)</label>
                                <div className="relative">
                                    <input 
                                        type="number" 
                                        min="0"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0F766E] focus:border-transparent outline-none font-bold text-slate-800 transition-all font-['Inter']"
                                        value={property.metrics.area}
                                        onChange={(e) => setProperty({...property, metrics: {...property.metrics, area: parseInt(e.target.value) || 0}})}
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-semibold text-slate-400 pointer-events-none">m²</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Features Editor */}
            <div className="bg-white rounded-2xl shadow-sm border border-border p-6 md:p-8">
                <h2 className="text-xl font-bold font-['Inter'] mb-6 border-b border-border pb-4">Key Features</h2>
                
                <div className="flex flex-wrap gap-3 mb-6">
                    {property.features.map(f => (
                        <div key={f} className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-semibold group cursor-pointer hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors" onClick={() => handleRemoveFeature(f)}>
                            <span>{f}</span>
                            <X className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                        </div>
                    ))}
                </div>
                
                <div className="relative flex gap-2">
                    <div className="relative flex-1">
                        <input 
                            type="text" 
                            placeholder="Type to search predefined features..."
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0F766E] outline-none font-medium transition-all"
                            value={newFeature}
                            onChange={e => {
                                setNewFeature(e.target.value);
                                setShowSuggestions(true);
                            }}
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && availableSuggestions.length > 0) {
                                    handleAddFeature(availableSuggestions[0]);
                                }
                            }}
                        />
                        {showSuggestions && availableSuggestions.length > 0 && (
                            <div className="absolute top-14 left-0 w-full bg-white border border-slate-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                                {availableSuggestions.map(f => (
                                    <div 
                                        key={f} 
                                        className="px-4 py-3 hover:bg-slate-50 cursor-pointer font-medium text-slate-800 border-b border-slate-100 last:border-0"
                                        onClick={() => handleAddFeature(f)}
                                    >
                                        {f}
                                    </div>
                                ))}
                            </div>
                        )}
                        {showSuggestions && newFeature && availableSuggestions.length === 0 && (
                            <div className="absolute top-14 left-0 w-full bg-white border border-slate-200 rounded-xl shadow-lg z-10 p-4 text-slate-500 font-medium italic text-sm">
                                No matching tags found. Please select an existing tag.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Specifications Matrix */}
            <div className="bg-white rounded-2xl shadow-sm border border-border p-6 md:p-8">
                <h2 className="text-xl font-bold font-['Inter'] mb-6 border-b border-border pb-4">Specifications</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    {property.specs.map((spec, idx) => (
                        <div key={spec.label} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0 sm:even:border-b-0 sm:[&:nth-last-child(2)]:border-b-0">
                            <span className="text-slate-500 font-semibold">{spec.label}</span>
                            <input 
                                type="text"
                                className="text-right font-bold text-slate-900 bg-transparent border-b-2 border-transparent focus:border-[#0F766E] outline-none px-1 w-1/2 transition-colors"
                                value={spec.value}
                                onChange={(e) => handleSpecChange(idx, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Overview & Description Textareas */}
            <div className="bg-white rounded-2xl shadow-sm border border-border p-6 md:p-8">
                <h2 className="text-xl font-bold font-['Inter'] mb-6 border-b border-border pb-4">Descriptions & Gallery</h2>

                <div className="grid gap-8">
                    {/* General Overview */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Brief Overview</label>
                        <p className="text-xs text-slate-500 mb-3">A short, captivating summary that appears first on the listing card. <span className="text-[#0F766E] font-medium">(Max 200 words)</span></p>
                        <textarea 
                            className="w-full h-24 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0F766E] outline-none font-medium text-slate-800 transition-all resize-y leading-relaxed"
                            value={property.overview}
                            onChange={e => setProperty({...property, overview: e.target.value})}
                            placeholder="Briefly summarize the property..."
                        />
                    </div>
                    
                    {/* Modular Image + Description Gallery Array */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Property Photos & Detailed Descriptions</label>
                        <p className="text-xs text-slate-500 mb-4">Add at least 1 image and describe the related area, room, or angle in detail. <span className="text-[#0F766E] font-medium">(Max 200 words per photo caption)</span></p>
                        
                        <div className="space-y-6">
                            {property.galleryObjects.map((item, idx) => (
                                <div key={idx} className="flex flex-col md:flex-row gap-6 p-4 rounded-xl border border-slate-200 bg-slate-50/50 relative group">
                                    {property.galleryObjects.length > 1 && (
                                        <button 
                                            onClick={() => handleRemoveGalleryItem(idx)}
                                            className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center bg-white border border-slate-200 shadow-sm text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                                            title="Remove Photo"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}

                                    <div className="w-full md:w-1/3 flex flex-col gap-3">
                                        {/* Image Preview Window */}
                                        <div className="w-full h-40 rounded-xl overflow-hidden bg-slate-200 border-2 border-dashed border-slate-300 flex items-center justify-center relative">
                                            {item.url ? (
                                                <img src={item.url} alt={`Gallery item ${idx+1}`} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="text-slate-400 flex flex-col items-center gap-2">
                                                    <ImagePlus className="w-8 h-8" />
                                                    <span className="text-sm font-medium">No Image</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="w-full relative mt-1">
                                            <input 
                                                type="file" 
                                                accept="image/*"
                                                id={`file-upload-${idx}`}
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        const url = URL.createObjectURL(file);
                                                        handleUpdateGalleryItem(idx, 'url', url);
                                                    }
                                                }}
                                            />
                                            <label 
                                                htmlFor={`file-upload-${idx}`}
                                                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 hover:text-[#0F766E] transition-all font-semibold text-slate-700"
                                            >
                                                <Upload className="w-4 h-4" />
                                                Upload Image
                                            </label>
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <textarea 
                                            className="w-full h-full min-h-[160px] md:min-h-0 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0F766E] outline-none font-medium text-slate-800 transition-all resize-y leading-relaxed"
                                            value={item.caption}
                                            onChange={(e) => handleUpdateGalleryItem(idx, 'caption', e.target.value)}
                                            placeholder={`Describe this image... (Max 200 words)`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <Button 
                            onClick={handleAddGalleryItem}
                            variant="outline" 
                            className="mt-6 w-full py-6 border-dashed border-2 hover:bg-slate-50 hover:text-[#0F766E] transition-all font-semibold gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Add Another Photo & Description
                        </Button>
                    </div>
                </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Sticky Sidebar for Appointments */}
          <div className="w-full lg:w-[450px] flex-shrink-0 flex flex-col gap-6">
            
            {/* Availability Settings */}
            <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <CalendarIcon className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold font-['Inter'] leading-tight">Availability</h3>
                        <p className="text-sm text-slate-500">Buyers will select from these schedules</p>
                    </div>
                </div>
                
                {/* Interactive UI for setting hours */}
                <div className="space-y-2 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {availabilitySchedule.filter(day => day.enabled).map((day, idx) => (
                        <div key={idx} className="flex items-start justify-between p-3 border border-slate-200 rounded-xl bg-slate-50 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-blue-50/50 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
                            <span className="font-semibold text-slate-700 relative z-10 w-[80px] pt-1">{day.dayOfWeek.slice(0, 3)}</span>
                            
                            <div className="flex-1 border-b border-dashed border-slate-300 mx-3 mt-4 relative z-10"></div>
                            
                            <div className="flex flex-col gap-1.5 relative z-10">
                                {day.slots.map((slot, sIdx) => (
                                    <span key={sIdx} className="text-xs font-bold bg-white px-2.5 py-1 border border-slate-200 rounded-lg shadow-sm text-slate-700 w-[110px] text-center">
                                        {slot.start} - {slot.end}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                    {availabilitySchedule.filter(day => day.enabled).length === 0 && (
                        <div className="text-center p-4 text-sm text-slate-500 italic bg-slate-50 border border-slate-200 rounded-xl">
                            No availability scheduled.
                        </div>
                    )}
                </div>
                <Button 
                    variant="outline" 
                    className="w-full font-bold border-2 hover:bg-slate-50 active:scale-[0.98] transition-all"
                    onClick={() => setIsAvailabilityModalOpen(true)}
                >
                    Edit Global Availability
                </Button>
            </div>

            <GlobalAvailabilityModal 
                isOpen={isAvailabilityModalOpen}
                onClose={() => setIsAvailabilityModalOpen(false)}
                initialSchedule={availabilitySchedule}
                onSave={(newSchedule) => setAvailabilitySchedule(newSchedule)}
            />


          </div>

        </div>

        {/* Bottom Save Action */}
        <div className="mt-8 flex justify-end items-center gap-4 border-t border-slate-200 pt-8">
            {saveSuccess && <span className="text-emerald-600 font-semibold animate-fade-in flex items-center gap-1"><CheckCircle2 className="w-5 h-5"/> Property Added Successfully! Redirecting...</span>}
            <Button 
                onClick={handleSave} 
                disabled={isSaving}
                className="bg-[#0369A1] hover:bg-[#0369A1]/90 text-white shadow-md font-bold px-10 py-6 text-lg rounded-xl"
            >
                {isSaving ? "Creating..." : <><Plus className="w-5 h-5 mr-3" /> Add Property</>}
            </Button>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default AddProperty;
