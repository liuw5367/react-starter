import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Drawer, Layout, Menu, theme } from 'antd'
import type { CSSProperties } from 'react'
import { useLocation } from 'react-router-dom'

import HeaderRight from './HeaderRight'
import LeftMenu, { convertToMenuItems } from './LeftMenu'
import { APP_NAME } from '@/constants'
import { useGlobalStore } from '@/stores'

export default function Header() {
  const { pathname } = useLocation()

  const isMobile = useGlobalStore(s => s.isMobile)
  const menus = useGlobalStore(s => s.menus)
  const isExpand = useGlobalStore(s => s.menuExpand)

  const { token } = theme.useToken()
  const menuItems = convertToMenuItems(menus)

  function setExpand(menuExpand: boolean) {
    useGlobalStore.setState({ menuExpand })
  }

  function renderExpandIcon() {
    const props: { style: CSSProperties, onClick: () => void } = {
      style: { fontSize: 16 },
      onClick: () => setExpand(!isExpand),
    }

    return <div className="mx-1">{isExpand ? <MenuFoldOutlined {...props} /> : <MenuUnfoldOutlined {...props} />}</div>
  }

  return (
    <Layout.Header
      className="fixed left-0 right-0 top-0 z-10 w-full flex flex-row items-center shadow"
      style={{ height: 'var(--headerHeight)', padding: '0px 24px', backgroundColor: token.colorBgContainer }}
    >
      <div className="mr-6 h-8 w-[152px] flex items-center justify-center bg-black/50 text-white">{APP_NAME}</div>
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
        open={isMobile && isExpand}
        closable={false}
        bodyStyle={{ padding: 0 }}
        width={240}
        destroyOnClose
      >
        <LeftMenu />
      </Drawer>
    </Layout.Header>
  )
}
