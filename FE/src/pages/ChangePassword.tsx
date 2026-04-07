import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Lock, Eye, EyeOff, ShieldCheck, User, Phone, Mail,
  MapPin, Calendar, ChevronRight, Save, ArrowLeft
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Section = "personal" | "contact" | "security";

const SIDEBAR_ITEMS: { key: Section; label: string; icon: React.ReactNode; desc: string }[] = [
  { key: "personal", label: "Personal Info", icon: <User className="w-4 h-4" />, desc: "Name, birthday, gender" },
  { key: "contact", label: "Contact", icon: <Phone className="w-4 h-4" />, desc: "Email, phone, address" },
  { key: "security", label: "Security", icon: <ShieldCheck className="w-4 h-4" />, desc: "Change password" },
];

const AccountSettings = () => {
  const [section, setSection] = useState<Section>("personal");

  const [personal, setPersonal] = useState({
    fullName: "Nguyen Van A",
    birthday: "1990-05-15",
    gender: "Male",
    bio: "Real estate investor with over 5 years of experience.",
  });

  const [contact, setContact] = useState({
    email: "nguyenvana@example.com",
    phone: "+84 901 234 567",
    address: "District 7, Ho Chi Minh City",
  });

  const [pw, setPw] = useState({ current: "", newPw: "", confirm: "" });
  const [showPw, setShowPw] = useState({ current: false, newPw: false, confirm: false });
  const [saveMsg, setSaveMsg] = useState("");

  const flash = (msg: string) => {
    setSaveMsg(msg);
    setTimeout(() => setSaveMsg(""), 3000);
  };

  const handleSavePersonal = (e: React.FormEvent) => {
    e.preventDefault();
    flash("Personal info saved successfully!");
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    flash("Contact info saved successfully!");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pw.current || !pw.newPw || !pw.confirm) { flash("⚠ Please fill in all fields."); return; }
    if (pw.newPw.length < 8) { flash("⚠ New password must be at least 8 characters."); return; }
    if (pw.newPw !== pw.confirm) { flash("⚠ Passwords do not match."); return; }
    setPw({ current: "", newPw: "", confirm: "" });
    flash("Password changed successfully!");
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#14B8A6] transition-colors bg-[#F8FAFB]";
  const labelClass = "text-sm font-semibold text-gray-700 mb-2 block";

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <Header />

      <main style={{ paddingTop: "140px" }}>
        <div className="max-w-6xl mx-auto px-6 py-10">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Go back
          </button>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">Account Settings</h1>
          <p className="text-sm text-gray-400 mb-8">Manage your personal information and account security</p>

          {saveMsg && (
            <div className={`mb-6 p-4 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${
              saveMsg.startsWith("⚠") 
                ? "bg-red-50 border border-red-200 text-red-600" 
                : "bg-emerald-50 border border-emerald-200 text-emerald-700"
            }`}>
              {!saveMsg.startsWith("⚠") && <ShieldCheck className="w-4 h-4" />}
              {saveMsg.replace("⚠ ", "")}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2 sticky top-36">
                <div className="flex items-center gap-3 p-4 mb-2">
                  <Avatar className="w-12 h-12 border-2 border-white shadow flex-shrink-0 aspect-square">
                    <AvatarImage src="../src/assets/images/avatar1.jpg" />
                    <AvatarFallback className="bg-teal-50 text-teal-700 text-lg">NV</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{personal.fullName}</div>
                    <div className="text-xs text-gray-400">{contact.email}</div>
                  </div>
                </div>
                <div className="space-y-1">
                  {SIDEBAR_ITEMS.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setSection(item.key)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all cursor-pointer ${
                        section === item.key
                          ? "bg-[#F0FDFA] text-[#0F766E] border border-[#14B8A6]/20"
                          : "hover:bg-gray-50 text-gray-600"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        section === item.key ? "bg-[#0F766E] text-white" : "bg-gray-100 text-gray-400"
                      }`}>
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold">{item.label}</div>
                        <div className="text-[11px] text-gray-400 truncate">{item.desc}</div>
                      </div>
                      <ChevronRight className={`w-4 h-4 flex-shrink-0 ${section === item.key ? "text-[#0F766E]" : "text-gray-300"}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

                {/* Personal Info */}
                {section === "personal" && (
                  <form onSubmit={handleSavePersonal} className="animate-[fadeIn_0.2s_ease]">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-[#F0FDFA] flex items-center justify-center">
                        <User className="w-5 h-5 text-[#0F766E]" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
                        <p className="text-xs text-gray-400">Update your name, birthday and gender</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="md:col-span-2">
                        <label className={labelClass}>Full Name</label>
                        <input
                          type="text"
                          value={personal.fullName}
                          onChange={(e) => setPersonal({ ...personal, fullName: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Birthday</label>
                        <input
                          type="date"
                          value={personal.birthday}
                          onChange={(e) => setPersonal({ ...personal, birthday: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Gender</label>
                        <select
                          value={personal.gender}
                          onChange={(e) => setPersonal({ ...personal, gender: e.target.value })}
                          className={`${inputClass} cursor-pointer`}
                        >
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className={labelClass}>About Me</label>
                        <textarea
                          value={personal.bio}
                          onChange={(e) => setPersonal({ ...personal, bio: e.target.value })}
                          rows={3}
                          className={`${inputClass} resize-none`}
                        />
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                      <Button type="submit" className="bg-[#0F766E] hover:bg-[#0F766E]/90 text-white rounded-xl px-8 h-11 font-semibold cursor-pointer">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </form>
                )}

                {/* Contact */}
                {section === "contact" && (
                  <form onSubmit={handleSaveContact} className="animate-[fadeIn_0.2s_ease]">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-[#F0FDFA] flex items-center justify-center">
                        <Phone className="w-5 h-5 text-[#0F766E]" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-gray-900">Contact Information</h2>
                        <p className="text-xs text-gray-400">Manage your email, phone number and address</p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label className={labelClass}>Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="email"
                            value={contact.email}
                            onChange={(e) => setContact({ ...contact, email: e.target.value })}
                            className={`${inputClass} pl-10`}
                          />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="tel"
                            value={contact.phone}
                            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                            className={`${inputClass} pl-10`}
                          />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>Address</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            value={contact.address}
                            onChange={(e) => setContact({ ...contact, address: e.target.value })}
                            className={`${inputClass} pl-10`}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                      <Button type="submit" className="bg-[#0F766E] hover:bg-[#0F766E]/90 text-white rounded-xl px-8 h-11 font-semibold cursor-pointer">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </form>
                )}

                {/* Security */}
                {section === "security" && (
                  <form onSubmit={handleChangePassword} className="animate-[fadeIn_0.2s_ease]">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-[#F0FDFA] flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-[#0F766E]" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-gray-900">Change Password</h2>
                        <p className="text-xs text-gray-400">Update your password to keep your account secure</p>
                      </div>
                    </div>

                    <div className="space-y-5 max-w-md">
                      <div>
                        <label className={labelClass}>Current Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type={showPw.current ? "text" : "password"}
                            value={pw.current}
                            onChange={(e) => setPw({ ...pw, current: e.target.value })}
                            placeholder="Enter current password"
                            className={`${inputClass} pl-10 pr-10`}
                          />
                          <button type="button" onClick={() => setShowPw({ ...showPw, current: !showPw.current })} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600">
                            {showPw.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>New Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type={showPw.newPw ? "text" : "password"}
                            value={pw.newPw}
                            onChange={(e) => setPw({ ...pw, newPw: e.target.value })}
                            placeholder="At least 8 characters"
                            className={`${inputClass} pl-10 pr-10`}
                          />
                          <button type="button" onClick={() => setShowPw({ ...showPw, newPw: !showPw.newPw })} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600">
                            {showPw.newPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {pw.newPw.length > 0 && (
                          <div className="mt-2 flex items-center gap-2">
                            <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                              <div className={`h-full rounded-full transition-all ${
                                pw.newPw.length < 6 ? "w-1/4 bg-red-400" :
                                pw.newPw.length < 8 ? "w-1/2 bg-amber-400" :
                                pw.newPw.length < 12 ? "w-3/4 bg-[#14B8A6]" :
                                "w-full bg-emerald-500"
                              }`} />
                            </div>
                            <span className={`text-[11px] font-medium ${
                              pw.newPw.length < 6 ? "text-red-400" :
                              pw.newPw.length < 8 ? "text-amber-500" :
                              pw.newPw.length < 12 ? "text-[#0F766E]" :
                              "text-emerald-600"
                            }`}>
                              {pw.newPw.length < 6 ? "Weak" : pw.newPw.length < 8 ? "Fair" : pw.newPw.length < 12 ? "Strong" : "Very Strong"}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className={labelClass}>Confirm New Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type={showPw.confirm ? "text" : "password"}
                            value={pw.confirm}
                            onChange={(e) => setPw({ ...pw, confirm: e.target.value })}
                            placeholder="Re-enter new password"
                            className={`${inputClass} pl-10 pr-10 ${
                              pw.confirm && pw.confirm !== pw.newPw ? "border-red-300" : ""
                            }`}
                          />
                          <button type="button" onClick={() => setShowPw({ ...showPw, confirm: !showPw.confirm })} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600">
                            {showPw.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {pw.confirm && pw.confirm !== pw.newPw && (
                          <p className="text-xs text-red-400 mt-1.5">Passwords do not match</p>
                        )}
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                      <Button type="submit" className="bg-[#0F766E] hover:bg-[#0F766E]/90 text-white rounded-xl px-8 h-11 font-semibold cursor-pointer">
                        <Lock className="w-4 h-4 mr-2" />
                        Change Password
                      </Button>
                    </div>
                  </form>
                )}

              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AccountSettings;
