import React from "react";
import { PickersActionBarProps } from "@mui/x-date-pickers";
import "./style.scss";
const ActionList = (props: PickersActionBarProps) => {
  const { onClear, onSetToday, className } = props;
  const actions = [
    { text: "Clear", method: onClear },
    { text: "Today", method: onSetToday },
  ];

  return (
    <div className={`G-justify-between P-date-actions-component ${className}`}>
      <div className="G-flex P-actions-component">
        {actions.map(({ text, method }) => (
          <div key={text} onClick={method} className="G-center">
            {text}
          </div>
        ))}
      </div>
      <div className="G-center P-time-component">
        <div>Hour</div>
        <div>Min</div>
        <div>Sec</div>
      </div>
    </div>
  );
};

export default ActionList;
