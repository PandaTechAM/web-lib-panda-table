// Modal.tsx

import React, { ReactNode, cloneElement, useEffect, useState } from 'react'
import './style.scss'
// import ClickOutside from "../click-outside";
import { Button } from '@mui/material'
import ClickOutside from '../click-outside'

interface IModalProps {
  ActiveIcon: React.MemoExoticComponent<(props: React.SVGProps<SVGSVGElement>) => JSX.Element>
  children: ReactNode
  isOpen: boolean
  popupName: string
  handleClick: () => void
}

interface MyComponentProps {
  handleCancel: () => void
  getFilteredDataForTable?: () => void
  handleClick?: () => void
}

const NativePopup = ({ ActiveIcon, isOpen, children, popupName, handleClick }: IModalProps) => {
  const [animated, setAnimated] = useState(false)

  const isAnimated = () => {
    if (isOpen && animated) {
      return 'fade-in'
    }
    if (isOpen && !animated) {
      return ''
    }
    if (!isOpen && animated) {
      return 'fade-out'
    }
  }

  useEffect(() => {
    if (isOpen) setAnimated(true)
  }, [isOpen])

  return (
    <div className='G-wrapper-button'>
      <div role='button' aria-label='open' onClick={handleClick} className='G-center G-popup-button'>
        <ActiveIcon className='G-icon' />
        <label className='G-label'>{popupName}</label>
      </div>
      {isOpen || animated ? (
        <ClickOutside onClickOutside={handleClick}>
          <div className='popup-overlay '>
            <div
              onAnimationEnd={(e) => {
                if (e.animationName === 'fadeOut') {
                  setAnimated(false)
                }
              }}
              className={`popup-content ${isAnimated()}`}
            >
              {children}
            </div>
          </div>
        </ClickOutside>
      ) : null}
    </div>
  )
}

export default NativePopup
