import { CrownOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Form, message, Modal, Space } from 'antd';
import { useState } from 'react';

import { logout, modifyPassword } from '@/services/user';
import { clearCacheOnLogout } from '@/utils';

import PasswordSettingForm from './PasswordSettingForm';

export default function HeaderRight() {
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [form] = Form.useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);

  function handleMenuClick(key: string) {
    if (key === 'logout') {
      setLogoutVisible(true);
    }
    else if (key === 'password') {
      setPasswordVisible(true);
    }
  }

  async function handleLogoutOk() {
    setLogoutVisible(false);
    await logout();
    clearCacheOnLogout();
    window.location.href = '/';
  }

  function handlePasswordCancel() {
    form.resetFields();
    setPasswordVisible(false);
  }

  function handlePasswordOk() {
    form.validateFields().then(async (values) => {
      const { password, newPassword, verifyNewPassword } = values;
      if (newPassword !== verifyNewPassword) {
        message.warning('新密码不一致，请核对后重新输入');
        return;
      }
      const userId = '1';
      const response = await modifyPassword({ oldPassword: password, password: newPassword, userId });
      if (response.success) {
        message.success('修改成功');
        form.resetFields();
        setPasswordVisible(false);
      }
    });
  }

  return (
    <div>
      <Dropdown
        placement="bottomRight"
        menu={{
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
        }}
      >
        <Avatar
          shape="circle"
          size="small"
          style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
          icon={<CrownOutlined />}
        />
      </Dropdown>
      <Modal
        open={passwordVisible}
        title={'设置密码'}
        onCancel={handlePasswordCancel}
        onOk={handlePasswordOk}
        destroyOnClose={true}
      >
        <PasswordSettingForm form={form} />
      </Modal>
      <Modal
        open={logoutVisible}
        title={'退出登录'}
        onCancel={() => setLogoutVisible(false)}
        onOk={handleLogoutOk}
        destroyOnClose={true}
      >
        您确定要退出当前登录账号吗？
      </Modal>
    </div>
  );
}
