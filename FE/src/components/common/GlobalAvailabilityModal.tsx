import { X, Settings, Save, AlertCircle, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface TimeSlot {
  start: string;
  end: string;
}

export interface DayAvailability {
  dayOfWeek: string;
  enabled: boolean;
  slots: TimeSlot[];
}

export type AvailabilitySchedule = DayAvailability[];

interface GlobalAvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSchedule: AvailabilitySchedule;
  onSave: (schedule: AvailabilitySchedule) => void;
}

export const GlobalAvailabilityModal = ({ isOpen, onClose, initialSchedule, onSave }: GlobalAvailabilityModalProps) => {
  const [schedule, setSchedule] = useState<AvailabilitySchedule>(initialSchedule);
  const [error, setError] = useState("");

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSchedule(initialSchedule);
      setError("");
    }
  }, [isOpen, initialSchedule]);

  if (!isOpen) return null;

  const handleDayToggle = (dayIndex: number) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].enabled = !newSchedule[dayIndex].enabled;
    // ensure at least 1 slot exists if turning on
    if (newSchedule[dayIndex].enabled && newSchedule[dayIndex].slots.length === 0) {
      newSchedule[dayIndex].slots = [{ start: "09:00", end: "17:00" }];
    }
    setSchedule(newSchedule);
  };

  const handleAddSlot = (dayIndex: number) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].slots.push({ start: "09:00", end: "17:00" });
    setSchedule(newSchedule);
  };

  const handleRemoveSlot = (dayIndex: number, slotIndex: number) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].slots.splice(slotIndex, 1);
    
    // Auto-disable day if last slot is removed
    if (newSchedule[dayIndex].slots.length === 0) {
      newSchedule[dayIndex].enabled = false;
    }
    setSchedule(newSchedule);
  };

  const handleTimeChange = (dayIndex: number, slotIndex: number, field: 'start' | 'end', value: string) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].slots[slotIndex][field] = value;
    setSchedule(newSchedule);
  };

  const handleSave = () => {
    // Basic validation
    let isValid = true;
    let errorMessage = "";

    schedule.forEach(day => {
      if (day.enabled) {
        day.slots.forEach(slot => {
          if (!slot.start || !slot.end) {
            isValid = false;
            errorMessage = "Please fill in all time fields for enabled days.";
          } else if (slot.start >= slot.end) {
            isValid = false;
            errorMessage = `End time must be after Start time on ${day.dayOfWeek}.`;
          }
        });
      }
    });

    if (!isValid) {
      setError(errorMessage);
      return;
    }

    onSave(schedule);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm shadow-2xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-['Inter'] text-slate-800">Global Availability</h2>
                <p className="text-xs text-slate-500 font-medium">Configure daily schedules for buyer appointments</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto w-full">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 text-sm font-semibold rounded-lg flex items-center gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-4">
              {schedule.map((day, dayIndex) => (
                <div 
                  key={day.dayOfWeek} 
                  className={`border rounded-xl transition-all duration-200 ${day.enabled ? 'border-sky-200 bg-sky-50/20 shadow-sm' : 'border-slate-200 bg-slate-50/50 grayscale-[0.5] opacity-70'}`}
                >
                  <div className="p-4 flex items-center justify-between border-b border-slate-100/50">
                    <div className="flex items-center gap-4">
                      {/* Toggle Switch */}
                      <button 
                        onClick={() => handleDayToggle(dayIndex)}
                        className={`w-11 h-6 rounded-full transition-colors relative ${day.enabled ? 'bg-[#0F766E]' : 'bg-slate-300'}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${day.enabled ? 'left-6' : 'left-1'}`} />
                      </button>
                      
                      <span className={`font-bold w-24 ${day.enabled ? 'text-slate-800' : 'text-slate-500'}`}>
                        {day.dayOfWeek}
                      </span>
                    </div>

                    {day.enabled && (
                      <Button 
                        onClick={() => handleAddSlot(dayIndex)}
                        variant="ghost" 
                        size="sm" 
                        className="h-8 text-[#0F766E] font-bold hover:bg-[#0F766E]/10"
                      >
                        <Plus className="w-4 h-4 mr-1.5" />
                        Add Slot
                      </Button>
                    )}
                  </div>

                  {day.enabled && (
                    <div className="p-4 space-y-3 bg-white/50 rounded-b-xl border-t border-slate-100">
                      {day.slots.map((slot, slotIndex) => (
                        <div key={slotIndex} className="flex flex-wrap items-end gap-4 p-3 border border-slate-100 bg-white rounded-lg shadow-sm">
                          <div className="flex-1 min-w-[120px]">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Start Time</label>
                            <input 
                              type="time" 
                              value={slot.start}
                              onChange={(e) => handleTimeChange(dayIndex, slotIndex, 'start', e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0F766E]/50 focus:border-[#0F766E] outline-none font-medium text-slate-700"
                            />
                          </div>
                          <span className="text-slate-300 font-bold mb-3">-</span>
                          <div className="flex-1 min-w-[120px]">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">End Time</label>
                            <input 
                              type="time" 
                              value={slot.end}
                              onChange={(e) => handleTimeChange(dayIndex, slotIndex, 'end', e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0F766E]/50 focus:border-[#0F766E] outline-none font-medium text-slate-700"
                            />
                          </div>
                          
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleRemoveSlot(dayIndex, slotIndex)}
                            className="h-10 w-10 text-rose-500 hover:bg-rose-50 hover:text-rose-600 mb-0.5"
                            title="Remove Slot"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3 flex-shrink-0">
            <Button variant="ghost" onClick={onClose} className="font-semibold text-slate-600 hover:text-slate-900 border border-slate-200">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-[#0F766E] hover:bg-[#0F766E]/90 text-white font-bold shadow-md px-6">
              <Save className="w-4 h-4 mr-2" />
              Save Availability Settings
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
