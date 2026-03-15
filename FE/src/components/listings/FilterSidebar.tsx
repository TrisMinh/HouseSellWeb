import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LOCATIONS } from '@/data/locations';

export const FilterSidebar = () => {
  const [priceRange, setPriceRange] = useState([2, 10]);
  const [areaRange, setAreaRange] = useState([50, 200]);
  
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [listingType, setListingType] = useState<"buy" | "rent">("buy");
  const [selectedPricePreset, setSelectedPricePreset] = useState<string | null>(null);

  const districts = LOCATIONS.find(l => l.city === selectedCity)?.districts || [];

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedDistrict(""); // Reset district when city changes
  };

  return (
    <div className="w-[300px] flex-shrink-0 bg-white rounded-xl shadow-sm border border-border p-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg">Filters</h3>
        <button 
            className="text-sm text-primary hover:underline"
            onClick={() => {
                setSelectedCity("");
                setSelectedDistrict("");
                setListingType("buy");
                setPriceRange([2, 10]);
                setSelectedPricePreset(null);
            }}
        >
            Clear all
        </button>
      </div>

      {/* Location */}
      <div className="mb-8">
        <h4 className="text-sm font-medium mb-3">Location</h4>
        <div className="space-y-3">
            {/* City Select */}
            <Select value={selectedCity} onValueChange={handleCityChange}>
                <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <SelectValue placeholder="Select City" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    {LOCATIONS.map((loc) => (
                        <SelectItem key={loc.city} value={loc.city}>
                            {loc.city}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* District Select */}
            <Select 
                value={selectedDistrict} 
                onValueChange={setSelectedDistrict}
                disabled={!selectedCity}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent>
                    {districts.map((district) => (
                        <SelectItem key={district} value={district}>
                            {district}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
      </div>

      <div className="w-full h-px bg-border my-6" />

      {/* Listing Type */}
      <div className="mb-8">
        <h4 className="text-sm font-medium mb-3">Listing Type</h4>
        <div className="flex p-1 bg-secondary/50 rounded-lg">
          {['buy', 'rent'].map((type) => (
            <button
              key={type}
              onClick={() => setListingType(type as 'buy' | 'rent')}
              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all capitalize ${
                listingType === type 
                  ? 'bg-white text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-border my-6" />

      {/* Price Range */}
      <div className="mb-8">
        <h4 className="text-sm font-medium mb-4">Price Range (Billion VND)</h4>
        <Slider 
          defaultValue={[2, 10]} 
          max={20} 
          step={0.5} 
          className="mb-4"
          onValueChange={(val) => {
            setPriceRange(val);
            // Optionally clear preset if user interacts with slider? 
            // User requirement: "if slider moved but I have ticked... take value below" 
            // means tick persists and takes precedence.
          }}
          value={priceRange}
        />
        <div className="flex justify-between text-sm text-muted-foreground font-medium">
          <span>{priceRange[0]}B</span>
          <span>{priceRange[1]}B+</span>
        </div>
        <div className="mt-4 space-y-2">
            {[
                { label: 'Under 2B', value: '0-2' },
                { label: '2B - 5B', value: '2-5' },
                { label: '5B - 10B', value: '5-10' },
                { label: 'Above 10B', value: '10-20' }
            ].map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox 
                        id={option.value} 
                        checked={selectedPricePreset === option.value}
                        onCheckedChange={(checked) => {
                            if (checked) {
                                setSelectedPricePreset(option.value);
                            } else {
                                setSelectedPricePreset(null);
                            }
                        }}
                    />
                    <label
                        htmlFor={option.value}
                        className="text-sm font-normal text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                        {option.label}
                    </label>
                </div>
            ))}
        </div>
      </div>

      <div className="w-full h-px bg-border my-6" />

      {/* Type of Place */}
      <div className="mb-8">
        <h4 className="text-sm font-medium mb-3">Property Type</h4>
        <div className="space-y-2">
          {['Apartment', 'Townhouse', 'Villa', 'Land', 'Office'].map((type) => (
            <div key={type} className="flex items-center gap-2">
              <Checkbox id={`type-${type}`} />
              <Label htmlFor={`type-${type}`} className="text-sm font-normal text-muted-foreground">{type}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-border my-6" />

      {/* Amenities */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Amenities</h4>
        <div className="flex flex-wrap gap-2">
          {['Parking', 'Pool', 'Gym', 'Garden', 'Security', 'Wifi'].map((amenity) => (
            <button 
              key={amenity}
              className="px-3 py-1.5 text-xs rounded-full border border-input bg-background hover:bg-accent/10 hover:text-accent hover:border-accent transition-colors"
            >
              {amenity}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
