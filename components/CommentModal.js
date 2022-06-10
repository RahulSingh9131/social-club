import { Fragment, useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import Moment from 'react-moment';
import { Dialog, Transition } from "@headlessui/react";
import {setIsModalOpen} from "../features/postSlice";
import { useDispatch, useSelector } from 'react-redux';
import { addDoc, collection, doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";

function CommentModal() {
    const {isModalOpen,postId}=useSelector((store)=>store.post);
    const {data: session} =useSession();
    const router= useRouter();
    const dispatch=useDispatch();
    const [post,setPost]=useState();
    const [comment,setComment]=useState("");

    useEffect(
        () =>
          onSnapshot(doc(db, "posts", postId), (snapshot) => {
            setPost(snapshot.data());
          }),
        [postId]
      );

    const sendComment= async (e)=>{
        e.preventDefault()

        await addDoc(collection(db,"posts",postId,"comments"),{
            comment:comment,
            username:session.user.name,
            userImg:session.user.image,
            timestamp:serverTimestamp(),
        })
        dispatch(setIsModalOpen(false));
        setComment("");

        router.push(`/${postId}`);
    }

  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="fixed z-50 inset-0 pt-8" onClose={()=>dispatch(setIsModalOpen(false))}>
            <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
                </Transition.Child>

                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                <div className="modal-container">
                    <div className='flex items-center px-1.5 py-2 border-b border-gray-700'>
                        <div className='hoverAnimation flex items-center justify-center w-9 h-9 xl:px-0'>
                            <CloseIcon className='text-white h-[22px]' onClick={()=>dispatch(setIsModalOpen(false))}/>
                        </div>
                    </div>
                    <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                        <div className="w-full">
                            <div className="text-[#6e767d] flex gap-x-3 relative">
                                <span className="w-0.5 h-full z-[-1] absolute left-5 top-11 bg-gray-600"/>
                                <Image src={post?.userImg} alt="profile-pic" className="h-11 w-11 rounded-full" width={100} height={100}/>
                                <div>
                                    <div className="inline-block group">
                                        <h4 className="font-bold text-[15px] sm:text-base text-[#d9d9d9]
                                            group-hover:underline">
                                            {post?.username}
                                        </h4>
                                    </div>
                                    .{" "}
                                    <span className="hover:underline text-sm sm:text-[15px]">
                                        <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                                    </span>
                                    <p className="text-[#d9d9d9] text-[15px] sm:text-base">
                                        {post?.text}
                                    </p>                                
                                </div>
                            </div>
                            <div className="flex mt-7 space-x-3 w-full">
                                <Image
                                    src={session?.user?.image}
                                    className="h-11 w-11 rounded-full"
                                    alt="userImage"
                                    width={100}
                                    height={100}
                                />
                                <div className="flex-grow mt-2">
                                    <textarea
                                        value={comment}
                                        onChange={(e)=>setComment(e.target.value)}
                                        placeholder="enter comments here..."
                                        className="bg-transparent outline-none text-white
                                        text-lg placeholder-gray-500 tracking-wide w-full min-h-[80px]"
                                    />
                                    <div className="flex items-center justify-end py-2">
                                        <button className='bg-violet-500 text-white rounded-full px-4 py-1.5 font-bold shadow-md
                                        disabled:hover:bg-violet-300 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-default'
                                        type="submit"
                                        disabled={!comment.trim() } 
                                        onClick={sendComment}>
                                            comment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition.Root>
  )
}

export default CommentModal