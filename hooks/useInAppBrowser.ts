'use client'

import { useEffect, useState } from 'react'

const IN_APP_BROWSER_REGEX = /Twitter|TwitterAndroid|Twttr/i

export default function useInAppBrowser() {
  const [isInApp, setIsInApp] = useState(() => {
    if (typeof navigator === 'undefined') return false
    const ua = navigator.userAgent || ''
    return IN_APP_BROWSER_REGEX.test(ua)
  })

  useEffect(() => {
    if (typeof navigator === 'undefined') return
    const ua = navigator.userAgent || ''
    setIsInApp(IN_APP_BROWSER_REGEX.test(ua))
  }, [])

  return isInApp
}
