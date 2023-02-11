import { request } from '@/utils/HttpClient';

export async function login(data: { username: string; password: string }) {
  return request<string>('/login', {
    method: 'POST',
    data,
  });
}

export async function logout() {
  return request('/logout', {
    method: 'POST',
  });
}

export interface ModifyPasswordRequest {
  oldPassword: string;
  password: string;
  userId?: string;
}

export async function modifyPassword(data: ModifyPasswordRequest) {
  return request('/user/password', {
    method: 'POST',
    data,
  });
}
