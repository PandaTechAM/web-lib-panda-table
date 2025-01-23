import React, { memo } from 'react'
import Checkbox from '../../../components/checkbox'
import './style.scss'
interface ICheckRows<T extends Object> {
  data: T[]
  checkedRows: T[]
  translations?: Record<string, any>
  handleCheckAll(data?: T[]): void
  unCheck(): void
  checkAllDataFromDb(): void
  handleClose?: () => void
}

const CheckRows = <T extends Object>({ data, checkedRows, handleCheckAll, unCheck }: ICheckRows<T>) => {
  return (
    <div className='G-align-center G-check-all-component'>
      <Checkbox
        isCheck={data.length === checkedRows.length && checkedRows.length > 1}
        onClick={
          data.length === checkedRows.length
            ? () => {
                unCheck()
              }
            : () => {
                handleCheckAll()
              }
        }
        customClass='G-checkbox'
      />
    </div>
  )
}

export default memo(CheckRows)
