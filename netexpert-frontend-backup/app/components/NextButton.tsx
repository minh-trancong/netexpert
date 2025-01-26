import React from 'react'

const NextButton = ({type} : {type: string}) => {
  return (
    <div className='flex w-full p-[10px] justify-center items-center gap-8 rounded-xl bg-neutral-5 cursor-pointer'>
      <div className='text-small font-semibold text-typography-light-subtitle-2'>
        {type}
      </div>
    </div>
  )
}

export default NextButton