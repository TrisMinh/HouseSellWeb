import { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { getNewsList, NewsItem } from '@/lib/newsApi';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TrendingUp, TrendingDown, BarChart3, MapPin, Calendar, ArrowRight, ChevronRight, Newspaper, Activity, DollarSign, Users, Eye, Clock, Star, Layers, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
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
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// ─── Mock Data ───────────────────────────────────────────
const FEATURED_ARTICLE = {
  id: 1,
  title: "Vietnam Real Estate Market Surges in Early 2026: Ho Chi Minh City Leads Growth",
  excerpt: "The Vietnamese property market sees a 15% increase in transaction volume during Q1 2026, driven by new infrastructure projects and rising demand from both domestic and international buyers. HCMC's District 2 and Thu Duc City emerge as the hottest investment zones.",
  date: "Feb 28, 2026",
  readTime: "8 min read",
  image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200&q=80",
};

const PRICE_DATA = {
  months: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
  hcmc: [62, 64, 63, 66, 69, 72],
  hanoi: [55, 56, 58, 57, 60, 62],
  danang: [35, 36, 35, 37, 38, 40],
};

const MARKET_STATS = [
  { label: 'Avg. Price/m²', value: '72M VND', change: '+5.2%', positive: true, icon: DollarSign },
  { label: 'Total Listings', value: '24,380', change: '+12.1%', positive: true, icon: Layers },
  { label: 'Monthly Views', value: '1.8M', change: '+18.5%', positive: true, icon: Eye },
  { label: 'Active Buyers', value: '52,100', change: '+8.7%', positive: true, icon: Users },
];

const NEWS_ARTICLES = [
  {
    id: 2,
    title: "Hanoi's West Lake District Sees 20% Price Surge Amid New Metro Line",
    excerpt: "The upcoming metro line 3 connecting West Lake to the city center is driving unprecedented demand for residential properties in the area.",
    date: "Feb 27, 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80",
  },
  {
    id: 3,
    title: "Da Nang Beachfront Condos: Best Investment Opportunities in 2026",
    excerpt: "Coastal properties in Da Nang are becoming increasingly attractive to investors with projected annual returns of 8-12% from short-term rentals.",
    date: "Feb 26, 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
  },
  {
    id: 4,
    title: "Government Policies Boost Affordable Housing in Binh Duong Province",
    excerpt: "New subsidies and tax incentives make Binh Duong's residential market more accessible, targeting first-time homebuyers with competitive pricing.",
    date: "Feb 25, 2026",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
  },
  {
    id: 5,
    title: "Luxury Villa Segment Grows 25% YoY in Thu Duc City",
    excerpt: "The luxury segment in Ho Chi Minh's Thu Duc City continues to attract high-net-worth individuals, with average prices surpassing 150M VND/m².",
    date: "Feb 24, 2026",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80",
  },
  {
    id: 6,
    title: "Smart Home Technology Becomes Standard in New Vietnamese Developments",
    excerpt: "Leading developers are integrating IoT systems, solar panels, and EV charging stations as standard features in response to changing buyer expectations.",
    date: "Feb 23, 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1585129777188-94600bc7b4b3?w=600&q=80",
  },
  {
    id: 7,
    title: "Foreign Investment in Vietnam Real Estate Reaches Record High",
    excerpt: "International buyers, particularly from South Korea, Japan, and Singapore, account for 18% of total high-end property transactions in Q1 2026.",
    date: "Feb 22, 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
  },
];

const TOP_PROVINCES = [
  { name: 'Ho Chi Minh City', avgPrice: '72M', change: '+5.2%', listings: 8420, positive: true },
  { name: 'Hanoi', avgPrice: '62M', change: '+3.8%', listings: 6180, positive: true },
  { name: 'Da Nang', avgPrice: '40M', change: '+6.1%', listings: 3250, positive: true },
  { name: 'Binh Duong', avgPrice: '28M', change: '+4.5%', listings: 2890, positive: true },
  { name: 'Nha Trang', avgPrice: '35M', change: '-1.2%', listings: 1640, positive: false },
];

// ─── Animated Counter Hook ───────────────────────────────
function useAnimatedCounter(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(target * eased));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { value, ref };
}

