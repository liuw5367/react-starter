import { CrownOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

export default function HeaderRight() {
  return (
    <div>
      <Avatar shape="circle" size="small" icon={<CrownOutlined />} />
    </div>
  );
}
