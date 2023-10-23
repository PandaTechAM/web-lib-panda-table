import React from 'react'
import { StructureConfig } from '../../../../Models/table.enum'
import {
  IColumnConfig,
  IColumnConfigStructure,
  IColumnHeader,
  IColumnHeaderStructure,
} from '../../../../Models/table.models'

interface ITopMain<T extends Object> {
  columnsHeaderStructure: IColumnHeaderStructure
  columnsConfigStructure: IColumnConfigStructure<T>
  columnMinWidth?: number
  headerColor?: string
  isStickyFirstColumn?: boolean
  multipleCheck?: boolean
  leftFreezedColumnWidth?: number
  handleSorting?(option: string): void
}
const HeaderMain = <T extends Object>({
  columnsHeaderStructure,
  columnsConfigStructure,
  columnMinWidth,
  headerColor,
  isStickyFirstColumn,
  multipleCheck,
  leftFreezedColumnWidth,
  handleSorting,
}: ITopMain<T>) => {
  return (
    <ul className='G-data-table-header' style={{ flex: 1, backgroundColor: headerColor && headerColor }}>
      {isStickyFirstColumn ? null : (
        <li
          style={{
            minWidth: leftFreezedColumnWidth ? `${leftFreezedColumnWidth}px` : '60px',
            maxWidth: leftFreezedColumnWidth ? `${leftFreezedColumnWidth}px` : '60px',
            backgroundColor: headerColor && headerColor,
          }}
        >
          {multipleCheck ? '' : 'N'}
        </li>
      )}
      {columnsHeaderStructure[StructureConfig.Main].items.map((item: IColumnHeader, index: number) =>
        //@ts-ignore
        columnsConfigStructure[StructureConfig.Main].items.map((column: IColumnConfig<T>, indexx: number) => {
          if (index === indexx) {
            return (
              column.isVisible && (
                <li
                  style={{
                    ...column.customStyle,
                    cursor: 'pointer',
                    minWidth: columnMinWidth + 'px',
                    backgroundColor: headerColor && headerColor,
                  }}
                  key={column.id}
                  className='G-column-item'
                >
                  {column.title(
                    columnsHeaderStructure[StructureConfig.Main].items[index] as any,
                    item.title,
                    handleSorting,
                  )}
                </li>
              )
            )
          }
        }),
      )}
    </ul>
  )
}

export default HeaderMain
