import React from 'react'
import { StructureConfig } from '../../../Models/table.enum'
import { IFreezeProps } from '../../../Models/table.models'
import { forwardRef } from 'react'

const FreezedLeftColumns = forwardRef<any, IFreezeProps<any>>(
  ({ columnsConfigStructure, columnMinWidth, item, freezedLeftSideColor }, ref) => {
    return (
      <>
        {columnsConfigStructure[StructureConfig.BB33].items.map((column) => {
          return (
            column.isVisible && (
              <li
                style={{
                  ...column.customStyle,
                  minWidth: columnMinWidth && columnMinWidth + 'px',
                  backgroundColor: freezedLeftSideColor && freezedLeftSideColor,
                }}
                key={column.id}
              >
                {column.setRow(item)}
              </li>
            )
          )
        })}
      </>
    )
  },
)

export default FreezedLeftColumns
