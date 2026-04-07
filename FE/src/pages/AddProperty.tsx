import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  CreatePropertyPayload,
  createProperty,
  uploadPropertyImages,
} from '@/lib/propertiesApi';

type LocalImage = {
  id: string;
  file: File;
  preview: string;
  caption: string;
  isPrimary: boolean;
};

type PropertyFormState = {
  title: string;
  description: string;
  property_type: CreatePropertyPayload['property_type'];
  listing_type: CreatePropertyPayload['listing_type'];
  price: string;
  area: string;
  bedrooms: string;
  bathrooms: string;
  floors: string;
  city: string;
  district: string;
  ward: string;
  address: string;
  latitude: string;
  longitude: string;
};

const INITIAL_FORM: PropertyFormState = {
  title: '',
  description: '',
  property_type: 'house',
  listing_type: 'sale',
  price: '',
  area: '',
  bedrooms: '',
  bathrooms: '',
  floors: '',
  city: '',
  district: '',
  ward: '',
  address: '',
  latitude: '',
  longitude: '',
};

const toNumberOrUndefined = (value: string): number | undefined => {
  if (!value.trim()) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const buildPayload = (form: PropertyFormState): CreatePropertyPayload => {
  const price = Number(form.price);
  const area = Number(form.area);
  if (!Number.isFinite(price) || price <= 0) {
    throw new Error('Gia phai la so lon hon 0.');
  }
  if (!Number.isFinite(area) || area <= 0) {
    throw new Error('Dien tich phai la so lon hon 0.');
  }
  if (!form.title.trim() || !form.city.trim() || !form.address.trim() || !form.description.trim()) {
    throw new Error('Vui long dien day du cac truong bat buoc.');
  }

  return {
    title: form.title.trim(),
    description: form.description.trim(),
    property_type: form.property_type,
    listing_type: form.listing_type,
    price,
    area,
    bedrooms: toNumberOrUndefined(form.bedrooms),
    bathrooms: toNumberOrUndefined(form.bathrooms),
    floors: toNumberOrUndefined(form.floors),
    city: form.city.trim(),
    district: form.district.trim() || undefined,
    ward: form.ward.trim() || undefined,
    address: form.address.trim(),
    latitude: toNumberOrUndefined(form.latitude),
    longitude: toNumberOrUndefined(form.longitude),
  };
};

const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  const candidate = error as { response?: { data?: unknown } };
  const data = candidate?.response?.data;
  if (typeof data === 'string') return data;
  if (data && typeof data === 'object') {
    const firstEntry = Object.values(data as Record<string, unknown>)[0];
    if (Array.isArray(firstEntry) && firstEntry.length > 0) return String(firstEntry[0]);
    if (typeof firstEntry === 'string') return firstEntry;
  }
  return 'Khong the tao bat dong san. Vui long thu lai.';
};

