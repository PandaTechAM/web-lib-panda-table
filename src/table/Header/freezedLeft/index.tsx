import React from 'react'
import { StructureConfig } from '../../../Models/table.enum'
import { IColumnConfigStructure, IColumnHeaderStructure } from '../../../Models/table.models'
import FreezedItem from './FreezedItem'
interface IFreezedTopLeft<T extends Object> {
  columnsHeaderStructure: IColumnHeaderStructure
  columnsConfigStructure: IColumnConfigStructure<T>
  multipleCheck?: boolean
  isStickyFirstColumn?: boolean
  columnMinWidth?: number
  headerColor?: string
  leftFreezedColumnWidth?: number
}
const FreezedHeaderLeft = <T extends Object>({
  columnsHeaderStructure,
  columnsConfigStructure,
  multipleCheck,
  isStickyFirstColumn,
  columnMinWidth,
  headerColor,
  leftFreezedColumnWidth,
}: IFreezedTopLeft<T>) => {
  return (
    <ul
      className='G-data-table-header'
      style={{
        left: 0,
        zIndex: 1000,
        boxShadow: '7px 0px 9px -1px rgba(0,0,0,0.08)',
      }}
    >
      {isStickyFirstColumn ? (
        <li
          style={{
            minWidth: leftFreezedColumnWidth ? `${leftFreezedColumnWidth}px` : '60px',
            maxWidth: leftFreezedColumnWidth ? `${leftFreezedColumnWidth}px` : '60px',

            backgroundColor: headerColor && headerColor,
          }}
        >
          {multipleCheck ? '' : 'N'}
        </li>
      ) : null}
      {columnsHeaderStructure[StructureConfig.BB33].items.length ? (
        <FreezedItem
          columnsHeaderStructure={columnsHeaderStructure}
          columnsConfigStructure={columnsConfigStructure}
          columnMinWidth={columnMinWidth}
          headerColor={headerColor}
        />
      ) : null}
    </ul>
  )
}

export default FreezedHeaderLeft
