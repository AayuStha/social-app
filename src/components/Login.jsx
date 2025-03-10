//useState → Stores the user’s email.
import React, {useState} from 'react'
import { Link, useNavigate  } from 'react-router-dom';

function Login( {setUser}) {

    //setUser is passed from App.jsx to update the user.
    //email stores the entered email.
    const [email, setEmail] = useState('');

    //email stores the entered email.
    const navigate = useNavigate();

    const admin = {
        "email": "admin@admin.com"
    }

    if (email.toLowerCase() === admin.email.toLowerCase()) {
        // Save admin info in localStorage.
        localStorage.setItem('user', JSON.stringify(admin));
        // Set user using setUser.
        setUser(admin);
        navigate('/admin');
    }

    const handleLogin = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();

        //check if entered email exists in the API.
        const foundUser = users.find (user => user.email.toLowerCase() === email.toLowerCase());

        if (foundUser) {
            //Save user info in localStorage.
            localStorage.setItem ('user', JSON.stringify(foundUser));
            //Set user using setUser.
            setUser(foundUser);
            navigate('/home');
        }
        else{
            alert('Invalid email');
        }
    
    };

    return (
        <div className='text-black flex flex-col justify-center items-center mt-30 border-2 p-20 mx-auto w-full max-w-md rounded-2xl'>
            <h1 className='font-bold mb-10 text-4xl'>Login Form</h1>
            <input 
                type="email" 
                value={email}
                placeholder='Enter your email'
                className='border mb-10 p-3 w-full rounded-4xl'
                onChange={(e) => setEmail(e.target.value)}
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
    );
}

export default Login;