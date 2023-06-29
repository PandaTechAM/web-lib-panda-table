export interface IProps<T extends Object> {
  data: T[]
  columnsConfigStructure: IColumnConfigStructure<T>
  columnsHeaderStructure: IColumnHeaderStructure
  columnsTotalStructure?: IColumnTotalStructure
  rightFreezeConfig?: IColumnConfig<T>[]
  perColumnListForFilters?: string[]
  allDataFromDb?: T[]
  links?: ILinksList[]
  listForDropdown?: ITotalList[]
  rowActions?: IrowActions[]
  pageSizeStructure?: IPageSizes[]
  pagesTotalCount?: number
  currentPage?: number
  selectedPageCount?: ISelectPage
  multipleCheck?: boolean
  isStickyFirstColumn?: boolean
  isHoveredRow?: boolean
  draggableColumns?: boolean
  freezedRightSideVisible?: boolean
  FreezeIcon?: React.MemoExoticComponent<(props: React.SVGProps<SVGSVGElement>) => JSX.Element>
  headerColor?: string
  footerColor?: string
  freezedLeftSideColor?: string
  freezedRightSideColor?: string
  freezedRightSide?: string
  columnMinWidth?: number
  headerHeight?: number
  footerHeight?: number
  leftFreezedColumnWidth?: number
  rightFreezedColumnWidth?: number
  RightSideIcon?: React.MemoExoticComponent<(props: React.SVGProps<SVGSVGElement>) => JSX.Element>
  filterColumns?: IComparisonType[]
  filtersTypes?: IFiltersTypes[]
  filterDataForRequest?: ItemFields[]
  isLoadingFilters?: boolean
  getColumnName?(columnName: string): void
  getRow?(option: any): void
  RightSideSelfAction?: (option: any) => void
  setColumnTotalStructures?(option: IColumnTotalStructure): void
  handleEdit?: (option: T) => void
  handleDelete?: (option: T[]) => void
  setColumnsConfigStructure?(option: IColumnConfigStructure<T>): void
  setColumnHeaderStructure?(options: IColumnHeaderStructure): void
  setSortedData?(option: any): void
  storeStructure?(): void
  getPageRowsCountAndCurrentPage?(pageNumber: number, rowsCount: number): void
  setTotalType?(option: number | string): void
  getFilteredData?(option: any): void
  getFilteredDataForTable?(): void
  handleChangePagePerFilterField?(): void
}

export interface ItemFields {
  PropertyName: any
  Values: any[]
  ComparisonType: string
  TypeForUi: string
  Search: string | number
  CheckedItems: any[]
}

export interface IFilterDataForRequest {
  Filters: ItemFields[]
  Aggregates: any[]
}

export interface IFiltersTypes {
  ColumnType: string
  AggregateTypes: string[]
  FilterTypes: string[]
  DefaultSearchType: string
}

export interface IColumnTotal {
  id: string | number
  title: number | null
}

export interface IColumns<T extends Object> {
  name: string
  items: IColumnConfig<T>[]
}
export interface IHeaders {
  name: string
  items: IColumnHeader[]
}
export interface ITotals {
  name: string
  items: IColumnTotal[]
}

export interface IColumnConfigStructure<T extends Object> {
  Main: IColumns<T>
  Freezed: IColumns<T>
}
export interface IColumnHeaderStructure {
  Main: IHeaders
  Freezed: IHeaders
}
export interface IColumnTotalStructure {
  Main: ITotals
  Freezed: ITotals
}

export interface ITotalList {
  id: number
  title: string
}

export interface IFreezeProps<T extends Object> {
  columnsConfigStructure: IColumnConfigStructure<T>
  columnMinWidth?: number
  item: T
  freezedLeftSideColor?: string
}

export interface IComparisonType {
  ColumnName: string
  ColumnType: string
  IsBold?: boolean
}

export interface IColumnConfig<T extends Object> {
  id?: string | number
  columnName?: number | string
  title: any
  setRow: (data?: T) => string | number | HTMLElement | React.ReactNode | null | any
  isVisible: boolean
  customStyle?: Object
  totalObject?: {
    valueKey: string
    isPrice: boolean
    title?: string
  }
  width?: number
}
export interface IPageSizes {
  id: number
  count: number
}

export interface ISelectPage {
  id: number
}

export interface IColumnHeader {
  id: string | number
  order: number
  title: string
  icon?: string
}

export interface IColumn {
  id: number
  order: number
  name: string
}

export interface IrowActions {
  icon?: () => string | number | HTMLElement | React.ReactNode | null | any
  action: (e: any, item: Object, index: number) => void
}

export interface ILinksList {
  id: number
  icon?: () => string | number | HTMLElement | React.ReactNode | null | any
  name: string
  action(option: any, index: number): void
}
