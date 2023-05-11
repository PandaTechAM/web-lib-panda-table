import React, { FC, useEffect } from 'react'

interface IClickOutSide {
  onClickOutside(e?: MouseEvent): void

  children: React.ReactNode
}

const ClickOutside: FC<IClickOutSide> = ({ onClickOutside, children }) => {
  const container = React.createRef<HTMLDivElement>()

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (container.current) {
        !container.current.contains(e.target as HTMLElement) && onClickOutside && onClickOutside(e)
      }
    }

    document.addEventListener('click', handle, true)
    return () => {
      document.removeEventListener('click', handle, true)
    }
  }, [container, onClickOutside])

  return (
    <div className='E-click-outside' ref={container}>
      {children}
    </div>
  )
}

export default ClickOutside
