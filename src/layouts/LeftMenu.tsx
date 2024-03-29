import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { isEmpty } from 'lodash'
import { Link, useLocation } from 'react-router-dom'

import type { MenuItem } from '@/types'
import { useGlobalStore } from '@/stores'

export function convertToMenuItems(
  config: MenuItem[] = [],
  isChild = false,
  onClick?: (v: MenuItem) => void,
): MenuProps['items'] {
  if (!config || config.length === 0)
    return undefined

  return config
    .filter(v => !v.disabled)
    .map((item) => {
      const { key, title, link, children } = item
      const childrenItems = convertToMenuItems(children, true, onClick)

      return {
        key,
        title: isChild ? undefined : title,
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
      }
    })
}

export default function LeftMenu() {
  const { pathname } = useLocation()
  const menus = useGlobalStore(s => s.menus)
  const menuItems = convertToMenuItems(menus)

  return (
    <Menu
      mode="inline"
      selectedKeys={[pathname]}
      defaultOpenKeys={['home']}
      items={menuItems}
      style={{ height: '100%', borderRight: 0 }}
    />
  )
}
