"use client";
import React, { useEffect } from 'react'
import Header from '../components/Header'
import CheckboxSvg from '../components/assets/CheckboxSvg';
import BinSvg from '../components/assets/BinSvg';
import ExternalSvg from '../components/assets/ExternalSvg';
import SettingsSvg from '../components/assets/SettingsSvg';
import Link from 'next/link';
import SendButtonSvg from '../components/assets/SendButtonSvg';
import ConversationSvg from '../components/assets/ConversationSvg';
import QuestionInCircleSvg from '../components/assets/QuestionInCircleSvg';
import { authFetch } from '../utils';
import { useRouter } from 'next/router';
import { getResponse, startNewChat } from '../services/services';

const Chat = () => {
  // const router = useRouter();

  // useEffect(() => {
  //   // if (!router.isReady) return; // Ensure the router is ready before using it
  //   console.log('Current route:', router.pathname);
  // }, [router]);


  const handleNavigation = (chatId: string) => {
    console.log(chatId);
    // router.push(`/chat/${chatId}`);
    window.location.href = `/chat/${chatId}`;
  };

  return (
    <div className='w-full p-10 max-md:p-4 flex justify-center items-center pt-36'>
      <div className='flex py-0 px-[30px] flex-col justify-center items-center gap-20 w-1/2 max-md:w-full'>
        <div className='flex flex-col items-center gap-3 self-stretch'>
          <div className="flex flex-row flex-wrap items-center text-h6 gap-4 max-md:gap-2 max-md:text-h2 capitalize">
            <div className="font-normal text-white">Explore</div>
            <div className="font-bold text-[#66E7F5]">AI Chatbots</div>
          </div>
          <div className='text-[#8C8C8C] text-medium text-center self-stretch'>
            Leverage the power of AI to access expert guidance tailored for rural connectivity, business growth, and daily problem-solving across diverse industries.
          </div>
        </div>
        <form className='flex py-1 px-5 justify-between items-center w-full rounded-3xl border border-solid border-[#49D5E2] bg-[rgba(228,245,249,0.50)] shadow-[4px_12px_8px_0px_rgba(0,0,0,0.25)]' onSubmit={(e) => {
          e.preventDefault();
          startNewChat((e.target as any).question.value)
            .then((data) => {
              if (data.error) {
              } else {
                // Store the token in localStorage
                console.log('result start new chat',data, data['conversation_id']);
                if (data['conversation_id']) {
                  localStorage.setItem('conversation_id', data['conversation_id']);
                  handleNavigation(data['conversation_id']);
                }
              }
            })
            .catch((error) => {
              console.error('Error:', error);
            })

        }}>
          <label className='flex justify-center items-center gap-2 p-2 w-full'>
            {/* <div className='flex-shrink-0'>
            <MicSvg className='w-7 h-7' />
          </div> */}
            <input name='question' className='w-full text-white text-large font-medium leading-[120%] placeholder:text-white placeholder:text-large placeholder:font-medium placeholder:leading-[120%]' placeholder='Ask anything from here' />
          </label>
          <button className='w-7 h-7'>
            <SendButtonSvg className='w-7 h-7' />
          </button>
        </form>
        <div className='flex justify-center items-center gap-12'>
          <div className='flex flex-col p-2 items-center gap-8'>
            <ConversationSvg className='w-[41px] h-[37px]' />
            <div className='flex flex-col gap-1'>
              <p className='text-medium font-semibold text-white text-center'>
                Expert Consultation
              </p>
              <p className='text-extra-small font-medium text-[#B5B5B5] self-stretch text-center'>
                Connect with AI experts to receive personalized advice on network optimization, rural connectivity, and technology-driven solutions tailored to your needs.
              </p>
            </div>
          </div>
          <div className='flex flex-col p-2 items-center gap-8'>
            <QuestionInCircleSvg className='w-[42px] h-[41px]' />
            <div className='flex flex-col gap-1'>
              <p className='text-medium font-semibold text-white text-center'>
                Interactive Q&A
              </p>
              <p className='text-extra-small font-medium text-[#B5B5B5] self-stretch text-center'>
                Ask questions and get instant, precise answers powered by AI, designed to address challenges in connectivity, infrastructure, and beyond.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
