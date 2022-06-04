import React, { useEffect, useState } from 'react'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Moment from 'react-moment';
import { useSelector,useDispatch } from 'react-redux';
import {setIsModalOpen,setPostId} from "../features/postSlice";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { db } from '../firebase';


function Post({id,post,postPage}) {
    const [comments,setComments]=useState([]);
    const [likes,setLikes]=useState([]);
    const [liked,setLiked]=useState(false);

    const {postId,isModalOpen}=useSelector((store)=>store.post);
    const {data: session}=useSession();
    const dispatch=useDispatch();
    const router=useRouter();

    useEffect(()=>{
        const unsubscribe=onSnapshot(
          query(collection(db,"posts",id,"comments"),orderBy("timestamp","desc")),
          (snapshot)=>{
            setComments(snapshot.docs);
          }
        )
    
        return ()=>{
          unsubscribe();
        }
      },[db,id]);

    useEffect(()=>{
        onSnapshot(collection(db,"posts",id,"likes"),
        (snapshot)=>setLikes(snapshot.docs))
    },[db,id])

    useEffect(()=>{
        setLiked(likes.findIndex((like)=>like.id===session?.user?.uid)!==-1)
    },[likes])

    const likePost= async ()=>{
        if(liked){
            await deleteDoc(doc(db,"posts",id,"likes",session.user.uid))
        }else{
            await setDoc(doc(db,"posts",id,"likes",session.user.uid),{
                username: session.user.name,
            });
        }
    };
   
  return (
    <div className='p-3 flex cursor-pointer border-b border-gray-700' onClick={()=>router.push(`/${id}`)}>
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
                <div className='flex items-center space-x-1 group'
                    onClick={(e)=>{
                        e.stopPropagation();
                        dispatch(setPostId(id));
                        dispatch(setIsModalOpen(true));
                    }}
                >
                    <div className='hover:text-purple-500'>
                        <ChatBubbleOutlineOutlinedIcon/>
                    </div>
                    {comments.length>0 && (
                        <span className='text-sm group-hover:text-purple-500'>
                            {comments.length}
                        </span>
                    )}
                </div>
                <div className='flex items-center space-x-1 group'
                onClick={(e)=>{
                    e.stopPropagation();
                    likePost();
                }}>
                    <div className='icon group-hover:bg-red-500/10'>
                        {liked ? (
                            <FavoriteIcon className='text-red-500'/>
                        ):(
                            <FavoriteBorderOutlinedIcon className='group-hover:text-red-600'/>
                        )}
                    </div>
                    {likes.length >0 && (
                        <span className={`group-hover:text-red-600 text-sm ${liked && "text-red-600"}`}>
                            {likes.length}
                        </span>
                    )}
                </div>
                {session.user.uid===post?.id ? (
                    <div className='flex items-center space-x-1 group'
                    onClick={(e)=>{
                        e.stopPropagation();
                        deleteDoc(doc(db,"posts",id));
                        router.push("/");
                    }}>
                        <div className='hover:text-red-500'>
                           <DeleteOutlineIcon/>
                        </div>
                    </div>
                ):(
                    <div className='flex items-center space-x-1 group'>
                        <div className='icon group-hover:bg-green-500/10'>
                            <SwapHorizIcon className='group-hover:text-green-500'/>
                        </div>
                    </div>
                )}
              
                <div className='hover:text-purple-500'>
                    <BookmarkBorderIcon/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post