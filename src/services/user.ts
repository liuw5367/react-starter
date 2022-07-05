import { request } from '@/utils/HttpClient';

export async function login(data: { username: string; password: string }) {
  return request<string>(`/login`, {
    method: 'POST',
    data,
  });
}

export async function logout() {
  return request(`/logout`, {
    method: 'POST',
  });
}
