import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Drawer, Layout, Menu, theme } from 'antd';
import { useAtom, useAtomValue } from 'jotai';
import type { CSSProperties } from 'react';
import { useLocation } from 'react-router-dom';

import { menuExpandAtom, menusAtom, mobileAtom } from '@/atom';
import { APP_NAME } from '@/constants';

import HeaderRight from './HeaderRight';
import LeftMenu, { convertToMenuItems } from './LeftMenu';

export default function Header() {
  const { pathname } = useLocation();
  const [menus] = useAtom(menusAtom);
  const menuItems = convertToMenuItems(menus);
  const isMobile = useAtomValue(mobileAtom);
  const [expand, setExpand] = useAtom(menuExpandAtom);

  const { token } = theme.useToken();

  function renderExpandIcon() {
    const props: { style: CSSProperties; onClick: () => void } = {
      style: { fontSize: 16 },
      onClick: () => setExpand(!expand),
    };

    return <div className="mx-1">{expand ? <MenuFoldOutlined {...props} /> : <MenuUnfoldOutlined {...props} />}</div>;
  }

  return (
    <Layout.Header
      className="fixed z-10 top-0 left-0 right-0 w-full flex flex-row items-center shadow"
      style={{ height: 'var(--headerHeight)', padding: '0px 24px', backgroundColor: token.colorBgContainer }}
    >
      <div className="w-[152px] h-8 mr-6 flex items-center justify-center text-white bg-black/50">{APP_NAME}</div>
      {renderExpandIcon()}
      {isMobile
        ? (
        <div className="flex-1" />
          )
        : (
        <Menu className="flex-1" theme="light" mode="horizontal" selectedKeys={[pathname]} items={menuItems} />
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
