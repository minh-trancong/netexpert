import React, { SVGProps } from 'react'

const LockSvg = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none">
      <path d="M5 15C5 11.134 8.13401 8 12 8C15.866 8 19 11.134 19 15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15Z" className='stroke-neutral-5' strokeWidth="1.5" />
      <path d="M16.5 9.5V6.5C16.5 4.01472 14.4853 2 12 2C9.51472 2 7.5 4.01472 7.5 6.5V9.5" className='stroke-neutral-5' strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13.9928 15H14M10 15H10.0072" className='stroke-neutral-5' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default LockSvg