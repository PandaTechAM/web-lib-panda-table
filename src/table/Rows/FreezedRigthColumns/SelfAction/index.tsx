import React from 'react'
interface ISelfAction<T extends Object> {
  item: T
  leftSideIcon?: string
  checkedLink?: T
  LeftSideSelfAction?: (option: any) => void
  getRowForDropdown(option: number): void
}
const SelfAction = <T extends Object>({ item, leftSideIcon, getRowForDropdown }: ISelfAction<T>) => {
  return (
    //@ts-ignore
    <div onClick={() => getRowForDropdown(item.id)}>
      <i className={leftSideIcon ? leftSideIcon : 'icon-Vector1'} style={{ cursor: 'pointer', height: '60px' }} />
    </div>
  )
}

export default SelfAction
