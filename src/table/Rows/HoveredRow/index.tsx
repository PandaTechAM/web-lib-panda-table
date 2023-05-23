import React from 'react'
import { IrowActions } from '../../../Models/table.models'
import { useRef } from 'react'
import FreezeRowSvgIcon from '../../../svgIcons/FrameSvgIcon'
import EditSvgIcon from '../../../svgIcons/EditSvgIcon'
import DeleteSvgIcon from '../../../svgIcons/DeleteSvgIcon'
interface IHoveredRow<T extends Object> {
  rowActions?: IrowActions[]
  item: T
  index: number
  freezedRows: T[]
  FreezeIcon?: any
  freezeRow?(e: any, option: number): void
}
const HoveredRow = <T extends Object>({
  rowActions,
  item,
  index,
  freezedRows,
  FreezeIcon,
  freezeRow,
}: IHoveredRow<T>) => {
  const ref = useRef<any>(null)

  return (
    <li className='G-rows-icons'>
      <div className='G-icons-group' ref={ref}>
        {rowActions && rowActions.length
          ? //@ts-ignore
            rowActions.map((elem, index) => {
              if (index < 3)
                return (
                  <div
                    // style={{ cursor: "pointer", paddingLeft: 8 }}
                    key={index}
                    onClick={(e) => elem.action(e, item, index)}
                    className={index === 0 ? 'G-first-action' : 'G-action-nth'}
                  >
                    {elem.icon ? <elem.icon /> : index === 0 ? <EditSvgIcon /> : <DeleteSvgIcon />}
                  </div>
                )
            })
          : null}
        {freezedRows.length < 3 && freezeRow && (
          <>
            <div
              onClick={(e) => {
                freezeRow(e, index)
              }}
              className='G-freeze-Icon'
            >
              {!FreezeIcon ? <FreezeRowSvgIcon /> : <FreezeIcon />}
            </div>
          </>
        )}
      </div>
    </li>
  )
}
export default HoveredRow
