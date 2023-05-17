import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => {
  const { fill = '#4A4C56' } = props
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill={'none'} {...props}>
      <path fill={fill} stroke='#000' d='M5.656 6.605h5.316v4.263H5.656z' />
      <path stroke='#000' d='M5.656 10.816h5.316v4.263H5.656z' />
      <path stroke='#000' d='M5.656 15.026h5.316v4.263H6.156a.5.5 0 0 1-.5-.5v-3.763Z' />
      <path fill={fill} stroke='#000' d='M10.922 6.605h5.316v4.263h-5.316z' />
      <path stroke='#000' d='M10.922 10.816h5.316v4.263h-5.316z' />
      <path stroke='#000' d='M10.922 15.026h5.316v4.263h-5.316z' />
      <path fill={fill} stroke='#000' d='M16.184 6.605h4.815a.5.5 0 0 1 .5.5v3.763h-5.315V6.605Z' />
      <path stroke='#000' d='M16.184 10.816H21.5v4.263h-5.316z' />
      <path stroke='#000' d='M16.184 15.026h5.315v3.763a.5.5 0 0 1-.5.5h-4.815v-4.263Z' />
      <path
        fill={fill}
        stroke='#fff'
        d='m8.211 7.396.583-.1-.196-.558-.46-1.316-.173-.493-.485.194-1.34.537.173-1.606.06-.554H3.762l.06.554.174 1.606-1.341-.537-.483-.193-.174.49-.469 1.315-.2.56.587.1 1.4.24L2.292 8.85l-.356.423.456.312 1.176.806.448.307.269-.472.782-1.375.783 1.375.27.474.448-.31 1.168-.806.452-.312-.353-.42-1.02-1.217 1.396-.24Z'
      />
    </svg>
  )
}
const Memo = memo(SvgComponent)
export default Memo
