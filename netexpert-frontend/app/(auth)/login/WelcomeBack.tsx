import CheckboxSvg from '@/app/components/assets/CheckboxSvg'
import EmailSvg from '@/app/components/assets/EmailSvg'
import LockSvg from '@/app/components/assets/LockSvg'
import NextButton from '@/app/components/NextButton'
import React from 'react'
import CryptoJS from 'crypto-js'
import Link from 'next/link'
import { authFetch } from '@/app/utils'

const WelcomeBack = ({ handleSubmit }: { handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) => {

  const [submitOk, setSubmitOk] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  return (
    <form className='flex flex-col items-start gap-10 w-5/6 pr-[180px] max-md:pr-[120px] justify-center'
      onSubmit={(e) => {
        e.preventDefault();
        const username = (e.target as any).username.value;
        const password = (e.target as any).password.value;

        if (username && password) {
          setSubmitOk(true);

          const token = localStorage.getItem('token');
          fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: CryptoJS.SHA256(password).toString(),
            }),
          })
            .then((response) => {
              if (response.status === 401) {
                setSubmitOk(false);
              } else if (response.status === 200) {
                return response.json();
              }
              return { error: true };
            })
            .then((data) => {
              if (data.error) {
                setSubmitOk(false);
              } else {
                // Store the token in localStorage
                localStorage.setItem('token', data.token);
                handleSubmit(e);
              }
            })
            .catch((error) => {
              console.error('Error:', error);
            })
            .finally(() => {
              setIsSubmitting(false);
            });
        }

      }}>
      <div className='flex flex-col items-start'>
        <p className='text-h2 font-bold text-typography-light-title'>
          Welcome Back!
        </p>
        <p className='text-extra-small font-medium text-typography-light-body opacity-80'>
          Login to continue
        </p>
      </div>
      <div className='flex flex-col items-start gap-4 w-full'>

        <div className='flex flex-col flex-start gap-[10px] w-full'>
          <div className='text-extra-small font-bold text-typography-light-body'>
            Username
          </div>
          <label className='w-full h-11'>
            <div className='flex w-full h-full py-[10px] pl-4 pr-20 justify-start items-center gap-[10px] flex-shrink-0 rounded-2xl bg-neutral-7'>
              <EmailSvg className='w-6 h-6 flex-shrink-0' />
              <input name="username" className='text-extra-small font-semibold opacity-70 text-neutral-5' placeholder='Enter your username' required />
            </div>
          </label>
        </div>
        <div className='flex flex-col flex-start gap-[10px] w-full'>
          <div className='text-extra-small font-bold text-typography-light-body'>
            Password
          </div>
          <label className='w-full h-11'>
            <div className='flex w-full h-full py-[10px] pl-4 pr-20 justify-start items-center gap-[10px] flex-shrink-0 rounded-2xl bg-neutral-7'>
              <LockSvg className='w-6 h-6 flex-shrink-0' />
              <input type="password" name="password" className='text-extra-small font-semibold opacity-70 text-neutral-5' placeholder='Enter password' required />
            </div>
          </label>
        </div>
        <div className='w-full flex justify-between items-center gap-4'>
          <label className='flex items-center gap-1 group'>
            <div className='w-4 h-4 rounded-md border border-neutral-5 flex items-center justify-center group-has-[:checked]:border-0'>
              <CheckboxSvg className='w-4 h-4 group-has-[:checked]:opacity-100 opacity-0' />
            </div>
            <input type="checkbox" name="keeplogin" className='sr-only' />
            <p className='text-extra-small font-semibold text-neutral-5'>
              Keep me logged in
            </p>
          </label>
          <div className='flex items-start gap-1'>
            <p className='text-extra-small font-semibold text-neutral-5'>
              Forgot password?
            </p>
          </div>
        </div>
        <div className={`w-full flex justify-between gap-2 items-center font-semibold ${submitOk ? 'hidden' : 'visible'}`}>
          <p className='text-extra-small text-system-error-300'>
            Incorrect username or password. Don’t have an account?
          </p>
          <Link href={'/signup'} className='text-extra-small text-neutral-5'>
            Sign up?
          </Link>
        </div>
      </div>
      <button className='w-full'>
        <NextButton type='Login' />
      </button>
    </form>
  )
}

export default WelcomeBack
