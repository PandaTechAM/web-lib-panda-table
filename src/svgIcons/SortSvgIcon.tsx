import * as React from "react";
import { SVGProps, memo } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => {
  const { fill = "grey" } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={"1em"}
      height={"1em"}
      fill={fill}
      viewBox="0 0 10 6"
      {...props}
    >
      <path
        fill={fill}
        d="M4.651.59a.5.5 0 0 1 .698 0l3.966 3.864a.5.5 0 0 1-.349.859H1.034a.5.5 0 0 1-.35-.859L4.652.59Z"
      />
    </svg>
  );
};
const SortSvgIcon = memo(SvgComponent);
export default SortSvgIcon;
