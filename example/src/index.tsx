import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  IColumnConfig,
  IColumnHeader,
  IPageSizes,
  ISelectPage,
  IrowActions,
  IColumnConfigStructure,
  IColumnHeaderStructure,
  ILinksList,
  IColumnTotal,
  IColumnTotalStructure,
  ITotalList,
} from './Models/table.models'
import { useState } from 'react'
import { StructureConfig } from './Models/table.enum'
import Table from 'beautiful-react-table'
interface IAgentData {
  id: number | string
  easywalletAgentId: number
  agentName: string
  agentCreationDate?: string
}
function App() {
  const [data, setData] = useState<any[]>([
    {
      id: 1,
      easywalletAgentId: 179136,
      agentCreationDate: '2023-03-22T00:00:00',
      agentName: 'Armen Virabyan test Armen Virabyan test Armen Virabyan test Armen Virabyan test',
    },
    {
      id: 2,
      easywalletAgentId: 494845,
      agentCreationDate: '2023-03-22T00:00:00',
      agentName: 'Armen Virabyan test Ar',
    },
    {
      id: 3,
      easywalletAgentId: 494845,
      agentCreationDate: '2023-03-22T00:00:00',
      agentName: 'Hovhaaaannisyan Hovik test',
    },
    {
      id: 4,
      easywalletAgentId: 494845,
      agentCreationDate: '2023-03-22T00:00:00',
      agentName: 'Armen Vsairabyan test Armen Viraby',
    },
    {
      id: 5,
      easywalletAgentId: 494845,
      agentCreationDate: '2023-03-22T00:00:00',
      agentName: 'Saroyan',
    },
    {
      id: 6,
      easywalletAgentId: 494845,
      agentCreationDate: '2023-03-22T00:00:00',
      agentName: 'Hayroyan',
    },
    {
      id: 7,
      easywalletAgentId: 494845,
      agentCreationDate: '2023-03-22T00:00:00',
      agentName: 'Hovhanncsaisyan Hovik test',
    },
    {
      id: 8,
      easywalletAgentId: 494845,
      agentCreationDate: '2023-03-22T00:00:00',
      agentName: 'Hovhanncx c isyan Hovik test',
    },
    {
      id: 9,
      easywalletAgentId: 494845,
      agentCreationDate: '2023-03-22T00:00:00',
      agentName: 'Hovhqwqasannisyan Hovik test',
    },
    {
      id: 10,
      easywalletAgentId: 494845,
      agentCreationDate: '2023-03-22T00:00:00',
      agentName: 'Hovzxczxczxchannisyan Hovik test',
    },
    {
      id: 11,
      easywalletAgentId: 494845,
      agentCreationDate: '2023-03-22T00:00:00',
      agentName: 'Hovhannisyan vfveHovik test',
    },
    {
      id: 12,
      easywalletAgentId: 494845,
      agentCreationDate: '2023-03-22T00:00:00',
      agentName: 'Hovhannisyan Ho  wwvik test',
    },
    {
      id: 13,
      easywalletAgentId: 494845,
      agentCreationDate: '2023-03-22T00:00:00',
      agentName: 'Hovhwwwwannisyan Hovik test',
    },
    {
      id: 14,
      easywalletAgentId: 494845,
      agentCreationDate: '2023-03-22T00:00:00',
      agentName: 'Hovhannisyan Hovik testtjnty',
    },
    {
      id: 15,
      easywalletAgentId: 494845,
      agentCreationDate: '2023-03-22T00:00:00',
      agentName: 'Hovhannisyan Hovik testcvbcv ',
    },
    {
      id: 16,
      easywalletAgentId: 494845,
      agentCreationDate: '2023-03-22T00:00:00',
      agentName: 'Hovhannisyan Hcccc',
    },
    {
      id: 17,
      easywalletAgentId: 494845,
      agentCreationDate: '2023-03-22T00:00:00',
      agentName: 'Hovhannisyan Hovik kjnvkj',
    },
    {
      id: 18,
      easywalletAgentId: 494845,
      agentCreationDate: '2023-03-22T00:00:00',
      agentName: 'sjkdvn Hovik test',
    },
    {
      id: 19,
      easywalletAgentId: 494845,
      agentCreationDate: '2023-03-22T00:00:00',
      agentName: 'Hakobyan Gago',
    },
    {
      id: 20,
      easywalletAgentId: 494845,
      agentCreationDate: '2023-03-22T00:00:00',
      agentName: 'Frangulyan Rshtun',
    },
    {
      id: 21,
      easywalletAgentId: 494845,
      agentCreationDate: '2023-03-22T00:00:00',
      agentName: 'ssssssvik test',
    },
    {
      id: 22,
      easywalletAgentId: 494845,
      agentCreationDate: '2023-03-22T00:00:00',
      agentName: 'Mxitaryan Ara',
    },
  ])
  const [rowActions] = useState<IrowActions[]>([
    {
      action: (item, index) => {
        console.log(item)
      },
    },
    {
      action: (item, index) => {
        console.log(item)
      },
    },
  ])
  const [pageSize] = useState<IPageSizes[]>([
    { id: 1, count: 10 },
    { id: 2, count: 25 },
    { id: 3, count: 50 },
    { id: 4, count: 100 },
  ])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedPage, setSelectedPage] = useState<ISelectPage>({ id: 1 })
  const [totalCount, setTotalCount] = useState<number>(500)
  const [links] = useState<ILinksList[]>([
    {
      icon: 'icon-Vector1',
      name: 'Overpayments',
      action: (option: any, index: number) => {
        console.log(option, '1')
      },
    },
    {
      icon: 'icon-Vector1',
      name: 'Estate Owners',
      action: (option: any, index: number) => {
        console.log(option, '2')
      },
    },
    {
      icon: 'icon-Vector1',
      name: 'Condominium Association Fee Altering',
      action: (option: any, index: number) => {
        console.log(option, '3')
      },
    },
    {
      icon: 'icon-Vector1',
      name: 'Payments',
      action: (option: any, index: number) => {
        console.log(option, 4)
      },
    },
    {
      icon: 'icon-Vector1',
      name: 'Debts',
      action: (option: any, index: number) => {
        console.log(option, 5)
      },
    },
  ])

  const [columnHeader] = useState<IColumnHeader[]>([
    {
      id: 1,
      order: 1,
      title: 'Id',
      icon: 'icon-Frame-73',
    },
    {
      id: 2,
      order: 2,
      title: 'Name',
      icon: 'icon-Frame-73',
    },
    {
      id: 3,
      order: 3,
      title: 'Surename',
      icon: 'icon-Frame-73',
    },
    {
      id: 4,
      order: 4,
      title: 'Email',
      icon: 'icon-Frame-73',
    },
    {
      id: 5,
      order: 5,
      title: 'Age',
      icon: 'icon-Frame-73',
    },
    {
      id: 6,
      order: 6,
      title: 'Address',
      icon: 'icon-Frame-73',
    },
    {
      id: 7,
      order: 7,
      title: 'Phone',
      icon: 'icon-Frame-73',
    },
    {
      id: 8,
      order: 8,
      title: 'Money',
      icon: 'icon-Frame-73',
    },
    {
      id: 9,
      order: 9,
      title: 'BirthDate',
      icon: 'icon-Frame-73',
    },
    {
      id: 10,
      order: 9,
      title: 'isMarried',
      icon: 'icon-Frame-73',
    },
    {
      id: 11,
      order: 9,
      title: 'isWorking',
      icon: 'icon-Frame-73',
    },
    {
      id: 12,
      order: 9,
      title: 'isHappy',
      icon: 'icon-Frame-73',
    },
  ])
  const [columnConfig] = useState<IColumnConfig<any>[]>([
    {
      id: 1,
      columnName: 'Id',
      title: (row: any, name: string) => (
        <div className={`G-center G-table-icon`} onClick={() => console.log(name)}>
          <p className='G-row-item'>{row.title}</p>
          <i className={row.icon} style={{ color: '#757575' }} />
        </div>
      ),
      setRow: (row: any) => (
        <div className={`G-center G-table-icon`}>
          <div className='G-row-item'>{row.counterpartyId}</div>
        </div>
      ),
      customStyle: { backgroundColor: 'white' },
      isVisible: true,
    },
    {
      id: 2,
      columnName: 'Name',
      title: (row: IColumnHeader, name: string) => (
        <div className={`G-center G-table-icon`} onClick={() => console.log(name)}>
          <p className='G-row-item'>{row.title}</p>
          <i className={row.icon} style={{ color: '#757575' }} />
        </div>
      ),
      setRow: (row: any) => (
        <div className={`G-center G-table-icon`}>
          <div className='G-row-item'>{row.firstName}</div>
        </div>
      ),
      customStyle: { backgroundColor: 'white' },
      isVisible: true,
    },
    {
      id: 3,
      columnName: 'Surname',
      title: (row: IColumnHeader, name: string) => (
        <div className={`G-center G-table-icon`} onClick={() => console.log(name)}>
          <p className='G-row-item'>{row.title}</p>
          <i className={row.icon} style={{ color: '#757575' }} />
        </div>
      ),
      setRow: (row: any) => (
        <div className={`G-center G-table-icon`}>
          <div className='G-row-item'>{row.lastName}</div>
        </div>
      ),
      customStyle: { backgroundColor: 'white' },
      isVisible: true,
    },
    {
      id: 4,
      columnName: 'Email',
      title: (row: IColumnHeader, name: string) => (
        <div className={`G-center G-table-icon`} onClick={() => console.log(name)}>
          <p className='G-row-item'>{row.title}</p>
          <i className={row.icon} style={{ color: '#757575' }} />
        </div>
      ),
      setRow: (row: any) => (
        <div className={`G-center G-table-icon`}>
          <div className='G-row-item'>{row.age}</div>
        </div>
      ),
      customStyle: { backgroundColor: 'white' },
      isVisible: true,
    },
    {
      id: 5,
      columnName: 'Age',
      title: (row: IColumnHeader, name: string) => (
        <div className={`G-center G-table-icon`} onClick={() => console.log(name)}>
          <p className='G-row-item'>{row.title}</p>
          <i className={row.icon} style={{ color: '#757575' }} />
        </div>
      ),
      setRow: (row: any) => (
        <div className={`G-center G-table-icon`}>
          <div className='G-row-item'>{row.gender ? row.gender : '-'}</div>
        </div>
      ),
      customStyle: { backgroundColor: 'white' },
      isVisible: true,
    },
    {
      id: 6,
      columnName: 'Address',
      title: (row: IColumnHeader, name: string) => (
        <div className={`G-center G-table-icon`} onClick={() => console.log(name)}>
          <p className='G-row-item'>{row.title}</p>
          <i className={row.icon} style={{ color: '#757575' }} />
        </div>
      ),
      setRow: (row: any) => (
        <div className={`G-center G-table-icon`}>
          <div className='G-row-item'>{row.address}</div>
        </div>
      ),
      customStyle: { backgroundColor: 'white' },
      isVisible: true,
    },
    {
      id: 7,
      columnName: 'Phone',
      title: (row: IColumnHeader, name: string) => (
        <div className={`G-center G-table-icon`} onClick={() => console.log(name)}>
          <p className='G-row-item'> {row.title}</p>
          <i className={row.icon} style={{ color: '#757575' }} />
        </div>
      ),
      setRow: (row: any) => (
        <div className={`G-center G-table-icon`}>
          <div className='G-row-item'>{row.registrationDate}</div>
        </div>
      ),
      customStyle: { backgroundColor: 'white' },
      isVisible: true,
    },
    {
      id: 8,
      columnName: 'Money',
      title: (row: IColumnHeader, name: string) => (
        <div className={`G-center G-table-icon`} onClick={() => console.log(name)}>
          <p className='G-row-item'>{row.title}</p>
          <i className={row.icon} style={{ color: '#757575' }} />
        </div>
      ),
      setRow: (row: any) => (
        <div className={`G-center G-table-icon`}>
          <div className='G-row-item'>{row.email}</div>
        </div>
      ),
      customStyle: { backgroundColor: 'white' },
      isVisible: true,
    },
    {
      id: 9,
      columnName: 'birthDate',
      title: (row: IColumnHeader, name: string) => (
        <div className={`G-center G-table-icon`} onClick={() => console.log(name)}>
          <p className='G-row-item'>{row.title}</p>
          <i className={row.icon} style={{ color: '#757575' }} />
        </div>
      ),
      setRow: (row: any) => (
        <div className={`G-center G-table-icon`}>
          <div className='G-row-item'>{row.phoneNumber}</div>
        </div>
      ),
      customStyle: { backgroundColor: 'white' },
      isVisible: true,
    },
    {
      id: 10,
      columnName: 'isMarried',
      title: (row: IColumnHeader, name: string) => (
        <div className={`G-center G-table-icon`} onClick={() => console.log(name)}>
          <p className='G-row-item'>{row.title}</p>
          <i className={row.icon} style={{ color: '#757575' }} />
        </div>
      ),
      setRow: (row: any) => (
        <div className={`G-center G-table-icon`}>
          <div className='G-row-item'>{row.comment}</div>
        </div>
      ),
      customStyle: { backgroundColor: 'white' },
      isVisible: true,
    },
    {
      id: 11,
      columnName: 'isWorking',
      title: (row: IColumnHeader, name: string) => (
        <div className={`G-center G-table-icon`} onClick={() => console.log(name)}>
          <p className='G-row-item'>{row.title}</p>
          <i className={row.icon} style={{ color: '#757575' }} />
        </div>
      ),
      setRow: (row: any) => (
        <div className={`G-center G-table-icon`}>
          <div className='G-row-item'>{row.isEnabled}</div>
        </div>
      ),
      customStyle: { backgroundColor: 'white' },
      isVisible: true,
    },
    {
      id: 12,
      columnName: 'isHappy',
      title: (row: IColumnHeader, name: string) => (
        <div className={`G-center G-table-icon`} onClick={() => console.log(name)}>
          <p className='G-row-item'>{row.title}</p>
          <i className={row.icon} style={{ color: '#757575' }} />
        </div>
      ),
      setRow: (row: any) => (
        <div className={`G-center G-table-icon`}>
          <div className='G-row-item'>{row.weight}</div>
        </div>
      ),
      customStyle: { backgroundColor: 'white' },
      isVisible: true,
    },
  ])

  const [grandTotals, setGrandTotals] = useState<IColumnTotal[]>([
    { id: 1, title: null },
    { id: 2, title: 40000 },
    { id: 3, title: 35000 },
    { id: 4, title: 150000 },
    { id: 5, title: null },
    { id: 6, title: 50 },
    { id: 7, title: 100 },
    { id: 8, title: 5000000 },
    { id: 9, title: 9960 },
    { id: 10, title: 9960 },
    { id: 11, title: 99060 },
    { id: 12, title: 90960 },
  ])
  const [columnsConfigStructure, setColumnsConfigStructures] = useState<IColumnConfigStructure<IAgentData>>({
    [StructureConfig.BB55]: {
      name: 'Columns',
      items: columnConfig,
    },
    [StructureConfig.BB33]: {
      name: 'Freezed',
      items: [],
    },
  })
  const [columnsHeaderStructure, setColumnHeaderStructures] = useState<IColumnHeaderStructure>({
    [StructureConfig.BB55]: {
      name: 'Columns',
      items: columnHeader,
    },
    [StructureConfig.BB33]: {
      name: 'Freezed',
      items: [],
    },
  })
  const [columnsTotalStructure, setColumnTotalStructures] = useState<IColumnTotalStructure>({
    [StructureConfig.BB55]: {
      name: 'Columns',
      items: grandTotals,
    },
    [StructureConfig.BB33]: {
      name: 'Freezed',
      items: [],
    },
  })
  const [allDataFromDb] = useState<IAgentData[]>([
    {
      id: 1,
      easywalletAgentId: 179136,
      agentCreationDate: '2023-03-22T00:00:00',
      agentName: 'Armen Virabyan test Armen Virabyan test Armen Virabyan test Armen Virabyan test',
    },
    {
      id: 2,
      easywalletAgentId: 494845,
      agentCreationDate: '2023-03-22T00:00:00',
      agentName: 'Armen Virabyan test Ar',
    },
  ])
  const [listForDropdown] = useState<ITotalList[]>([
    {
      id: 1,
      title: 'AVG',
    },
    {
      id: 2,
      title: 'MIN',
    },
    {
      id: 3,
      title: 'MAX',
    },
    {
      id: 4,
      title: 'SUM',
    },
  ])
  const [dropdoownSelectedItem, setDropdoownSelectedItem] = useState<String>(listForDropdown[0].title)

  const setColumnsConfigStructure = (option: IColumnConfigStructure<IAgentData>) => {
    setColumnsConfigStructures(option)
  }
  const setColumnHeaderStructure = (option: IColumnHeaderStructure) => {
    setColumnHeaderStructures(option)
  }

  const handleSelectDataSize = (options: IPageSizes) => {
    setSelectedPage({ id: options.id })
    setCurrentPage(1)
  }

  const handleChangePage = (option: number) => {
    setCurrentPage(option)
  }
  const handleEdit = (option: IAgentData) => {
    console.log(option)
  }
  const handleDelete = (option: IAgentData[]) => {
    console.log(option)
  }
  const LeftSideSelfAction = (option: number | string) => {
    console.log(option)
  }
  const storeStructure = () => {
    console.log(12)
  }
  const setTotalType = (option: string) => {
    console.log(option)
    setDropdoownSelectedItem(option)
  }

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <Table
        data={data} // TableData
        allDataFromDb={allDataFromDb}
        columnsConfigStructure={columnsConfigStructure} // Structure to store in the database - pin/hide/drag-drop
        columnsHeaderStructure={columnsHeaderStructure} // headerStructure will automatically work with configStructure
        columnsTotalStructure={columnsTotalStructure}
        columnMinWidth={200} // Column's Width / use when you need to have equal columns - ex. FreezeColumns
        headerHeight={64}
        footerHeight={48}
        leftFreezedColumnWidth={72}
        rightFreezedColumnWidth={64}
        pageSize={pageSize} // Per page data count
        selectedPage={selectedPage} // Selected page
        currentPage={currentPage} // Current page
        totalCount={totalCount} // Page's total count
        multipleCheck={true} // Multiple check for delete or download
        isStickyFirstColumn={true} // Sticky first column
        isHoveredRow={true} // while hover per row will be highlighted actions
        rowActions={rowActions} // Array of actions and theyr's icons / must be active isHoveredRow
        freezeIcon={'icon-material-symbols_dashboard-rounded'} //Freeze action icon / must be added setDataWithPinnedRows function and activate isHoveredRow
        freezedRightSideVisible={true} // is Visible Freezed right side
        freezedRightSide={'dropdown'} // is dropdown
        links={links} // Array of links // have to check freezedRightSide - dropdown
        listForDropdown={listForDropdown} // Array of Counters
        headerColor={'#F3F6F8'} // Header color
        footerColor={'#F3F6F8'} // Footer color
        freezedLeftSideColor={'silver'} // FreezedLeft side color
        freezedRightSideColor={'silver'} // FreezedRight side color
        draggableColumns={true} //Is column's draggable
        handleEdit={handleEdit} // will be visible when active multipleCheck
        handleDelete={handleDelete} // will be visible when active multipleCheck
        setColumnsConfigStructure={setColumnsConfigStructure} // set changed config structure - pin/hide/drag-drop
        setColumnHeaderStructure={setColumnHeaderStructure} // set changed header structure - pin/hide/drag-drop
        setColumnTotalStructures={setColumnTotalStructures}
        handleSelectDataSize={handleSelectDataSize} // Select data size per page
        handleChangePage={handleChangePage} // chnage page
        LeftSideSelfAction={LeftSideSelfAction} // FreezedLeftSideSelfAction
        storeStructure={storeStructure} // Save columns structure on DB
        setTotalType={setTotalType} // Set total type
      />
    </div>
  )
}

export default App
