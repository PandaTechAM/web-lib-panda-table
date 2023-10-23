import React, { useState } from 'react'
import { IColumnConfig, IColumnHeader, IColumnConfigStructure, IColumnHeaderStructure } from './Models/table.models'
import { StructureConfig } from './Models/table.enum'
import Table from './table'

function App() {
  const [data] = useState<any[]>([
    {
      id: 1,
      agentId: 1,
      agentCreationDate: '2023-03-22T00:00:00',
      agentName: 'Markos',
    },
    {
      id: 2,
      agentId: 2,
      agentCreationDate: '2023-03-22T00:00:00',
      agentName: 'Daniel',
    },
    {
      id: 3,
      agentId: 3,
      agentCreationDate: '2023-03-22T00:00:00',
      agentName: 'Mary',
    },
  ])
  const [columnHeader] = useState<IColumnHeader[]>([
    {
      id: 1,
      order: 1,
      title: 'Id',
    },
    {
      id: 2,
      order: 2,
      title: 'Name',
    },
    {
      id: 3,
      order: 3,
      title: 'Creation Date',
    },
  ])
  const [columnConfig] = useState<IColumnConfig<any>[]>([
    {
      id: 1,
      title: (row: any, name: string) => (
        <div>
          <p>{row.title}</p>
        </div>
      ),
      setRow: (row: any) => (
        <div>
          <div>{row.id}</div>
        </div>
      ),
      isVisible: true,
    },
    {
      id: 2,
      title: (row: IColumnHeader, name: string) => (
        <div>
          <p>{row.title}</p>
        </div>
      ),
      setRow: (row: any) => (
        <div>
          <div>{row.agentName}</div>
        </div>
      ),
      isVisible: true,
    },
    {
      id: 3,
      title: (row: IColumnHeader, name: string) => (
        <div>
          <p>{row.title}</p>
        </div>
      ),
      setRow: (row: any) => (
        <div>
          <div>{row.agentCreationDate}</div>
        </div>
      ),
      isVisible: true,
    },
  ])
  const [columnsConfigStructure] = useState<IColumnConfigStructure<any>>({
    [StructureConfig.Main]: {
      name: 'Columns',
      items: columnConfig,
    },
    [StructureConfig.Freezed]: {
      name: 'Freezed',
      items: [],
    },
  })
  const [columnsHeaderStructure] = useState<IColumnHeaderStructure>({
    [StructureConfig.Main]: {
      name: 'Columns',
      items: columnHeader,
    },
    [StructureConfig.Freezed]: {
      name: 'Freezed',
      items: [],
    },
  })

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <Table
        data={data} // TableData
        columnsConfigStructure={columnsConfigStructure} // Structure to store in the database - pin/hide/drag-drop
        columnsHeaderStructure={columnsHeaderStructure} // headerStructure will automatically work with configStructure
      />
    </div>
  )
}

export default App
