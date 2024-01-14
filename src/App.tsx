import 'dayjs/locale/zh-cn'
import 'antd/dist/reset.css'
import 'uno.css'
import './global.css'
import 'core-js/full'
import 'whatwg-fetch'
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch'

import { StyleProvider } from '@ant-design/cssinjs'
import { ConfigProvider, theme } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import dayjs from 'dayjs'
import { Helmet } from 'react-helmet'
import { RouterProvider, createBrowserRouter, useRoutes } from 'react-router-dom'
import { Suspense } from 'react'
import Layout from './layouts'

import { APP_NAME, Theme } from './constants'
import { useGlobalStore } from './stores'

// import { routes } from './config'
import routes from '~react-pages'

dayjs.locale('zh-cn')

export default function App() {
  const darkMode = useGlobalStore(s => s.darkMode)

  // vite-plugin-pages 不支持 layout。所以多套一层
  const router = createBrowserRouter([{ path: '*', element: <LayoutWrapper /> }])

  return (
    <ConfigProvider locale={zhCN} theme={{ token: Theme, algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
      <StyleProvider>
        <Helmet>
          <title>{APP_NAME}</title>
        </Helmet>
        <RouterProvider router={router} />
      </StyleProvider>
    </ConfigProvider>
  )
}

function LayoutWrapper() {
  return (
    <Layout>
      <Suspense fallback={undefined}>
        {useRoutes(routes)}
      </Suspense>
    </Layout>
  )
}
