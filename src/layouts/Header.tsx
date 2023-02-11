import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Drawer, Layout, Menu } from 'antd';
import { useAtom, useAtomValue } from 'jotai';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { menusAtom, mobileAtom } from '@/atom';
import { APP_NAME } from '@/constants';

import HeaderRight from './HeaderRight';
import SideBar, { convertToMenuItems, getMenuIcon } from './Sidebar';

export default function Header() {
  const { pathname } = useLocation();
  const [menus] = useAtom(menusAtom);
  const menuItems = convertToMenuItems(menus, getMenuIcon);
  const isMobile = useAtomValue(mobileAtom);
  const [expand, setExpand] = useState(false);

  return (
    <Layout.Header
      className="flex flex-row items-center"
      style={{ height: 'var(--headerHeight)', padding: '0px 24px' }}
    >
      <div className="w-[152px] h-8 mr-6 flex items-center justify-center text-white bg-white/30">{APP_NAME}</div>
      {isMobile
        ? (
            expand
              ? (
          <MenuFoldOutlined style={{ color: 'white' }} onClick={() => setExpand(false)} />
                )
              : (
          <MenuUnfoldOutlined style={{ color: 'white' }} onClick={() => setExpand(true)} />
                )
          )
        : (
        <Menu className="flex-1" theme="dark" mode="horizontal" selectedKeys={[pathname]} items={menuItems} />
          )}
      {isMobile && <div className="flex-1" />}
      <HeaderRight />

      <Drawer
        placement="left"
        onClose={() => setExpand(false)}
        open={expand}
        closable={false}
        bodyStyle={{ padding: 0 }}
        width={240}
      >
        <SideBar width={240} />
      </Drawer>
    </Layout.Header>
  );
}
