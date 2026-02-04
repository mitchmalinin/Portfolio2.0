'use client'

import { useEffect, useState } from 'react'

const IN_APP_BROWSER_REGEX = /Twitter|TwitterAndroid|Twttr/i
const TWITTER_HOST_REGEX = /(^|\\.)t\\.co$|(^|\\.)twitter\\.com$|(^|\\.)x\\.com$/i

export default function useInAppBrowser() {
  const [isInApp, setIsInApp] = useState(() => {
    if (typeof navigator === 'undefined') return false
    const ua = navigator.userAgent || ''
    const referrer = typeof document !== 'undefined' ? document.referrer : ''
    let isTwitterReferrer = false
    if (referrer) {
      try {
        const host = new URL(referrer).hostname
        isTwitterReferrer = TWITTER_HOST_REGEX.test(host)
      } catch {
        isTwitterReferrer = false
      }
    }
    return IN_APP_BROWSER_REGEX.test(ua) || (isTwitterReferrer && /iPhone|iPad|iPod|Android/i.test(ua))
  })

  useEffect(() => {
    if (typeof navigator === 'undefined') return
    const ua = navigator.userAgent || ''
    const referrer = typeof document !== 'undefined' ? document.referrer : ''
    let isTwitterReferrer = false
    if (referrer) {
      try {
        const host = new URL(referrer).hostname
        isTwitterReferrer = TWITTER_HOST_REGEX.test(host)
      } catch {
        isTwitterReferrer = false
      }
    }
    setIsInApp(IN_APP_BROWSER_REGEX.test(ua) || (isTwitterReferrer && /iPhone|iPad|iPod|Android/i.test(ua)))
  }, [])

  return isInApp
}