// ─── Chart.js Price Chart Component ──────────────────────
function PriceChart({ data }: { data: typeof PRICE_DATA }) {
  const chartData = {
    labels: data.months,
    datasets: [
      {
        label: 'Ho Chi Minh City',
        data: data.hcmc,
        borderColor: '#0F766E',
        backgroundColor: 'rgba(15, 118, 110, 0.08)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#0F766E',
        pointBorderWidth: 2.5,
        pointRadius: 5,
        pointHoverRadius: 7,
        borderWidth: 2.5,
      },
      {
        label: 'Hanoi',
        data: data.hanoi,
        borderColor: '#0369A1',
        backgroundColor: 'rgba(3, 105, 161, 0.06)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#0369A1',
        pointBorderWidth: 2.5,
        pointRadius: 5,
        pointHoverRadius: 7,
        borderWidth: 2.5,
      },
      {
        label: 'Da Nang',
        data: data.danang,
        borderColor: '#D97706',
        backgroundColor: 'rgba(217, 119, 6, 0.05)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#D97706',
        pointBorderWidth: 2.5,
        pointRadius: 5,
        pointHoverRadius: 7,
        borderWidth: 2.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        align: 'start' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: { size: 13, weight: 600, family: "'Inter', sans-serif" },
          color: '#475569',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleFont: { size: 13, weight: 600, family: "'Inter', sans-serif" },
        bodyFont: { size: 12, family: "'Inter', sans-serif" },
        padding: 12,
        cornerRadius: 10,
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          label: (ctx: any) => ` ${ctx.dataset.label}: ${ctx.parsed.y}M VND/m²`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: { size: 12, weight: 600, family: "'Inter', sans-serif" },
          color: '#94A3B8',
        },
        border: { display: false },
      },
      y: {
        grid: {
          color: '#F1F5F9',
          drawBorder: false,
        },
        ticks: {
          font: { size: 12, weight: 600, family: "'Inter', sans-serif" },
          color: '#94A3B8',
          callback: (val: any) => `${val}M`,
        },
        border: { display: false },
        min: 30,
      },
    },
  };

  return (
    <div className="relative w-full" style={{ height: 280 }}>
      <Line data={chartData} options={options} />
    </div>
  );
}

// ─── Stat Card ───────────────────────────────────────────
function StatCard({ stat, index }: { stat: typeof MARKET_STATS[0]; index: number }) {
  const Icon = stat.icon;
  const numericValue = parseInt(stat.value.replace(/[^0-9]/g, ''), 10);
  const { value, ref } = useAnimatedCounter(numericValue || 0, 1400);

  const displayValue = stat.value.includes('M')
    ? `${(value / 10).toFixed(1)}M`
    : stat.value.includes('K')
      ? `${(value / 1000).toFixed(0)}K`
      : value.toLocaleString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg hover:border-slate-200 transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-teal-50 to-sky-50 text-teal-600 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-5 h-5" />
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${stat.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
          {stat.positive ? <TrendingUp className="w-3 h-3 inline mr-1" /> : <TrendingDown className="w-3 h-3 inline mr-1" />}
          {stat.change}
        </span>
      </div>
      <p className="text-2xl font-bold text-slate-900 font-['Inter'] tracking-tight">{displayValue}</p>
      <p className="text-sm text-slate-500 font-semibold mt-1">{stat.label}</p>
    </motion.div>
  );
}

// ─── News Card ───────────────────────────────────────────
function NewsCard({ article, index }: { article: typeof NEWS_ARTICLES[0]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:border-slate-200 transition-all duration-300 cursor-pointer flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-xs text-slate-400 font-semibold mb-3">
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{article.date}</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{article.readTime}</span>
        </div>
        <h3 className="font-bold text-slate-900 text-lg leading-snug mb-2 group-hover:text-teal-700 transition-colors duration-200 font-['Inter'] line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed flex-1 line-clamp-3">
          {article.excerpt}
        </p>
        <div className="mt-4 flex items-center text-teal-600 font-bold text-sm group-hover:gap-2 transition-all duration-200">
          Read More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </motion.article>
  );
}

