import api, { API_ORIGIN } from "@/lib/api";

export interface AgentListItem {
  id: number;
  full_name: string;
  slug: string;
  avatar_url: string;
  city: string;
  specialization: string;
  tagline: string;
  years_experience: number;
  total_listings: number;
  deals_closed: number;
  rating: string;
  total_reviews: number;
  is_verified: boolean;
  response_time: string;
  areas: string[];
  languages: string[];
}

export interface AgentDetail extends AgentListItem {
  email: string;
  phone: string;
  bio: string;
  activity_visible: boolean;
  latest_activities: Array<{
    id: number;
    title: string;
    label: string;
    listing_type: string;
    address: string;
    created_at: string;
    image: string | null;
  }>;
  created_at: string;
  updated_at: string;
}

const normalizeAvatarUrl = (value: string) => {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (value.startsWith("/")) return `${API_ORIGIN}${value}`;
  return `${API_ORIGIN}/${value}`;
};

const normalizeAgent = <T extends { avatar_url: string; areas: string[]; languages: string[] }>(agent: T): T => ({
  ...agent,
  avatar_url: normalizeAvatarUrl(agent.avatar_url),
  areas: Array.isArray(agent.areas) ? agent.areas : [],
  languages: Array.isArray(agent.languages) ? agent.languages : [],
});

export const getAgents = async (search?: string): Promise<AgentListItem[]> => {
  const { data } = await api.get<AgentListItem[] | { results: AgentListItem[] }>("/api/agents/", {
    params: search ? { search } : undefined,
  });

  const items = Array.isArray(data) ? data : data.results;
  return items.map(normalizeAgent);
};

export const getAgent = async (slug: string): Promise<AgentDetail> => {
  const { data } = await api.get<AgentDetail>(`/api/agents/${slug}/`);
  return normalizeAgent(data);
};

export const revokeAgentVerification = async (slug: string): Promise<{ message: string }> => {
  const { data } = await api.post<{ message: string }>(`/api/agents/${slug}/revoke-verification/`);
  return data;
};

export const deleteAgent = async (slug: string): Promise<void> => {
  await api.delete(`/api/agents/${slug}/delete/`);
};
