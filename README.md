# React App Table

beautiful-react-table is a customizable table component for React applications. It provides a flexible and feature-rich table implementation with various configuration options.

# Installation

To install beautiful-react-table, use the following command:

npm install beautiful-react-table

# Usage

Import the necessary components and interfaces from the "beautiful-react-table" package:

```JSX

import { useState } from "react";
import {
  Table,
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
  StructureConfig,
} from "beautiful-react-table";

function App() {
  const [data, setData] = useState<any[]>([
    {
      id: 1,
      easywalletAgentId: 179136,
      agentCreationDate: "2023-03-22T00:00:00",
      agentName:
        "Armen Virabyan test Armen Virabyan test Armen Virabyan test Armen Virabyan test",
    },
    {
      id: 2,
      easywalletAgentId: 494845,
      agentCreationDate: "2023-03-22T00:00:00",
      agentName: "Armen Virabyan test Ar",
    },
    {
      id: 3,
      easywalletAgentId: 494845,
      agentCreationDate: "2023-03-22T00:00:00",
      agentName: "Hovhaaaannisyan Hovik test",
    },
    {
      id: 4,
      easywalletAgentId: 494845,
      agentCreationDate: "2023-03-22T00:00:00",
      agentName: "Armen Vsairabyan test Armen Viraby",
    },
    {
      id: 5,
      easywalletAgentId: 494845,
      agentCreationDate: "2023-03-22T00:00:00",
      agentName: "Saroyan",
    },
    {
      id: 6,
      easywalletAgentId: 494845,
      agentCreationDate: "2023-03-22T00:00:00",
      agentName: "Hayroyan",
    },
    {
      id: 7,
      easywalletAgentId: 494845,
      agentCreationDate: "2023-03-22T00:00:00",
      agentName: "Hovhanncsaisyan Hovik test",
    },
    {
      id: 8,
      easywalletAgentId: 494845,
      agentCreationDate: "2023-03-22T00:00:00",
      agentName: "Hovhanncx c isyan Hovik test",
    },
    {
      id: 9,
      easywalletAgentId: 494845,
      agentCreationDate: "2023-03-22T00:00:00",
      agentName: "Hovhqwqasannisyan Hovik test",
    },
    {
      id: 10,
      easywalletAgentId: 494845,
      agentCreationDate: "2023-03-22T00:00:00",
      agentName: "Hovzxczxczxchannisyan Hovik test",
    },
    {
      id: 11,
      easywalletAgentId: 494845,
      agentCreationDate: "2023-03-22T00:00:00",
      agentName: "Hovhannisyan vfveHovik test",
    },
    {
      id: 12,
      easywalletAgentId: 494845,
      agentCreationDate: "2023-03-22T00:00:00",
      agentName: "Hovhannisyan Ho wwvik test",
    },
    {
      id: 13,
      easywalletAgentId: 494845,
      agentCreationDate: "2023-03-22T00:00:00",
      agentName: "Hovhwwwwannisyan Hovik test",
    },
    {
      id: 14,
      easywalletAgentId: 494845,
      agentCreationDate: "2023-03-22T00:00:00",
      agentName: "Hovhannisyan Hovik testtjnty",
    },
    {
      id: 15,
      easywalletAgentId: 494845,
      agentCreationDate: "2023-03-22T00:00:00",
      agentName: "Hovhannisyan Hovik testcvbcv ",
    },
    {
      id: 16,
      easywalletAgentId: 494845,
      agentCreationDate: "2023-03-22T00:00:00",
      agentName: "Hovhannisyan Hcccc",
    },
    {
      id: 17,
      easywalletAgentId: 494845,
      agentCreationDate: "2023-03-22T00:00:00",
      agentName: "Hovhannisyan Hovik kjnvkj",
    },
    {
      id: 18,
      easywalletAgentId: 494845,
      agentCreationDate: "2023-03-22T00:00:00",
      agentName: "sjkdvn Hovik test",
    },
    {
      id: 19,
      easywalletAgentId: 494845,
      agentCreationDate: "2023-03-22T00:00:00",
      agentName: "Hakobyan Gago",
    },
    {
      id: 20,
      easywalletAgentId: 494845,
      agentCreationDate: "2023-03-22T00:00:00",
      agentName: "Frangulyan Rshtun",
    },
    {
      id: 21,
      easywalletAgentId: 494845,
      agentCreationDate: "2023-03-22T00:00:00",
      agentName: "ssssssvik test",
    },
    {
      id: 22,
      easywalletAgentId: 494845,
      agentCreationDate: "2023-03-22T00:00:00",
      agentName: "Mxitaryan Ara",
    },
  ]);
  const [rowActions] = useState<IrowActions[]>([
    {
      action: (item, index) => {
        console.log(item);
      },
    },
    {
      action: (item, index) => {
        console.log(item);
      },
    },
  ]);
  const [pageSize] = useState<IPageSizes[]>([
    { id: 1, count: 10 },
    { id: 2, count: 25 },
    { id: 3, count: 50 },
    { id: 4, count: 100 },
  ]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedPage, setSelectedPage] = useState<ISelectPage>({ id: 1 });
  const [totalCount, setTotalCount] = useState<number>(500);
  const [links] = useState<ILinksList[]>([
    {
      name: "Overpayments",
      action: (option: any, index: number) => {
        console.log(option, "1");
      },
    },
    {
      name: "Estate Owners",
      action: (option: any, index: number) => {
        console.log(option, "2");
      },
    },
    {
      name: "Condominium Association Fee Altering",
      action: (option: any, index: number) => {
        console.log(option, "3");
      },
    },
    {
      name: "Payments",
      action: (option: any, index: number) => {
        console.log(option, "4");
      },
    },
    {
      name: "Debts",
      action: (option: any, index: number) => {
        console.log(option, "5");
      },
    },
  ]);

  const [columnHeader] = useState<IColumnHeader[]>([
    {
      id: 1,
      order: 1,
      title: "Id",
      icon: "icon-Frame-73",
    },
    {
      id: 2,
      order: 2,
      title: "Name",
      icon: "icon-Frame-73",
    },
    {
      id: 3,
      order: 3,
      title: "Surename",
      icon: "icon-Frame-73",
    },
    {
      id: 4,
      order: 4,
      title: "Email",
      icon: "icon-Frame-73",
    },
    {
      id: 5,
      order: 5,
      title: "Age",
      icon: "icon-Frame-73",
    },
    {
      id: 6,
      order: 6,
      title: "Address",
      icon: "icon-Frame-73",
    },
    {
      id: 7,
      order: 7,
      title: "Phone",
      icon: "icon-Frame-73",
    },
    {
      id: 8,
      order: 8,
      title: "Money",
      icon: "icon-Frame-73",
    },
    {
      id: 9,
      order: 9,
      title: "BirthDate",
      icon: "icon-Frame-73",
    },
    {
      id: 10,
      order: 9,
      title: "isMarried",
      icon: "icon-Frame-73",
    },
    {
      id: 11,
      order: 9,
      title: "isWorking",
      icon: "icon-Frame-73",
    },
    {
      id: 12,
      order: 9,
      title: "isHappy",
      icon: "icon-Frame-73",
    },
  ]);
  const [columnConfig] = useState<IColumnConfig<any>[]>([
    {
      id: 1,
      columnName: "Id",
      title: (row: any, name: string) => (
        <div
          className={`G-center G-table-icon`}
          onClick={() => console.log(name)}
        >
          <p className="G-row-item">{row.title}</p>
          <i className={row.icon} style={{ color: "#757575" }} />
        </div>
      ),
      setRow: (row: any) => (
        <div className={`G-center G-table-icon`}>
          <div className="G-row-item">{row.easywalletAgentId}</div>
        </div>
      ),
      customStyle: { backgroundColor: "white" },
      isVisible: true,
    },
    {
      id: 2,
      columnName: "Name",
      title: (row: IColumnHeader, name: string) => (
        <div
          className={`G-center G-table-icon`}
          onClick={() => console.log(name)}
        >
          <p className="G-row-item">{row.title}</p>
          <i className={row.icon} style={{ color: "#757575" }} />
        </div>
      ),
      setRow: (row: any) => (
        <div className={`G-center G-table-icon`}>
          <div className="G-row-item">{row.agentName}</div>
        </div>
      ),
      customStyle: { backgroundColor: "white" },
      isVisible: true,
    },
    {
      id: 3,
      columnName: "Surname",
      title: (row: IColumnHeader, name: string) => (
        <div
          className={`G-center G-table-icon`}
          onClick={() => console.log(name)}
        >
          <p className="G-row-item">{row.title}</p>
          <i className={row.icon} style={{ color: "#757575" }} />
        </div>
      ),
      setRow: (row: any) => (
        <div className={`G-center G-table-icon`}>
          <div className="G-row-item">{row.agentCreationDate}</div>
        </div>
      ),
      customStyle: { backgroundColor: "white" },
      isVisible: true,
    },
    {
      id: 4,
      columnName: "Email",
      title: (row: IColumnHeader, name: string) => (
        <div
          className={`G-center G-table-icon`}
          onClick={() => console.log(name)}
        >
          <p className="G-row-item">{row.title}</p>
          <i className={row.icon} style={{ color: "#757575" }} />
        </div>
      ),
      setRow: (row: any) => (
        <div className={`G-center G-table-icon`}>
          <div className="G-row-item">{row.easywalletAgentId}</div>
        </div>
      ),
      customStyle: { backgroundColor: "white" },
      isVisible: true,
    },
    {
      id: 5,
      columnName: "Age",
      title: (row: IColumnHeader, name: string) => (
        <div
          className={`G-center G-table-icon`}
          onClick={() => console.log(name)}
        >
          <p className="G-row-item">{row.title}</p>
          <i className={row.icon} style={{ color: "#757575" }} />
        </div>
      ),
      setRow: (row: any) => (
        <div className={`G-center G-table-icon`}>
          <div className="G-row-item">{row.gender ? row.gender : "-"}</div>
        </div>
      ),
      customStyle: { backgroundColor: "white" },
      isVisible: true,
    },
    {
      id: 6,
      columnName: "Address",
      title: (row: IColumnHeader, name: string) => (
        <div
          className={`G-center G-table-icon`}
          onClick={() => console.log(name)}
        >
          <p className="G-row-item">{row.title}</p>
          <i className={row.icon} style={{ color: "#757575" }} />
        </div>
      ),
      setRow: (row: any) => (
        <div className={`G-center G-table-icon`}>
          <div className="G-row-item">{row.easywalletAgentId}</div>
        </div>
      ),
      customStyle: { backgroundColor: "white" },
      isVisible: true,
    },
    {
      id: 7,
      columnName: "Phone",
      title: (row: IColumnHeader, name: string) => (
        <div
          className={`G-center G-table-icon`}
          onClick={() => console.log(name)}
        >
          <p className="G-row-item"> {row.title}</p>
          <i className={row.icon} style={{ color: "#757575" }} />
        </div>
      ),
      setRow: (row: any) => (
        <div className={`G-center G-table-icon`}>
          <div className="G-row-item">{row.easywalletAgentId}</div>
        </div>
      ),
      customStyle: { backgroundColor: "white" },
      isVisible: true,
    },
    {
      id: 8,
      columnName: "Money",
      title: (row: IColumnHeader, name: string) => (
        <div
          className={`G-center G-table-icon`}
          onClick={() => console.log(name)}
        >
          <p className="G-row-item">{row.title}</p>
          <i className={row.icon} style={{ color: "#757575" }} />
        </div>
      ),
      setRow: (row: any) => (
        <div className={`G-center G-table-icon`}>
          <div className="G-row-item">{row.easywalletAgentId}</div>
        </div>
      ),
      customStyle: { backgroundColor: "white" },
      isVisible: true,
    },
    {
      id: 9,
      columnName: "birthDate",
      title: (row: IColumnHeader, name: string) => (
        <div
          className={`G-center G-table-icon`}
          onClick={() => console.log(name)}
        >
          <p className="G-row-item">{row.title}</p>
          <i className={row.icon} style={{ color: "#757575" }} />
        </div>
      ),
      setRow: (row: any) => (
        <div className={`G-center G-table-icon`}>
          <div className="G-row-item">{row.easywalletAgentId}</div>
        </div>
      ),
      customStyle: { backgroundColor: "white" },
      isVisible: true,
    },
    {
      id: 10,
      columnName: "isMarried",
      title: (row: IColumnHeader, name: string) => (
        <div
          className={`G-center G-table-icon`}
          onClick={() => console.log(name)}
        >
          <p className="G-row-item">{row.title}</p>
          <i className={row.icon} style={{ color: "#757575" }} />
        </div>
      ),
      setRow: (row: any) => (
        <div className={`G-center G-table-icon`}>
          <div className="G-row-item">{row.easywalletAgentId}</div>
        </div>
      ),
      customStyle: { backgroundColor: "white" },
      isVisible: true,
    },
    {
      id: 11,
      columnName: "isWorking",
      title: (row: IColumnHeader, name: string) => (
        <div
          className={`G-center G-table-icon`}
          onClick={() => console.log(name)}
        >
          <p className="G-row-item">{row.title}</p>
          <i className={row.icon} style={{ color: "#757575" }} />
        </div>
      ),
      setRow: (row: any) => (
        <div className={`G-center G-table-icon`}>
          <div className="G-row-item">{row.easywalletAgentId}</div>
        </div>
      ),
      customStyle: { backgroundColor: "white" },
      isVisible: true,
    },
    {
      id: 12,
      columnName: "isHappy",
      title: (row: IColumnHeader, name: string) => (
        <div
          className={`G-center G-table-icon`}
          onClick={() => console.log(name)}
        >
          <p className="G-row-item">{row.title}</p>
          <i className={row.icon} style={{ color: "#757575" }} />
        </div>
      ),
      setRow: (row: any) => (
        <div className={`G-center G-table-icon`}>
          <div className="G-row-item">{row.easywalletAgentId}</div>
        </div>
      ),
      customStyle: { backgroundColor: "white" },
      isVisible: true,
    },
  ]);
  const [rightFreezeConfig] = useState<IColumnConfig<any>[]>([
    {
      title: "",
      setRow: () => (
        <div className={`G-center G-table-icon`}>
          <p className="G-row-item">View Details</p>
        </div>
      ),
      isVisible: true,
      width: 170,
    },
    {
      title: "",
      setRow: () => (
        <div className={`G-center G-table-icon`}>
          <p className="G-row-item">View Details</p>
        </div>
      ),
      isVisible: true,
      width: 60,
    },
  ]);
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
  ]);
  const [columnsConfigStructure, setColumnsConfigStructures] = useState<
    IColumnConfigStructure<any>
  >({
    [StructureConfig.BB55]: {
      name: "Columns",
      items: columnConfig,
    },
    [StructureConfig.BB33]: {
      name: "Freezed",
      items: [],
    },
  });
  const [columnsHeaderStructure, setColumnHeaderStructures] =
    useState<IColumnHeaderStructure>({
      [StructureConfig.BB55]: {
        name: "Columns",
        items: columnHeader,
      },
      [StructureConfig.BB33]: {
        name: "Freezed",
        items: [],
      },
    });
  const [columnsTotalStructure, setColumnTotalStructures] =
    useState<IColumnTotalStructure>({
      [StructureConfig.BB55]: {
        name: "Columns",
        items: grandTotals,
      },
      [StructureConfig.BB33]: {
        name: "Freezed",
        items: [],
      },
    });
  const [allDataFromDb] = useState<any[]>([
    {
      id: 1,
      easywalletAgentId: 179136,
      agentCreationDate: "2023-03-22T00:00:00",
      agentName:
        "Armen Virabyan test Armen Virabyan test Armen Virabyan test Armen Virabyan test",
    },
    {
      id: 2,
      easywalletAgentId: 494845,
      agentCreationDate: "2023-03-22T00:00:00",
      agentName: "Armen Virabyan test Ar",
    },
  ]);
  const [listForDropdown] = useState<ITotalList[]>([
    {
      id: 1,
      title: "AVG",
    },
    {
      id: 2,
      title: "MIN",
    },
    {
      id: 3,
      title: "MAX",
    },
    {
      id: 4,
      title: "SUM",
    },
  ]);
  const [dropdoownSelectedItem, setDropdoownSelectedItem] = useState<String>(
    listForDropdown[0].title
  );

  const setColumnsConfigStructure = (option: IColumnConfigStructure<any>) => {
    setColumnsConfigStructures(option);
  };
  const setColumnHeaderStructure = (option: IColumnHeaderStructure) => {
    setColumnHeaderStructures(option);
  };

  const handleSelectDataSize = (options: IPageSizes) => {
    setSelectedPage({ id: options.id });
    setCurrentPage(1);
  };

  const handleChangePage = (option: number) => {
    setCurrentPage(option);
  };
  const handleEdit = (option: any) => {
    console.log(option);
  };
  const handleDelete = (option: any[]) => {
    console.log(option);
  };
  const LeftSideSelfAction = (option: number | string) => {
    console.log(option);
  };
  const storeStructure = () => {
    console.log(12);
  };
  const setTotalType = (option: string) => {
    console.log(option);
    setDropdoownSelectedItem(option);
  };

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <Table
        data={data} // TableData
        allDataFromDb={allDataFromDb}
        columnsConfigStructure={columnsConfigStructure} // Structure to store in the database - pin/hide/drag-drop
        columnsHeaderStructure={columnsHeaderStructure} // headerStructure will automatically work with configStructure
        columnsTotalStructure={columnsTotalStructure}
        rightFreezeConfig={rightFreezeConfig}
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
        // FreezeIcon={FreezeSvgIcon} //Freeze action icon / must be added setDataWithPinnedRows function and activate isHoveredRow
        // RightSideIcon={ExSvgIcon} // SVG icon for right side action
        freezedRightSideVisible={true} // is Visible Freezed right side
        freezedRightSide={"dropdown"} // is dropdown
        links={links} // Array of links // have to check freezedRightSide - dropdown
        listForDropdown={listForDropdown} // Array of Counters
        headerColor={"#F3F6F8"} // Header color
        footerColor={"#F3F6F8"} // Footer color
        // freezedLeftSideColor={'silver'} // FreezedLeft side color
        // freezedRightSideColor={'silver'} // FreezedRight side color
        draggableColumns={true} //Is column's draggable
        handleEdit={handleEdit} // will be visible when active multipleCheck
        handleDelete={handleDelete} // will be visible when active multipleCheck
        setColumnsConfigStructure={setColumnsConfigStructure} // set changed config structure - pin/hide/drag-drop
        setColumnHeaderStructure={setColumnHeaderStructure} // set changed header structure - pin/hide/drag-drop
        setColumnTotalStructures={setColumnTotalStructures}
        handleSelectDataSize={handleSelectDataSize} // Select data size per page
        handleChangePage={handleChangePage} // chnage page
        RightSideSelfAction={RightSideSelfAction} // FreezedRightSideSelfAction
        storeStructure={storeStructure} // Save columns structure on DB
        setTotalType={setTotalType} // Set total type
      />
    </div>
  );
}


export default App;
```

