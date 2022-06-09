import Link from 'next/link'
import { useRouter } from 'next/router';
import React,{useState} from 'react'
import { useAuth } from '../context/AuthContext'

function Signup() {

    const router = useRouter();

    const {user,signup}=useAuth();

    const [data,setData]=useState({
        email:"",
        password:"",
    })

    const handleSubmit= async (e)=>{
        e.preventDefault()
        try{
            await signup(data.email,data.password)
            router.push("/");
        }catch(err){
            console.log("signup error",err)
        }
    }


  return (
    <div className="text-white flex items-center justify-center h-screen">
        <section className="border border-gray-300 p-5 max-w-sm rounded-2xl">
            <div className="login-container container flex flex-col items-center justify-center">
                <form onSubmit={handleSubmit}>
                    <h1 className='mb-2 font-bold text-lg'>SignUp</h1>
                    <div className="form-control">
                        <label htmlFor="password">Email</label>
                        <input 
                            type="email" 
                            name='email' 
                            placeholder="abc@gmail.com" 
                            className='text-black p-1 font-medium text-sm'
                            required value={data.email} 
                            onChange={(e)=>setData({...data,[e.target.name]:e.target.value})} 
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            name='password' 
                            placeholder="enter password" 
                            className='text-black p-1 font-medium text-sm'
                            required 
                            value={data.password} 
                            onChange={(e)=>setData({...data,[e.target.name]:e.target.value})} 
                        />
                    </div>
                    <div className="checkbox-container">
                        <div>
                            <input type="checkbox" id="remember"/>
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <Link href="#">Forgot Password?</Link>
                    </div>
                    <button className="login-btn">SignUp</button>
                    <small className="flex items-center justify-between">
                        <span>Already have an account</span>
                        <span className='hover:underline'><Link href="/Login">login</Link></span>
                    </small>
                </form>
            </div>
        </section>
    </div>
  )
}

export default Signup