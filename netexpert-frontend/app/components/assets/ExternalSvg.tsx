import React, { SVGProps } from 'react'

const ExternalSvg = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none">
      <path d="M11 5H7C5.89543 5 5 5.89543 5 7V17C5 18.1046 5.89543 19 7 19H17C18.1046 19 19 18.1046 19 17V12.25M19 5H15M19 5V9M19 5L9 15" stroke="#BFC5C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default ExternalSvg