const AddProperty = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [form, setForm] = useState<PropertyFormState>(INITIAL_FORM);
  const [images, setImages] = useState<LocalImage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const primaryImageId = useMemo(() => images.find((img) => img.isPrimary)?.id, [images]);

  const handleInputChange =
    (field: keyof PropertyFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSelectImages = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    setImages((prev) => {
      const next = [...prev];
      files.forEach((file) => {
        const id = `${file.name}-${file.size}-${Date.now()}-${Math.random()}`;
        next.push({
          id,
          file,
          preview: URL.createObjectURL(file),
          caption: '',
          isPrimary: next.length === 0,
        });
      });
      return next;
    });

    event.target.value = '';
  };

  const handleRemoveImage = (id: string) => {
    setImages((prev) => {
      const toRemove = prev.find((item) => item.id === id);
      if (toRemove) URL.revokeObjectURL(toRemove.preview);
      const next = prev.filter((item) => item.id !== id);
      if (next.length > 0 && !next.some((item) => item.isPrimary)) {
        next[0] = { ...next[0], isPrimary: true };
      }
      return next;
    });
  };

  const handleSetPrimary = (id: string) => {
    setImages((prev) => prev.map((item) => ({ ...item, isPrimary: item.id === id })));
  };

  const handleCaptionChange = (id: string, caption: string) => {
    setImages((prev) => prev.map((item) => (item.id === id ? { ...item, caption } : item)));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const payload = buildPayload(form);
      const created = await createProperty(payload);

      if (images.length > 0) {
        for (let index = 0; index < images.length; index += 1) {
          const image = images[index];
          await uploadPropertyImages(created.id, [image.file], {
            caption: image.caption.trim(),
            isPrimary: image.isPrimary,
            order: index,
          });
        }
      }

      toast({
        title: 'Tao thanh cong',
        description: 'Bat dong san moi da duoc tao.',
      });
      navigate(`/manage-property/${created.id}`);
    } catch (error) {
      toast({
        title: 'Khong the tao bat dong san',
        description: getErrorMessage(error),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <Header />
      <main className="max-w-5xl mx-auto px-4 md:px-8 pt-28 pb-16">
        <div className="bg-white border border-border rounded-2xl p-6 md:p-8 shadow-sm">
          <h1 className="text-2xl font-semibold mb-6">Add New Property</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="input-field" placeholder="Title *" value={form.title} onChange={handleInputChange('title')} />
              <input className="input-field" placeholder="City *" value={form.city} onChange={handleInputChange('city')} />
              <input className="input-field" placeholder="District" value={form.district} onChange={handleInputChange('district')} />
              <input className="input-field" placeholder="Ward" value={form.ward} onChange={handleInputChange('ward')} />
              <input className="input-field md:col-span-2" placeholder="Address *" value={form.address} onChange={handleInputChange('address')} />
            </div>

            <textarea
              className="w-full min-h-28 px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
              placeholder="Description *"
              value={form.description}
              onChange={handleInputChange('description')}
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input className="input-field" type="number" min="1" placeholder="Price (VND) *" value={form.price} onChange={handleInputChange('price')} />
              <input className="input-field" type="number" min="1" step="0.01" placeholder="Area (m2) *" value={form.area} onChange={handleInputChange('area')} />
              <input className="input-field" type="number" min="0" placeholder="Bedrooms" value={form.bedrooms} onChange={handleInputChange('bedrooms')} />
              <input className="input-field" type="number" min="0" placeholder="Bathrooms" value={form.bathrooms} onChange={handleInputChange('bathrooms')} />
              <input className="input-field" type="number" min="0" placeholder="Floors" value={form.floors} onChange={handleInputChange('floors')} />
              <input className="input-field" type="number" step="0.000001" placeholder="Latitude" value={form.latitude} onChange={handleInputChange('latitude')} />
              <input className="input-field" type="number" step="0.000001" placeholder="Longitude" value={form.longitude} onChange={handleInputChange('longitude')} />
              <select className="input-field" value={form.property_type} onChange={handleInputChange('property_type')}>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="land">Land</option>
                <option value="villa">Villa</option>
                <option value="other">Other</option>
              </select>
              <select className="input-field" value={form.listing_type} onChange={handleInputChange('listing_type')}>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>

            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Property Images</h2>
                <label className="inline-flex items-center px-3 py-2 rounded-lg border border-slate-300 cursor-pointer hover:bg-slate-50">
                  Select Images
                  <input className="hidden" type="file" accept="image/*" multiple onChange={handleSelectImages} />
                </label>
              </div>

              {images.length === 0 && (
                <p className="text-sm text-slate-500">Chua co anh. Ban co the tao tin truoc va upload sau.</p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {images.map((image) => (
                  <div key={image.id} className="border border-slate-200 rounded-xl p-3 space-y-3">
                    <img src={image.preview} alt={image.file.name} className="w-full h-40 object-cover rounded-lg" />
                    <textarea
                      className="w-full min-h-20 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                      placeholder="Caption"
                      value={image.caption}
                      onChange={(event) => handleCaptionChange(image.id, event.target.value)}
                    />
                    <div className="flex gap-2">
                      <Button type="button" variant={image.isPrimary ? 'default' : 'outline'} onClick={() => handleSetPrimary(image.id)}>
                        {primaryImageId === image.id ? 'Primary' : 'Set Primary'}
                      </Button>
                      <Button type="button" variant="destructive" onClick={() => handleRemoveImage(image.id)}>
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => navigate('/profile?tab=sell')}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Property'}
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />

      <style>{`
        .input-field {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid rgb(203 213 225);
          outline: none;
          background: white;
        }
        .input-field:focus {
          box-shadow: 0 0 0 2px #0F766E33;
          border-color: #0F766E;
        }
      `}</style>
    </div>
  );
};

export default AddProperty;
