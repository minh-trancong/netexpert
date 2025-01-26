"use client";
import React from 'react'
import CreateAccount from './CreateAccount';
import CreatePassword from './CreatePassword';
import Link from 'next/link';

const SignUp = () => {

  const [step, setStep] = React.useState(1);

  const [data, setData] = React.useState({
    name: '',
    email: '',
    username: '',
    orgtype: '',
    orgname: '',
  })

  const Steps = [
    {
      title: 'Create Account',
      component: <CreateAccount handleSubmit={(e) => {
        e.preventDefault();
        setStep(2);
      }} />
    },
    {
      title: 'Create Password',
      component: <CreatePassword handleSubmit={(e) => {
        e.preventDefault();
        setStep(3);
      }} data={data} />

    }
  ]

  const noOfSteps = Steps.length;

  return (
    <>
      <div className='flex p-8 pr-16 justify-center items-center gap-2'>
        <div className='text-small text-neutral-6 font-medium'>
          Already have an account ?
        </div>
        <Link href='/login' className='text-small text-neutral-4 font-medium'>
          Log in
        </Link>
      </div>
      <div className='flex flex-col items-start gap-6 w-5/6 pr-[180px] max-md:pr-[120px] justify-center'>
        <div className='text-h2'>
          <div className='text-typography-light-title'>
            {Steps[step - 1].title}
          </div>
        </div>
        <div className='w-full flex flex-grow flex-shrink-0 basis-0 h-8 justify-between items-center'>
          {(() => {
            const steps = [];
            for (let i = 0; i < noOfSteps; i++) {
              steps.push(
                <div key={i * 2} className={`rounded-full border border-neutral-5 w-8 h-8 flex items-center justify-center flex-shrink-0 ${step >= i + 1 ? 'bg-neutral-5' : 'bg-none'}`}>
                  <div className='text-small'>
                    <div className={`${step >= i + 1 ? 'text-neutral-8' : 'text-neutral-5'}`}>
                      {i + 1}
                    </div>
                  </div>
                </div>

              );
              steps.push(
                <div key={i * 2 + 1} className='flex-shrink w-full h-0.5 bg-[#B4B4B4] last:hidden'>
                </div>
              );
            }
            return steps;
          })()}
        </div>
        {Steps[step - 1].component}
      </div>
    </>
  )
}

export default SignUp