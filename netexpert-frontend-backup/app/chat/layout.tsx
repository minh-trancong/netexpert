"use client";

import React from 'react'
import Header from '../components/Header'
import Link from 'next/link'
import BinSvg from '../components/assets/BinSvg'
import ExternalSvg from '../components/assets/ExternalSvg'
import SettingsSvg from '../components/assets/SettingsSvg'
import MicSvg from '../components/assets/MicSvg';
import SendButtonSvg from '../components/assets/SendButtonSvg';

interface NestedChatLinks {
  timetitle: string;
  chats: ChatLinks[];
}

interface ChatLinks {
  title: string;
  id: string;
}


const layout = ({ children }: { children: React.ReactNode }) => {

  const demoData: NestedChatLinks[] = [
    {
      timetitle: 'Today',
      chats: [
        {
          title: 'John Doe',
          id: '1'
        },
        {
          title: 'Jane Doe',
          id: '2'
        }
      ]
    },
    {
      timetitle: 'Yesterday',
      chats: [
        {
          title: 'John Doe',
          id: '1'
        },
        {
          title: 'Jane Doe',
          id: '2'
        }
      ]
    }
  ]


  return (

    <div className="flex w-screen h-screen flex-col">
      <Header />
      <div className="h-full w-full flex justify-center items-center bg-black bg-[radial-gradient(ellipse_at_61.25%_46.98%,_rgba(129,236,255,0.40)_0%,_rgba(109,226,239,0.12)_79.36%,_rgba(255,255,255,0)_100%)] overflow-hidden">
        <div className='h-full w-80 flex flex-col p-7 pb-16 bg-black bg-[linear-gradient(180deg,_rgba(0,5,5,0.20)_-7.36%,_rgba(162,242,254,0.20)_29.48%,_rgba(106,185,216,0.20)_48.12%,_rgba(255,255,255,0.20)_99.77%)] backdrop-blur-[20px] gap-24'>
          <div className='h-full overflow-y-auto'>
            <div className='flex h-full w-full'>

            </div>
          </div>
          <div className='flex flex-col gap-3 w-full'>
            <div className='flex items-center gap-3 cursor-pointer' onClick={() => {

            }}>
              <BinSvg className='w-6 h-6' />
              <p className='text-white font-semibold text-extra-small'>
                Clear all conversations
              </p>
            </div>
            <Link href='faq' className='flex items-center gap-3'>
              <ExternalSvg className='w-6 h-6' />
              <p className='text-white font-semibold text-extra-small'>
                Update and FAQ's
              </p>
            </Link>
            <Link href={'settings/chat'} className='flex items-center gap-3'>
              <SettingsSvg className='w-6 h-6' />
              <p className='text-white font-semibold text-extra-small'>
                Settings
              </p>
            </Link>
          </div>

        </div>
        <div className='h-full w-full overflow-y-auto'>
          {children}

        </div>

      </div>
    </div>
  )
}

export default layout