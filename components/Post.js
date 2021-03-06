import React, { useEffect, useState } from 'react'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Moment from 'react-moment';
import { useSelector,useDispatch } from 'react-redux';
import {setIsModalOpen,setPostId} from "../features/postSlice";
import { savePost,removePost } from '../features/bookmarkSlice';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Image from 'next/image';


function Post({id,post,postPage}) {
    const [comments,setComments]=useState([]);
    const [likes,setLikes]=useState([]);
    const [liked,setLiked]=useState(false);

    const {postId,isModalOpen}=useSelector((store)=>store.post);
    const {bookmark}=useSelector((store)=>store.bookmark);
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
      },[id]);

      useEffect(
        () =>
          onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
            setLikes(snapshot.docs)
          ),
        [id]
      );

      useEffect(
        () =>
          setLiked(
            likes.findIndex((like) => like.id === session?.user?.uid) !== -1
          ),
        [likes,session?.user?.uid]
      );

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
            <Image 
                src={post?.userImg}
                className='h-11 w-11 rounded-full mr-4'
                alt="profile-pic"
                width={100}
                height={100}
            />
        )}
        <div className='flex flex-col space-y-2 w-full'>
            <div className={`flex ${!postPage && "justify-between"}`}>
                {postPage && (
                    <Image
                        src={post?.userImg}
                        className='h-11 w-11 rounded-full mr-4'
                        alt="profile-pic"
                        width={100}
                        height={100}
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
            <Image 
                src={post?.image}
                className="rounded-2xl max-h-[700px] object-contain mr-2"
                alt="post-image"
                width={200}
                height={300}
                priority
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
                <div className='flex items-center group'
                onClick={(e)=>{
                    e.stopPropagation();
                }}>
                    <div >
                        {bookmark.some((c)=>c._id===post?._id) ? (
                            <BookmarkIcon className='text-purple-500' onClick={()=>dispatch(removePost(post?._id))}/>
                        ):(
                            <BookmarkBorderIcon className='hover:text-purple-500' onClick={()=>dispatch(savePost(post))}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post