import { CrownOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu, Modal, Space } from 'antd';
import { useState } from 'react';

import { useDispatch } from '@/hooks';

export default function HeaderRight() {
  const dispatch = useDispatch();
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [menuItems] = useState([
    {
      key: 'password',
      label: (
        <Space>
          <SettingOutlined />
          设置密码
        </Space>
      ),
    },
    {
      key: 'logout',
      label: (
        <Space>
          <LogoutOutlined />
          退出登录
        </Space>
      ),
    },
  ]);

  function handleMenuClick(event: { key: string }) {
    const { key } = event;
    if (key === 'logout') {
      setLogoutVisible(true);
    }
  }

  function handleLogoutOk() {
    setLogoutVisible(false);
    dispatch({ type: 'global/logout' });
  }

  return (
    <div>
      <Dropdown placement="bottomRight" overlay={<Menu onClick={handleMenuClick} items={menuItems} />}>
        <Avatar
          shape="circle"
          size="small"
          style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
          icon={<CrownOutlined />}
        />
      </Dropdown>
      <Modal
        visible={logoutVisible}
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
