import { useEffect } from 'react'

import { useGlobalStore } from '@/stores'

export function useWindowSizeChange() {
  useEffect(() => {
    function handleSizeChange() {
      // console.log('window size changed:', [document.body.clientWidth, document.body.clientHeight]);
      const isMobile = window.matchMedia('(max-width: 639px)').matches
      useGlobalStore.setState({ isMobile })
      if (isMobile)
        useGlobalStore.setState({ menuExpand: false })
    }

    handleSizeChange()

    window.addEventListener('resize', handleSizeChange)
    return () => {
      window.removeEventListener('resize', handleSizeChange)
    }
  }, [])
}
