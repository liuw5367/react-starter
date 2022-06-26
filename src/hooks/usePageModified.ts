import React, { useEffect } from 'react';
import { useNavigate } from 'umi';

import { APP_NAME } from '@/constants';

/**
 * 设置编辑状态，在浏览器刷新和后退的时候会调用 onBackOrRefresh 方法
 * 例：
 * function handleBack() {
 *   if (pageModified) {
 *     message.warn('请保存未提交数据'); // pageModified 为页面内部维护的编辑状态
 *     return;
 *   }
 *   back();
 * }
 * const [setModified] = usePageModified(handleBack);
 *
 * @param onBackOrRefresh 页面内进行的后退处理逻辑，弹窗提示等..
 * @returns 返回一个函数用于设置是否为编辑状态
 */
export function usePageModified(onBackOrRefresh?: () => void) {
  const navigate = useNavigate();
  const [modified, setModified] = React.useState(false);
  const pushStateFlag = React.useRef(false);
  /**
   * 浏览器的后退键回调
   */
  const popListener = React.useRef<any>();
  /**
   * 浏览器的刷新回调
   */
  const beforeUnloadListener = React.useRef<any>();

  /**
   * 给页面添加空的pushState，用来保证在浏览器点击后退键时页面不会切换
   * 在后退键点击时会消费掉 pushState
   */
  const addPushState = React.useCallback(() => {
    if (!pushStateFlag.current) {
      console.log('usePageModified', 'addPushState()');
      pushStateFlag.current = true;
      window.history.pushState(null, APP_NAME, null);
    }
  }, []);

  /**
   * 清除pushState
   */
  const removePushState = React.useCallback(() => {
    if (pushStateFlag.current) {
      console.log('usePageModified', 'removePushState()');
      // goBack()移除pushState，flag置为false
      pushStateFlag.current = false;
      navigate(-1);
    }
  }, []);

  useEffect(() => {
    popListener.current = () => {
      if (pushStateFlag.current) {
        pushStateFlag.current = false;
        // 触发页面的后退保存提示
        onBackOrRefresh?.();
        // 浏览器的后退键点击后，pushState就没有了，需要再补上
        addPushState();
      }
    };
    beforeUnloadListener.current = (e: BeforeUnloadEvent) => {
      const hint = '您修改的数据未保存，是否放弃修改?';
      if (e) e.returnValue = hint;
      return hint;
    };
    return () => {
      // 页面关闭时，移除事件监听
      window.removeEventListener('beforeunload', beforeUnloadListener.current, true);
      window.removeEventListener('popstate', popListener.current, true);
    };
  }, []);

  useEffect(() => {
    console.log('usePageModified', [modified]);
    // 有修改时添加 浏览器的事件监听，没有修改时移除
    if (modified) {
      window.addEventListener('beforeunload', beforeUnloadListener.current, true);
      addPushState();
      window.addEventListener('popstate', popListener.current, true);
    } else {
      window.removeEventListener('beforeunload', beforeUnloadListener.current, true);
      removePushState();
      window.removeEventListener('popstate', popListener.current, true);
    }
  }, [modified, addPushState, removePushState]);

  return [setModified];
}
