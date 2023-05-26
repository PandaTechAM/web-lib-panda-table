import React from 'react'
import { InputHTMLAttributes, DetailedHTMLProps, forwardRef } from 'react'
import './Input.scss'
import { regExp } from '../../../constants/regExp'

const Input = forwardRef<HTMLInputElement, DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>(
  ({ id, className, ...rest }, ref) => {
    return (
      <div className={'inputWrapper'}>
        <label className={'label'} htmlFor={id}></label>
        <input id={id} className={className} ref={ref} {...rest} pattern={regExp.PHONE_NUMBER.source} />
        <p className={'errorText'}></p>
      </div>
    )
  },
)

export default Input
