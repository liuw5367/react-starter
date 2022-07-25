import { Form, FormInstance, Input } from 'antd';

import { RULE_PASSWORD, RULE_PASSWORD_LENGTH } from '@/constants';

interface Props {
  form: FormInstance;
}

export default function PasswordSettingForm(props: Props) {
  const { form } = props;

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Form form={form} {...layout}>
        <Form.Item
          label="原密码"
          name="password"
          rules={[{ required: true, message: '请输入原始密码' }, RULE_PASSWORD, RULE_PASSWORD_LENGTH]}
        >
          <Input.Password placeholder={'请输入原始密码'} />
        </Form.Item>
        <Form.Item
          label="新密码"
          name="newPassword"
          rules={[{ required: true, message: '请输入新密码' }, RULE_PASSWORD, RULE_PASSWORD_LENGTH]}
        >
          <Input.Password placeholder={'请输入新密码'} />
        </Form.Item>
        <Form.Item
          label="确认新密码"
          name="verifyNewPassword"
          rules={[{ required: true, message: '请再次输入新密码' }, RULE_PASSWORD, RULE_PASSWORD_LENGTH]}
        >
          <Input.Password placeholder={'请再次输入新密码'} />
        </Form.Item>
      </Form>
    </div>
  );
}
