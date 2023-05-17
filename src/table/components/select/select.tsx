import React, { useEffect, useState } from 'react'
import './style.scss'
import ClickOutside from '../click-outside'
import DropdownSvgIcon from '../../../svgIcons/DropdownSvgIcon'

/**
 * Main  props  for select component
 * T is  the main type for  component
 * **/
interface IObjectKey {
  [key: string]: any
}

interface ISelect<T> {
  optionsList: Array<T>
  value: string | number | null
  selectedNameKey: string
  selectedValueKey: string

  customClass?: string
  placeholder?: string
  selectedIconKey?: string
  maxHeight?: number
  isClear?: boolean
  label?: string
  isImage?: boolean

  onChange?(value: T | null): void
}

function Select<T>({
  optionsList,
  selectedNameKey,
  selectedValueKey,
  placeholder,
  value,
  onChange,
  maxHeight = 150,
  isClear,
  label,
  selectedIconKey,
  customClass = '',
  isImage = false,
}: ISelect<T>) {
  const [selectedValue, setValue] = useState<T | null>(null)
  const [selectedValueName, setSelectedValueName] = useState<string | null>(null)
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [isOpenList, setIsOpenList] = useState<boolean>(false)

  /**
   * get value object from options list with
   * @selectedValueKey from props
   * **/
  useEffect(() => {
    if (value || value === 0) {
      optionsList?.map((item: T) => {
        Object.entries(item as IObjectKey).forEach(([key, keyValue]) => {
          if (keyValue === value && key === selectedValueKey) {
            setValue(item)
          }
        })
      })
    } else {
      setValue(null)
    }
  }, [value, optionsList, selectedValueKey])

  /**
   *  selected data name from
   *  @selectedValue
   *  @selectedNameKey  from props
   * **/

  useEffect(() => {
    if (selectedValue) {
      Object.entries(selectedValue as IObjectKey).forEach(([key, value]) => {
        if (key === selectedNameKey) {
          setSelectedValueName(value)
        }
        if (key === selectedIconKey) {
          setSelectedIcon(value)
        }
      })
    } else {
      setSelectedValueName(null)
    }
  }, [selectedValue, selectedIconKey, selectedNameKey])

  function getItemName(item: T) {
    let name = ''
    let isSelected = false
    let icon = ''
    Object.entries(item as IObjectKey).forEach(([key, itemValue]) => {
      if (key === selectedNameKey) {
        name = itemValue
      }
      if (key === selectedValueKey && value === itemValue) {
        isSelected = true
      }
      if (key === selectedIconKey) {
        icon = itemValue
      }
    })
    return {
      name,
      isSelected,
      icon,
    }
  }

  /**
   * Select  list item props
   * @item  T
   * @index of list
   * **/
  function selectListItem(item: T, index: number) {
    return (
      <li
        onClick={() => changeData(item)}
        key={index}
        className={`G-flex G-align-center ${getItemName(item).isSelected ? 'G-selected-item' : ''}`}
      >
        {selectedIconKey && isImage && (
          <span
            className='G-select-image'
            style={{
              backgroundImage: `url('${getItemName(item).icon}')`,
            }}
          />
        )}
        {selectedIconKey && !isImage && <span className={`G-select-status ${getItemName(item).icon}`} />}
        <p>{getItemName(item).name}</p>
      </li>
    )
  }

  /**
   * Change data, select an data from  list
   * @data T type object
   * has props
   * @onChange
   * **/

  function changeData(data: T | null) {
    onChange && onChange(data)
    setIsOpenList(false)
  }

  /**
   * Delete selected data
   * has props
   * @onChange
   * **/
  function resetData(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    onChange && onChange(null)
  }

  const handleChange = () => {
    setIsOpenList(!isOpenList)
  }
  const handleClose = (e: MouseEvent) => {
    setIsOpenList(false)
    e.stopPropagation()
  }
  return (
    <div className={`G-select ${customClass}`}>
      <div className={`G-select-header ${selectedIconKey ? 'G-with-icon' : ''}`} onClick={handleChange}>
        {selectedIconKey && selectedValueName && isImage && (
          <span className={`G-select-image`} style={{ backgroundImage: `url('${selectedIcon}')` }} />
        )}
        {selectedIconKey && selectedValueName && !isImage && <span className={`G-select-status ${selectedIcon}`} />}
        {label && <span className='G-select-label'>{label}</span>}
        <p className={`${!selectedValueName ? 'G-opacity-placeholder' : ''}`}>
          {selectedValueName ? selectedValueName : placeholder}
        </p>
        {(!selectedValueName || (selectedValueName && !isClear)) && (
          <div style={{ display: 'flex' }}>
            <DropdownSvgIcon fill={!isOpenList ? '#ACBCC3' : '#4844C5'} />
          </div>
        )}
        {isClear && selectedValueName && (
          <i onClick={resetData} className={`G-select-icon icon-close G-cursor-pointer`} />
        )}
      </div>
      {isOpenList && (
        <ClickOutside onClickOutside={(e: MouseEvent) => handleClose(e)}>
          <div className={`G-select-list`} style={{ maxHeight: maxHeight + 'px' }}>
            <ul>
              {optionsList.map((item, index) => {
                return selectListItem(item, index)
              })}
            </ul>
          </div>
        </ClickOutside>
      )}
    </div>
  )
}

export default Select
