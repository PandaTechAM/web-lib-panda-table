import { memo, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface IPortal {
  children: any
}

const Portal = ({ children }: IPortal) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  return mounted ? createPortal(children, document.getElementById('modal') as Element) : null
}

export default memo(Portal)
