import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import React, { SyntheticEvent, memo, useEffect, useState } from "react";
import { inputSize } from "../../../../../Models/table.enum";
import {
  IComparisonType,
  ItemFields,
} from "../../../../../Models/table.models";
const selectStyles = {
  display: "flex",
  alignItems: "center", // Center vertically
};
interface IMultipleSelectCheckmarks {
  item: IComparisonType;
  columnsSizes: string;
  isDisabled: boolean;
  perColumnListForFilters?: string[];
  columnName: string;
  isLoadingFilters?: boolean;
  advancedSettings: boolean;
  filterTypeing: ItemFields;
  inputSizes: inputSize;
  filterColumns?: IComparisonType[];
  translations?: Record<string, any>;
  setCheckedItemsLocaly(options: any[]): void;
  handleSelectItems: (option: any[], isClosed: boolean) => void;
  setCoulmnName: (name: string) => void;
}

const MultipleSelectCheckmarks = ({
  item,
  columnsSizes,
  isDisabled,
  perColumnListForFilters,
  columnName,
  isLoadingFilters,
  advancedSettings,
  filterTypeing,
  inputSizes,
  translations,
  filterColumns,
  setCheckedItemsLocaly,
  handleSelectItems,
  setCoulmnName,
}: IMultipleSelectCheckmarks) => {
  const [checkedItems, setCheckedItems] = useState<any[]>([]);
  const [val, setVal] = useState("");
  const handleChange = (value: any) => {
    setCheckedItems(typeof value === "string" ? value.split(",") : value);
    setCheckedItemsLocaly(value);
  };

  const handleOpenList = () => {
    if (!isDisabled) {
      setCoulmnName(item.ColumnName);
      handleSelectItems([], true);
    }
  };
  const handleCloseList = () => {
    setCoulmnName("");
    handleSelectItems(checkedItems, false);
  };
  const isEmpty = () => {
    if (
      item.ColumnName === columnName &&
      !isLoadingFilters &&
      !perColumnListForFilters?.length
    ) {
      return true;
    }
    return false;
  };

  const getLabel = (option: any) => {
    if (typeof option == "boolean") {
      return option + "";
    }
    return option;
  };

  useEffect(() => {
    if (item.ColumnName === filterTypeing.PropertyName) {
      setCheckedItems(filterTypeing.CheckedItems);
    }
  }, [filterTypeing]);

  return (
    <div
      style={{
        width: advancedSettings ? columnsSizes : "100%",
        position: "relative",
      }}
    >
      <FormControl fullWidth size={inputSizes}>
        <Autocomplete
          multiple
          limitTags={advancedSettings ? 1 : 2}
          id="multiple-limit-tags"
          value={checkedItems}
          inputValue={val}
          options={perColumnListForFilters ?? []}
          onChange={(event: SyntheticEvent<Element, Event>, value: any[]) => {
            handleChange(value);
          }}
          onInputChange={(event, newInputValue) => setVal(newInputValue)}
          getOptionLabel={getLabel}
          onOpen={handleOpenList}
          onClose={handleCloseList}
          disableCloseOnSelect
          size={inputSizes}
          disabled={isDisabled && item.ColumnName !== columnName}
          freeSolo
          renderOption={(props, option, { selected }) => {
            return (
              <div key={props.id} style={{ textAlign: "center" }}>
                <li
                  {...props}
                  style={{
                    marginLeft: 5,
                    display: "flex",
                    justifyContent: "space-between",
                    minHeight: 40,
                    borderBottom: option === "" ? "1px solid silver" : "none",
                  }}
                >
                  {item.ColumnName === columnName && isLoadingFilters ? null : (
                    <>
                      <div>
                        {typeof option === "boolean" ? String(option) : option}
                      </div>
                      <Checkbox style={{ marginRight: 8 }} checked={selected} />
                    </>
                  )}
                </li>
              </div>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={item.key || item.ColumnName}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {item.ColumnName === columnName && isLoadingFilters && (
                      <CircularProgress color="inherit" size={20} />
                    )}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </FormControl>
      {isEmpty() ? (
        <div
          className="G-align-center G-shadow-around"
          style={{
            borderRadius: 4,
            height: 56,
            padding: 15,
            color: "silver",
            position: "absolute",
            backgroundColor: "white",
            top:
              filterColumns?.at(-1)?.ColumnName === item.ColumnName ? -55 : 40,
            opacity: 1,
            zIndex: 888888,
            width: "100%",
          }}
        >
          {translations?.filterAction.emptyFieldData || "Empty data"}
        </div>
      ) : null}
    </div>
  );
};

export default memo(MultipleSelectCheckmarks);
