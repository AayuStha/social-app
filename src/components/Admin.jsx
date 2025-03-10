import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch posts
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => setPosts(data));
        
        // Fetch users
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);

    const handleDelete = (postId) => {
        setPosts(posts.filter(post => post.id !== postId));
        alert('Post deleted successfully!');
    };

    const handleEdit = (postId) => {
        const newTitle = prompt('Enter new title:');
        if (newTitle) {
            setPosts(posts.map(post => post.id === postId ? { ...post, title: newTitle } : post));
        }
    };

    return (
        <div className='text-black flex flex-col justify-center items-center mt-30 border-2 p-20 mx-auto w-full max-w-3xl rounded-2xl'>
            <h1 className='font-bold mb-10 text-4xl'>Admin Panel</h1>
            <h2 className='text-2xl mb-5'>Logged-in Users ({users.length})</h2>
            <ul className='mb-10 w-full'>
                {users.map(user => (
                    <li key={user.id} className='border p-2 mb-2 rounded-md'>{user.name}</li>
                ))}
            </ul>
            <h2 className='text-2xl mb-5'>Manage Posts</h2>
            <div className='w-full'>
                {posts.map(post => (
                    <div key={post.id} className='border p-4 mb-4 rounded-xl shadow-md'>
                        <h3 className='font-bold'>{post.title}</h3>
                        <p>{post.body}</p>
                        <div className='flex gap-2 mt-3'>
                            <button 
                                className='bg-green-600 text-white p-2 rounded-md' 
                                onClick={() => handleEdit(post.id)}>Edit</button>
                            <button 
                                className='bg-red-600 text-white p-2 rounded-md' 
                                onClick={() => handleDelete(post.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Admin;
