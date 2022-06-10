import Link from 'next/link'
import { useRouter } from 'next/router';
import React,{useState} from 'react'
import { useAuth } from '../context/AuthContext'

function Login() {

    const router= useRouter();
    const {user,login}=useAuth();

    const [data,setData]=useState({
        email:"",
        password:"",
    })

    const handleSubmit= async (e)=>{
        e.preventDefault()
        try{
            await login(data.email,data.password);
            router.push("/");
        }catch(err){
            console.log("login error",err);
        }
    }

    const testCredits=()=>{
        setData({
            email:"abc@gmail.com",
            password:"qwerty123"
        })
    }

  return (
    <div className='text-white flex items-center justify-center h-screen'>
        <section className="border border-gray-300 p-5 max-w-sm rounded-2xl">
            <div className="login-container container flex flex-col items-center justify-center">
                <form onSubmit={handleSubmit}>
                    <h1 className='mb-2 font-bold text-lg'>LogIn</h1>
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
                    <button className="login-btn">LogIn</button>
                    <button className="login-btn" onClick={()=>testCredits()}>LogIn with test credits</button>
                    <small className="flex items-center justify-between">
                        <span>Don&#x27;t have an account</span>
                        <span className='hover:underline'><Link href="/Signup">signup</Link></span>
                    </small>
                </form>
            </div>
        </section>
    </div>
  )
}

export default Login