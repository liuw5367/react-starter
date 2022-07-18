import type { LabelValueItem } from '@/typings';

import { RouteItem, routes } from './route';

/**
 * @param routeList 要遍历的路由
 * @param list 用来记录路径
 * @param data 总的数据
 */
function traversal(routeList: RouteItem[] = [], list: string[][], data: LabelValueItem[]) {
  routeList.forEach((route) => {
    if (route.routes && routes.length > 0) {
      const { path, title } = route;
      // 查找是否有当前路由的页面
      const routePage = route.routes?.find((v) => v.path === path);
      if (title) {
        // 如果有就添加 path，支持点击
        list.push([title, routePage ? path : '']);
      }
      // 遍历下层路由
      traversal(route.routes, list, data);
      // 遍历后，移除当前路径
      if (title) {
        list.splice(list.length - 1, 1);
      }
    } else {
      const { path, title } = route;
      const item = [title, path];
      const breadcrumbList = title ? [...list, item] : [...list];
      data.push({ label: path, value: breadcrumbList });
    }
  });
}

function generateBreadcrumbPathMap() {
  const list: LabelValueItem<string[]>[] = [];
  traversal(routes, [], list);
  const map: Record<string, LabelValueItem<string[]>> = {};
  list.forEach((v) => {
    map[v.label] = v;
  });
  return map;
}

export const breadcrumbConfig = generateBreadcrumbPathMap();
