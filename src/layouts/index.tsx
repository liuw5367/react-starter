import { Layout, message } from 'antd'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import Content from './Content'
import Header from './Header'
import LeftMenu from './LeftMenu'
import { useQuery, useWindowSizeChange } from '@/hooks'
import { isLogin } from '@/utils'
import { useGlobalStore } from '@/stores'

export default function Index() {
  const location = useLocation()
  const { query } = useQuery()
  useWindowSizeChange()

  let { pathname } = location
  if (pathname.endsWith('/'))
    pathname = pathname.substring(0, pathname.length - 1)

  const isMobile = useGlobalStore(s => s.isMobile)
  const menuExpand = useGlobalStore(s => s.menuExpand)

  const children = <Outlet />

  if (pathname === '/login') {
    if (isLogin()) {
      message.success('已登陆')
      return <Navigate to={query.redirect || ''} />
    }
    else {
      return children
    }
  }

  // if (!isLogin()) {
  //   return <Navigate to={`/login?redirect=${location.pathname}${location.search ? `/${location.search}` : ''}`} />;
  // }

  return (
    <Layout className="h-full w-full">
      {!isMobile && (
        <Layout.Sider
          width={200}
          collapsed={!menuExpand}
          className="fixed z-10 h-full overflow-hidden pt-$headerHeight"
          style={{ backgroundColor: 'white' }}
        >
          <LeftMenu />
        </Layout.Sider>
      )}
      <Layout className="overflow-auto">
        <Header />
        <div className="h-$headerHeight" />
        <Content>{children}</Content>
      </Layout>
    </Layout>
  )
}
