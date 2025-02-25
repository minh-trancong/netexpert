"use client";
import CheckboxSvg from '@/app/components/assets/CheckboxSvg';
import EmailSvg from '@/app/components/assets/EmailSvg';
import LockSvg from '@/app/components/assets/LockSvg';
import NextButton from '@/app/components/NextButton';
import React from 'react'
import WelcomeBack from './WelcomeBack';
import PhoneNumber from './PhoneNumber';
import OTP from './OTP';
import Link from 'next/link';
import Done from './Done';


const Login = () => {

  const [step, setStep] = React.useState(1);
  const [submitOk, setSubmitOk] = React.useState(true);


  const Steps = [

    <WelcomeBack handleSubmit={(e) => {
      setStep(2);
    }} />,
    <Done handleSubmit={() => {
      window.location.href = '/chat';
    }} />
  ]

  return (
    <>
      <div className='flex p-8 pr-16 justify-center items-center gap-2'>
        <div className='text-small text-neutral-6 font-medium'>
          Don't have an account ?
        </div>
        <Link href='/signup' className='text-small text-neutral-4 font-medium'>
          Sign up
        </Link>
      </div>
      {Steps[step - 1]}
    </>
  )
}

export default Login
