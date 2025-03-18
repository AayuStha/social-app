import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    // State to store new user details
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    // Function to make API call for signup
    const signupUser = async (user) => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/auth/signup', {
                name: user.name,
                email: user.email,
                password: user.password
            });

            if (response.status === 201) {
                // Navigate to the homepage on successful signup
                navigate('/home');
            }
        } catch (error) {
            console.error(error.response?.data?.message || 'Signup Failed');
            alert('Signup Failed: ' + error.response?.data?.message);
        }
    };

    // Function to handle the signup form submission
    const handleSignup = () => {
        const { name, email, password } = newUser;

        // Check if all fields are filled
        if (name && email && password) {
            signupUser(newUser); // Call the signup function if all fields are filled
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <div className='text-black flex flex-col justify-center items-center mt-20 border-2 p-20 mx-auto w-full max-w-md rounded-2xl'>
            <h1 className='font-bold mb-10 text-4xl'>Signup Form</h1>
            <input
                type="text"
                placeholder="Enter your Name"
                className="border mb-4 p-3 w-full rounded-4xl"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
                type="email"
                placeholder="Enter your Email"
                className="border mb-4 p-3 w-full rounded-4xl"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Enter your Password"
                className="border mb-4 p-3 w-full rounded-4xl"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <button
                className='border-2 p-3 m-2 w-full bg-blue-800 text-white border-black transform transition active:scale-95 rounded-2xl'
                onClick={handleSignup}
            >
                Signup
            </button>
        </div>
    );
};

export default Signup;