import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Property,
  deletePropertyImage,
  getImageUrl,
  getProperty,
  updateProperty,
  uploadPropertyImages,
} from '@/lib/propertiesApi';

type FormState = {
  title: string;
  description: string;
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
  property_type: string;
  listing_type: string;
};

const toStringOrEmpty = (value: unknown): string => (value === null || value === undefined ? '' : String(value));

const mapPropertyToForm = (property: Property): FormState => ({
  title: toStringOrEmpty(property.title),
  description: toStringOrEmpty(property.description),
  price: toStringOrEmpty(property.price),
  area: toStringOrEmpty(property.area),
  bedrooms: toStringOrEmpty(property.bedrooms),
  bathrooms: toStringOrEmpty(property.bathrooms),
  floors: toStringOrEmpty(property.floors),
  city: toStringOrEmpty(property.city),
  district: toStringOrEmpty(property.district),
  ward: toStringOrEmpty(property.ward),
  address: toStringOrEmpty(property.address),
  latitude: toStringOrEmpty(property.latitude),
  longitude: toStringOrEmpty(property.longitude),
  property_type: toStringOrEmpty(property.property_type || 'house'),
  listing_type: toStringOrEmpty(property.listing_type || 'sale'),
});

const toNumberOrUndefined = (value: string): number | undefined => {
  if (!value.trim()) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
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
  return 'Da xay ra loi khong mong muon.';
};

const ManageProperty = () => {
  const { id } = useParams<{ id: string }>();
  const propertyId = Number(id);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [property, setProperty] = useState<Property | null>(null);
  const [form, setForm] = useState<FormState | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadCaption, setUploadCaption] = useState('');
  const [markNextPrimary, setMarkNextPrimary] = useState(false);

  const gallery = useMemo(() => property?.images ?? [], [property]);

  const refreshProperty = async () => {
    const fresh = await getProperty(propertyId);
    setProperty(fresh);
    setForm(mapPropertyToForm(fresh));
  };

  useEffect(() => {
    if (!Number.isFinite(propertyId)) {
      navigate('/profile?tab=sell');
      return;
    }

    let mounted = true;
    const run = async () => {
      setLoading(true);
      try {
        const fetched = await getProperty(propertyId);
        if (!mounted) return;
        setProperty(fetched);
        setForm(mapPropertyToForm(fetched));
      } catch (error) {
        if (!mounted) return;
        toast({
          title: 'Khong the tai bat dong san',
          description: getErrorMessage(error),
          variant: 'destructive',
        });
        navigate('/profile?tab=sell');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    run();

    return () => {
      mounted = false;
    };
  }, [propertyId, navigate, toast]);

  const handleInputChange =
    (field: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => (prev ? { ...prev, [field]: event.target.value } : prev));
    };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form || !property || saving) return;

    try {
      setSaving(true);
      await updateProperty(property.id, {
        title: form.title.trim(),
        description: form.description.trim(),
        property_type: form.property_type,
        listing_type: form.listing_type,
        price: Number(form.price),
        area: Number(form.area),
        bedrooms: toNumberOrUndefined(form.bedrooms),
        bathrooms: toNumberOrUndefined(form.bathrooms),
        floors: toNumberOrUndefined(form.floors),
        city: form.city.trim(),
        district: form.district.trim() || undefined,
        ward: form.ward.trim() || undefined,
        address: form.address.trim(),
        latitude: toNumberOrUndefined(form.latitude),
        longitude: toNumberOrUndefined(form.longitude),
      });
      await refreshProperty();
      toast({ title: 'Da luu thay doi' });
    } catch (error) {
      toast({
        title: 'Khong the luu',
        description: getErrorMessage(error),
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!property) return;
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    event.target.value = '';

    try {
      setUploading(true);
      const startOrder = gallery.length;
      for (let index = 0; index < files.length; index += 1) {
        const file = files[index];
        await uploadPropertyImages(property.id, [file], {
          caption: uploadCaption.trim(),
          isPrimary: markNextPrimary && index === 0,
          order: startOrder + index,
        });
      }
      setUploadCaption('');
      setMarkNextPrimary(false);
      await refreshProperty();
      toast({ title: 'Upload anh thanh cong' });
    } catch (error) {
      toast({
        title: 'Upload that bai',
        description: getErrorMessage(error),
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    if (!property) return;
    try {
      await deletePropertyImage(imageId);
      await refreshProperty();
      toast({ title: 'Da xoa anh' });
    } catch (error) {
      toast({
        title: 'Khong the xoa anh',
        description: getErrorMessage(error),
        variant: 'destructive',
      });
    }
  };

  if (loading || !form) {
    return (
      <div className="min-h-screen bg-[#F6F7F9]">
        <Header />
        <main className="max-w-5xl mx-auto px-4 md:px-8 pt-28 pb-16">
          <div className="bg-white border border-border rounded-2xl p-6 md:p-8 shadow-sm">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <Header />
      <main className="max-w-5xl mx-auto px-4 md:px-8 pt-28 pb-16">
        <div className="bg-white border border-border rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Manage Property #{propertyId}</h1>
            <Button variant="outline" onClick={() => navigate('/profile?tab=sell')}>
              Back
            </Button>
          </div>

          <form className="space-y-6" onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="input-field" placeholder="Title" value={form.title} onChange={handleInputChange('title')} />
              <input className="input-field" placeholder="City" value={form.city} onChange={handleInputChange('city')} />
              <input className="input-field" placeholder="District" value={form.district} onChange={handleInputChange('district')} />
              <input className="input-field" placeholder="Ward" value={form.ward} onChange={handleInputChange('ward')} />
              <input className="input-field md:col-span-2" placeholder="Address" value={form.address} onChange={handleInputChange('address')} />
            </div>

            <textarea
              className="w-full min-h-28 px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
              placeholder="Description"
              value={form.description}
              onChange={handleInputChange('description')}
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input className="input-field" type="number" min="1" placeholder="Price (VND)" value={form.price} onChange={handleInputChange('price')} />
              <input className="input-field" type="number" min="1" step="0.01" placeholder="Area (m2)" value={form.area} onChange={handleInputChange('area')} />
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

            <div className="flex justify-end">
              <Button type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>

          <section className="mt-10 border-t border-slate-200 pt-6 space-y-4">
            <h2 className="text-xl font-semibold">Property Images</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gallery.map((image) => (
                <div key={image.id} className="border border-slate-200 rounded-xl p-3 space-y-3">
                  <img src={getImageUrl(image.image)} alt={`Property ${image.id}`} className="w-full h-44 object-cover rounded-lg" />
                  <div className="text-sm text-slate-600">
                    {image.caption || 'No caption'}
                    {image.is_primary ? ' · Primary' : ''}
                  </div>
                  <Button variant="destructive" type="button" onClick={() => handleDeleteImage(image.id)}>
                    Delete Image
                  </Button>
                </div>
              ))}
            </div>

            <div className="border border-slate-200 rounded-xl p-4 space-y-3">
              <input
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                placeholder="Caption for new image(s)"
                value={uploadCaption}
                onChange={(event) => setUploadCaption(event.target.value)}
              />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={markNextPrimary}
                  onChange={(event) => setMarkNextPrimary(event.target.checked)}
                />
                Set first uploaded image as primary
              </label>
              <label className="inline-flex items-center px-3 py-2 rounded-lg border border-slate-300 cursor-pointer hover:bg-slate-50">
                {uploading ? 'Uploading...' : 'Upload Images'}
                <input className="hidden" type="file" accept="image/*" multiple onChange={handleUpload} disabled={uploading} />
              </label>
            </div>
          </section>
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

export default ManageProperty;
