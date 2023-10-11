import React from "react";
import Checkbox from "../../../components/checkbox";
import { Button, Menu } from "@mui/material";
import { useState } from "react";
import "./style.scss";
import { CheckedItems } from "../../../Models/table.enum";
import DropdownSvgIcon from "../../../svgIcons/DropdownSvgIcon";
import PopUp from "../../../components/popUp";
interface ICheckRows<T extends Object> {
  data: T[];
  checkedRows: T[];
  handleCheckAll(): void;
  unCheck(): void;
  checkAllDataFromDb(): void;
  handleClose?: () => void;
}
const dropdownStyle = {
  height: "26px",
  display: "flex",
  justifyContent: "start",
  padding: 0,
  margin: 0,
  translate: -10,
  backgroundColor: "white",
  minWidth: 10,
  border: "none",
};
const CheckRows = <T extends Object>({
  data,
  checkedRows,
  handleCheckAll,
  unCheck,
  checkAllDataFromDb,
}: // handleClose,
ICheckRows<T>) => {
  const [selectedItem, setSelectedItem] = useState(2);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [listForDropdown] = useState<Object[]>([
    {
      id: 1,
      title: CheckedItems.SELECTED_ALL,
      action: () => {
        checkAllDataFromDb();
        setSelectedItem(0);
      },
    },
    {
      id: 2,
      title: CheckedItems.SELECTED_VISIBLE,
      action: () => {
        handleCheckAll();
        setSelectedItem(1);
      },
    },
    {
      id: 3,
      title: CheckedItems.NONE,
      action: () => {
        unCheck();
        setSelectedItem(2);
      },
    },
  ]);

  return (
    <>
      <div className="G-align-center G-check-all-component">
        <Checkbox
          isCheck={data.length === checkedRows.length}
          onClick={
            data.length === checkedRows.length
              ? () => {
                  unCheck();
                  setSelectedItem(2);
                }
              : () => {
                  handleCheckAll();
                  setSelectedItem(1);
                }
          }
          customClass="G-checkbox"
        />
      </div>
      <div className="G-check-all-dropdown">
        <PopUp
          ActiveIcon={DropdownSvgIcon}
          style={dropdownStyle}
          open={open}
          anchorEl={anchorEl}
          handleClick={handleClick}
          handleClose={handleClose}
        >
          <ul className="G-dropdown-list">
            {listForDropdown.map((item: any, index: any) => {
              return (
                <li
                  key={item.id}
                  onClick={() => {
                    item.action();
                    handleClose();
                  }}
                  style={{
                    color: index === selectedItem ? "#4844C5" : "black",
                  }}
                >
                  {item.title}
                </li>
              );
            })}
          </ul>
        </PopUp>
      </div>
    </>
  );
};

export default CheckRows;
