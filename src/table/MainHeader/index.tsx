import React from 'react'
import ColumnsCustomizer from './ColumnsCustomizer'
import {
  IColumnConfigStructure,
  IColumnHeaderStructure,
  IColumnTotalStructure,
  IComparisonType,
  IFiltersTypes,
  IPageSizes,
  ISelect,
  ISelected,
  ItemFields,
} from '../../Models/table.models'
import CheckRows from './CheckRows'
import DeleteSvgIcon from '../../svgIcons/DeleteSvgIcon'
import EditSvgIcon from '../../svgIcons/EditSvgIcon'
import Filter from './Filter'
import Download from './Download'
import { CheckedItems, ColumnTypeEnums } from '../../Models/table.enum'
import './style.scss'
interface IActionsHeader<T extends Object> {
  columnsConfigStructure: IColumnConfigStructure<T>
  columnsHeaderStructure: IColumnHeaderStructure
  selectedPageCount?: ISelected
  multipleCheck?: boolean
  data: T[]
  checkedRows: T[]
  draggableColumns?: boolean
  filterColumns?: IComparisonType[]
  filterDataForRequest?: ItemFields[]
  isLoadingFilters?: boolean
  filtersTypes?: IFiltersTypes[]
  selectedType: string
  perColumnTotalCount?: number
  hasFilters?: boolean
  translations?: Record<string, any>
  perColumnListForFilters?: (string | ISelect)[]
  setColumnTotalStructures?(option: IColumnTotalStructure): void
  handleCheckAll(data?: T[]): void
  setColumnsConfigStructure?: (option: IColumnConfigStructure<T>) => void
  setColumnHeaderStructure?: (options: IColumnHeaderStructure) => void
  handleChangePage?(option: number): void
  handleEdit?(option: T): void
  handleDelete?(option: T[] | string): void
  handleSelectDataSize?(options: IPageSizes): void
  storeStructure?(): void
  unCheck(): void
  checkAllDataFromDb(): void
  getFilteredData?(option: ItemFields[], ColumnName: string, columnType?: ColumnTypeEnums): void
  getFilteredDataWithDebounce?(option: ItemFields[], ColumnName: string, columnType: ColumnTypeEnums): void
  getFilteredDataForTable?(option: ItemFields[]): void
  handleChangePagePerFilterField?(option: ItemFields): void
  getDownloadType?: (option: string, checkedRows: T[] | string) => void
  customHeaderAction?(option: T[] | string): JSX.Element
  handleDeleteAll?: () => void
}
const MainHeader = <T extends Object>({
  columnsConfigStructure,
  columnsHeaderStructure,
  multipleCheck,
  data,
  checkedRows,
  draggableColumns,
  filterColumns,
  perColumnListForFilters,
  filterDataForRequest,
  isLoadingFilters,
  filtersTypes,
  selectedType,
  perColumnTotalCount,
  hasFilters,
  translations,
  handleChangePagePerFilterField,
  unCheck,
  checkAllDataFromDb,
  handleCheckAll,
  setColumnsConfigStructure,
  setColumnHeaderStructure,
  handleEdit,
  handleDelete,
  storeStructure,
  getFilteredData,
  getFilteredDataWithDebounce,
  getFilteredDataForTable,
  getDownloadType,
  customHeaderAction,
  handleDeleteAll,
}: IActionsHeader<T>) => {
  return (
    <div className='G-justify-start G-table-actions-header'>
      {multipleCheck ? (
        <>
          <CheckRows
            data={data}
            checkedRows={checkedRows}
            translations={translations}
            handleCheckAll={handleCheckAll}
            unCheck={unCheck}
            checkAllDataFromDb={checkAllDataFromDb}
          />
          <div className='G-center G-actions'>
            {checkedRows.length == 1 && handleEdit ? (
              <div className='G-flex G-edit' onClick={() => handleEdit(checkedRows[0])}>
                <div className='G-center G-edit-icon'>
                  <EditSvgIcon />
                  <span>{translations?.editAction || 'Edit'}</span>
                </div>
              </div>
            ) : null}
            {checkedRows.length && handleDelete ? (
              <div
                className='G-flex G-delete'
                onClick={() =>
                  handleDelete(selectedType === CheckedItems.SELECTED_ALL ? translations?.all || 'All' : checkedRows)
                }
              >
                <div className='G-center G-delete-icon'>
                  <DeleteSvgIcon />
                  <span>{translations?.deleteAction || 'Delete'}</span>
                </div>
              </div>
            ) : null}
            {checkedRows.length
              ? customHeaderAction?.(
                  selectedType === CheckedItems.SELECTED_ALL ? translations?.all || 'All' : checkedRows,
                )
              : null}
            {handleDeleteAll && data.length > 1 && (
              <div className='G-flex G-delete' onClick={handleDeleteAll}>
                <div className='G-center G-delete-icon'>
                  <DeleteSvgIcon />
                  <span>{translations?.deleteAllAction || 'Delete All'}</span>
                </div>
              </div>
            )}
          </div>
        </>
      ) : null}
      {draggableColumns ? (
        <ColumnsCustomizer
          columnsConfigStructure={columnsConfigStructure}
          setColumnsConfigStructure={setColumnsConfigStructure}
          columnsHeaderStructure={columnsHeaderStructure}
          setColumnHeaderStructure={setColumnHeaderStructure}
          translations={translations}
          storeStructure={storeStructure}
        />
      ) : null}

      {hasFilters ? (
        <Filter
          data={data}
          filterColumns={filterColumns}
          // perColumnListForFilters={perColumnListForFilters}
          filterDataForRequest={filterDataForRequest}
          // isLoadingFilters={isLoadingFilters}
          filtersTypes={filtersTypes}
          perColumnTotalCount={perColumnTotalCount}
          translations={translations}
          getFilteredDataWithDebounce={getFilteredDataWithDebounce}
          getFilter={getFilteredData}
          getFilteredDataForTable={getFilteredDataForTable}
          handleChangePagePerFilterField={handleChangePagePerFilterField}
        />
      ) : null}
      {getDownloadType ? (
        <div className='G-center G-download'>
          <Download
            selectedType={selectedType}
            checkedRows={checkedRows}
            translations={translations}
            getDownloadType={getDownloadType}
          />
        </div>
      ) : null}
    </div>
  )
}

export default MainHeader
