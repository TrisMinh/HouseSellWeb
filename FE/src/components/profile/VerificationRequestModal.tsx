import { FormEvent, useEffect, useState } from "react";
import { Loader2, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { VerificationRequestPayload } from "@/lib/verificationApi";

interface VerificationRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: VerificationRequestPayload) => Promise<void>;
  initialFullName: string;
  initialAddress: string;
  submitting: boolean;
}

type FormState = {
  full_name: string;
  date_of_birth: string;
  address: string;
  gender: "male" | "female" | "other";
  national_id_number: string;
  id_card_front: File | null;
  id_card_back: File | null;
};

const emptyState = (initialFullName: string, initialAddress: string): FormState => ({
  full_name: initialFullName,
  date_of_birth: "",
  address: initialAddress,
  gender: "male",
  national_id_number: "",
  id_card_front: null,
  id_card_back: null,
});

export const VerificationRequestModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialFullName,
  initialAddress,
  submitting,
}: VerificationRequestModalProps) => {
  const [form, setForm] = useState<FormState>(() => emptyState(initialFullName, initialAddress));
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setForm(emptyState(initialFullName, initialAddress));
      setError("");
    }
  }, [initialAddress, initialFullName, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.id_card_front || !form.id_card_back) {
      setError("Please upload both sides of the ID card.");
      return;
    }

    setError("");

    await onSubmit({
      full_name: form.full_name,
      date_of_birth: form.date_of_birth,
      address: form.address,
      gender: form.gender,
      national_id_number: form.national_id_number,
      id_card_front: form.id_card_front,
      id_card_back: form.id_card_back,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl rounded-[32px] bg-white shadow-xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Agent verification</h2>
            <p className="mt-1 text-sm text-slate-500">Submit your identity details for admin review.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Full name</label>
              <input
                value={form.full_name}
                onChange={(event) => setForm((current) => ({ ...current, full_name: event.target.value }))}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none focus:border-sky-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Date of birth</label>
              <input
                type="date"
                value={form.date_of_birth}
                onChange={(event) => setForm((current) => ({ ...current, date_of_birth: event.target.value }))}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none focus:border-sky-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-900 mb-2">Address</label>
              <textarea
                value={form.address}
                onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))}
                rows={3}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none focus:border-sky-500 resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Gender</label>
              <select
                value={form.gender}
                onChange={(event) => setForm((current) => ({ ...current, gender: event.target.value as FormState["gender"] }))}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none focus:border-sky-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Citizen ID number</label>
              <input
                value={form.national_id_number}
                onChange={(event) => setForm((current) => ({ ...current, national_id_number: event.target.value }))}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none focus:border-sky-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">ID card front</label>
              <label className="flex items-center gap-3 rounded-2xl border border-dashed border-slate-300 px-4 py-4 text-sm text-slate-600 cursor-pointer hover:border-sky-400 transition-colors">
                <Upload className="w-4 h-4" />
                <span>{form.id_card_front ? form.id_card_front.name : "Choose front image"}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => setForm((current) => ({ ...current, id_card_front: event.target.files?.[0] ?? null }))}
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">ID card back</label>
              <label className="flex items-center gap-3 rounded-2xl border border-dashed border-slate-300 px-4 py-4 text-sm text-slate-600 cursor-pointer hover:border-sky-400 transition-colors">
                <Upload className="w-4 h-4" />
                <span>{form.id_card_back ? form.id_card_back.name : "Choose back image"}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => setForm((current) => ({ ...current, id_card_back: event.target.files?.[0] ?? null }))}
                />
              </label>
            </div>
          </div>

          {error && <div className="mt-5 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">{error}</div>}

          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-full px-6 cursor-pointer">
              Cancel
            </Button>
            <Button type="submit" disabled={submitting} className="rounded-full bg-sky-700 hover:bg-sky-800 text-white px-6 cursor-pointer">
              {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Submit verification
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
