import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Drawer, Layout, Menu } from 'antd';
import { useAtom, useAtomValue } from 'jotai';
import type { CSSProperties } from 'react';
import { useLocation } from 'react-router-dom';

import { menuExpandAtom, menusAtom, mobileAtom } from '@/atom';
import { APP_NAME } from '@/constants';

import HeaderRight from './HeaderRight';
import LeftMenu, { convertToMenuItems, getMenuIcon } from './LeftMenu';

export default function Header() {
  const { pathname } = useLocation();
  const [menus] = useAtom(menusAtom);
  const menuItems = convertToMenuItems(menus, getMenuIcon);
  const isMobile = useAtomValue(mobileAtom);
  const [expand, setExpand] = useAtom(menuExpandAtom);

  function renderExpandIcon() {
    const props: { style: CSSProperties; onClick: () => void } = {
      style: { color: 'white', fontSize: 16 },
      onClick: () => setExpand(!expand),
    };

    return <div className="mx-1">{expand ? <MenuFoldOutlined {...props} /> : <MenuUnfoldOutlined {...props} />}</div>;
  }

  return (
    <Layout.Header
      className="flex flex-row items-center"
      style={{ height: 'var(--headerHeight)', padding: '0px 24px' }}
    >
      <div className="w-[152px] h-8 mr-6 flex items-center justify-center text-white bg-white/30">{APP_NAME}</div>
      {renderExpandIcon()}
      {isMobile
        ? (
        <div className="flex-1" />
          )
        : (
        <Menu className="flex-1" theme="dark" mode="horizontal" selectedKeys={[pathname]} items={menuItems} />
          )}
      <HeaderRight />

      <Drawer
        placement="left"
        onClose={() => setExpand(false)}
        open={isMobile && expand}
        closable={false}
        bodyStyle={{ padding: 0 }}
        width={240}
        destroyOnClose
      >
        <LeftMenu />
      </Drawer>
    </Layout.Header>
  );
}
