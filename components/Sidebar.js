import React from 'react'
import Image from "next/image"
import brandLogo from "../Assests/brand-logo.png"
import SidebarLink from './SidebarLink'
import HomeIcon from '@mui/icons-material/Home';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { useSession } from 'next-auth/react';

function Sidebar() {

  const { data: session } = useSession();

  return (
    <div className='hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full'>
        <div className='flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24 bg-inherit'>
            <Image 
            src={brandLogo}
            width={100}
            height={100}
            className="bg-inherit"/>
        </div>
        <div className='space-y-3 mt-4 mb-2.5 xl:ml-24'>
            <SidebarLink text="Home" Icon={HomeIcon} active/>
            <SidebarLink text="Explore" Icon={TagOutlinedIcon}/>
            <SidebarLink text="Notification" Icon={NotificationsOutlinedIcon}/>
            <SidebarLink text="Messages" Icon={MailOutlinedIcon}/>
            <SidebarLink text="Bookmarks" Icon={ BookmarkBorderOutlinedIcon}/>
            <SidebarLink text="Profile" Icon={ PersonOutlinedIcon}/>
            <SidebarLink text="More" Icon={MoreHorizOutlinedIcon}/>
        </div>
        <div className='text-[#d9d9d9] flex items-center justify-center hoverAnimation xl:ml-auto xl:-mr-5 mt-auto'>
          <img 
          src={session?.user?.image}
          alt="userImage"
          className='h-10 w-10 rounded-full xl:mr-2.5'
          />
          <div className='hidden xl:inline leading-5'>
            <h4 className='font-bold'>{session?.user?.name}</h4>
            <p className='text-[#6e767d]'>#{session?.user?.tag}</p>
          </div>
          <MoreHorizOutlinedIcon className='h-5 hidden xl:inline ml-10'/>
        </div>
    </div>
  )
}

export default Sidebar