import { useEffect, useState } from 'react'

const useTable = <T extends Object>(
  data: T[],
  allDataFromDb: T[] | undefined,
  LeftSideSelfAction?: (options: any) => void,
) => {
  const [freezedRows, setFreezedRows] = useState<T[]>([])
  const [unFreezedRows, setUnFreezedRows] = useState<any[]>(data)
  const [checkedRows, setCheckedRows] = useState<T[]>([])
  const [checkedLink, setCheckedLink] = useState<T>()

  const freezeRow = (indexx: number) => {
    data.map((row, index) => {
      if (index === indexx) {
        const newArr = unFreezedRows.filter((item, index) => index !== indexx)
        setFreezedRows((prev) => [...prev, unFreezedRows[indexx]])
        setUnFreezedRows(newArr)
      }
    })
  }

  const unFreezeRow = (index: number) => {
    const newFreezeRows = freezedRows.splice(index, index === 0 ? 1 : index)
    setFreezedRows(freezedRows)
    setUnFreezedRows((prev) => [newFreezeRows[0], ...prev])
  }

  const dragDropFreezeRow = (option: any) => {
    setFreezedRows(option)
  }

  const getRowForDropdown = (id: number) => {
    const allRows: T[] = freezedRows.concat(unFreezedRows)
    allRows.map((item, index) => {
      //@ts-ignore
      if (item.id === id) {
        setCheckedLink(item)
        LeftSideSelfAction && LeftSideSelfAction(item)
      }
    })
  }

  const handleCheckAll = () => {
    const allRows: T[] = freezedRows.concat(unFreezedRows)
    setCheckedRows(allRows)
  }
  const unCheck = () => {
    setCheckedRows([])
  }
  const checkAllDataFromDb = () => {
    allDataFromDb && setCheckedRows(allDataFromDb)
  }

  const handleCheck = (id: number) => {
    const allRows: T[] = freezedRows.concat(unFreezedRows)
    let unchecked = false
    let arr = checkedRows
    arr.map((elem: any, i) => {
      if (elem.id === id) {
        unchecked = true
        arr.splice(i, 1)
        setCheckedRows((prev) => [...prev])
      }
    })
    if (unchecked) {
      return
    }

    allRows.map((item: any, index) => {
      if (item.id === id) {
        setCheckedRows((prev) => [...prev, item])
      }
    })
  }

  const isCheckedRows = (id: number): boolean => {
    let isChecked = false
    checkedRows.map((elem: any, i) => {
      if (elem.id === id) isChecked = true
    })

    return isChecked
  }

  useEffect(() => {
    setUnFreezedRows(data)
  }, [data])

  return {
    freezedRows,
    unFreezedRows,
    checkedRows,
    checkedLink,
    freezeRow,
    unFreezeRow,
    dragDropFreezeRow,
    getRowForDropdown,
    handleCheckAll,
    handleCheck,
    isCheckedRows,
    unCheck,
    checkAllDataFromDb,
  }
}

export default useTable
