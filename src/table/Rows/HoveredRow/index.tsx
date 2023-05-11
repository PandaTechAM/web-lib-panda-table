import React from 'react'
import { IrowActions } from '../../../Models/table.models'
import { useRef } from 'react'

interface IHoveredRow<T extends Object> {
  rowActions?: IrowActions[]
  item: T
  index: number
  freezedRows: T[]
  freezeIcon?: string
  freezeRow?(option: number): void
}
const HoveredRow = <T extends Object>({
  rowActions,
  item,
  index,
  freezedRows,
  freezeIcon,
  freezeRow,
}: IHoveredRow<T>) => {
  const ref = useRef<any>(null)

  return (
    <li className='G-rows-icons'>
      <div className='G-icons-group' ref={ref}>
        {rowActions && rowActions.length
          ? rowActions.map((elem, index) => {
              if (index < 2)
                return (
                  <i
                    key={index}
                    className={
                      elem.icon
                        ? elem.icon
                        : index === 0
                        ? 'icon-material-symbols_edit'
                        : 'icon-material-symbols_delete'
                    }
                    onClick={() => elem.action(item, index)}
                  />
                )
            })
          : null}
        {freezedRows.length < 3 && freezeIcon && freezeRow && (
          <i
            className={freezeIcon ? freezeIcon : 'icon-material-symbols_dashboard-rounded'}
            onClick={() => freezeRow(index)}
          />
        )}
      </div>
    </li>
  )
}
export default HoveredRow
