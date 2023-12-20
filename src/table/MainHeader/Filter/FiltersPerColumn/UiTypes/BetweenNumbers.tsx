import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import {
  IComparisonType,
  ItemFields,
} from "../../../../../Models/table.models";
import { validateRangeColumns } from "../../../../../utils";
import { inputSize } from "../../../../../Models/table.enum";
interface IBetweenNumbers {
  columnsSizes: string;
  item: IComparisonType;
  advancedSettings: boolean;
  filterTypeing: ItemFields;
  isDisabled: boolean;
  columnName: string;
  inputSizes: inputSize;
  translations?: Record<string, any>;
  checkIsDisabled: (option: boolean) => void;
  setCoulmnName: (name: string) => void;
  handleChangeRange(value: string, type: string): void;
}
const BetweenNumbers = ({
  columnsSizes,
  advancedSettings,
  item,
  filterTypeing,
  columnName,
  isDisabled,
  inputSizes,
  translations,
  setCoulmnName,
  handleChangeRange,
  checkIsDisabled,
}: IBetweenNumbers) => {
  const [val, setVal] = useState({ from: "", to: "" });
  const [errMessage, setErrMessage] = useState({ from: "", to: "" });
  const [isEnabled, setIsEnabled] = useState({
    isEnabledFrom: false,
    isEnabledTo: false,
  });

  const handleChangeInputValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const stateValues = val;
    const { value, name } = event.target;
    if (stateValues.to === undefined) {
      stateValues.to = "";
    }
    if (stateValues.from === undefined) {
      stateValues.from = "";
    }
    setErrMessage({ from: "", to: "" });
    if (name === "to") {
      if (
        !validateRangeColumns(
          stateValues.from,
          value,
          item,
          setErrMessage,
          translations?.filterAction.validations
        )
      ) {
        handleChangeRange(stateValues.from, value);
      } else {
        checkIsDisabled(true);
      }
    } else {
      if (
        !validateRangeColumns(
          value,
          stateValues.to,
          item,
          setErrMessage,
          translations?.filterAction.validations
        )
      ) {
        handleChangeRange(value, stateValues.to);
      } else {
        checkIsDisabled(true);
      }
    }
    setVal((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleOpenList = (type: string) => {
    if (type === "from") {
      setIsEnabled((prev) => {
        return { ...prev, isEnabledFrom: true };
      });
    } else {
      setIsEnabled((prev) => {
        return { ...prev, isEnabledTo: true };
      });
    }
    setCoulmnName(item.ColumnName);
  };
  const getError = (messageLength: number) => {
    if (!isEnabled.isEnabledFrom && !isEnabled.isEnabledTo && messageLength) {
      return true;
    }

    return false;
  };

  const errMessageText = (errMessage: string) => {
    if (
      !isEnabled.isEnabledFrom &&
      !isEnabled.isEnabledTo &&
      errMessage.length
    ) {
      return errMessage;
    }
    return "";
  };
  useEffect(() => {
    if (item.ColumnName === filterTypeing.PropertyName) {
      let newValues: string[] = filterTypeing.Values;
      if (item.ColumnType !== "Text") {
        newValues = filterTypeing.Values.map((item: number) => item + "");
      }
      setVal({ from: newValues[0], to: newValues[1] });
    }
  }, [filterTypeing]);

  useEffect(() => {
    if (
      !isEnabled.isEnabledFrom &&
      !isEnabled.isEnabledTo &&
      errMessage.from == "" &&
      errMessage.to == ""
    ) {
      setCoulmnName("");
    }
  }, [isEnabled]);

  return (
    <div
      className="G-justify-between"
      style={{ width: advancedSettings ? columnsSizes : "100%" }}
    >
      <TextField
        id="outlined-basic"
        label={translations?.filterAction.from || "From"}
        variant="outlined"
        name={translations?.filterAction.from}
        onBlur={() => {
          setIsEnabled((prev) => {
            return { ...prev, isEnabledFrom: false };
          });
        }}
        onFocus={() => handleOpenList("from")}
        error={getError(errMessage.from.length)}
        helperText={errMessageText(errMessage.from)}
        disabled={columnName !== item.ColumnName && isDisabled}
        sx={{
          width: "48%",
        }}
        value={val.from}
        size={inputSizes}
        onChange={handleChangeInputValue}
      />
      <div className="G-center">-</div>
      <TextField
        id="outlined-basic"
        label={translations?.filterAction.to || "To"}
        variant="outlined"
        name={translations?.filterAction.from}
        size={inputSizes}
        onBlur={() => {
          setIsEnabled((prev) => {
            return { ...prev, isEnabledTo: false };
          });
        }}
        onFocus={() => handleOpenList("to")}
        error={getError(errMessage.to.length)}
        helperText={errMessageText(errMessage.to)}
        disabled={columnName !== item.ColumnName && isDisabled}
        sx={{ width: "48%" }}
        value={val.to}
        onChange={handleChangeInputValue}
      />
    </div>
  );
};

export default BetweenNumbers;
