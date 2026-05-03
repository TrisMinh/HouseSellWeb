import api, { API_ORIGIN } from "@/lib/api";

export interface VerificationRequestPayload {
  full_name: string;
  date_of_birth: string;
  address: string;
  gender: "male" | "female" | "other";
  national_id_number: string;
  id_card_front: File;
  id_card_back: File;
}

export interface VerificationRequestItem {
  id: number;
  username?: string;
  email?: string;
  full_name: string;
  date_of_birth: string;
  address: string;
  gender: "male" | "female" | "other";
  national_id_number: string;
  id_card_front: string;
  id_card_back: string;
  status: "pending" | "approved" | "denied";
  denial_reason: string;
  agent_slug?: string | null;
  created_at: string;
  updated_at: string;
}

const normalizeMediaUrl = (value: string) => {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (value.startsWith("/")) return `${API_ORIGIN}${value}`;
  return `${API_ORIGIN}/${value}`;
};

const normalizeRequest = (item: VerificationRequestItem): VerificationRequestItem => ({
  ...item,
  id_card_front: normalizeMediaUrl(item.id_card_front),
  id_card_back: normalizeMediaUrl(item.id_card_back),
});

export const getMyVerificationRequest = async (): Promise<VerificationRequestItem | null> => {
  try {
    const response = await api.get<VerificationRequestItem>("/api/auth/verification-request/");
    if (response.status === 204 || !response.data) {
      return null;
    }
    const { data } = response;
    return normalizeRequest(data);
  } catch (error) {
    const status = (error as { response?: { status?: number } }).response?.status;
    if (status === 204 || status === 404) {
      return null;
    }
    throw error;
  }
};

export const createVerificationRequest = async (payload: VerificationRequestPayload) => {
  const formData = new FormData();
  formData.append("full_name", payload.full_name);
  formData.append("date_of_birth", payload.date_of_birth);
  formData.append("address", payload.address);
  formData.append("gender", payload.gender);
  formData.append("national_id_number", payload.national_id_number);
  formData.append("id_card_front", payload.id_card_front);
  formData.append("id_card_back", payload.id_card_back);

  const { data } = await api.post<VerificationRequestItem>("/api/auth/verification-request/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return normalizeRequest(data);
};

export const getAdminVerificationRequests = async (params?: {
  status?: "pending" | "approved" | "denied";
  search?: string;
}) => {
  const { data } = await api.get<VerificationRequestItem[]>("/api/auth/admin/verification-requests/", {
    params: {
      ...(params?.status ? { status: params.status } : {}),
      ...(params?.search ? { search: params.search } : {}),
    },
  });
  return data.map(normalizeRequest);
};

export const decideVerificationRequest = async (
  id: number,
  action: "accept" | "deny",
  denial_reason?: string,
) => {
  const { data } = await api.post<VerificationRequestItem>(`/api/auth/admin/verification-requests/${id}/decision/`, {
    action,
    denial_reason,
  });
  return normalizeRequest(data);
};
