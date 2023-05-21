import React from 'react'
import { IColumnConfig } from '../../../Models/table.models'
const FreezedHeaderRight = <T extends Object>({
  headerColor,
  rightFreezedColumnWidth,
  rightFreezeConfig,
}: {
  headerColor: string | undefined
  rightFreezedColumnWidth: number | undefined
  rightFreezeConfig?: IColumnConfig<T>[]
}) => {
  return (
    <ul
      className='G-data-table-header'
      style={{
        right: 0,
        zIndex: 1000,
        boxShadow: '-6px 0px 8px 0px rgba(0,0,0,0.08)',
      }}
    >
      {rightFreezeConfig
        ? rightFreezeConfig.map((item, i) => {
            if (i < 4)
              return (
                <li
                  style={{
                    maxWidth: rightFreezedColumnWidth ? `${rightFreezedColumnWidth}px` : `${item.width}px`,
                    minWidth: rightFreezedColumnWidth ? `${rightFreezedColumnWidth}px` : `${item.width}px`,
                    backgroundColor: headerColor && headerColor,
                  }}
                />
              )
          })
        : null}
    </ul>
  )
}

export default FreezedHeaderRight
