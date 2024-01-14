import { useGlobalStore } from '@/stores'

export function getDarkMode() {
  return localStorage.getItem('app-color-scheme') ? localStorage.getItem('app-color-scheme') === 'dark' : getPreferredColorScheme()
}

function getPreferredColorScheme() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function useTheme() {
  const darkMode = useGlobalStore(state => state.darkMode)

  function setDarkMode(dark?: boolean) {
    useGlobalStore.setState({ darkMode: dark })
    document.documentElement.classList.toggle('dark', dark ?? false)
  }

  function saveColorScheme(theme: 'light' | 'dark' | 'auto') {
    if (theme === 'auto')
      localStorage.removeItem('app-color-scheme')
    else
      localStorage.setItem('app-color-scheme', theme)
  }

  function toggleDark() {
    const dark = !darkMode
    setDarkMode(dark)
    saveColorScheme(dark ? 'dark' : 'light')
  }

  function setTheme(theme: 'light' | 'dark' | 'auto') {
    saveColorScheme(theme)
    const dark = theme === 'dark' || (theme === 'auto' && getPreferredColorScheme())
    setDarkMode(dark)
  }

  return { darkMode, toggleDark, setTheme }
}
