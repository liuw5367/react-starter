import { CrownOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Avatar, Dropdown, Form, Modal, Space, message } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import PasswordSettingForm from './PasswordSettingForm'
import { logout } from '@/services/user'
import { clearCacheOnLogout } from '@/utils'
import { useTheme } from '@/hooks'

export default function HeaderRight() {
  const { toggleDark, setTheme } = useTheme()
  const [logoutVisible, setLogoutVisible] = useState(false)
  const [form] = Form.useForm()
  const [passwordVisible, setPasswordVisible] = useState(false)
  const navigate = useNavigate()

  function handleMenuClick(key: string) {
    if (key === 'logout')
      setLogoutVisible(true)

    else if (key === 'password')
      setPasswordVisible(true)
  }

  async function handleLogoutOk() {
    setLogoutVisible(false)
    await logout()
    clearCacheOnLogout()
    navigate('/')
  }

  function handlePasswordCancel() {
    form.resetFields()
    setPasswordVisible(false)
  }

  function handlePasswordOk() {
    form.validateFields().then(async () => {
      message.success('修改成功')
      form.resetFields()
      setPasswordVisible(false)
    })
  }

  const menu: MenuProps = {
    items: [
      {
        key: 'password',
        label: (
          <Space onClick={() => handleMenuClick('password')}>
            <SettingOutlined />
            设置密码
          </Space>
        ),
      },
      { type: 'divider' },
      {
        key: 'logout',
        label: (
          <Space onClick={() => handleMenuClick('logout')}>
            <LogoutOutlined />
            退出登录
          </Space>
        ),
      },
    ],
  }

  return (
    <div className="flex items-center space-x-4">
      <div>
        { `v${__APP_VERSION__}` }
      </div>
      <div className="my-4 flex items-center space-x-4">
        <div className="cursor-pointer" onClick={toggleDark}>
          <div className="i-carbon-sun dark:i-carbon-moon" />
        </div>

        <div className="flex cursor-pointer items-center" title="Auto" onClick={() => setTheme('auto')}>
          <div className="i-carbon-window-auto" />
          Auto
        </div>
      </div>
      <Dropdown placement="bottomRight" menu={menu}>
        <Avatar
          shape="circle"
          size="small"
          icon={<CrownOutlined />}
          style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
        />
      </Dropdown>
      <Modal
        open={passwordVisible}
        title="设置密码"
        onCancel={handlePasswordCancel}
        onOk={handlePasswordOk}
        destroyOnClose={true}
      >
        <PasswordSettingForm form={form} />
      </Modal>
      <Modal
        open={logoutVisible}
        title="退出登录"
        onCancel={() => setLogoutVisible(false)}
        onOk={handleLogoutOk}
        destroyOnClose={true}
      >
        您确定要退出当前登录账号吗？
      </Modal>
    </div>
  )
}
