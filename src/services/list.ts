import type { PageBody, PageRequest } from '@/services/typings';
import { download, request } from '@/utils/HttpClient';

export interface ListRequest extends PageRequest {
  name?: string;
}

export interface ListItem {
  id: string;
  name: string;
}

export async function queryList(params: ListRequest) {
  return request<PageBody<ListItem>>(`/list`, {
    method: 'GET',
    params,
  });
}

export async function test() {
  return request(`/codeTest`, {
    method: 'GET',
  });
}

export async function exportFile() {
  return download('/download');
}
