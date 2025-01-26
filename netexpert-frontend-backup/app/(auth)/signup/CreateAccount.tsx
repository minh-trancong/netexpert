import NextButton from '@/app/components/NextButton'
import OrganizationSvg from '@/app/components/assets/OrganizationSvg'
import UserEditSvg from '@/app/components/assets/UserEditSvg'
import UsersSvg from '@/app/components/assets/UsersSvg'
import React from 'react'

const CreateAccount = ({ handleSubmit }: { handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) => {


  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitOk, setSubmitOk] = React.useState(true);


  return (
    <form className='flex flex-col flex-start gap-6 w-full' onSubmit={(e) => {
      e.preventDefault();

      const name = (e.target as any).name.value;
      const username = (e.target as any).username.value;
      const email = (e.target as any).email.value;
      const orgtype = (e.target as any).orgtype.value;
      const orgname = (e.target as any).orgname.value;
      console.log(name, username, orgtype, orgname, email);
      if (name && username && orgtype && orgname && email) {
        console.log(name, username, orgtype, orgname, email);
        fetch('/api/auth/register/1', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            email: email,
            username: username,
            orgtype: orgtype,
            orgname: orgname
          }),
        }).then(response => {
          if (response.status === 400) {
            setSubmitOk(false);
          }
          else if (response.status === 404) {
            setSubmitOk(false);
          }
          else if (response.status === 200) {
            return response.json();
          }
          return { error: true };
        }
        ).then(data => {
          if (data.error) {
            setSubmitOk(false);
          }
          else {
            handleSubmit(e);
          }
        }).catch((error) => {
          console.error('Error:', error);
        });
      }

    }}>
      <div className='flex flex-col flex-start gap-1 w-full'>
        <div className='text-extra-small font-bold text-typography-light-body'>
          Full Name
        </div>
        <label className='w-full h-11'>
          <div className='flex w-full h-full py-[10px] pl-4 pr-20 justify-start items-center gap-[10px] flex-shrink-0 rounded-2xl bg-neutral-7'>
            <UserEditSvg className='w-6 h-6 flex-shrink-0' />
            <input name="name" className='text-extra-small font-semibold opacity-70 text-neutral-5' placeholder='Enter full name' required />
          </div>
        </label>
      </div>
      <div className='flex flex-col flex-start gap-1 w-full'>
        <div className='text-extra-small font-bold text-typography-light-body'>
          Username
        </div>
        <label className='w-full h-11'>
          <div className='flex w-full h-full py-[10px] pl-4 pr-20 justify-start items-center gap-[10px] flex-shrink-0 rounded-2xl bg-neutral-7'>
            <UserEditSvg className='w-6 h-6 flex-shrink-0' />
            <input name="username" className='text-extra-small font-semibold opacity-70 text-neutral-5' placeholder='Enter username' required />
          </div>
        </label>
      </div>
      <div className='flex flex-col flex-start gap-1 w-full'>
        <div className='text-extra-small font-bold text-typography-light-body'>
          Email
        </div>
        <label className='w-full h-11'>
          <div className='flex w-full h-full py-[10px] pl-4 pr-20 justify-start items-center gap-[10px] flex-shrink-0 rounded-2xl bg-neutral-7'>
            <UserEditSvg className='w-6 h-6 flex-shrink-0' />
            <input name="email" className='text-extra-small font-semibold opacity-70 text-neutral-5' placeholder='Enter email' required />
          </div>
        </label>
      </div>
      <div className='flex flex-col flex-start gap-1 w-full'>
        <div className='text-extra-small font-bold text-typography-light-body'>
          Select Category
        </div>
        <label className='w-full h-11'>
          <div className='flex w-full h-full py-[10px] pl-4 pr-20 justify-start items-center gap-[10px] flex-shrink-0 rounded-2xl bg-neutral-7'>
            <UsersSvg className='w-6 h-6 flex-shrink-0' />
            <input name="orgtype" className='text-extra-small font-semibold opacity-70 text-neutral-5' placeholder='Agent/Organization' required />
          </div>
        </label>
      </div>
      <div className='flex flex-col flex-start gap-1 w-full'>
        <div className='text-extra-small font-bold text-typography-light-body'>
          Agency Name
        </div>
        <label className='w-full h-11'>
          <div className='flex w-full h-full py-[10px] pl-4 pr-20 justify-start items-center gap-[10px] flex-shrink-0 rounded-2xl bg-neutral-7'>
            <OrganizationSvg className='w-6 h-6 flex-shrink-0' />
            <input name="orgname" className='text-extra-small font-semibold opacity-70 text-neutral-5' placeholder='Enter agency or organization name' required />
          </div>
        </label>
      </div>
      <button>
        <NextButton type='Next' />
      </button>
    </form>
  )
}

export default CreateAccount