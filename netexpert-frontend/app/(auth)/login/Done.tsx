import CheckboxSvg from '@/app/components/assets/CheckboxSvg'
import EmailSvg from '@/app/components/assets/EmailSvg'
import LockSvg from '@/app/components/assets/LockSvg'
import NextButton from '@/app/components/NextButton'
import React, { useEffect } from 'react'
import CryptoJS from 'crypto-js'
import Link from 'next/link'
import { authFetch } from '@/app/utils'

const Done = ({ handleSubmit }: { handleSubmit: () => void }) => {

  useEffect(() => {
    (async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(null)
        }, 1000)
      })
      handleSubmit();
    })();
  }, [])

  return (
    <div className='w-full h-full flex justify-center items-center flex-col'>
      <img src={'/assets/checked.png'} alt='checked' className='w-[100px] h-[100px]' loading='lazy'/>
    </div>
  )
}

export default Done