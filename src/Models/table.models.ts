export interface IProps<T extends Object> {
  data: T[]
  columnsConfigStructure: IColumnConfigStructure<T>
  columnsHeaderStructure: IColumnHeaderStructure
  rightFreezeConfig?: IColumnConfig<T>[]
  perColumnListForFilters?: (string | ISelect)[]
  links?: ILinksList[]
  rowActions?: IrowActions[]
  pageSizeStructure?: IPageSizes[]
  pagesTotalCount?: number
  currentPage?: number
  selectedPageCount?: ISelected
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
  rowsFreezeAction?: boolean
  isEnableAggregates?: boolean
  aggregates?: any
  emptyDataIcon?: string
  perColumnTotalCount?: number
  hoverdRowPosition?: number
  selectedPageSizeId?: ISelected
  hasFilters?: boolean
  isLoadedData?: boolean
  translations?: Record<string, any>
  hasOrdering?: boolean
  getRow?(option: T): void
  RightSideSelfAction?: (option: any) => void
  handleEdit?: (option: T) => void
  handleDelete?: (option: T[] | string) => void
  setColumnsConfigStructure?(option: IColumnConfigStructure<T>): void
  setColumnHeaderStructure?(options: IColumnHeaderStructure): void
  setSortedData?(option: any): void
  storeStructure?(): void
  getPageRowsCountAndCurrentPage?(pageNumber: number, rowsCount: IPageSizes): void
  getFilteredData?(option: ItemFields[], ColumnName?: string): void
  getFilteredDataWithDebounce?(option: ItemFields[], ColumnName?: string): void
  getFilteredDataForTable?(option: ItemFields[]): void
  handleChangePagePerFilterField?(): void
  getDownloadType?: (option: string, checkedRows: T[] | string) => void
  customHeaderAction?(option: T[] | string): JSX.Element
  handleSorting?(option: string): void
  handleArgChange?(columnName: string, type: string): void
}

export interface ItemFields {
  PropertyName: string
  Values: any[]
  ComparisonType: string
  TypeForUi: string
  Search: string | number
  CheckedItems: any[]
}
export interface IOrdering {
  PropertyName: string
  Descending: boolean
}
export interface IFilterDataForRequest {
  Filters: ItemFields[]
  Aggregates: any
  Order: any
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
  isLoadedData?: boolean
}

export interface IComparisonType {
  key?: string
  ColumnName: string
  ColumnType: string
  IsBold?: boolean
}

// export interface ITranslations {
//   EmptyData:
// }
export interface IColumnConfig<T extends Object> {
  id?: string | number
  columnName?: number | string
  title: any
  setRow: (data?: T, isLoadingData?: boolean) => any
  footer?: any
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

export interface ISelected {
  id: number
}

export interface IColumnHeader {
  id: string | number
  order: number
  title: string
  icon?: string
  aggregate?: string | number
  aggregateType?: string
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
  name: string
  path?: string
  icon?: () => string | number | HTMLElement | React.ReactNode | null | any
  action?(option: any, index: number): void
}

export interface IFiltersFieldsRef {
  list?: string[]
  totalCount?: number
  currentPage?: number
  columnName?: string
}

export interface ISelect {
  id: number
  name: string
}
