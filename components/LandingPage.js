import Image from 'next/image'
import React from 'react'
import Link from 'next/link';
import brandLogo from "../Assests/brand-logo.png";

function LandingPage() {
  return (
    <div className='text-white flex flex-col items-center mt-10 space-y-6 mx-auto p-10 '>
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
        <div className='bg-white rounded-full px-4 py-3 text-black font-bold '>
            <Link href="/login" className=''>
                Login to continue
            </Link>
        </div>
    </div>
  )
}

export default LandingPage