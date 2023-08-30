import React from "react";
import { ILinksList } from "../../../../Models/table.models";
import DropDown from "./DropDown";
import SelfAction from "./SelfAction";
interface IFreezedRightColumns<T extends Object> {
  item: T;
  checkedLink?: T;
  links?: ILinksList[];
  freezedRightSide?: string;
  RightSideIcon?: any;
  RightSideSelfAction?: (option: number | string) => void;
  getRowForDropdown(option: number): void;
}
const FreezedRightColumns = <T extends Object>({
  item,
  checkedLink,
  links,
  freezedRightSide,
  RightSideIcon,
  RightSideSelfAction,
  getRowForDropdown,
}: IFreezedRightColumns<T>) => {
  return (
    <>
      {freezedRightSide && freezedRightSide === "dropdown" ? (
        <DropDown
          item={item}
          checkedLink={checkedLink}
          links={links}
          RightSideIcon={RightSideIcon}
          getRowForDropdown={getRowForDropdown}
        />
      ) : (
        <SelfAction
          item={item}
          RightSideIcon={RightSideIcon}
          RightSideSelfAction={RightSideSelfAction}
          getRowForDropdown={getRowForDropdown}
        />
      )}
    </>
  );
};

export default FreezedRightColumns;
