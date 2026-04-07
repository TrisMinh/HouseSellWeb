import api from './api';
import { PaginatedResponse } from './propertiesApi';

// ─── Types ────────────────────────────────────────────────────────────────────

export type AppointmentStatus = 'pending' | 'confirmed' | 'rejected' | 'completed' | 'cancelled';

export interface Appointment {
  id: number;
  property: number;
  property_title: string;
  property_owner: string;
  property_address: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  message: string | null;
  status: AppointmentStatus;
  created_at: string;
  updated_at: string;
}

export interface CreateAppointmentPayload {
  property: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  name: string;
  phone: string;
  message?: string;
}

export interface UpdateAppointmentStatusPayload {
  status: AppointmentStatus;
}


// ─── Appointments API ───────────────────────────────────────────────────────────

/** Lấy danh sách lịch hẹn của tôi (Người đi xem nhà) */
export const getMyAppointments = async (): Promise<PaginatedResponse<Appointment> | Appointment[]> => {
  const { data } = await api.get('/api/appointments/');
  return data;
};

/** Lấy danh sách lịch hẹn khách đặt trên nhà của tôi (Chủ nhà quản lý) */
export const getOwnerAppointments = async (): Promise<PaginatedResponse<Appointment> | Appointment[]> => {
  const { data } = await api.get('/api/appointments/owner/');
  return data;
};

/** Xem chi tiết 1 lịch hẹn */
export const getAppointmentDetails = async (id: number): Promise<Appointment> => {
  const { data } = await api.get<Appointment>(`/api/appointments/${id}/`);
  return data;
};

/** Đặt lịch hẹn mới */
export const createAppointment = async (payload: CreateAppointmentPayload): Promise<Appointment> => {
  const { data } = await api.post<Appointment>('/api/appointments/', payload);
  return data;
};

/** Cập nhật trạng thái lịch hẹn (Xác nhận, hủy bỏ, hoàn thành...) */
export const updateAppointmentStatus = async (
  id: number, 
  payload: UpdateAppointmentStatusPayload
): Promise<{ message: string; data: Appointment }> => {
  const { data } = await api.patch(`/api/appointments/${id}/status/`, payload);
  return data;
};

/** Hủy lịch hẹn hoàn toàn (chỉ dành cho người đặt lúc Pending) */
export const cancelAppointment = async (id: number): Promise<{ message: string }> => {
  const { data } = await api.delete(`/api/appointments/${id}/`);
  return data;
};