# Props

The "Table" component accepts the following props:

```TS
data (required): An array of objects representing the table data.
columnsConfigStructure (required): An object representing the column configuration structure.
columnsHeaderStructure (required): An object representing the column header structure.
allDataFromDb (optional): An array of objects representing the complete data set from the database.
columnsTotalStructure (optional): An object representing the column total structure.
pageSize (optional): An array of page sizes for pagination.
links (optional): An array of link items for navigation.
listForDropdown (optional): An Array for choose footer items type
rowActions (optional): An array of row actions for each table row.
selectedPage (optional): An object representing the currently selected page.
currentPage (optional): The current page number.
totalCount (optional): The total number of items in the table.
multipleCheck (optional): Boolean flag to enable multiple row selection.
isStickyFirstColumn (optional): Boolean flag to enable sticking the first column.
isHoveredRow (optional): Boolean flag to enable highlighting the hovered row.
draggableColumns (optional): Boolean flag to enable column reordering.
freezedRightSideVisible (optional): Boolean flag to make the right side of the table visible even when scrolling horizontally.
FreezeIcon (optional): The icon to display for freezing columns.
headerColor (optional): The color of the table header.
footerColor (optional): The color of the table footer.
freezedLeftSideColor (optional): The color of the left side of the table when frozen.
freezedRightSideColor (optional): The color of the right side of the table when frozen.
freezedRightSide (optional): The right side content of the frozen table.
columnMinWidth (optional): The minimum width of each column.
headerHeight (optional): The height of the table header.
footerHeight (optional): The height of the table footer.
leftFreezedColumnWidth (optional): The width of the left side column when frozen.
rightFreezedColumnWidth (optional): The width of the right side column when frozen.
leftSideIcon (optional): The icon to display for the left side of the table.
RightSideSelfAction (optional): A function to handle the self-action on the right side of the table.
setColumnTotalStructures (optional): A function to set the column total structures.
handleEdit (optional): A function to handle the edit action for a table row.
handleDelete (optional): A function to handle the delete action for multiple table rows.
setColumnsConfigStructure (optional): A function to set the column configuration structure.
setColumnHeaderStructure (optional): A function to set the column header structure.
handleSelectDataSize (optional): A function to handle the selection of data size for pagination
```
