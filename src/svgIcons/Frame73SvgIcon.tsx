import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={12} height={18} fill='none' {...props}>
    <path
      fill='#000'
      d='M5.651.34a.5.5 0 0 1 .698 0l3.966 3.864a.5.5 0 0 1-.349.859H2.034a.5.5 0 0 1-.35-.859L5.652.34ZM6.349 17.16a.5.5 0 0 1-.698 0l-3.966-3.864a.5.5 0 0 1 .349-.858h7.932a.5.5 0 0 1 .35.858L6.348 17.16Z'
    />
  </svg>
)
const Memo = memo(SvgComponent)
export default Memo
