import React, { useState } from "react";
import Select from "../../../components/select/select";
import ArrowDown from "../../../svgIcons/ArrowBottomSvgIcon";
import ArrowUp from "../../../svgIcons/ArrowtopSvgIcon";
import "./style.scss";
import { CheckedItems } from "../../../Models/table.enum";
interface IDownloadTypes {
  id: number;
  type: string;
}
interface IDownload<T extends Object> {
  getDownloadType: (option: string, checkedRows: T[] | string) => void;
  checkedRows: T[];
  selectedType: string;
}
const Download = <T extends Object>({
  getDownloadType,
  checkedRows,
  selectedType,
}: IDownload<T>) => {
  const [fileType] = useState<IDownloadTypes[]>([
    { id: 1, type: "XLSX" },
    { id: 2, type: "CSV" },
    { id: 3, type: "PDF" },
  ]);
  const [isOpenList, setOpen] = useState<boolean>(false);

  const setIsOpenList = () => {
    setOpen((prev) => !prev);
  };
  const handleSelectItem = (option: IDownloadTypes) => {
    if (selectedType === CheckedItems.SELECTED_ALL) {
      getDownloadType(option.type, "All");
    } else {
      getDownloadType(option.type, checkedRows);
    }
  };
  return (
    <Select
      optionsList={fileType}
      value={-1}
      selectedNameKey={"type"}
      selectedValueKey={"id"}
      onChange={handleSelectItem}
      isOpenList={isOpenList}
      setIsOpenList={setIsOpenList}
      customClass="P-download"
      label="Download report"
      ButtonSvg={isOpenList ? ArrowUp : ArrowDown}
    />
  );
};

export default Download;
