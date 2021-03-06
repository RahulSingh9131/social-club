import Image from 'next/image'
import React from 'react'
import Moment from 'react-moment'

function Comment({id,comment}) {
  return (
    <div className='flex cursor-pointer p-3 border-b border-gray-700'>
        <Image 
            src={comment?.userImg}
            alt="user-img"
            className='h-11 w-11 rounded-full mr-4'
            width={50}
            height={50}
        />
        <div className='flex flex-col space-y-2 w-full'>
            <div className='flex justify-between'>
                <div className='text-[#6e767d]'>
                    <div className='inline-block group'>
                        <h4 className='font-bold text-[#d9d9d9] text-[15px]
                        sm:text-base inline-block group-hover:underline'>
                            {comment?.username}
                        </h4>
                    </div>
                    .{" "}
                    <span className='hover:underline text-sm sm:text-[15px]'>
                        <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
                    </span>
                    <p className='text-[#d9d9d9] mt-0.5 max-w-lg
                    text-[15px] sm:text-base'>
                        {comment?.comment}
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Comment