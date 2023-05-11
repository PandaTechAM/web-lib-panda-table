import React from 'react'
import { ILinksList } from '../../../Models/table.models'
import DropDown from './DropDown'
import SelfAction from './SelfAction'
interface IFreezedRightColumns<T extends Object> {
  item: T
  checkedLink?: T
  links?: ILinksList[]
  freezedRightSide?: string
  leftSideIcon?: string
  LeftSideSelfAction?: (option: number | string) => void
  getRowForDropdown(option: number): void
}
const FreezedRightColumns = <T extends Object>({
  item,
  checkedLink,
  links,
  freezedRightSide,
  leftSideIcon,
  LeftSideSelfAction,
  getRowForDropdown,
}: IFreezedRightColumns<T>) => {
  return (
    <>
      {freezedRightSide && freezedRightSide === 'dropdown' ? (
        <DropDown item={item} checkedLink={checkedLink} links={links} getRowForDropdown={getRowForDropdown} />
      ) : (
        <SelfAction
          item={item}
          leftSideIcon={leftSideIcon}
          LeftSideSelfAction={LeftSideSelfAction}
          getRowForDropdown={getRowForDropdown}
        />
      )}
    </>
  )
}

export default FreezedRightColumns
