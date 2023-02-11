import 'mac-scrollbar/dist/mac-scrollbar.css';
import 'dayjs/locale/zh-cn';
import './global.less';
import 'uno.css';
import 'antd/dist/reset.css';
import 'core-js/full';

import { ConfigProvider, message, notification } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import { useSetAtom } from 'jotai';
import { GlobalScrollbar } from 'mac-scrollbar';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useRoutes } from 'react-router-dom';

import { mobileAtom } from './atom';
import { routes } from './config';
import { APP_NAME } from './constants';

dayjs.locale('zh-cn');
notification.config({ duration: 2 });
message.config({ duration: 2 });

export default function App() {
  const route = useRoutes(routes);
  useWindowSizeChange();

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#1777FF',
        },
      }}
    >
      <Helmet>
        <title>{APP_NAME}</title>
      </Helmet>
      {/* macos style scroll bar */}
      <GlobalScrollbar />
      {route}
    </ConfigProvider>
  );
}

function useWindowSizeChange() {
  const setMobile = useSetAtom(mobileAtom);

  useEffect(() => {
    function handleSizeChange() {
      const isMobile = window.matchMedia('(max-width: 639px)').matches;
      setMobile(isMobile);
      console.log('window size changed:', [document.body.clientWidth, document.body.clientHeight]);
    }

    handleSizeChange();

    window.addEventListener('resize', handleSizeChange);
    return () => {
      window.removeEventListener('resize', handleSizeChange);
    };
  }, [setMobile]);
}
