import { Button, Checkbox, Form, Input, message } from 'antd';
import { useState } from 'react';
import { history } from 'umi';

import { APP_NAME, CACHE_TOKEN, RULE_PASSWORD, RULE_PASSWORD_LENGTH, RULE_USERNAME } from '@/constants';
import { useQuery } from '@/hooks';
import { login } from '@/services/user';

import styles from './index.less';

interface FormValue {
  username: string;
  password: string;
  remember?: boolean;
}

const Login = () => {
  const query = useQuery();
  const [isError, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const initialValues = {
    username: localStorage.getItem('login-username'),
    password: localStorage.getItem('login-password'),
    remember: !!localStorage.getItem('login-remember'),
  };

  async function handleSubmit(values: FormValue) {
    const { username, password } = values;
    // password = CryptoJs.MD5(password).toString();

    setLoading(true);
    const response = await login({ username, password });
    setLoading(false);

    const token = response.data;
    if (!response || response.code !== 0 || !token) {
      setError(true);
      return;
    }
    localStorage.setItem(CACHE_TOKEN, token);
    history.replace(query('redirect') || '/');
  }

  function handleFinish(values: FormValue) {
    const { username, password, remember } = values;
    if (remember) {
      localStorage.setItem('login-remember', '1');
      localStorage.setItem('login-username', username);
      localStorage.setItem('login-password', password);
    } else {
      localStorage.setItem('login-remember', '');
      localStorage.setItem('login-username', '');
      localStorage.setItem('login-password', '');
    }
    const params = { username, password };
    handleSubmit(params);
  }

  function handleChange() {
    if (isError) {
      setError(true);
    }
  }

  function handleForgetPassword() {
    message.warn('请联系管理员修改密码');
  }

  function renderForm() {
    return (
      <Form
        form={form}
        wrapperCol={{ span: 24 }}
        layout="horizontal"
        size="large"
        requiredMark={false}
        onFinish={handleFinish}
        className={styles.form}
        initialValues={initialValues}
      >
        <Form.Item label="账号" name="username" rules={[{ required: true, message: '请输入账号' }, RULE_USERNAME]}>
          <Input className={styles.input} onChange={handleChange} placeholder="请输入账号" maxLength={30} />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }, RULE_PASSWORD_LENGTH, RULE_PASSWORD]}
        >
          <Input
            className={styles.input}
            type="password"
            autoComplete="off"
            onChange={handleChange}
            placeholder="请输入密码"
          />
        </Form.Item>
        {isError && <div className={styles.error}> 用户名或密码错误，请核对后重新输入</div>}
        <a onClick={handleForgetPassword}>忘记密码</a>
        <Button type="primary" htmlType="submit" loading={loading} className={styles.submit}>
          {loading ? '登录中' : '登录'}
        </Button>

        <Form.Item name="remember" valuePropName="checked" className="mb-0">
          <Checkbox>记住密码</Checkbox>
        </Form.Item>
      </Form>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.name}>{APP_NAME}</div>
        {renderForm()}
      </div>
    </div>
  );
};

export default Login;
