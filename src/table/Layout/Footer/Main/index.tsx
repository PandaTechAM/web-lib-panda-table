import React from 'react'
import {
  IColumnConfig,
  IColumnConfigStructure,
  IColumnHeader,
  IColumnHeaderStructure,
  IColumnTotalStructure,
  ITotalList,
} from '../../../../Models/table.models'
import { Button, Menu } from '@mui/material'
import { useState } from 'react'
import './style.scss'
import { StructureConfig } from '../../../../Models/table.enum'
interface IFooterMain<T extends Object> {
  columnsHeaderStructure: IColumnHeaderStructure
  columnsConfigStructure: IColumnConfigStructure<T>
  columnMinWidth?: number
  footerColor?: string
  isStickyFirstColumn?: boolean
  leftFreezedColumnWidth?: number
}
const FooterMain = <T extends Object>({
  columnsConfigStructure,
  columnMinWidth,
  footerColor,
  isStickyFirstColumn,
  leftFreezedColumnWidth,
  columnsHeaderStructure,
}: IFooterMain<T>) => {
  return (
    <ul className='G-data-table-footer' style={{ flex: 1, backgroundColor: footerColor && footerColor }}>
      {!isStickyFirstColumn ? (
        <li
          className='G-Total-dropdown'
          style={{
            backgroundColor: footerColor && footerColor,
            minWidth: leftFreezedColumnWidth ? `${leftFreezedColumnWidth}px` : 60,
          }}
        ></li>
      ) : null}
      {columnsHeaderStructure[StructureConfig.BB55].items.map((item: IColumnHeader, index: number) =>
        //@ts-ignore
        columnsConfigStructure[StructureConfig.BB55].items.map((column: IColumnConfig<T>, indexx: number) => {
          if (index === indexx) {
            return (
              column.isVisible && (
                <li
                  tabIndex={0}
                  style={{
                    ...column.customStyle,
                    minWidth: columnMinWidth + 'px',
                    backgroundColor: footerColor && footerColor,
                  }}
                  key={column.id}
                  className='G-column-item'
                >
                  {column.footer?.(columnsHeaderStructure[StructureConfig.BB55].items[index] as any)}
                </li>
              )
            )
          }
        }),
      )}
    </ul>
  )
}

export default FooterMain
