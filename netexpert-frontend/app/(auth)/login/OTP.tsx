import CheckboxSvg from '@/app/components/assets/CheckboxSvg'
import EmailSvg from '@/app/components/assets/EmailSvg'
import LockSvg from '@/app/components/assets/LockSvg'
import NextButton from '@/app/components/NextButton'
import PhoneSvg from '@/app/components/assets/PhoneSvg'
import React from 'react'

const OTP = ({ handleSubmit }: { handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) => {

  const [submitOk, setSubmitOk] = React.useState(true);

  return (
    <form className='flex flex-col items-start gap-8 w-5/6 pr-[180px] max-md:pr-[120px] justify-center'
      onSubmit={(e) => {
        e.preventDefault();
        const phone = (e.target as any).phone.value;
        handleSubmit(e);

      }}>
      <div className='flex flex-col items-start'>
        <p className='text-h2 font-bold text-typography-light-title'>
          Enter OTP
        </p>
      </div>
      <div className='flex flex-col items-start gap-4 w-full'>

        <div className='flex flex-col flex-start gap-[10px] w-full'>
          <div className='text-extra-small font-bold text-typography-light-body'>
            Phone number
          </div>
          <label className='w-full h-11'>
            <div className='flex w-full h-full py-[10px] pl-4 pr-20 justify-start items-center gap-[10px] flex-shrink-0 rounded-2xl bg-neutral-7'>
              <PhoneSvg className='w-6 h-6 flex-shrink-0' />
              <input name="phone" type='number' className='text-extra-small font-semibold opacity-70 text-neutral-5' placeholder='Enter phone number' required />
            </div>
          </label>
        </div>
      </div>
      <button className='w-full'>
        <NextButton type='Verify' />
      </button>
      <div className='flex w-full justify-center items-start gap-1'>
        <p className='text-extra-small font-semibold text-neutral-4'>
          Didn't receive code?
        </p>
        <p className='text-extra-small font-semibold text-neutral-6'>
          Resend one
        </p>
      </div>
    </form>
  )
}

export default OTP