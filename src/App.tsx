import 'mac-scrollbar/dist/mac-scrollbar.css';
import 'moment/dist/locale/zh-cn';
import './global.less';
import 'uno.css';
import 'antd/dist/antd.less';

import { ConfigProvider, message, notification } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { useSetAtom } from 'jotai';
import { GlobalScrollbar } from 'mac-scrollbar';
import moment from 'moment';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useRoutes } from 'react-router-dom';

import { mobileAtom } from './atom';
import { routes } from './config';
import { APP_NAME } from './constants';

moment.locale('zh-cn');
notification.config({ duration: 2 });
message.config({ duration: 2 });

export default function App() {
  const route = useRoutes(routes);
  useWindowSizeChange();

  return (
    <ConfigProvider locale={zhCN}>
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
      console.log('window size change: ', isMobile);
    }

    handleSizeChange();

    window.addEventListener('resize', handleSizeChange);
    return () => {
      window.removeEventListener('resize', handleSizeChange);
    };
  }, [setMobile]);
}
