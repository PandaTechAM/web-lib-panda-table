import React from 'react'
const FooterFreezedRight = ({
  footerColor,
  rightFreezedColumnWidth,
}: {
  footerColor: string | undefined
  rightFreezedColumnWidth: number | undefined
}) => {
  return (
    <ul
      className='G-data-table-footer'
      style={{
        right: 0,
        zIndex: 1000,
        boxShadow: '-6px 0px 8px 0px rgba(0,0,0,0.08)',
      }}
    >
      <li
        style={{
          backgroundColor: footerColor && footerColor,
          maxWidth: rightFreezedColumnWidth ? `${rightFreezedColumnWidth}px` : 60,
          minWidth: rightFreezedColumnWidth ? `${rightFreezedColumnWidth}px` : 60,
        }}
      />
    </ul>
  )
}

export default FooterFreezedRight
