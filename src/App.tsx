import 'mac-scrollbar/dist/mac-scrollbar.css';
import 'moment/dist/locale/zh-cn';
import './global.less';
import 'uno.css';
import 'antd/dist/antd.less';

import { ConfigProvider, message, notification } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { GlobalScrollbar } from 'mac-scrollbar';
import moment from 'moment';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { routes } from './config';
import { DvaRoot } from './dva';
import { createHistory } from './history';

export const history = createHistory();

moment.locale('zh-cn');
notification.config({ duration: 2 });
message.config({ duration: 2 });

export default function App() {
  return (
    <React.StrictMode>
      <ConfigProvider locale={zhCN}>
        {/* macos style scroll bar */}
        <GlobalScrollbar />
        <RecoilRoot>
          <DvaRoot>
            <BrowserRouter>{routes}</BrowserRouter>
          </DvaRoot>
        </RecoilRoot>
      </ConfigProvider>
    </React.StrictMode>
  );
}
