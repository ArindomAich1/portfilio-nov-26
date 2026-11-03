import { useEffect, useState } from 'react'

/** Live HH:MM clock for a time zone, updated every 15 seconds. */
export function useLocalTime(timeZone: string) {
  const format = () =>
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone }).format(new Date())

  const [time, setTime] = useState(format)

  useEffect(() => {
    const id = window.setInterval(() => setTime(format()), 15_000)
    return () => window.clearInterval(id)
  }, [timeZone])

  return time
}
