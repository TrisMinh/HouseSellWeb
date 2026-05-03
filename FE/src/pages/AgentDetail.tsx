import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Award, BriefcaseBusiness, Clock3, Loader2, Mail, MapPin, Phone, ShieldCheck, Star } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getAgentInitials } from "@/lib/agentProfile";
import { AgentDetail as AgentDetailType, getAgent } from "@/lib/agentsApi";

const statCards = (agent: AgentDetailType) => [
  {
    label: "Rating",
    value: `${agent.rating} / 5`,
    note: `${agent.total_reviews} reviews`,
    icon: <Star className="w-5 h-5 text-amber-500 fill-amber-500" />,
  },
  {
    label: "Experience",
    value: `${agent.years_experience} years`,
    note: "Advising buyers and sellers",
    icon: <Award className="w-5 h-5 text-sky-600" />,
  },
  {
    label: "Closed deals",
    value: `${agent.deals_closed}`,
    note: `${agent.total_listings} active and past listings`,
    icon: <BriefcaseBusiness className="w-5 h-5 text-sky-600" />,
  },
  {
    label: "Response time",
    value: agent.response_time || "Fast",
    note: "Average first reply",
    icon: <Clock3 className="w-5 h-5 text-sky-600" />,
  },
];

const AgentDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [agent, setAgent] = useState<AgentDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;

    const loadAgent = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getAgent(slug);
        if (!cancelled) {
          setAgent(data);
        }
      } catch (fetchError) {
        console.error("Failed to load agent detail:", fetchError);
        if (!cancelled) {
          setAgent(null);
          setError("Could not load this agent profile.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadAgent();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <div className="min-h-screen bg-[#F8FAFB] font-sans">
      <Header />

      <main className="pt-[140px]">
        {loading ? (
          <div className="min-h-[60vh] flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-sky-700 animate-spin" />
          </div>
        ) : error || !agent ? (
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="rounded-[32px] border border-rose-200 bg-white px-8 py-14 text-center">
              <p className="text-2xl font-semibold text-slate-900">Agent profile unavailable</p>
              <p className="mt-3 text-slate-500">{error || "This agent could not be found."}</p>
              <Link
                to="/agents"
                className="inline-flex items-center gap-2 mt-6 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all agents
              </Link>
            </div>
          </div>
        ) : (
          <>
            <section className="bg-white border-b border-slate-100">
              <div className="max-w-6xl mx-auto px-6 py-10">
                <Link to="/agents" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  Back to all agents
                </Link>

                <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                  <div className="flex flex-col gap-5 md:flex-row md:items-center">
                    <Avatar className="w-32 h-32 border-4 border-white shadow-xl bg-white">
                      <AvatarImage src={agent.avatar_url || undefined} alt={agent.full_name} className="object-cover" />
                      <AvatarFallback className="bg-sky-50 text-sky-700 text-3xl font-semibold">
                        {getAgentInitials(agent.full_name)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                          agent.is_verified
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        <ShieldCheck className="w-4 h-4" />
                        {agent.is_verified ? "Verified Blue Sky Agent" : "Not verified yet"}
                      </span>
                      <h1 className="mt-4 text-4xl font-bold text-slate-900">{agent.full_name}</h1>
                      <p className="mt-2 text-lg text-slate-600">{agent.specialization}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                        <span className="inline-flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {agent.city}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          {agent.rating} rating
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <Clock3 className="w-4 h-4" />
                          {agent.response_time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {agent.email && (
                      <Button asChild className="rounded-full bg-sky-700 hover:bg-sky-800 text-white px-6 cursor-pointer">
                        <a href={`mailto:${agent.email}`}>
                          <Mail className="w-4 h-4 mr-2" />
                          Email agent
                        </a>
                      </Button>
                    )}
                    {agent.phone && (
                      <Button asChild variant="outline" className="rounded-full px-6 cursor-pointer">
                        <a href={`tel:${agent.phone}`}>
                          <Phone className="w-4 h-4 mr-2" />
                          Call agent
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section className="max-w-6xl mx-auto px-6 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {statCards(agent).map((stat) => (
                  <div key={stat.label} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3 text-slate-500">
                      <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center">{stat.icon}</div>
                      <span className="text-sm font-medium">{stat.label}</span>
                    </div>
                    <div className="mt-4 text-2xl font-bold text-slate-900">{stat.value}</div>
                    <p className="mt-1 text-sm text-slate-500">{stat.note}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
                <div className="lg:col-span-3 space-y-8">
                  <div className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-sm">
                    <h2 className="text-2xl font-semibold text-slate-900">About</h2>
                    <p className="mt-4 text-slate-600 leading-8">
                      {agent.bio || agent.tagline || "This agent profile has not been updated yet."}
                    </p>
                  </div>

                  <div className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-sm">
                    <h2 className="text-2xl font-semibold text-slate-900">Coverage areas</h2>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {agent.areas.length > 0 ? (
                        agent.areas.map((area) => (
                          <span key={area} className="rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700">
                            {area}
                          </span>
                        ))
                      ) : (
                        <p className="text-slate-500">No coverage areas yet.</p>
                      )}
                    </div>
                  </div>

                  {agent.activity_visible && (
                    <div className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-sm">
                      <h2 className="text-2xl font-semibold text-slate-900">Latest Activity</h2>
                      {agent.latest_activities.length > 0 ? (
                        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                          {agent.latest_activities.map((activity) => (
                            <div key={activity.id} className="rounded-3xl border border-slate-200 p-4 bg-slate-50/50">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-xs font-bold text-emerald-600">{activity.listing_type}</span>
                              </div>
                              <h3 className="text-base font-semibold text-slate-900">{activity.title}</h3>
                              <div className="mt-3 flex items-start gap-2 text-sm text-slate-500">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>{activity.address}</span>
                              </div>
                              <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                                <Clock3 className="w-3.5 h-3.5" />
                                {new Date(activity.created_at).toLocaleString()}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="mt-5 text-slate-500">No recent listing activity yet.</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="lg:col-span-2 space-y-8">
                  <div className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-sm">
                    <h2 className="text-2xl font-semibold text-slate-900">Contact</h2>
                    <div className="mt-6 space-y-5">
                      <div className="flex items-start gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-slate-50 flex items-center justify-center">
                          <Mail className="w-4 h-4 text-sky-700" />
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-[0.2em] text-slate-400 font-semibold">Email</div>
                          <div className="mt-1 text-slate-700">{agent.email || "Not available"}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-slate-50 flex items-center justify-center">
                          <Phone className="w-4 h-4 text-sky-700" />
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-[0.2em] text-slate-400 font-semibold">Phone</div>
                          <div className="mt-1 text-slate-700">{agent.phone || "Not available"}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-slate-50 flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-sky-700" />
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-[0.2em] text-slate-400 font-semibold">Base city</div>
                          <div className="mt-1 text-slate-700">{agent.city || "Not available"}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-sm">
                    <h2 className="text-2xl font-semibold text-slate-900">Languages</h2>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {agent.languages.length > 0 ? (
                        agent.languages.map((language) => (
                          <span
                            key={language}
                            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
                          >
                            {language}
                          </span>
                        ))
                      ) : (
                        <p className="text-slate-500">No language information yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AgentDetail;
