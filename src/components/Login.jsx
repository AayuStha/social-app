import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';  // You can use Axios for making HTTP requests

function Login({ setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');  // Add password state
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/auth/login', {
                email,
                password,
            });
    
            const user = response.data.user;
    
            if (user) {
                setUser(user);
                navigate('/home');
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Error object:', error);
    
            if (error.response) {
                console.error("Error response:", error.response);
                alert(`Login failed: ${error.response.data.message || 'Unknown error'}`);
            } else if (error.request) {
                console.error("Error request:", error.request);
                alert('No response received from the server');
            } else {
                console.error("Error message:", error.message);
                alert(`Error: ${error.message}`);
            }
        }
    };

    return (
        <>
            <div className='text-black flex flex-col justify-center items-center mt-30 border-2 p-20 mx-auto w-full max-w-md rounded-2xl'>
                <div className="w-50 flex flex-col justify-center items-center">
                    <img
                        src="https://i.pinimg.com/originals/ae/bf/f8/aebff820fd4da79db61299c3ac69bd9a.png"
                        alt="Logo"
                    />
                </div>
                <h1 className='font-bold mb-10 text-4xl'>Login Form</h1>
                <input 
                    type="email" 
                    value={email}
                    placeholder='Enter your email'
                    className='border mb-10 p-3 w-full rounded-4xl'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    value={password}
                    placeholder='Enter your password'
                    className='border mb-10 p-3 w-full rounded-4xl'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                    className='border-2 p-3 m-2 w-full bg-blue-800 text-white border-black transform transition active:scale-95 rounded-2xl'
                    onClick={handleLogin}    
                >
                    Login
                </button>
                <p>
                    Don't Have an Account?
                    <Link to="/signup" className="text-blue-600 underline ml-1">Signup here</Link>
                </p>
            </div>
        </>
    );
}

export default Login;