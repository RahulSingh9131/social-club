import Image from 'next/image'
import React from 'react'
import { signIn } from 'next-auth/react';
import brandLogo from "../Assests/brand-logo.png";
import Head from 'next/head';

function LandingPage({providers}) {
  return (
    <>
      <Head>
        <title>LandingPage</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className='text-white flex flex-col items-center mt-5 space-y-6 mx-auto p-10 md:space-x-3 md:mt-10'>
          <Image 
          src={brandLogo}
          width={200}
          height={200}
          className="contain"
          />
          <h1 className='text-lg font-medium md:text-3xl'>welcome to <span className='text-yellow-300 text-xl md:text-5xl'>Social club</span></h1>
          <p className='max-w-[400px]'>
              Social club is a place,Where just you and a handful of friends can spend time together.
              A place that makes it easy to post your regular stuff and hang out more often.
          </p>
          <div>
            {Object.values(providers).map((provider)=>(
              <div key={provider.name}>
                <button className='bg-white rounded-full px-2 py-2 text-black font-bold hover:text-yellow-600 md:px-4 md:py-3'
                onClick={()=>signIn(provider.id,{callbackUrl:"/"})}>
                  login with {provider.name}
                </button>
              </div>
            ))}
          </div>
      </div>
    </>
  )
}

export default LandingPage