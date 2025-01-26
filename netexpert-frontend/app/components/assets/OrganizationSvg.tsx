import React, { SVGProps } from 'react'

const OrganizationSvg = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none">
      <path d="M4 22H20" stroke="#7D8183" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 9H14M18 13H14M18 17H14" stroke="#7D8183" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 22V3.2C6 2.42385 6.47098 2 7.2 2C8.87221 2 9.70832 2 10.4079 2.1108C14.2589 2.72075 17.2793 5.74106 17.8892 9.59209C18 10.2917 18 11.1278 18 12.8V22" className='stroke-neutral-5' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default OrganizationSvg