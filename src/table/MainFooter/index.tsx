import React, { memo, useEffect, useMemo, useState } from 'react'
import { IPageSizes, ISelected } from '../../Models/table.models'
import Pagination from '../../components/pagination'
import Select from '../../components/select/select'
import DropdownSvgIcon from '../../svgIcons/DropdownSvgIcon'
import './index.scss'
interface IFooterPagination {
  pageSizeStructure?: IPageSizes[]
  pagesTotalCount?: number
  currPage?: number
  selectedPageSizeId?: ISelected
  translations?: Record<string, any>
  getPageRowsCountAndCurrentPage?(pageNumber: number, rowsCount: IPageSizes): void
}
const FooterPagination = ({
  pageSizeStructure,
  pagesTotalCount = 0,
  currPage = 1,
  selectedPageSizeId = { id: 1 },
  translations,
  getPageRowsCountAndCurrentPage,
}: IFooterPagination) => {
  const [isOpenList, setOpen] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedPage, setSelectedPage] = useState<ISelected>(selectedPageSizeId)

  const setIsOpenList = () => {
    setOpen((prev) => !prev)
  }
  const handleSelectItem = (options: IPageSizes) => {
    setSelectedPage({ id: options.id })
    setCurrentPage(1)
    if (pageSizeStructure && selectedPage && getPageRowsCountAndCurrentPage) {
      getPageRowsCountAndCurrentPage(1, pageSizeStructure[options.id - 1])
    }
  }
  const handleChangePage = (option: number) => {
    setCurrentPage(option)
    if (pageSizeStructure && selectedPage && getPageRowsCountAndCurrentPage) {
      getPageRowsCountAndCurrentPage(option, pageSizeStructure[selectedPage.id - 1])
    }
  }

  const dataInfo = useMemo(() => {
    if (pageSizeStructure) {
      const fromCount =
        pagesTotalCount < currentPage * pageSizeStructure?.[selectedPage.id - 1].count
          ? pagesTotalCount
          : currentPage * pageSizeStructure?.[selectedPage.id - 1].count
      const infoMessage =
        (currentPage - 1) * pageSizeStructure?.[selectedPage.id - 1].count +
        1 +
        '-' +
        fromCount +
        (` ${translations?.pagination.from} ` || ' from ') +
        pagesTotalCount
      return infoMessage
    }
  }, [pageSizeStructure, currentPage, selectedPage.id, pagesTotalCount])

  useEffect(() => {
    if (currentPage !== currPage) setCurrentPage(currPage)
  }, [currPage])

  return (
    <>
      <div className='G-count-info'>{dataInfo}</div>
      {pageSizeStructure && selectedPage ? (
        <div className='G-justify-between G-align-center'>
          <div className='G-select-text'>{translations?.pagination.show || 'Show'}</div>
          <Select
            optionsList={pageSizeStructure}
            value={selectedPage.id}
            selectedNameKey={'count'}
            selectedValueKey={'id'}
            onChange={handleSelectItem}
            isOpenList={isOpenList}
            setIsOpenList={setIsOpenList}
            customClass='G-Select-container'
            ButtonSvg={DropdownSvgIcon}
          />
          <div className='G-select-text'>{translations?.pagination.rows || 'Rows'}</div>
          <Pagination
            onPageChange={handleChangePage}
            totalCount={pagesTotalCount}
            currentPage={currentPage}
            translations={translations}
            pageSizeStructure={pageSizeStructure && selectedPage ? pageSizeStructure[selectedPage.id - 1].count : 15}
            className={'G-pagionation'}
          />
        </div>
      ) : null}
    </>
  )
}

export default memo(FooterPagination)
