import React, { useEffect, useRef, useState } from 'react'
import { usePagination, DOTS } from './usePagination'
import './style.scss'
import { containsOnlyNumbers } from '../../../utils'
import Input from '../Input/Input'
import ArrowLeftSvgIcon from '../../../svgIcons/ArrowLeftSvgIcon'
import ArrowRightSvgIcon from '../../../svgIcons/ArrowRightSvgIcon'
interface IPagination {
  onPageChange(page: number | string): void
  totalCount: number
  siblingCount?: number
  currentPage: number
  pageSizeStructure: number
  className?: string
}

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSizeStructure,
  className,
}: IPagination) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSizeStructure,
  })
  const ref = useRef<any>(null)
  const [val, setVal] = useState('')
  useEffect(() => {
    setVal('')
  }, [totalCount, pageSizeStructure, currentPage])
  // @ts-ignore

  if (currentPage === 0 || paginationRange.length === 1) {
    return null
  }
  if (currentPage === 0 || totalCount === 1) {
    return null
  }
  // @ts-ignore
  const lastPage = paginationRange[paginationRange.length - 1]
  const onNext = () => {
    if (currentPage < +lastPage) onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (ref.current && containsOnlyNumbers(value) && +value <= totalCount / pageSizeStructure) setVal(value)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && ref.current && val.trim() && val !== '0') {
      onPageChange(+ref.current.value)
    }
  }

  return (
    <>
      <ul className={`pagination-container ${className} G-flex G-align-center G-justify-between`}>
        <li className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`} onClick={onPrevious}>
          <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <ArrowLeftSvgIcon />
          </div>
        </li>
        {/*@ts-ignore*/}
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li key={index} className='pagination-item dots'>
                &#8230;
              </li>
            )
          }

          return (
            <li
              key={index}
              style={{ cursor: 'pointer' }}
              className={`pagination-item ${pageNumber === currentPage ? 'selected' : ''} `}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          )
        })}
        <li className={`pagination-item ${currentPage === lastPage ? 'disabled' : ''}`} onClick={onNext}>
          <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <ArrowRightSvgIcon />
          </div>
        </li>
      </ul>
      <div className='G-align-center'>
        <div>Go to</div>
        <Input
          ref={ref}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          value={val}
          style={{
            width: '24px',
            height: '24px',
            border: '1px solid #ACBCC3',
            outline: 'none',
            margin: '0 15px',
            padding: '0 3px',
            fontSize: '10px',
          }}
        />
      </div>
    </>
  )
}

export default Pagination
