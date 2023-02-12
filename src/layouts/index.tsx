import { Layout, message } from 'antd';
import { useAtomValue } from 'jotai';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { menuExpandAtom, mobileAtom } from '@/atom';
import { useQuery } from '@/hooks';
import { isLogin } from '@/utils';

import Content from './Content';
import Header from './Header';
import LeftMenu from './LeftMenu';

export default function Index() {
  const location = useLocation();
  const { query } = useQuery();
  let { pathname } = location;
  if (pathname.endsWith('/')) {
    pathname = pathname.substring(0, pathname.length - 1);
  }

  const isMobile = useAtomValue(mobileAtom);
  const menuExpand = useAtomValue(menuExpandAtom);
  const children = <Outlet />;

  if (pathname === '/login') {
    if (isLogin()) {
      message.success('已登陆');
      return <Navigate to={query.redirect || ''} />;
    }
    else {
      return children;
    }
  }

  if (!isLogin()) {
    return <Navigate to={`/login?redirect=${location.pathname}${location.search ? `/${location.search}` : ''}`} />;
  }

  return (
    <Layout style={{ flexDirection: 'column' }}>
      <Header />
      <Layout style={{ width: '100%', height: 'calc(100vh - var(--headerHeight))' }}>
        {!isMobile && (
          <Layout.Sider width={200} className="h-full" collapsed={!menuExpand}>
            <LeftMenu />
          </Layout.Sider>
        )}
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
}
