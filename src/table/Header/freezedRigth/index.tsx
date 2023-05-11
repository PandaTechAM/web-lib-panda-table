import React from 'react'
const FreezedHeaderRight = ({
  headerColor,
  rightFreezedColumnWidth,
}: {
  headerColor: string | undefined
  rightFreezedColumnWidth: number | undefined
}) => {
  return (
    <ul
      className='G-data-table-header'
      style={{
        right: 0,
        zIndex: 1000,
        boxShadow: '-6px 0px 8px 0px rgba(0,0,0,0.08)',
      }}
    >
      <li
        style={{
          maxWidth: rightFreezedColumnWidth ? `${rightFreezedColumnWidth}px` : '60px',
          minWidth: rightFreezedColumnWidth ? `${rightFreezedColumnWidth}px` : '60px',
          backgroundColor: headerColor && headerColor,
        }}
      />
    </ul>
  )
}

export default FreezedHeaderRight
