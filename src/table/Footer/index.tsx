import React from 'react'
import { IColumnConfigStructure, IColumnTotalStructure, ITotalList } from '../../Models/table.models'
import FooterFreezedLeft from './FreezedLeft'
import FooterFreezedRight from './FreezedRight'
import FooterMain from './Main'
interface IFooter<T extends Object> {
  columnsTotalStructure: IColumnTotalStructure
  columnsConfigStructure: IColumnConfigStructure<T>
  columnMinWidth?: number
  footerColor?: string
  freezedRightSideVisible?: boolean
  isStickyFirstColumn?: boolean
  leftFreezedColumnWidth?: number
  rightFreezedColumnWidth?: number
  listForDropdown?: ITotalList[]
  setTotalType?(option: number | string): void
}
const Footer = <T extends Object>({
  columnsTotalStructure,
  columnsConfigStructure,
  columnMinWidth,
  footerColor,
  freezedRightSideVisible,
  isStickyFirstColumn,
  leftFreezedColumnWidth,
  rightFreezedColumnWidth,
  listForDropdown,
  setTotalType,
}: IFooter<T>) => {
  return (
    <>
      <FooterFreezedLeft
        columnsConfigStructure={columnsConfigStructure}
        columnsTotalStructure={columnsTotalStructure}
        columnMinWidth={columnMinWidth}
        footerColor={footerColor}
        isStickyFirstColumn={isStickyFirstColumn}
        leftFreezedColumnWidth={leftFreezedColumnWidth}
        listForDropdown={listForDropdown}
        setTotalType={setTotalType}
      />
      <FooterMain
        columnsConfigStructure={columnsConfigStructure}
        columnsTotalStructure={columnsTotalStructure}
        columnMinWidth={columnMinWidth}
        footerColor={footerColor}
        isStickyFirstColumn={isStickyFirstColumn}
        leftFreezedColumnWidth={leftFreezedColumnWidth}
        setTotalType={setTotalType}
      />
      {freezedRightSideVisible ? (
        <FooterFreezedRight footerColor={footerColor} rightFreezedColumnWidth={rightFreezedColumnWidth} />
      ) : null}
    </>
  )
}

export default Footer
