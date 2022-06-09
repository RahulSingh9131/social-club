import React from 'react'
import Moment from 'react-moment';
import DeleteIcon from '@mui/icons-material/Delete';
import { removePost } from '../features/bookmarkSlice';
import { useDispatch } from 'react-redux';

function BookmarkPost({_id,post,postPage}) {
    const dispatch=useDispatch();

  return (
    <div className='p-3 flex cursor-pointer border-b border-gray-700'>
        {!postPage && (
            <img 
                src={post?.userImg}
                className='h-11 w-11 rounded-full mr-4'
                alt="profile-pic"
            />
        )}
        <div className='flex flex-col space-y-2 w-full'>
            <div className={`flex ${!postPage && "justify-between"}`}>
                {postPage && (
                    <img
                        src={post?.userImg}
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
                        <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                    </span>
                    {!postPage &&(
                        <p className='text-[#d9d9d9] text-[15px] sm:text-base mt-0.5'>
                            {post?.text}
                        </p>
                    )}
                </div>
                <div className='icon group flex-shrink-0 ml-auto'>
                    <DeleteIcon 
                        className='h-5 text-[#6e767d] group-hover:text-violet-600'
                        onClick={()=>dispatch(removePost(_id))}
                    />
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
        </div>
    </div>
  )
}

export default BookmarkPost