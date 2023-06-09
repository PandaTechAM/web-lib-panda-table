import React from 'react'
import { StructureConfig } from '../../../../../Models/table.enum'
import {
  IColumnConfig,
  IColumnConfigStructure,
  IColumnHeader,
  IColumnHeaderStructure,
} from '../../../../../Models/table.models'

interface IFreezedHeader<T extends Object> {
  columnsHeaderStructure: IColumnHeaderStructure
  columnsConfigStructure: IColumnConfigStructure<T>
  columnMinWidth?: number
  footerColor?: string
}
const FreezedItems = <T extends Object>({
  columnsConfigStructure,
  columnsHeaderStructure,
  columnMinWidth,
  footerColor,
}: IFreezedHeader<T>) => {
  return (
    <>
      {columnsHeaderStructure[StructureConfig.BB33].items.map((item: IColumnHeader, index: number) =>
        //@ts-ignore
        columnsConfigStructure[StructureConfig.BB33].items.map((column: IColumnConfig<T>, indexx) => {
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
                  {column.footer?.(columnsHeaderStructure[StructureConfig.BB33].items[index] as any)}
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
