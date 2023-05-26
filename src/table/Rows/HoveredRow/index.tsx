import React, { useState } from 'react'
import { ILinksList, IrowActions } from '../../../Models/table.models'
import { useRef } from 'react'
import FreezeRowSvgIcon from '../../../svgIcons/FrameSvgIcon'
import EditSvgIcon from '../../../svgIcons/EditSvgIcon'
import DeleteSvgIcon from '../../../svgIcons/DeleteSvgIcon'
import Select from '../../components/select/select'
interface IHoveredRow<T extends Object> {
  rowActions?: IrowActions[]
  item: T
  index: number
  freezedRows: T[]
  FreezeIcon?: any
  links?: ILinksList[]
  freezeRow?(e: any, option: number): void
}
const HoveredRow = <T extends Object>({
  rowActions,
  item,
  index,
  freezedRows,
  FreezeIcon,
  links,
  freezeRow,
}: IHoveredRow<T>) => {
  const ref = useRef<any>(null)
  const [isOpenList, setOpen] = useState<boolean>(false)
  const setIsOpenList = () => {
    setOpen((prev) => !prev)
  }

  return (
    <li className='G-rows-icons' onMouseLeave={() => setOpen(false)}>
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
        {/* {links && (
          <div className="G-modal-Icon">
            <Select
              optionsList={links}
              value={""}
              selectedNameKey={"name"}
              selectedValueKey={"id"}
              isOpenList={isOpenList}
              setIsOpenList={setIsOpenList}
              customClass={"G-drop"}
              rowItem={item}
              haveIcon
            />
          </div>
        )} */}
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
