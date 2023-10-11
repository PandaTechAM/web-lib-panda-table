import * as React from "react";
import { SVGProps, memo } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="m20 8-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8ZM9 19H7v-9h2v9Zm4 0h-2v-6h2v6Zm4 0h-2v-3h2v3ZM14 9h-1V4l5 5h-4Z"
    />
  </svg>
);
const Memo = memo(SvgComponent);
export default Memo;
