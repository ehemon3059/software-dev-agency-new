import { useEffect, useState } from "react"

// Theme hook to detect Tailwind dark mode
function TigerEmoji() {
  const [isDark, setIsDark] = useState(false) 
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    const check = () => setIsDark(document.documentElement.classList.contains('dark'))
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])
  
  if (!mounted) return false
  return isDark
}

export default TigerEmoji