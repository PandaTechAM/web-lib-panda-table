import React from 'react'
import { StructureConfig } from '../../../../Models/table.enum'
import { IColumnConfigStructure, IColumnHeaderStructure, IColumnTotalStructure } from '../../../../Models/table.models'

interface IFreezedHeader<T extends Object> {
  columnsHeaderStructure: IColumnHeaderStructure
  columnsConfigStructure: IColumnConfigStructure<T>
  columnTotalStructures?: IColumnTotalStructure
  columnMinWidth?: number
  headerColor?: string
}
const FreezedItem = <T extends Object>({
  columnsHeaderStructure,
  columnsConfigStructure,
  columnMinWidth,
  headerColor,
}: IFreezedHeader<T>) => {
  return (
    <>
      {columnsHeaderStructure[StructureConfig.BB33].items.map((item, index) =>
        columnsConfigStructure[StructureConfig.BB33].items.map((column, indexx) => {
          if (index === indexx) {
            return (
              column.isVisible && (
                <li
                  style={{
                    ...column.customStyle,
                    minWidth: columnMinWidth && columnMinWidth + 'px',
                    backgroundColor: headerColor && headerColor,
                    position: 'sticky',
                  }}
                  key={column.id}
                >
                  {column.title(columnsHeaderStructure[StructureConfig.BB33].items[index] as any, item.title)}
                </li>
              )
            )
          }
        }),
      )}
    </>
  )
}
export default FreezedItem
