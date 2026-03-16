import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Mail, Phone, MapPin, Edit, Clock, CheckCircle2, Save,
  Eye, EyeOff, TrendingUp, Home, Calendar, ArrowRight, X,
  Building2, BadgeDollarSign, ShoppingCart, ChevronLeft, ChevronRight, Loader2
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { updateProfile } from "@/lib/authApi";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Legend, Filler
);

// Dummy stats (sẽ được thay bằng API riêng sau)
const PLACEHOLDER_STATS = { totalValue: "—", properties: 0, appointments: 0 };

const SELL_LIST = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1, 
  title: i % 2 === 0 ? `Riverside Villa ${i + 1}` : `Penthouse Suite ${i + 1}`,
  price: `${15 + i * 2} Billion VND`,
  address: i % 2 === 0 ? "Thao Dien, Thu Duc City" : "Vinhomes Central Park",
  status: i % 3 === 0 ? "Negotiating" : i % 2 === 0 ? "For Sale" : "New",
  views: 1000 + i * 50, leads: 10 + i * 2, daysListed: i + 1,
  newAppointments: i % 4 === 0 ? 0 : (i % 3) + 1, // Fake count of unread appointments
  image: i % 2 === 0 ? "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600" : "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600",
}));

const BUY_LIST = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1, 
  property: i % 2 === 0 ? `Garden Villa – Ecopark ${i + 1}` : `Premium Shophouse ${i + 1}`,
  seller: i % 2 === 0 ? "Tran Trung (Broker)" : "Le Lan Anh (Owner)",
  date: `10:30 AM, ${15 + i} Mar`, 
  status: i % 3 === 0 ? "Pending" : "Confirmed", 
  price: `${12 + i} Billion VND`,
  image: i % 2 === 0 ? "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=400" : "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=400",
}));

type TabKey = "profile" | "buy" | "sell";

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: "profile", label: "Profile", icon: <Home className="w-4 h-4" /> },
  { key: "buy", label: "Buy", icon: <ShoppingCart className="w-4 h-4" /> },
  { key: "sell", label: "Sell", icon: <BadgeDollarSign className="w-4 h-4" /> },
];

const statusColor = (s: string) => {
  if (s === "Confirmed") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (s === "Pending" || s === "Negotiating") return "bg-amber-50 text-amber-700 border-amber-200";
  if (s === "For Sale") return "bg-blue-50 text-blue-700 border-blue-200";
  if (s === "New") return "bg-violet-50 text-violet-700 border-violet-200";
  return "bg-teal-50 text-teal-700 border-teal-200";
};

const PaginationControls = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: { 
  currentPage: number; 
  totalPages: number; 
  onPageChange: (page: number) => void; 
}) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-4 mt-8 pb-4">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => {
          onPageChange(Math.max(1, currentPage - 1));
          window.scrollTo({ top: 400, behavior: "smooth" });
        }}
        disabled={currentPage === 1}
        className="text-gray-500 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4 mr-1" /> Previous
      </Button>
      <div className="text-sm font-medium text-gray-600 px-4">
        Page {currentPage} of {totalPages}
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => {
          onPageChange(Math.min(totalPages, currentPage + 1));
          window.scrollTo({ top: 400, behavior: "smooth" });
        }}
        disabled={currentPage === totalPages}
        className="text-gray-500 cursor-pointer"
      >
        Next <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
};

const CHART_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CHART_DATA = {
  revenue: [1.2, 2.8, 5.5, 4.2, 3.8, 8.2, 12.5, 10.8, 9.6, 15.2, 13.0, 18.5],
};

