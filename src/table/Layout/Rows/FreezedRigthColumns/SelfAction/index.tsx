import React from "react";
import LinkSvgIcon from "../../../../../svgIcons/LinkSvgIcon";

interface ISelfAction<T extends Object> {
  item: T;
  RightSideIcon?: any;
  checkedLink?: T;
  RightSideSelfAction?: (option: any) => void;
  getRowForDropdown(option: number): void;
}
const SelfAction = <T extends Object>({
  item,
  RightSideIcon,
  getRowForDropdown,
}: ISelfAction<T>) => {
  return (
    //@ts-ignore
    <div onClick={() => getRowForDropdown(item.id)}>
      {!RightSideIcon ? <LinkSvgIcon /> : <RightSideIcon />}
    </div>
  );
};

export default SelfAction;
