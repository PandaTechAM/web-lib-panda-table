import React, { useState } from "react";
import Pagination from "../../components/pagination";
import Select from "../../components/select/select";
import { IPageSizes, ISelected } from "../../Models/table.models";
import DropdownSvgIcon from "../../svgIcons/DropdownSvgIcon";
import "./index.scss";
interface IFooterPagination {
  pageSizeStructure?: IPageSizes[];
  pagesTotalCount?: number;
  currPage?: number;
  getPageRowsCountAndCurrentPage?(pageNumber: number, rowsCount: number): void;
}
const FooterPagination = ({
  pageSizeStructure,
  pagesTotalCount = 0,
  currPage = 1,
  getPageRowsCountAndCurrentPage,
}: IFooterPagination) => {
  const [isOpenList, setOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(currPage);
  const [selectedPage, setSelectedPage] = useState<ISelected>({ id: 1 });

  const setIsOpenList = () => {
    setOpen((prev) => !prev);
  };

  const handleSelectItem = (options: IPageSizes) => {
    setSelectedPage({ id: options.id });
    setCurrentPage(1);
    if (pageSizeStructure && selectedPage && getPageRowsCountAndCurrentPage) {
      getPageRowsCountAndCurrentPage(
        1,
        pageSizeStructure[options.id - 1].count
      );
    }
  };
  const handleChangePage = (option: number) => {
    setCurrentPage(option);
    if (pageSizeStructure && selectedPage && getPageRowsCountAndCurrentPage) {
      getPageRowsCountAndCurrentPage(
        option,
        pageSizeStructure[selectedPage.id - 1].count
      );
    }
  };

  return (
    <>
      {pageSizeStructure && selectedPage ? (
        <div
          className="G-justify-between G-align-center"
          // style={{ width: "138px" }}
        >
          <div>Show</div>
          <div
            style={{
              fontSize: "16px",
            }}
          ></div>
          <Select
            optionsList={pageSizeStructure}
            value={selectedPage.id}
            selectedNameKey={"count"}
            selectedValueKey={"id"}
            onChange={handleSelectItem}
            isOpenList={isOpenList}
            setIsOpenList={setIsOpenList}
            customClass="G-Select-container"
            ButtonSvg={DropdownSvgIcon}
          />
          <div>Rows</div>
          <Pagination
            onPageChange={handleChangePage}
            totalCount={pagesTotalCount}
            currentPage={currentPage}
            pageSizeStructure={
              pageSizeStructure && selectedPage
                ? pageSizeStructure[selectedPage.id - 1].count
                : 15
            }
            className={"G-pagionation"}
          />
        </div>
      ) : null}
    </>
  );
};

export default FooterPagination;
