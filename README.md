# React App Table

React App Table is a customizable table component for React applications. It provides a flexible and feature-rich table implementation with various configuration options.

# Installation

To install React App Table, use the following command:

npm install react-beautiful-table

# Usage

Import the necessary components and interfaces from the "beautiful-react-table" package:

import { Table } from 'beautiful-react-table';

# Props

The "Table" component accepts the following props:

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
freezeIcon (optional): The icon to display for freezing columns.
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
LeftSideSelfAction (optional): A function to handle the self-action on the left side of the table.
setColumnTotalStructures (optional): A function to set the column total structures.
handleEdit (optional): A function to handle the edit action for a table row.
handleDelete (optional): A function to handle the delete action for multiple table rows.
setColumnsConfigStructure (optional): A function to set the column configuration structure.
setColumnHeaderStructure (optional): A function to set the column header structure.
handleSelectDataSize (optional): A function to handle the selection of data size for pagination
