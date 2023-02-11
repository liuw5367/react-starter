import { HomeOutlined, LinkOutlined, NotificationOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { useAtom } from 'jotai';
import { isEmpty } from 'lodash';
import { Link, useLocation } from 'react-router-dom';

import { menusAtom } from '@/atom';
import type { MenuItem } from '@/types';

export function getMenuIcon(icon?: string) {
  if (!icon) {
    return undefined;
  }
  if (icon.toLocaleLowerCase().includes('home')) {
    return <HomeOutlined />;
  }
  if (icon.toLocaleLowerCase().includes('link')) {
    return <LinkOutlined />;
  }
  return <NotificationOutlined />;
}

export function convertToMenuItems(
  config: MenuItem[] = [],
  getIcon?: (icon?: string) => React.ReactNode,
  isChild = false,
  onClick?: (v: MenuItem) => void,
): MenuProps['items'] {
  if (!config || config.length === 0) {
    return undefined;
  }

  return config
    .filter((v) => !v.disabled)
    .map((item) => {
      const { key, title, link, icon, children } = item;
      const childrenItems = convertToMenuItems(children, getIcon, true, onClick);

      return {
        key,
        title: isChild ? undefined : title,
        icon: getIcon?.(icon),
        label: !isEmpty(children)
          ? (
              title
            )
          : onClick
            ? (
          <a onClick={() => onClick(item)}>{title}</a>
              )
            : (
          <Link to={link}>{title}</Link>
              ),
        children: childrenItems,
      };
    });
}

export default function SiderBar() {
  const { pathname } = useLocation();
  const [menus] = useAtom(menusAtom);
  const menuItems = convertToMenuItems(menus, getMenuIcon);

  return (
    <Layout.Sider width={200} className="h-full">
      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        defaultOpenKeys={['home']}
        style={{ height: '100%', borderRight: 0 }}
        items={menuItems}
      />
    </Layout.Sider>
  );
}
