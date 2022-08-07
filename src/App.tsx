import 'mac-scrollbar/dist/mac-scrollbar.css';
import 'moment/dist/locale/zh-cn';
import './global.less';
import 'uno.css';
import 'antd/dist/antd.less';

import { ConfigProvider, message, notification } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { GlobalScrollbar } from 'mac-scrollbar';
import moment from 'moment';
import { useRoutes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { routes } from './config';
import { DvaRoot } from './dva';
import { createHistory } from './history';

export const history = createHistory();

moment.locale('zh-cn');
notification.config({ duration: 2 });
message.config({ duration: 2 });

export default function App() {
  const route = useRoutes(routes);

  return (
    <ConfigProvider locale={zhCN}>
      {/* macos style scroll bar */}
      <GlobalScrollbar />
      <RecoilRoot>
        <DvaRoot>{route}</DvaRoot>
      </RecoilRoot>
    </ConfigProvider>
  );
}
