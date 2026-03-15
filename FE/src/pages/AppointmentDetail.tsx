import { useState, useLayoutEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Map, MapMarker, MapControls, MarkerContent } from '@/components/ui/map';
import { Star, MapPin, Bed, Bath, Maximize, Heart, Share2, CalendarClock, CalendarCheck, XCircle, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScheduleModal } from '@/components/common/ScheduleModal';
import { format } from 'date-fns';

// Mock data to simulate fetching an appointment
const APPOINTMENT_DATA = {
    id: 1,
    title: "Garden Villa – Ecopark Premium",
    price: "12.8 Billion VND",
    address: "Ecopark, Van Giang, Hung Yen",
    beds: 4,
    baths: 5,
    area: 320,
    type: "Villa",
    images: [
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800",
    ],
    agent: {
        name: "Tran Trung",
        role: "Senior Broker",
        avatar: "/placeholder-agent.jpg",
        stars: 4.8,
        reviews: 156
    },
    latitude: 20.9416,
    longitude: 105.9389,
    features: ['Garden', 'Swimming Pool', 'Garage', 'Smart Home', '24/7 Security'],
    isInitiallyScheduled: true, // For mock testing
    scheduledDate: "10:30 AM, 15 March",
    // New Fields Added for Detail View
    specifications: [
        { label: "Property Type", value: "Apartment" },
        { label: "Year Built", value: "2023" },
        { label: "Parking", value: "2 Spaces" },
        { label: "Floor", value: "15th / 25 floors" },
        { label: "Facing", value: "South-East" },
        { label: "Legal", value: "Sổ hồng" },
        { label: "Furniture", value: "Full furnished" },
        { label: "Status", value: "Ready to move in" }
    ],
    galleryWithCaptions: [
        {
            url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
            caption: "Phòng khách rộng rãi với ánh sáng tự nhiên, view toàn cảnh thành phố"
        },
        {
            url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=1200",
            caption: "Bếp hiện đại thiết kế mở, trang bị đầy đủ thiết bị cao cấp"
        }
    ],
    neighborhoodOverview: "Khu vực sầm uất với nhiều tiện ích vượt trội. Chỉ cách bệnh viện đa quốc gia 5 phút di chuyển, liền kề hệ thống trường học quốc tế từ mầm non đến trung học. Xung quanh có 3 siêu thị lớn, công viên xanh mát rộng 50ha đảm bảo không gian sống trong lành. Hệ thống an ninh khu vực 24/7 tuyệt đối an toàn.",
    additionalInfo: "Chủ nhà dự định để lại toàn bộ hệ thống tủ âm tường cao cấp nhập khẩu từ Đức và một dàn âm thanh rạp hát phòng khách trị giá 200 triệu VNĐ. Thời hạn bàn giao có thể linh hoạt thương lượng tùy thuộc vào tiến độ thanh toán của khách."
};

const AppointmentDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Scroll to top on mount
    useLayoutEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }, []);

    // Action Logic
    type ApptStatus = "Not Scheduled" | "Pending Seller Approval" | "Confirmed";
    const [status, setStatus] = useState<ApptStatus>("Not Scheduled");
    const [scheduledDateStr, setScheduledDateStr] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSchedule = (date: Date, isCustom: boolean) => {
        // Mock save logic
        if (isCustom) {
            setStatus("Pending Seller Approval");
            setScheduledDateStr(format(date, "h:mm a, dd MMMM yyyy"));
        } else {
            setStatus("Confirmed");
            // Since our modal passed back just the day object without parsing the time string realistically,
            // we will format it simply here for the demo.
            setScheduledDateStr(format(date, "EEEE, dd MMMM yyyy") + " (Selected Time)");
        }
    };

    return (
        <div className="min-h-screen bg-[#F6F7F9] font-['Josefin_Sans']">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;600;700&display=swap');`}</style>
            
            <Header />

            <main className="pt-28 pb-16 max-w-[1440px] mx-auto px-4 md:px-8">
                
                {/* Back Navigation */}
                <button 
                    onClick={() => navigate('/profile?tab=buy')}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors font-semibold"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Profile (Buy Tab)
                </button>

                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Left Column: Property Content */}
                    <div className="flex-1 bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
                        
                        {/* Main Image Gallery */}
                        <div className="relative h-[400px] md:h-[500px] w-full bg-gray-100">
                            <img src={APPOINTMENT_DATA.images[0]} alt={APPOINTMENT_DATA.title} className="w-full h-full object-cover" />
                            <div className="absolute top-4 right-4 flex gap-3">
                                <button className="w-10 h-10 rounded-full bg-white/90 shadow-sm flex items-center justify-center hover:bg-white hover:scale-105 transition-all text-gray-600">
                                    <Share2 className="w-5 h-5" />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-white/90 shadow-sm flex items-center justify-center hover:bg-white hover:scale-105 transition-all text-red-500">
                                    <Heart className="w-5 h-5 fill-current" />
                                </button>
                            </div>
                        </div>

                        {/* Property Specs */}
                        <div className="p-8">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
                                <div>
                                    <h1 className="text-3xl font-bold text-foreground font-['Inter'] leading-tight mb-2">
                                        {APPOINTMENT_DATA.title}
                                    </h1>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <MapPin className="w-5 h-5 text-primary" />
                                        <span className="text-lg">{APPOINTMENT_DATA.address}</span>
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-[#0F766E] font-['Inter'] whitespace-nowrap">
                                    {APPOINTMENT_DATA.price}
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-base mb-8 pb-8 border-b border-border">
                                <div className="bg-secondary/50 px-4 py-2 rounded-xl flex items-center gap-2 border border-border">
                                    <Bed className="w-5 h-5 text-primary" />
                                    <span className="font-semibold">{APPOINTMENT_DATA.beds} Beds</span>
                                </div>
                                <div className="bg-secondary/50 px-4 py-2 rounded-xl flex items-center gap-2 border border-border">
                                    <Bath className="w-5 h-5 text-primary" />
                                    <span className="font-semibold">{APPOINTMENT_DATA.baths} Baths</span>
                                </div>
                                <div className="bg-secondary/50 px-4 py-2 rounded-xl flex items-center gap-2 border border-border">
                                    <Maximize className="w-5 h-5 text-primary" />
                                    <span className="font-semibold">{APPOINTMENT_DATA.area} m²</span>
                                </div>
                            </div>

                            {/* Description */}
                            <h3 className="text-xl font-bold mb-4 font-['Inter']">Property Overview</h3>
                            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                                Experience luxury living in this stunning property located in the heart of the most desirable neighborhood.
                                Featuring modern amenities, spacious interiors, and breathtaking views.
                                Perfect for families or professionals seeking a premium lifestyle combined with unparalleled comfort and design.
                                The architecture seamlessly blends indoor and outdoor spaces, creating an oasis of tranquility.
                            </p>

                            {/* Features */}
                            <h3 className="text-xl font-bold mb-4 font-['Inter']">Key Features</h3>
                            <div className="flex flex-wrap gap-3 mb-10 pb-10 border-b border-border">
                                {APPOINTMENT_DATA.features.map((feature) => (
                                    <span key={feature} className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-semibold">
                                        {feature}
                                    </span>
                                ))}
                            </div>

                            {/* Property Details (Specs) */}
                            <h3 className="text-xl font-bold mb-6 font-['Inter']">Property Details</h3>
                            <div className="flex flex-col mb-10 pb-10 border-b border-border">
                                {APPOINTMENT_DATA.specifications.map((spec, idx) => (
                                    <div 
                                        key={spec.label} 
                                        className={cn(
                                            "flex items-center justify-between py-4 text-base",
                                            idx !== APPOINTMENT_DATA.specifications.length - 1 && "border-b border-gray-100"
                                        )}
                                    >
                                        <span className="text-gray-500 font-medium">{spec.label}</span>
                                        <span className="font-bold text-gray-900">{spec.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Property Photos (with Captions) */}
                            <h3 className="text-xl font-bold mb-6 font-['Inter']">Property Photos</h3>
                            <div className="flex flex-col gap-8 mb-10 pb-10 border-b border-border">
                                {APPOINTMENT_DATA.galleryWithCaptions.map((photo, idx) => (
                                    <div key={idx} className="flex flex-col overflow-hidden rounded-2xl shadow-sm border border-gray-100 bg-white">
                                        <div className="h-[300px] sm:h-[400px] w-full bg-gray-100">
                                            <img 
                                                src={photo.url} 
                                                alt={`Property photo ${idx + 1}`} 
                                                className="w-full h-full object-cover" 
                                            />
                                        </div>
                                        <div className="p-4 sm:p-5 text-gray-600 bg-gray-50/50 leading-relaxed font-medium">
                                            {photo.caption}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Surrounding Area */}
                            <h3 className="text-xl font-bold mb-4 font-['Inter']">Surrounding Area</h3>
                            <p className="text-gray-600 leading-relaxed mb-10 pb-10 border-b border-border text-lg">
                                {APPOINTMENT_DATA.neighborhoodOverview}
                            </p>

                            {/* Additional Information */}
                            <h3 className="text-xl font-bold mb-4 font-['Inter']">Additional Information</h3>
                            <p className="text-gray-600 leading-relaxed mb-10 pb-10 border-b border-border text-lg">
                                {APPOINTMENT_DATA.additionalInfo}
                            </p>

                            {/* Agent Section */}
                            <h3 className="text-xl font-bold mb-4 font-['Inter']">Listing Agent</h3>
                            <div className="flex items-center gap-4 p-4 border border-border rounded-xl bg-gray-50/50">
                                <Avatar className="w-16 h-16 border-2 border-white shadow-sm">
                                    <AvatarImage src={APPOINTMENT_DATA.agent.avatar} />
                                    <AvatarFallback className="bg-primary text-primary-foreground text-xl">AG</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h4 className="text-lg font-bold text-foreground">{APPOINTMENT_DATA.agent.name}</h4>
                                    <p className="text-sm text-gray-500 mb-1">{APPOINTMENT_DATA.agent.role}</p>
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                        <span className="font-semibold">{APPOINTMENT_DATA.agent.stars}</span>
                                        <span>({APPOINTMENT_DATA.agent.reviews} reviews)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sticky Sidebar Layout */}
                    <div className="w-full lg:w-[400px] flex-shrink-0">
                        <div className="sticky top-28 bg-white rounded-2xl shadow-lg border border-border p-6 flex flex-col gap-6">
                            
                            {/* Summary Card */}
                            <div>
                                <h3 className="text-lg font-bold font-['Inter'] mb-4">Viewing Schedule</h3>
                                <div className={cn(
                                    "p-4 rounded-xl border transition-colors mb-4",
                                    status === "Confirmed" && "bg-emerald-50 border-emerald-200",
                                    status === "Pending Seller Approval" && "bg-orange-50 border-orange-200", 
                                    status === "Not Scheduled" && "bg-gray-50 border-gray-200"
                                )}>
                                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</div>
                                    <div className={cn(
                                        "text-lg font-bold flex items-center gap-2",
                                        status === "Confirmed" && "text-emerald-700",
                                        status === "Pending Seller Approval" && "text-orange-600",
                                        status === "Not Scheduled" && "text-gray-700"
                                    )}>
                                        {status === "Confirmed" && <CalendarCheck className="w-5 h-5" />}
                                        {status === "Pending Seller Approval" && <CalendarClock className="w-5 h-5" />}
                                        {status === "Not Scheduled" && <XCircle className="w-5 h-5" />}
                                        {status}
                                    </div>
                                    {status !== "Not Scheduled" && scheduledDateStr && (
                                        <div className={cn("mt-3 font-medium", status === "Confirmed" ? "text-emerald-800" : "text-orange-800")}>
                                            Time: {scheduledDateStr}
                                        </div>
                                    )}
                                </div>
                                
                                {/* The Inverse Logic Buttons */}
                                <div className="space-y-3">
                                    <Button 
                                        className={cn(
                                            "w-full h-12 text-base font-bold transition-all",
                                            status !== "Not Scheduled" 
                                                ? "opacity-50 cursor-not-allowed bg-gray-300 text-gray-500 hover:bg-gray-300" 
                                                : "bg-[#0F766E] hover:bg-[#0F766E]/90 text-white shadow-md hover:shadow-lg"
                                        )}
                                        onClick={() => setIsModalOpen(true)}
                                        disabled={status !== "Not Scheduled"}
                                    >
                                        <CalendarCheck className="w-5 h-5 mr-2" />
                                        Schedule Appointment
                                    </Button>

                                    <Button 
                                        variant="outline"
                                        className={cn(
                                            "w-full h-12 text-base font-bold transition-all",
                                            status === "Not Scheduled" 
                                                ? "opacity-50 cursor-not-allowed border-gray-200 text-gray-400" 
                                                : "border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                                        )}
                                        onClick={() => {
                                            setStatus("Not Scheduled");
                                            setScheduledDateStr(null);
                                        }}
                                        disabled={status === "Not Scheduled"}
                                    >
                                        <XCircle className="w-5 h-5 mr-2" />
                                        Cancel Appointment
                                    </Button>
                                </div>
                            </div>

                            <hr className="border-border" />

                            {/* Small Map inside Sticky Sidebar */}
                            <div>
                                <h3 className="text-lg font-bold font-['Inter'] mb-3">Location</h3>
                                <p className="text-sm text-gray-500 mb-4">{APPOINTMENT_DATA.address}</p>
                                <div className="h-48 w-full rounded-xl overflow-hidden border border-border relative z-0">
                                    <Map
                                        viewport={{
                                            center: [APPOINTMENT_DATA.longitude, APPOINTMENT_DATA.latitude],
                                            zoom: 13,
                                            bearing: 0,
                                            pitch: 0
                                        }}
                                        className="w-full h-full"
                                    > 
                                        <MapMarker longitude={APPOINTMENT_DATA.longitude} latitude={APPOINTMENT_DATA.latitude}>
                                            <MarkerContent>
                                                <div className="relative h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-lg animate-pulse" />
                                            </MarkerContent>
                                        </MapMarker>
                                        <MapControls position="bottom-right" />
                                    </Map>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </main>

            <Footer />

            <ScheduleModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSchedule={handleSchedule}
                propertyName={APPOINTMENT_DATA.title}
            />
        </div>
    );
};

export default AppointmentDetail;
