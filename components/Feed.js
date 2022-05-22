import React,{useState,useEffect} from 'react'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import PostInput from './PostInput';
import { db } from '../firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Post from './Post';

function Feed() {

  const [posts,setPosts]=useState([]);

  useEffect(()=>{
    const unsubscribe=onSnapshot(
      query(collection(db,"posts"),orderBy("timestamp","desc")),
      (snapshot)=>{
        setPosts(snapshot.docs);
      }
    )

    return ()=>{
      unsubscribe();
    }
  },[db]);

  return (
    <div className='text-white flex-grow border-l border-r border-gray-700
    max-w-2xl sm:ml-[73px] xl:ml-[360px] '>
       <div className='text-[#d9d9d9] flex items-center sm:justify-between
        py-2 px-3 sticky top-0 z-30 bg-black border-b border-gray-700'>
            <h2 className='text-lg sm:text-xl font-bold'>Home</h2>
            <div className='hoverAnimation flex items-center justify-center w-9 h-9 xl:px-0 ml-auto'>
                <StarBorderOutlinedIcon/>
            </div>
       </div>
       <PostInput/>
       <div className='pb-72'>
          {posts.map((post)=>(
            <Post key={post.id} id={post.id} post={post.data()}/>
          ))}
       </div>
    </div>
  )
}

export default Feed