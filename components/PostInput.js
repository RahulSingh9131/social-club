import React,{useRef, useState} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

function PostInput() {
    const [inputValue,setInputValue]=useState("");
    const [selectedFile,setSelectedFile]=useState(null);
    const [showEmoji,setShowEmoji]=useState(false);
    const [loading,setLoading]=useState(false);
    const filePickerRef=useRef(null);

    const {user,logout}=useAuth();
    const router= useRouter();

    const {data: session}=useSession();

    const addImageToPost=(e)=>{
        const reader= new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload= (readerEvent)=>{
            setSelectedFile(readerEvent.target.result);
        };
    };

    const sendPost= async ()=>{
        if(loading) return;
        setLoading(true);
        const docRef= await addDoc(collection(db,'posts'),{
            id:session.user.uid,
            username:session.user.name,
            userImg:session.user.image,
            tag:session.user.tag,
            text: inputValue,
            timestamp: serverTimestamp(),
        });

        const imageRef= ref(storage, `posts/${docRef.id}/image`);

        if(selectedFile){
            await uploadString(imageRef,selectedFile,"data_url").then(async ()=>{
                const downloadURL = await getDownloadURL(imageRef)
                await updateDoc(doc(db,"posts",docRef.id),{
                    image : downloadURL,
                });
            });
        }

        setLoading(false);
        setInputValue("");
        setSelectedFile(null);
    }

  return (
    <div className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll ${loading && "opacity-70"}`}>
        <img 
            src={session?.user?.image}
            alt="userImage"
            className='h-11 w-11 rounded-full cursor-pointer'
            onClick={()=>{logout(); router.push("/");}}
        />
        <div className='w-full divide-y divide-gray-700'>
            <div className={`${selectedFile && "pb-7"} ${inputValue && "space-y-3"}`}>
                <textarea 
                    value={inputValue} 
                    onChange={(e)=>setInputValue(e.target.value)}
                    rows="2" 
                    name=''
                    placeholder='Post your thoughts here..'
                    className='bg-transparent outline-none text-[#d9d9d9]
                    text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]'
                />
                {selectedFile && (
                <div className='relative'>
                    <div className='absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26]
                    bg-opacity-75 rounded-full flex items-center justify-center top-1
                    left-1 cursor-pointer' onClick={()=>setSelectedFile(null)}>
                        <CloseIcon/>
                    </div>
                    <img 
                        src={selectedFile}
                        alt="selected-file"
                        className="max-h-70 rounded-2xl object-contain"
                    />
                </div>
                )}
            </div>
            {!loading && (
            <div className='flex items-center justify-between pt-2.5 '>
                <div className='flex items-center'>
                    <div className='icon' onClick={()=>filePickerRef.current.click()}>
                        <AddPhotoAlternateIcon className='text-violet-400 h-[22px]' />
                        <input type="file" onChange={addImageToPost} ref={filePickerRef} hidden/>
                    </div>
                    <div className='icon' onClick={()=>setShowEmoji((prev)=>!prev)}>
                        <InsertEmoticonOutlinedIcon className='text-violet-400 h-[22px] ml-2' />
                    </div>
                </div>
                <button className='bg-violet-500 text-white rounded-full px-4 py-1.5 font-bold shadow-md
                disabled:hover:bg-violet-300 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-default'
                disabled={!inputValue.trim() && !selectedFile} onClick={()=>sendPost()}>
                    Post
                </button>
            </div>
            )}
        </div>
    </div>
  )
}

export default PostInput