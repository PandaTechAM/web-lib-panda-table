import React from 'react'
import { StructureConfig } from '../../../../Models/table.enum'
import { IColumnConfigStructure, IColumnTotalStructure } from '../../../../Models/table.models'

interface IFreezedHeader<T extends Object> {
  columnsTotalStructure: IColumnTotalStructure
  columnsConfigStructure: IColumnConfigStructure<T>
  columnMinWidth?: number
  footerColor?: string
}
const FreezedItems = <T extends Object>({
  columnsTotalStructure,
  columnsConfigStructure,
  columnMinWidth,
  footerColor,
}: IFreezedHeader<T>) => {
  return (
    <>
      {columnsTotalStructure[StructureConfig.BB33].items.map((item, index) =>
        columnsConfigStructure[StructureConfig.BB33].items.map((column, indexx) => {
          if (index === indexx) {
            return (
              column.isVisible && (
                <li
                  style={{
                    ...column.customStyle,
                    minWidth: columnMinWidth && columnMinWidth + 'px',
                    position: 'sticky',
                    backgroundColor: footerColor && footerColor,
                  }}
                  key={column.id}
                >
                  {column.title(columnsTotalStructure[StructureConfig.BB33].items[index] as any, item.title)}
                </li>
              )
            )
          }
        }),
      )}
    </>
  )
}

export default FreezedItems
