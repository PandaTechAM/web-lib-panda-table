import React from "react";
import { ILinksList } from "../../../../../Models/table.models";
import { useState } from "react";
import LinkSvgIcon from "../../../../../svgIcons/LinkSvgIcon";
import PopUp from "../../../../../components/popUp";
interface IDropDown<T extends Object> {
  item: T;
  checkedLink?: T;
  links?: ILinksList[];
  RightSideIcon?: any;
  getRowForDropdown?(option: any): void;
}

const DropDown = <T extends Object>({
  checkedLink,
  links,
  item,
  getRowForDropdown,
}: IDropDown<T>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    setAnchorEl(null);
  };

  return (
    <>
      <PopUp
        ActiveIcon={LinkSvgIcon}
        checkedLink={checkedLink}
        item={item}
        getRowForDropdown={getRowForDropdown}
        open={open}
        anchorEl={anchorEl}
        handleClick={handleClick}
        handleClose={handleClose}
      >
        <>
          {links &&
            links.length &&
            links.map((el, ind) => {
              return (
                <li
                  key={ind}
                  onClick={(e) => {
                    e.stopPropagation();
                    el.action?.(checkedLink, ind);
                  }}
                  className="G-align-center"
                  style={{
                    cursor: "pointer",
                    padding: "12px",
                    borderBottom:
                      ind !== links.length - 1 ? "1px solid #757575" : "",
                  }}
                >
                  {!el.path ? (
                    <p className="G-dropdown-list-style">
                      <span>
                        {el.icon?.() || <LinkSvgIcon fill="#4844c5" />}
                      </span>
                      <span>{el.name}</span>
                    </p>
                  ) : (
                    <a
                      href={el.path}
                      target="_blank"
                      rel="noreferrer"
                      className="G-dropdown-list-style"
                    >
                      <span>
                        {el.icon?.() || <LinkSvgIcon fill="#4844c5" />}
                      </span>
                      <span>{el.name}</span>
                    </a>
                  )}
                </li>
              );
            })}
        </>
      </PopUp>
    </>
  );
};

export default DropDown;
