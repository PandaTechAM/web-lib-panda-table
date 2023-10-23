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
  aggregates?: any
  handleArgChange?(columnName: string, type: string): void
}
const FreezedItems = <T extends Object>({
  columnsConfigStructure,
  columnsHeaderStructure,
  columnMinWidth,
  footerColor,
  aggregates,
  handleArgChange,
}: IFreezedHeader<T>) => {
  return (
    <>
      {columnsHeaderStructure[StructureConfig.Freezed].items.map((item: IColumnHeader, index: number) =>
        //@ts-ignore
        columnsConfigStructure[StructureConfig.Freezed].items.map((column: IColumnConfig<T>, indexx) => {
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
                  {column.footer?.(
                    columnsHeaderStructure[StructureConfig.Freezed].items[index] as any,
                    item.title,
                    handleArgChange,
                    aggregates,
                  )}
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
