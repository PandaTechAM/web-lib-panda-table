import React from 'react'
import { IColumnConfig } from '../../../Models/table.models'
const FooterFreezedRight = <T extends Object>({
  footerColor,
  rightFreezedColumnWidth,
  rightFreezeConfig,
}: {
  footerColor: string | undefined
  rightFreezedColumnWidth: number | undefined
  rightFreezeConfig: IColumnConfig<T>[] | undefined
}) => {
  return (
    <ul
      className='G-data-table-footer'
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
                    backgroundColor: footerColor && footerColor,
                    maxWidth: rightFreezedColumnWidth ? `${rightFreezedColumnWidth}px` : `${item.width}px`,
                    minWidth: rightFreezedColumnWidth ? `${rightFreezedColumnWidth}px` : `${item.width}px`,
                  }}
                />
              )
          })
        : null}
    </ul>
  )
}

export default FooterFreezedRight