// ─── Main News Page ──────────────────────────────────────
const News = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getNewsList();
        // Xử lý API return pagination hoặc array
        if ('results' in response && Array.isArray(response.results)) {
          setNewsList(response.results);
        } else if (Array.isArray(response)) {
          setNewsList(response);
        }
      } catch (error) {
        console.error("Failed to load news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  // Use the first article as featured if available, else keep the mock placeholder
  const actualFeatured = newsList.length > 0 ? {
    id: newsList[0].id,
    title: newsList[0].title,
    excerpt: newsList[0].content.substring(0, 150) + "...",
    date: new Date(newsList[0].created_at).toLocaleDateString(),
    readTime: "5 min read",
    image: newsList[0].thumbnail || FEATURED_ARTICLE.image
  } : FEATURED_ARTICLE;

  // Map remaining items or use mock items if none
  const mappedNewsArticles = newsList.slice(1).map(article => ({
      id: article.id,
      title: article.title,
      excerpt: article.content.substring(0, 100) + "...",
      date: new Date(article.created_at).toLocaleDateString(),
      readTime: "5 min",
      image: article.thumbnail || NEWS_ARTICLES[1].image
  }));

  const displayNews = mappedNewsArticles.length > 0 ? mappedNewsArticles : NEWS_ARTICLES;

  return (
    <div className="min-h-screen bg-[#F6F7F9] font-['Josefin_Sans']">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;600;700&display=swap');`}</style>
      <Header />

      <div role="main" className="pt-28 pb-16">

        {/* ═══ HERO SECTION ═══ */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden group cursor-pointer"
          >
            <div className="relative h-[360px] md:h-[480px]">
              <img
                src={actualFeatured.image}
                alt={actualFeatured.title}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs font-semibold text-white/70 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />{actualFeatured.date}
                </span>
                <span className="text-xs font-semibold text-white/70 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />{actualFeatured.readTime}
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-3 font-['Inter'] max-w-3xl">
                {actualFeatured.title}
              </h1>
              <p className="text-white/80 text-sm md:text-base max-w-2xl leading-relaxed mb-4 line-clamp-2 md:line-clamp-none">
                {actualFeatured.excerpt}
              </p>
              <span className="inline-flex items-center gap-1 text-teal-300 font-bold text-sm group-hover:gap-2 transition-all">
                Read Full Article <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </motion.div>
        </section>

        {/* ═══ MARKET STATS BAR ═══ */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 mb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {MARKET_STATS.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </section>

        {/* ═══ PRICE PREDICTIONS + SIDEBAR ═══ */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 mb-12">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Price Chart Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-1">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-teal-50 to-sky-50 text-teal-600">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 font-['Inter']">Price Predictions</h2>
              </div>
              <p className="text-sm text-slate-500 font-medium mb-6 ml-[52px]">Average price per m² (millions VND) — Last 6 months</p>

              <PriceChart data={PRICE_DATA} />

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { city: 'Ho Chi Minh City', price: '72M VND/m²', trend: '+5.2%', color: '#0F766E', positive: true },
                  { city: 'Hanoi', price: '62M VND/m²', trend: '+3.8%', color: '#0369A1', positive: true },
                  { city: 'Da Nang', price: '40M VND/m²', trend: '+6.1%', color: '#D97706', positive: true },
                ].map(c => (
                  <div key={c.city} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                    <div>
                      <p className="text-sm font-bold text-slate-800">{c.city}</p>
                      <p className="text-xs text-slate-500 font-semibold">{c.price} <span className={c.positive ? 'text-emerald-600' : 'text-red-500'}>{c.trend}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Top Provinces Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="w-full lg:w-[380px] flex-shrink-0"
            >
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 text-amber-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-['Inter']">Top Provinces</h3>
                    <p className="text-xs text-slate-500 font-medium">By average price per m²</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {TOP_PROVINCES.map((prov, i) => (
                    <div key={prov.name} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 transition-all cursor-pointer group">
                      <span className="text-sm font-bold text-slate-400 w-6 text-center">{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-800 group-hover:text-teal-700 transition-colors truncate">{prov.name}</p>
                        <p className="text-xs text-slate-500 font-medium">{prov.listings.toLocaleString()} listings</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold text-slate-900">{prov.avgPrice}</p>
                        <p className={`text-xs font-bold ${prov.positive ? 'text-emerald-600' : 'text-red-500'}`}>
                          {prov.positive ? <TrendingUp className="w-3 h-3 inline mr-0.5" /> : <TrendingDown className="w-3 h-3 inline mr-0.5" />}
                          {prov.change}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Market Health */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-teal-50 to-sky-50 border border-teal-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="w-4 h-4 text-teal-600" />
                    <span className="text-sm font-bold text-teal-800">Market Health</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-teal-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full" style={{ width: '78%' }} />
                    </div>
                    <span className="text-sm font-bold text-teal-700">78%</span>
                  </div>
                  <p className="text-xs text-teal-600 font-medium mt-2">Strong buyer demand • Growing supply</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ LATEST NEWS GRID ═══ */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-50 to-indigo-50 text-violet-600">
                <Newspaper className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-['Inter']">Latest News</h2>
                <p className="text-sm text-slate-500 font-medium">Stay updated with the Vietnamese real estate market</p>
              </div>
            </div>
            <button className="hidden sm:flex items-center gap-1 text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors cursor-pointer">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
                <div className="col-span-full py-10 text-center text-gray-500">Đang tải tin tức...</div>
            ) : (
              displayNews.map((article, i) => (
                <NewsCard key={article.id} article={article as any} index={i} />
              ))
            )}
          </div>

          <button className="sm:hidden mt-6 w-full flex items-center justify-center gap-2 py-3.5 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-teal-600 transition-all cursor-pointer">
            View All News <ChevronRight className="w-4 h-4" />
          </button>
        </section>

        {/* ═══ PREDICTION INSIGHT BANNER ═══ */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl p-8 md:p-12"
            style={{
              background: 'linear-gradient(135deg, #0F766E 0%, #0369A1 50%, #1E40AF 100%)',
            }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-20 w-48 h-48 bg-white/5 rounded-full translate-y-1/2" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-5 h-5 text-amber-300 fill-amber-300" />
                  <span className="text-sm font-bold text-teal-200">AI-Powered Prediction</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white font-['Inter'] mb-3">
                  Q2 2026 Market Forecast
                </h2>
                <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-xl">
                  Our AI model predicts a continued <span className="text-emerald-300 font-bold">4-7% growth</span> in Vietnam's major urban markets,
                  with Thu Duc City and Long An emerging as top investment hotspots for the next quarter.
                </p>
              </div>
              <button className="flex-shrink-0 px-6 py-3.5 bg-white text-teal-700 font-bold rounded-xl hover:bg-white/90 hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                View Full Report
              </button>
            </div>
          </motion.div>
        </section>

      </div>

      <Footer />
    </div>
  );
};

export default News;
