import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (

    <div className='w-screen h-screen flex'>
      <div className='w-2/5 h-full bg-neutral-4 bg-opacity-[0.12] p-10 max-md:hidden'>
        <div className='text-2xl font-bold'>
          LOGO
        </div>

      </div>
      <div className='w-full h-full pt-10 pl-16 pb-16 flex flex-col gap-12 items-end bg-background-light'>
        {children}

      </div>
    </div>
  )
}

export default layout