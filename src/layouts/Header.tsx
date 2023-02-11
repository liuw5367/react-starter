import { Layout, Menu } from 'antd';
import { useAtom } from 'jotai';
import { useLocation } from 'react-router-dom';

import { menusAtom } from '@/atom';
import { APP_NAME } from '@/constants';

import HeaderRight from './HeaderRight';
import { convertToMenuItems, getMenuIcon } from './Sidebar';

export default function Header() {
  const { pathname } = useLocation();
  const [menus] = useAtom(menusAtom);
  const menuItems = convertToMenuItems(menus, getMenuIcon);

  return (
    <Layout.Header
      className="flex flex-row items-center"
      style={{ height: 'var(--headerHeight)', padding: '0px 24px' }}
    >
      <div className="w-[152px] h-8 mr-6 flex items-center justify-center text-white bg-white/30">{APP_NAME}</div>
      <Menu className="flex-1" theme="dark" mode="horizontal" selectedKeys={[pathname]} items={menuItems} />
      <HeaderRight />
    </Layout.Header>
  );
}
