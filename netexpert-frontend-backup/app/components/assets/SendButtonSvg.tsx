import React, { SVGProps } from 'react'

const SendButtonSvg = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none">
      <path d="M20.5 12.5L4.5 4.5L6.5 12.5M20.5 12.5L4.5 20.5L6.5 12.5M20.5 12.5H6.5" stroke="#68EFE4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default SendButtonSvg