import React from 'react'
import './style.scss'
enum CheckBoxEnum {
  primary,
  secondary,

  'G-checkbox-primary' = CheckBoxEnum.primary,
  'G-checkbox-secondary' = CheckBoxEnum.secondary,
}

interface ICheckbox {
  isDisable?: boolean
  isCheck: boolean

  onClick?(): void

  hasIcon?: boolean
  iconClass?: string
  label?: string
  customClass?: string | ''
  checkboxType?: CheckBoxEnum
  children?: React.ReactNode
}

const Checkbox = ({
  isDisable,
  onClick,
  customClass,
  label,
  checkboxType = CheckBoxEnum.primary,
  isCheck,
  children,
}: ICheckbox) => {
  function handleClick(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation()
    if (!isDisable) {
      if ((e.target as HTMLInputElement).tagName !== 'A') onClick && onClick()
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`G-checkbox-component G-cursor-pointer G-inline-flex G-align-center G-justify-start ${
        customClass ? customClass : ''
      }`}
    >
      <div
        className={`G-checkbox G-flex G-flex-column ${isCheck ? 'G-active-checkbox' : ''} ${
          CheckBoxEnum[checkboxType]
        } ${isDisable ? 'G-disable-checkbox' : ''} `}
      >
        <span className={`G-active-checkbox-secondary-top`} />
        <span className={`G-active-checkbox-secondary-bottom`} />
        <span className={`G-checkbox-mark ${isCheck ? ' G-checkbox-mark-active' : ''}`} />
      </div>
      {children ? children : <p>{label}</p>}
    </div>
  )
}

export default Checkbox
