import React from 'react'
import LogoSvg from './assets/LogoSvg'
import Link from 'next/link'
import MagnifyingGlassSvg from './assets/MagnifyingGlassSvg'

const Header = () => {

  const navs: {
    name: string,
    link: string
  }[] = [
      {
        name: 'Home',
        link: '/'
      },
      {
        name: 'About',
        link: '/about'
      },
      {
        name: 'Blog',
        link: '/blog'
      },
      {
        name: 'Contact',
        link: '/contact'
      },
      {
        name: 'Chat',
        link: '/chat'
      }
    ]

  return (
    <div className='flex justify-between py-4 px-20 pr-10 items-center gap-4 w-full border-b-[0.5px] border-solid border-white bg-black'>
      <div className='flex items-center gap-3 w-fit'>
        <LogoSvg className='w-[46px] h-[42px]' />
        <p className='font-bold text-h3 text-white'>
          NetExpert
        </p>
      </div>
      <div className='flex w-full justify-center items-center gap-4 max-lg:hidden'>
        {navs.map((nav, index) => (
          <Link href={nav.link} key={index} className='font-semibold text-large text-white text-center flex p-3 flex-shrink-0 justify-center'>{nav.name}</Link>
        ))}
      </div>
      <div className='flex items-center gap-6 w-fit'>
        <Link href={'/login'} className='flex py-3 px-9 justify-center items-center gap-1 rounded-[4px] bg-white hover:bg-slate-200 transition duration-300'>
          <p className="text-black text-center font-[Inter] text-[16px] font-semibold leading-[16px] normal-case whitespace-nowrap">
            Log in
          </p>
        </Link>
      </div>
    </div>
  )
}

export default Header