import React from 'react'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function Post({id,post,postPage}) {
  return (
    <div className='p-3 flex cursor-pointer border-b border-gray-700'>
        {!postPage && (
            <img 
                src="https://pngset.com/images/lion-svg-clip-arts-lion-head-silhouette-symbol-logo-trademark-graphics-transparent-png-41159.png"
                className='h-11 w-11 rounded-full mr-4'
                alt="profile-pic"
            />
        )}
        <div className='flex flex-col space-y-2 w-full'>
            <div className={`flex ${!postPage && "justify-between"}`}>
                {postPage && (
                    <img
                        src="https://pngset.com/images/lion-svg-clip-arts-lion-head-silhouette-symbol-logo-trademark-graphics-transparent-png-41159.png"
                        className='h-11 w-11 rounded-full mr-4'
                        alt="profile-pic"
                    />
                )}
                <div className='text-[#6e767d]'>
                    <div className='inline-block group'>
                        <h4 className={`font-bold text-[15px] sm:text-base text-[#d9d9d9]
                         group-hover:underline`}>
                            {post?.username}
                        </h4>
                    </div>
                    .{" "}
                    <span className='hover:underline text-sm sm:text-[15px]'>
                        {/* <Moment fromNow>{post?.timestamp?.toDate()}</Moment> */}
                    </span>
                    {!postPage &&(
                        <p className='text-[#d9d9d9] text-[15px] sm:text-base mt-0.5'>
                            {post?.text}
                        </p>
                    )}
                </div>
                <div className='icon group flex-shrink-0 ml-auto'>
                    <MoreHorizOutlinedIcon className='h-5 text-[#6e767d] group-hover:text-violet-600'/>
                </div>
            </div>
            {postPage && (
                <p className='text-[#d9d9d9] text-[15px] sm:text-base mt-0.5'>
                    {post?.text}
                </p>
            )}
            <img 
                src={post?.image}
                className="rounded-2xl max-h-[700px] object-contain mr-2"
            />
            <div className={`text-[#6e767d] flex justify-between w-10/12 ${postPage && "mx-auto"}`}>
                <div className='hover:text-purple-500'>
                    <ChatBubbleOutlineOutlinedIcon/>
                </div>
                <div className='hover:text-red-500'>
                    <FavoriteBorderOutlinedIcon/>
                </div>
                <div className='hover:text-red-500'>
                    <DeleteOutlineIcon/>
                </div>
                <div className='hover:text-purple-500'>
                    <BookmarkBorderIcon/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post