import 'dayjs/locale/zh-cn';
import './global.less';
import 'uno.css';
import 'antd/dist/reset.css';
import 'core-js/full';

import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider, message, notification } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { menuExpandAtom, mobileAtom } from './atom';
import { routes } from './config';
import { APP_NAME, Theme } from './constants';

dayjs.locale('zh-cn');
notification.config({ duration: 2 });
message.config({ duration: 2 });

export default function App() {
  useWindowSizeChange();

  const router = createBrowserRouter(routes);

  return (
    <ConfigProvider locale={zhCN} theme={{ token: Theme }}>
      <StyleProvider>
        <Helmet>
          <title>{APP_NAME}</title>
        </Helmet>
        <RouterProvider router={router} />
      </StyleProvider>
    </ConfigProvider>
  );
}

function useWindowSizeChange() {
  const setMobile = useSetAtom(mobileAtom);
  const setMenuExpand = useSetAtom(menuExpandAtom);

  useEffect(() => {
    function handleSizeChange() {
      console.log('window size changed:', [document.body.clientWidth, document.body.clientHeight]);
      const isMobile = window.matchMedia('(max-width: 639px)').matches;
      setMobile(isMobile);
      if (isMobile) {
        setMenuExpand(false);
      }
    }

    handleSizeChange();

    window.addEventListener('resize', handleSizeChange);
    return () => {
      window.removeEventListener('resize', handleSizeChange);
    };
  }, [setMobile, setMenuExpand]);
}
