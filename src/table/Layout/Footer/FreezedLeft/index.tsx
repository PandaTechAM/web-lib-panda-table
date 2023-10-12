import React, { useState } from 'react'
import {
  IColumnConfigStructure,
  IColumnHeaderStructure,
  IColumnTotalStructure,
  ITotalList,
} from '../../../../Models/table.models'
import { Button, Menu } from '@mui/material'
import FreezedItems from './FreezedItems'
import './style.scss'
import { StructureConfig } from '../../../../Models/table.enum'
import ArrowTopSvgIcon from '../../../../svgIcons/ArrowtopSvgIcon'
import ArrowBottomSvgIcon from '../../../../svgIcons/ArrowBottomSvgIcon'
interface IFooterFreezedLeft<T extends Object> {
  columnsHeaderStructure: IColumnHeaderStructure
  columnsConfigStructure: IColumnConfigStructure<T>
  columnMinWidth?: number
  footerColor?: string
  isStickyFirstColumn?: boolean
  leftFreezedColumnWidth?: number
}

const FooterFreezedLeft = <T extends Object>({
  columnsConfigStructure,
  columnMinWidth,
  footerColor,
  isStickyFirstColumn,
  leftFreezedColumnWidth,
  columnsHeaderStructure,
}: IFooterFreezedLeft<T>) => {
  return (
    <ul
      className='G-data-table-footer'
      style={{
        left: 0,
        zIndex: 1000,
        boxShadow: '7px 0px 9px -1px rgba(0,0,0,0.02)',
      }}
    >
      {isStickyFirstColumn ? (
        <li
          className='G-dropdown'
          style={{
            backgroundColor: footerColor && footerColor,
            minWidth: leftFreezedColumnWidth ? `${leftFreezedColumnWidth}px` : 60,
          }}
        ></li>
      ) : null}
      {columnsHeaderStructure[StructureConfig.Freezed].items.length ? (
        <FreezedItems
          columnsHeaderStructure={columnsHeaderStructure}
          columnsConfigStructure={columnsConfigStructure}
          columnMinWidth={columnMinWidth}
          footerColor={footerColor}
        />
      ) : null}
    </ul>
  )
}

export default FooterFreezedLeft
