import { FormEvent, useDeferredValue, useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FilePlus2,
  Loader2,
  Search,
  ShieldCheck,
  ShieldQuestion,
  XCircle,
} from "lucide-react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { createNews } from "@/lib/newsApi";
import { decideVerificationRequest, getAdminVerificationRequests, VerificationRequestItem } from "@/lib/verificationApi";

type RequestFilter = "pending" | "approved" | "denied" | "all";
type AdminPanel = "news" | "verification";

const AdminDashboard = () => {
  const [activePanel, setActivePanel] = useState<AdminPanel>("news");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [submittingNews, setSubmittingNews] = useState(false);
  const [newsMessage, setNewsMessage] = useState("");

  const [requestFilter, setRequestFilter] = useState<RequestFilter>("pending");
  const [requestSearch, setRequestSearch] = useState("");
  const deferredSearch = useDeferredValue(requestSearch.trim());
  const [requests, setRequests] = useState<VerificationRequestItem[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [decisionLoadingId, setDecisionLoadingId] = useState<number | null>(null);
  const [expandedRequestId, setExpandedRequestId] = useState<number | null>(null);
  const [denialNotes, setDenialNotes] = useState<Record<number, string>>({});

  const loadRequests = async (filter: RequestFilter, search: string) => {
    setLoadingRequests(true);
    try {
      const data = await getAdminVerificationRequests({
        status: filter === "all" ? undefined : filter,
        search: search || undefined,
      });
      setRequests(data);
    } catch (error) {
      console.error("Failed to load verification requests:", error);
      setRequests([]);
    } finally {
      setLoadingRequests(false);
    }
  };

  useEffect(() => {
    loadRequests(requestFilter, deferredSearch);
  }, [requestFilter, deferredSearch]);

  const pendingCount = useMemo(() => requests.filter((item) => item.status === "pending").length, [requests]);

  const handleNewsSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittingNews(true);
    setNewsMessage("");

    try {
      const payload = new FormData();
      payload.append("title", title);
      payload.append("content", content);
      payload.append("is_published", "true");
      if (thumbnail) {
        payload.append("thumbnail", thumbnail);
      }
      await createNews(payload);
      setTitle("");
      setContent("");
      setThumbnail(null);
      setNewsMessage("Article published successfully.");
    } catch (error) {
      console.error("Failed to create news:", error);
      setNewsMessage("Could not publish this article.");
    } finally {
      setSubmittingNews(false);
    }
  };

  const handleDecision = async (id: number, action: "accept" | "deny") => {
    setDecisionLoadingId(id);
    try {
      await decideVerificationRequest(id, action, action === "deny" ? denialNotes[id] : "");
      await loadRequests(requestFilter, deferredSearch);
    } catch (error) {
      console.error("Failed to update verification request:", error);
    } finally {
      setDecisionLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] font-sans">
      <Header />

      <main className="pt-[140px] pb-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700">
              <ShieldCheck className="h-4 w-4" />
              Admin workspace
            </span>
            <h1 className="mt-4 text-4xl font-bold text-slate-900">Control center</h1>
            <p className="mt-3 text-lg text-slate-500">Switch between news publishing and agent verification review.</p>
          </div>

          <div className="mb-5 flex flex-wrap items-center gap-3">
            <div className="inline-flex flex-wrap items-center gap-3 rounded-[28px] border border-slate-200 bg-white p-3 shadow-sm">
                <button
                  type="button"
                  onClick={() => setActivePanel("news")}
                  className={`flex min-w-[240px] items-center gap-3 rounded-[22px] border px-4 py-3 text-left transition-all ${
                    activePanel === "news"
                      ? "border-sky-200 bg-sky-50 text-sky-800"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-base font-bold shadow-sm">1</div>
                  <div>
                    <div className="font-semibold">Add News</div>
                    <div className="text-xs opacity-80">Write and publish</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActivePanel("verification")}
                  className={`flex min-w-[280px] items-center gap-3 rounded-[22px] border px-4 py-3 text-left transition-all ${
                    activePanel === "verification"
                      ? "border-amber-200 bg-amber-50 text-amber-800"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-base font-bold shadow-sm">2</div>
                  <div>
                    <div className="font-semibold">Verification Queue</div>
                    <div className="text-xs opacity-80">Review requests</div>
                  </div>
                </button>
            </div>
          </div>

          <section className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-sm">
            {activePanel === "news" ? (
              <div>
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                      <FilePlus2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-slate-900">Add New Article</h2>
                      <p className="text-sm text-slate-500">Create a news post that goes straight into the news feed.</p>
                    </div>
                  </div>

                  <form onSubmit={handleNewsSubmit} className="space-y-5">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-900">Title</label>
                      <input
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none focus:border-sky-500"
                        placeholder="Vietnam real estate market update..."
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-900">Content</label>
                      <textarea
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        rows={12}
                        className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3.5 outline-none focus:border-sky-500"
                        placeholder="Write the article here..."
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-900">Thumbnail</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => setThumbnail(event.target.files?.[0] ?? null)}
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-600"
                      />
                    </div>

                    {newsMessage && (
                      <div
                        className={`rounded-2xl px-4 py-3 text-sm ${
                          newsMessage.includes("success") ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-600"
                        }`}
                      >
                        {newsMessage}
                      </div>
                    )}

                    <Button type="submit" disabled={submittingNews} className="cursor-pointer rounded-full bg-sky-700 px-6 text-white hover:bg-sky-800">
                      {submittingNews ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Publish article
                    </Button>
                  </form>
              </div>
            ) : (
              <div>
                  <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                        <ShieldQuestion className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold text-slate-900">Verification Queue</h2>
                        <p className="text-sm text-slate-500">{pendingCount} pending request(s) in the current view.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_180px] lg:w-[460px]">
                      <div className="relative">
                        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                          value={requestSearch}
                          onChange={(event) => setRequestSearch(event.target.value)}
                          placeholder="Filter by name, username or email"
                          className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-sky-500"
                        />
                      </div>
                      <select
                        value={requestFilter}
                        onChange={(event) => setRequestFilter(event.target.value as RequestFilter)}
                        className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-sky-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="denied">Denied</option>
                        <option value="all">All</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {loadingRequests ? (
                      <div className="py-12 text-center text-slate-500">Loading verification requests...</div>
                    ) : requests.length === 0 ? (
                      <div className="rounded-3xl border border-dashed border-slate-300 px-6 py-16 text-center text-slate-500">
                        No verification requests in this list.
                      </div>
                    ) : (
                      requests.map((item) => {
                        const isExpanded = expandedRequestId === item.id;

                        return (
                          <div key={item.id} className="rounded-[28px] border border-slate-200 bg-slate-50/60">
                            <div className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between">
                              <div className="min-w-0">
                                <div className="text-lg font-semibold text-slate-900">{item.full_name}</div>
                                <div className="mt-1 text-sm text-slate-500">
                                  @{item.username} · {item.email}
                                </div>
                              </div>

                              <div className="flex flex-wrap items-center gap-3">
                                <span
                                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                                    item.status === "approved"
                                      ? "bg-emerald-50 text-emerald-700"
                                      : item.status === "denied"
                                        ? "bg-rose-50 text-rose-700"
                                        : "bg-amber-50 text-amber-700"
                                  }`}
                                >
                                  {item.status}
                                </span>
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => setExpandedRequestId(isExpanded ? null : item.id)}
                                  className="cursor-pointer rounded-full"
                                >
                                  Detail
                                  {isExpanded ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                                </Button>
                              </div>
                            </div>

                            {isExpanded && (
                              <div className="border-t border-slate-200 bg-white px-5 py-5">
                                <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2 xl:grid-cols-3">
                                  <div>
                                    <div className="text-slate-400">Name</div>
                                    <div className="mt-1 font-medium text-slate-800">{item.full_name}</div>
                                  </div>
                                  <div>
                                    <div className="text-slate-400">Username</div>
                                    <div className="mt-1 font-medium text-slate-800">@{item.username}</div>
                                  </div>
                                  <div>
                                    <div className="text-slate-400">Status</div>
                                    <div className="mt-1 font-medium capitalize text-slate-800">{item.status}</div>
                                  </div>
                                  <div>
                                    <div className="text-slate-400">Email</div>
                                    <div className="mt-1 font-medium text-slate-800">{item.email}</div>
                                  </div>
                                  <div>
                                    <div className="text-slate-400">Date of birth</div>
                                    <div className="mt-1 font-medium text-slate-800">{item.date_of_birth}</div>
                                  </div>
                                  <div>
                                    <div className="text-slate-400">Gender</div>
                                    <div className="mt-1 font-medium capitalize text-slate-800">{item.gender}</div>
                                  </div>
                                  <div>
                                    <div className="text-slate-400">National ID</div>
                                    <div className="mt-1 font-medium text-slate-800">{item.national_id_number}</div>
                                  </div>
                                  <div>
                                    <div className="text-slate-400">Agent profile</div>
                                    <div className="mt-1 font-medium text-slate-800">{item.agent_slug ? `/agents/${item.agent_slug}` : "Not created"}</div>
                                  </div>
                                  <div>
                                    <div className="text-slate-400">Submitted at</div>
                                    <div className="mt-1 font-medium text-slate-800">{new Date(item.created_at).toLocaleString()}</div>
                                  </div>
                                  <div className="md:col-span-2 xl:col-span-3">
                                    <div className="text-slate-400">Address</div>
                                    <div className="mt-1 font-medium text-slate-800">{item.address}</div>
                                  </div>
                                </div>

                                <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
                                  <a href={item.id_card_front} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
                                    <img src={item.id_card_front} alt={`${item.full_name} ID front`} className="h-56 w-full object-cover" />
                                  </a>
                                  <a href={item.id_card_back} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
                                    <img src={item.id_card_back} alt={`${item.full_name} ID back`} className="h-56 w-full object-cover" />
                                  </a>
                                </div>

                                {item.status !== "approved" && (
                                  <div className="mt-5">
                                    <label className="mb-2 block text-sm font-semibold text-slate-900">Denial note</label>
                                    <textarea
                                      value={denialNotes[item.id] ?? item.denial_reason ?? ""}
                                      onChange={(event) => setDenialNotes((current) => ({ ...current, [item.id]: event.target.value }))}
                                      rows={3}
                                      className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-sky-500"
                                      placeholder="Optional note for the user."
                                    />
                                  </div>
                                )}

                                {item.status === "denied" && item.denial_reason && (
                                  <div className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{item.denial_reason}</div>
                                )}

                                <div className="mt-5 flex flex-wrap gap-3">
                                  {item.status !== "approved" && (
                                    <Button
                                      type="button"
                                      onClick={() => handleDecision(item.id, "accept")}
                                      disabled={decisionLoadingId === item.id}
                                      className="cursor-pointer rounded-full bg-emerald-600 text-white hover:bg-emerald-700"
                                    >
                                      {decisionLoadingId === item.id ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      ) : (
                                        <CheckCircle2 className="mr-2 h-4 w-4" />
                                      )}
                                      Đồng ý
                                    </Button>
                                  )}

                                  {item.status !== "denied" && (
                                    <Button
                                      type="button"
                                      variant="outline"
                                      onClick={() => handleDecision(item.id, "deny")}
                                      disabled={decisionLoadingId === item.id}
                                      className="cursor-pointer rounded-full border-rose-200 text-rose-600 hover:bg-rose-50"
                                    >
                                      {decisionLoadingId === item.id ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      ) : (
                                        <XCircle className="mr-2 h-4 w-4" />
                                      )}
                                      Từ chối
                                    </Button>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