const Profile = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, loading: authLoading, refreshUser } = useAuth();
  const initialTab = (searchParams.get('tab') as TabKey) || "profile";
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);
  
  const [buyPage, setBuyPage] = useState(1);
  const [sellPage, setSellPage] = useState(1);
  const buyItemsPerPage = 5;
  const sellItemsPerPage = 9;
  
  const paginatedBuy = BUY_LIST.slice((buyPage - 1) * buyItemsPerPage, buyPage * buyItemsPerPage);
  const totalBuyPages = Math.ceil(BUY_LIST.length / buyItemsPerPage);

  const paginatedSell = SELL_LIST.slice((sellPage - 1) * sellItemsPerPage, sellPage * sellItemsPerPage);
  const totalSellPages = Math.ceil(SELL_LIST.length / sellItemsPerPage);

  const [editingInfo, setEditingInfo] = useState(false);
  const [editingBio, setEditingBio] = useState(false);
  const [savingInfo, setSavingInfo] = useState(false);
  const [savingBio, setSavingBio] = useState(false);
  const [activityVisible, setActivityVisible] = useState(true);

  // Lấy giá trị từ user thực, fallback về empty string
  const [infoData, setInfoData] = useState({
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    location: user?.address ?? '',
  });
  const [bioData, setBioData] = useState({
    bio: user?.bio ?? '',
    firstName: user?.first_name ?? '',
    lastName: user?.last_name ?? '',
  });

  // Sync khi user load xong
  useEffect(() => {
    if (user) {
      setInfoData({ email: user.email, phone: user.phone ?? '', location: user.address ?? '' });
      setBioData({ bio: user.bio ?? '', firstName: user.first_name, lastName: user.last_name });
    }
  }, [user]);

  const handleSaveInfo = async () => {
    setSavingInfo(true);
    try {
      await updateProfile({ phone: infoData.phone, address: infoData.location });
      await refreshUser();
      setEditingInfo(false);
    } catch {
      // TODO: show error toast
    } finally {
      setSavingInfo(false);
    }
  };

  const handleSaveBio = async () => {
    setSavingBio(true);
    try {
      await updateProfile({
        first_name: bioData.firstName,
        last_name: bioData.lastName,
        bio: bioData.bio,
      });
      await refreshUser();
      setEditingBio(false);
    } catch {
      // TODO: show error toast
    } finally {
      setSavingBio(false);
    }
  };

  const displayName = user ? `${user.first_name} ${user.last_name}`.trim() || user.username : '—';

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFB]">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFB] font-['Josefin_Sans']">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;600;700&display=swap');`}</style>

      <Header />

      <main style={{ paddingTop: '140px' }}>
        <div className="relative bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-6 pt-8">
            <div className="flex flex-col md:flex-row md:items-end gap-5">
              <div className="relative z-10 group w-fit">
                <Avatar className="w-32 h-32 border-4 border-white shadow-xl bg-white">
                  <AvatarImage src={user?.avatar ?? undefined} className="object-cover" />
                  <AvatarFallback className="text-3xl bg-teal-50 text-teal-700">
                    {displayName.slice(0, 2).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-3 right-3 bg-white p-1.5 rounded-full shadow border border-gray-200 cursor-pointer hover:scale-110 transition-transform">
                  <Edit className="w-3.5 h-3.5 text-gray-600" />
                </button>
              </div>

              <div className="flex-1 pb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-['Inter']">{displayName}</h1>
                <p className="text-gray-500 text-sm mt-0.5" style={{ paddingLeft: '5px' }}>@{user?.username}</p>
              </div>

              <div className="flex gap-8 pb-3">
                {[
                  { label: "Total Value", value: PLACEHOLDER_STATS.totalValue, icon: <TrendingUp className="w-4 h-4" /> },
                  { label: "Active Listings", value: PLACEHOLDER_STATS.properties, icon: <Building2 className="w-4 h-4" /> },
                  { label: "Appointments", value: PLACEHOLDER_STATS.appointments, icon: <Calendar className="w-4 h-4" /> },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl font-bold text-gray-900 font-['Inter']">{s.value}</div>
                    <div className="text-xs text-gray-400 mt-0.5 flex items-center justify-center gap-1">{s.icon}{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-1 mt-10 border-b border-gray-200">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-colors cursor-pointer rounded-t-lg
                    ${activeTab === tab.key
                      ? "text-[#0F766E] border-b-2 border-[#0F766E] bg-white"
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8">

          {activeTab === "profile" && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 animate-[fadeIn_0.3s_ease]">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl pt-3 px-4 pb-6 border border-gray-100 shadow-sm relative">
                  <h3 className="text-lg font-bold text-gray-900 mb-5 font-['Inter']">Info</h3>
                  <div className="absolute top-3 right-3">
                    {!editingInfo ? (
                      <button onClick={() => setEditingInfo(true)} className="p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer" title="Sửa">
                        <Edit className="w-4 h-4 text-gray-400" />
                      </button>
                    ) : (
                      <div className="flex gap-1">
                        <button onClick={() => { setEditingInfo(false); }} className="p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer" title="Hủy">
                          <X className="w-4 h-4 text-gray-400" />
                        </button>
                        <button onClick={handleSaveInfo} disabled={savingInfo} className="p-2 rounded-lg bg-[#0F766E] hover:bg-[#0F766E]/90 transition-colors cursor-pointer disabled:opacity-60" title="Lưu">
                          {savingInfo ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Save className="w-4 h-4 text-white" />}
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    {[
                      { icon: <Mail className="w-4 h-4 text-[#0F766E]" />, label: "EMAIL", key: "email" as const, editable: false },
                      { icon: <Phone className="w-4 h-4 text-[#0F766E]" />, label: "PHONE", key: "phone" as const, editable: true },
                      { icon: <MapPin className="w-4 h-4 text-[#0F766E]" />, label: "LOCATION", key: "location" as const, editable: true },
                    ].map((info) => (
                      <div key={info.label} className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#F0FDFA] flex items-center justify-center flex-shrink-0 mt-0.5">{info.icon}</div>
                        <div className="flex-1">
                          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{info.label}</div>
                          {editingInfo && info.editable ? (
                            <input
                              type="text"
                              value={infoData[info.key]}
                              onChange={(e) => setInfoData({ ...infoData, [info.key]: e.target.value })}
                              className="text-sm text-gray-700 font-medium w-full border border-gray-200 rounded-lg px-3 py-1.5 mt-1 outline-none focus:border-[#14B8A6] transition-colors"
                            />
                          ) : (
                            <div className="text-sm text-gray-700 font-medium">{infoData[info.key] || <span className="text-gray-400 italic">Chưa cập nhật</span>}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 font-['Inter']">Biography</h3>
                  <div className="absolute top-3 right-3">
                    {!editingBio ? (
                      <button onClick={() => setEditingBio(true)} className="p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer" title="Sửa">
                        <Edit className="w-4 h-4 text-gray-400" />
                      </button>
                    ) : (
                      <div className="flex gap-1">
                        <button onClick={() => setEditingBio(false)} className="p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer" title="Hủy">
                          <X className="w-4 h-4 text-gray-400" />
                        </button>
                        <button onClick={handleSaveBio} disabled={savingBio} className="p-2 rounded-lg bg-[#0F766E] hover:bg-[#0F766E]/90 transition-colors cursor-pointer disabled:opacity-60" title="Lưu">
                          {savingBio ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Save className="w-4 h-4 text-white" />}
                        </button>
                      </div>
                    )}
                  </div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">About Me</h4>
                  {editingBio ? (
                    <textarea
                      value={bioData.bio}
                      onChange={(e) => setBioData({ ...bioData, bio: e.target.value })}
                      rows={3}
                      className="text-sm text-gray-500 leading-relaxed mb-5 w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#14B8A6] transition-colors resize-none"
                    />
                  ) : (
                    <p className="text-sm text-gray-500 leading-relaxed mb-5">{bioData.bio || <span className="italic text-gray-400">Chưa có giới thiệu.</span>}</p>
                  )}
                  <div className="space-y-3 border-t border-gray-100 pt-4">
                    {[
                      { label: "Họ", editKey: "firstName" as const, display: bioData.firstName, editable: true },
                      { label: "Tên", editKey: "lastName" as const, display: bioData.lastName, editable: true },
                      { label: "Username", editKey: null, display: user?.username, editable: false },
                      { label: "Email", editKey: null, display: user?.email, editable: false },
                    ].map((d) => (
                      <div key={d.label} className="flex items-center text-sm">
                        <span className="text-gray-400 w-28 flex-shrink-0">{d.label}:</span>
                        {editingBio && d.editable && d.editKey ? (
                          <input
                            type="text"
                            value={bioData[d.editKey]}
                            onChange={(e) => setBioData({ ...bioData, [d.editKey!]: e.target.value })}
                            className="font-medium text-gray-700 flex-1 border border-gray-200 rounded-lg px-3 py-1 outline-none focus:border-[#14B8A6] transition-colors"
                          />
                        ) : (
                          <span className="font-medium text-gray-700">{d.display || <span className="italic text-gray-400">—</span>}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 space-y-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-bold text-gray-900 font-['Inter']">Revenue</h3>
                    <select className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-gray-500 cursor-pointer outline-none focus:border-[#14B8A6] transition-colors">
                      <option>Năm 2025</option>
                      <option>Năm 2024</option>
                    </select>
                  </div>
                  <div className="h-64">
                    <Line
                      data={{
                        labels: CHART_LABELS,
                        datasets: [
                          {
                            label: "Revenue (Tỷ)",
                            data: CHART_DATA.revenue,
                            borderColor: "#14B8A6",
                            backgroundColor: "rgba(20, 184, 166, 0.12)",
                            fill: true,
                            tension: 0.4,
                            pointRadius: 5,
                            pointBackgroundColor: "#fff",
                            pointBorderColor: "#14B8A6",
                            pointBorderWidth: 2.5,
                            pointHoverRadius: 7,
                            pointHoverBackgroundColor: "#14B8A6",
                            pointHoverBorderColor: "#fff",
                            borderWidth: 2.5,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        interaction: { mode: "index", intersect: false },
                        plugins: {
                          legend: { display: false },
                          tooltip: {
                            backgroundColor: "#1F2937",
                            titleFont: { family: "Josefin Sans", size: 13 },
                            bodyFont: { family: "Josefin Sans", size: 12 },
                            padding: 12,
                            cornerRadius: 10,
                            callbacks: {
                              label: (ctx) => ` Revenue: ${ctx.parsed.y} Tỷ VNĐ`,
                            },
                          },
                        },
                        scales: {
                          x: {
                            grid: { display: false },
                            ticks: { font: { family: "Josefin Sans", size: 11 }, color: "#9CA3AF" },
                          },
                          y: {
                            grid: { color: "#F3F4F6" },
                            ticks: {
                              font: { family: "Josefin Sans", size: 11 },
                              color: "#9CA3AF",
                              callback: (v) => `${v} Tỷ`,
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </div>

                <div className="bg-white rounded-2xl pt-3 px-4 pb-6 border border-gray-100 shadow-sm relative">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-bold text-gray-900 font-['Inter']">Latest Activity</h3>
                    <button
                      onClick={() => setActivityVisible(!activityVisible)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                        activityVisible
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                          : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100"
                      }`}
                      title={activityVisible ? "Đang hiện cho người khác" : "Đang ẩn với người khác"}
                    >
                      {activityVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      {activityVisible ? "Công khai" : "Đã ẩn"}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: "Urgent", title: "Meeting with buyer for Biệt thự ven sông", time: "27 Feb, 2:30 PM – 4:00 PM", color: "bg-red-500" },
                      { label: "Reminder", title: "Update pricing for Penthouse Landmark 81", time: "26 Feb, 9:00 AM", color: "bg-blue-500" },
                    ].map((act, i) => (
                      <div key={i} className="border border-gray-100 rounded-xl p-4 hover:border-[#14B8A6]/30 hover:shadow-sm transition-all cursor-pointer group">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`w-2 h-2 rounded-full ${act.color}`} />
                          <span className="text-xs font-bold text-red-600">{act.label}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-gray-800 mb-3 group-hover:text-[#0F766E] transition-colors">{act.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Avatar className="w-5 h-5">
                            <AvatarImage src={user?.avatar ?? undefined} />
                            <AvatarFallback>{displayName.slice(0,2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          {displayName}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400 mt-1.5">
                          <Clock className="w-3 h-3" /> {act.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "buy" && (
            <div className="space-y-6 animate-[fadeIn_0.3s_ease]">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 font-['Inter']">Viewing Appointments</h2>
                  <p className="text-sm text-gray-400 mt-1">Properties you are interested in & scheduled</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {paginatedBuy.map((apt) => (
                  <div key={apt.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5 flex flex-col md:flex-row items-center gap-5 cursor-pointer group">
                    <img src={apt.image} alt={apt.property} className="w-full md:w-28 h-28 rounded-xl object-cover flex-shrink-0 group-hover:scale-[1.02] transition-transform" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#0F766E] transition-colors truncate">{apt.property}</h4>
                      <p className="text-sm text-gray-400 mt-1">Meeting with: <span className="font-semibold text-gray-600">{apt.seller}</span></p>
                      <div className="text-xl font-bold text-[#0F766E] font-['Inter'] mt-2">{apt.price}</div>
                    </div>
                    <div className="flex items-center gap-3 bg-[#F8FAFB] px-4 py-3 rounded-xl border border-gray-100 flex-shrink-0">
                      <Calendar className="w-5 h-5 text-[#14B8A6]" />
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Time</div>
                        <div className="text-sm font-semibold text-gray-700">{apt.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${statusColor(apt.status)}`}>
                        {apt.status === "Confirmed" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {apt.status}
                      </span>
                      <Link to={`/appointment/${apt.id}`}>
                        <Button variant="outline" size="sm" className="rounded-full border-gray-200 text-gray-600 hover:border-[#14B8A6] hover:text-[#0F766E] cursor-pointer">
                          Details <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              
              <PaginationControls 
                currentPage={buyPage} 
                totalPages={totalBuyPages} 
                onPageChange={setBuyPage} 
              />
            </div>
          )}

          {activeTab === "sell" && (
            <div className="space-y-6 animate-[fadeIn_0.3s_ease]">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 font-['Inter']">Properties for Sale</h2>
                  <p className="text-sm text-gray-400 mt-1">Manage your active property listings</p>
                </div>
                <Button 
                  className="bg-[#0369A1] hover:bg-[#0369A1]/90 text-white rounded-full px-6 cursor-pointer"
                  onClick={() => navigate('/add-property')}
                >
                  + Add Property
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedSell.map((item) => (
                  <div key={item.id} onClick={() => navigate('/manage-property/' + item.id)} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden cursor-pointer group">
                    <div className="relative h-48 overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      {item.newAppointments > 0 && (
                        <div className="absolute top-3 right-3 bg-rose-500 text-white text-xs font-bold px-2 rounded flex items-center gap-1 shadow-md animate-pulse">
                          <span className="relative flex h-2 w-2 mr-1">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                          </span>
                          {item.newAppointments} New Appointments
                        </div>
                      )}
                      <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-lg">
                        {item.daysListed} days
                      </div>
                    </div>
                    <div className="p-5">
                      <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#0F766E] transition-colors truncate">{item.title}</h4>
                      <div className="flex items-start gap-1.5 text-gray-400 text-xs mt-1.5">
                        <MapPin className="w-3 h-3 flex-shrink-0 mt-0.5" />
                        <span>{item.address}</span>
                      </div>
                      <div className="text-2xl font-bold text-[#0F766E] font-['Inter'] mt-4 mb-4">{item.price}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <PaginationControls 
                currentPage={sellPage} 
                totalPages={totalSellPages} 
                onPageChange={setSellPage} 
              />
            </div>
          )}

        </div>
      </main>

      <Footer />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Profile;
