import NextButton from '@/app/components/NextButton'
import UserEditSvg from '@/app/components/assets/UserEditSvg'
import UsersSvg from '@/app/components/assets/UsersSvg'
import React, { useEffect } from 'react'
import CryptoJS from 'crypto-js';

const CreatePassword = ({ handleSubmit, data }: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  data: {
    name: string,
    username: string,
    email: string,
    orgtype: string,
    orgname: string
  }
}) => {

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitOk, setSubmitOk] = React.useState(true);
  const [password, setPassword] = React.useState('');
  const [retypeOk, setRetypeOk] = React.useState(true);
  const [lengthOk, setLengthOk] = React.useState(true);
  const [uppercaseOk, setUppercaseOk] = React.useState(true);
  const [lowercaseOk, setLowercaseOk] = React.useState(true);
  const [numberOk, setNumberOk] = React.useState(true);

  return (
    <form className='flex flex-col flex-start gap-6 w-full' onSubmit={(e) => {
      e.preventDefault();

      const password = (e.target as any).password.value;
      const retypepassword = (e.target as any).retypepassword.value;
      if (password === retypepassword && lengthOk && uppercaseOk && lowercaseOk && numberOk) {
        fetch('/api/auth/register/2', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: data.username,
            password: CryptoJS.SHA256(password).toString(),
            name: data.name,
            orgtype: data.orgtype,
            orgname: data.orgname
          }),
        })
          .then(response => {
            if (response.status === 401) {
              setSubmitOk(false);
            }
            else if (response.status === 200) {
              return response.json();
            }
          })
          .then(data => {
            if (data.error) {
              setSubmitOk(false);
            }
            else {
              handleSubmit(e);
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });

      }
      else {
        setRetypeOk(password === retypepassword);
        setLengthOk(password >= 8);
        setUppercaseOk(/[A-Z]/.test(password));
        setLowercaseOk(/[a-z]/.test(password));
        setNumberOk(/[0-9]/.test(password));
      }

    }}>
      <div className='flex flex-col flex-start gap-1 w-full'>
        <div className='text-extra-small font-bold text-typography-light-body'>
          Create Password
        </div>
        <label className='w-full h-11'>
          <div className='flex w-full h-full py-[10px] pl-4 pr-20 justify-start items-center gap-[10px] flex-shrink-0 rounded-2xl bg-neutral-7'>
            <UserEditSvg className='w-6 h-6 flex-shrink-0' />
            <input min={8} name="password" type='password' className='text-extra-small font-semibold opacity-70 text-neutral-5' placeholder='Enter password' onChange={(e) => {
              setPassword(CryptoJS.SHA256(e.target.value).toString());
              setLengthOk(e.target.value.length >= 8);
              setUppercaseOk(/[A-Z]/.test(e.target.value));
              setLowercaseOk(/[a-z]/.test(e.target.value));
              setNumberOk(/[0-9]/.test(e.target.value));
            }} />
          </div>
        </label>
        <div className={`text-small text-system-error-300 overflow-hidden transition-all duration-300 ${lengthOk ? 'h-0' : 'h-5'}`}>
          Password should be at least 8 characters
        </div>

        <div className={`text-small text-system-error-300 overflow-hidden transition-all duration-300 ${uppercaseOk ? 'h-0' : 'h-5'}`}>
          Password should contain at least one uppercase letter
        </div>

        <div className={`text-small text-system-error-300 overflow-hidden transition-all duration-300 ${lowercaseOk ? 'h-0' : 'h-5'}`}>
          Password should contain at least one lowercase letter
        </div>

        <div className={`text-small text-system-error-300 overflow-hidden transition-all duration-300 ${numberOk ? 'h-0' : 'h-5'}`}>
          Password should contain at least one number
        </div>

      </div>
      <div className='flex flex-col flex-start gap-1 w-full'>
        <div className='text-extra-small font-bold text-typography-light-body'>
          Re-enter Password
        </div>
        <label className='w-full h-11'>
          <div className='flex w-full h-full py-[10px] pl-4 pr-20 justify-start items-center gap-[10px] flex-shrink-0 rounded-2xl bg-neutral-7'>
            <UsersSvg className='w-6 h-6 flex-shrink-0' />
            <input min={8} name="retypepassword" type='password' className='text-extra-small font-semibold opacity-70 text-neutral-5' placeholder='Retype Password' onChange={(e) => {
              setRetypeOk(CryptoJS.SHA256(e.target.value).toString() === password);
            }} />
          </div>
        </label>
        <div className={`text-small transition-all duration-300 overflow-hidden text-system-error-300 ${(!retypeOk) ? 'h-6' : 'h-0'}`}>
          Passwords do not match
        </div>
      </div>
      <button>
        <NextButton type='Submit' />
      </button>
    </form>
  )
}

export default CreatePassword