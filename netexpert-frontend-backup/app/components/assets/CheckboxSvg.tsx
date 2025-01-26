import React, { SVGProps } from 'react'

const CheckboxSvg = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg {...props} viewBox="0 0 16 16" fill="none">
      <path d="M1.66797 7.99996C1.66797 5.0144 1.66797 3.52162 2.59546 2.59412C3.52296 1.66663 5.01574 1.66663 8.0013 1.66663C10.9868 1.66663 12.4796 1.66663 13.4072 2.59412C14.3346 3.52162 14.3346 5.0144 14.3346 7.99996C14.3346 10.9855 14.3346 12.4783 13.4072 13.4058C12.4796 14.3333 10.9868 14.3333 8.0013 14.3333C5.01574 14.3333 3.52296 14.3333 2.59546 13.4058C1.66797 12.4783 1.66797 10.9855 1.66797 7.99996Z" fill="#939393" stroke="#939393" strokeWidth="1.5" />
      <path d="M5.33203 8.33333L6.9987 10L10.6654 6" stroke="#F5F5F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default CheckboxSvg