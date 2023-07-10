import React, { useState } from 'react'
import Select from '../../../components/select/select'
import ArrowDown from '../../../svgIcons/ArrowBottomSvgIcon'
import ArrowUp from '../../../svgIcons/ArrowtopSvgIcon'
import './style.scss'
import { ISelected } from '../../../Models/table.models'
interface IDownload {
  id: number
  type: string
}
const Download = ({ getDownloadType }: { getDownloadType: (option: string) => void }) => {
  const [fileType] = useState<IDownload[]>([
    { id: 1, type: 'XLSX' },
    { id: 2, type: 'CSV' },
  ])
  const [isOpenList, setOpen] = useState<boolean>(false)

  const setIsOpenList = () => {
    setOpen((prev) => !prev)
  }
  const handleSelectItem = (option: IDownload) => {
    getDownloadType(option.type)
  }
  return (
    <Select
      optionsList={fileType}
      value={-1}
      selectedNameKey={'type'}
      selectedValueKey={'id'}
      onChange={handleSelectItem}
      isOpenList={isOpenList}
      setIsOpenList={setIsOpenList}
      customClass='P-download'
      label='Download report'
      ButtonSvg={isOpenList ? ArrowUp : ArrowDown}
    />
  )
}

export default Download
