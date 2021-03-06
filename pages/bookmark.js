import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import LandingPage from '../components/LandingPage';
import BookmarkPost from '../components/BookmarkPost';
import brandLogo from "../Assests/brand-logo.png";
import { useSelector } from 'react-redux'
import { getProviders, getSession, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';


function Bookmark({providers}) {
  const {bookmark}=useSelector((store)=>store.bookmark);
  const router=useRouter();
  const { data: session } = useSession();

  if(!session) return <LandingPage providers={providers}/>


  return (
    <div className="">
      <Head>
        <title>Bookmark</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className='bg-black min-h-screen flex max-w-[1500px] mx-auto'>
        <Sidebar/>
        <div className='text-white flex-grow border-l border-r border-gray-700
          max-w-2xl sm:ml-[73px] xl:ml-[360px]'>
              <div className='flex items-center px-1.5 py-2 border-b
              border-gray-700 text-[#d9d9d9] font-semibold text-xl
              gap-x-4 sticky top-0 z-30 bg-black  sm:justify-between'>
                  <div className='flex items-center justify-center xl:px-0 hoverAnimation w-9 h-9'>
                      <ArrowBackIcon className="text-white" onClick={()=>router.push("/")}/>
                  </div>
                  <h2 className='text-lg sm:text-xl font-bold'>Bookmarks</h2>
                  <div className='hoverAnimation flex items-center justify-center w-9 h-9 xl:px-0 ml-auto'
                  onClick={signOut}>
                      <LogoutIcon/>
                  </div>
              </div>
              {bookmark.length>0 ? (
                <div>
                  {bookmark.map((post)=>(
                    <BookmarkPost key={post._id} post={post} _id={post._id} postPage/>
                  ))}
                </div>
              ):(
                <div className='flex flex-col items-center justify-center space-y-3 w-full pt-2 px-4'>
                    <Image 
                      src={brandLogo}
                      width={200}
                      height={200}
                      className="contain"
                      alt="brandlogo"
                    />
                    <h1 className='text-[#d9d9d9] font-semibold text-lg'>
                      You have not bookmarked any post yet.
                    </h1>
                </div>
              )}
        </div>
        {/* widgets */}
      </main>
    </div>
  )
}

export default Bookmark

export async function getServerSideProps(context){
  const providers= await getProviders();
  const session = await getSession(context);

  return {
    props:{
      providers,
      session,
    }
  }
}