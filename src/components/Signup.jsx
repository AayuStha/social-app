import React from 'react'
import { Link } from 'react-router-dom';


const Signup = () => {
  return (
    <>
      <div className='text-black flex flex-col justify-center items-center mt-20 border-2 p-20 mx-auto w-full max-w-md rounded-2xl'>
            <h1 className='font-bold mb-10 text-4xl'>Signup Form</h1>
            <input 
                    type="name" 
                    placeholder='Enter your Name'
                    className='border mb-10 p-3 w-full rounded-4xl'
            />
            <input 
                    type="email" 
                    placeholder='Enter your email'
                    className='border p-3 mb-10 w-full rounded-4xl'    
            />
            <input 
                type="password" 
                placeholder='Enter your password'
                className='border p-3 mb-10 w-full rounded-4xl'    
            />
            <button className='border-2 p-3 m-2 w-full bg-pink-800 text-white border-black transform transition active:scale-95 rounded-2xl'>Signup</button>
            <p>
                Already Have an Account?
                <Link to="/" className="text-blue-600 underline ml-1">Login here</Link>
            </p>
        </div>
    </>
  )
}

export default Signup
