import React from 'react'
import {
  IColumnConfig,
  IColumnConfigStructure,
  IColumnHeaderStructure,
  IColumnTotalStructure,
  ITotalList,
} from '../../../Models/table.models'
import FooterFreezedLeft from './FreezedLeft'
import FooterFreezedRight from './FreezedRight'
import FooterMain from './Main'
interface IFooter<T extends Object> {
  columnsHeaderStructure: IColumnHeaderStructure
  columnsConfigStructure: IColumnConfigStructure<T>
  rightFreezeConfig?: IColumnConfig<T>[]
  columnMinWidth?: number
  footerColor?: string
  freezedRightSideVisible?: boolean
  isStickyFirstColumn?: boolean
  leftFreezedColumnWidth?: number
  rightFreezedColumnWidth?: number
  listForDropdown?: ITotalList[]
}
const Footer = <T extends Object>({
  columnsConfigStructure,
  columnsHeaderStructure,
  rightFreezeConfig,
  columnMinWidth,
  footerColor,
  freezedRightSideVisible,
  isStickyFirstColumn,
  leftFreezedColumnWidth,
  rightFreezedColumnWidth,
  listForDropdown,
}: IFooter<T>) => {
  return (
    <>
      <FooterFreezedLeft
        columnsConfigStructure={columnsConfigStructure}
        columnsHeaderStructure={columnsHeaderStructure}
        columnMinWidth={columnMinWidth}
        footerColor={footerColor}
        isStickyFirstColumn={isStickyFirstColumn}
        leftFreezedColumnWidth={leftFreezedColumnWidth}
        listForDropdown={listForDropdown}
      />
      <FooterMain
        columnsConfigStructure={columnsConfigStructure}
        columnsHeaderStructure={columnsHeaderStructure}
        columnMinWidth={columnMinWidth}
        footerColor={footerColor}
        isStickyFirstColumn={isStickyFirstColumn}
        leftFreezedColumnWidth={leftFreezedColumnWidth}
      />
      {freezedRightSideVisible ? (
        <FooterFreezedRight
          footerColor={footerColor}
          rightFreezedColumnWidth={rightFreezedColumnWidth}
          rightFreezeConfig={rightFreezeConfig}
        />
      ) : null}
    </>
  )
}

export default Footer
