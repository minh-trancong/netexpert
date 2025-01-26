import React, { SVGProps } from 'react'

const ConversationSvg = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg {...props} viewBox="0 0 42 37" fill="none">
      <path d="M39.45 7.4H35.35V24.05H8.7V27.75C8.7 28.7675 9.6225 29.6 10.75 29.6H33.3L41.5 37V9.25C41.5 8.2325 40.5775 7.4 39.45 7.4ZM31.25 18.5V1.85C31.25 0.8325 30.3275 0 29.2 0H2.55C1.4225 0 0.5 0.8325 0.5 1.85V27.75L8.7 20.35H29.2C30.3275 20.35 31.25 19.5175 31.25 18.5Z" fill="white" />
    </svg>
  )
}

export default ConversationSvg