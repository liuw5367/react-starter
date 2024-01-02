import 'dayjs/locale/zh-cn'
import './global.css'
import 'uno.css'
import 'antd/dist/reset.css'
import 'core-js/full'
import 'whatwg-fetch'
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch'

import { StyleProvider } from '@ant-design/cssinjs'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import dayjs from 'dayjs'
import { Helmet } from 'react-helmet'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { routes } from './config'
import { APP_NAME, Theme } from './constants'

dayjs.locale('zh-cn')

export default function App() {
  const router = createBrowserRouter(routes)

  return (
    <ConfigProvider locale={zhCN} theme={{ token: Theme }}>
      <StyleProvider>
        <Helmet>
          <title>{APP_NAME}</title>
        </Helmet>
        <RouterProvider router={router} />
      </StyleProvider>
    </ConfigProvider>
  )
}
