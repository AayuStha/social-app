import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegEdit, FaRegComments } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const Admin = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch posts from localStorage
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        setPosts(storedPosts);
    }, []);

    const handleDelete = (postId) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            const updatedPosts = posts.filter(post => post.id !== postId);
            setPosts(updatedPosts);
            localStorage.setItem('posts', JSON.stringify(updatedPosts));
            alert('Post deleted successfully!');
        }
    };

    const handleEdit = (postId) => {
        const newCaption = prompt('Enter new caption:');
        if (newCaption) {
            const updatedPosts = posts.map(post =>
                post.id === postId ? { ...post, caption: newCaption } : post
            );
            setPosts(updatedPosts);
            localStorage.setItem('posts', JSON.stringify(updatedPosts));
        }
    };

    const addComment = (postId) => {
        const comment = prompt("Enter your comment:");
        if (comment) {
            const updatedPosts = posts.map(post =>
                post.id === postId
                    ? { ...post, comments: [...(post.comments || []), comment] }
                    : post
            );
            setPosts(updatedPosts);
            localStorage.setItem('posts', JSON.stringify(updatedPosts));
        }
    };
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem('admin');  // Assuming you stored user info in localStorage
        navigate('/login'); // Redirect to login page
    };


    const funnyNames = [
        "Bug Hunter 🐛🔫",
        "CPU Overlord 🖥️👑",
        "RAM Goblin 🧌💾",
        "Syntax Error 😂",
        "AI's Long Lost Sibling 🤖",
        "Quantum Coder ⚛️",
        "Console.Log('Mystery User') 🖤",
        "Loading Username... ⏳",
        "Nameless But Dangerous 😈",
        "Ctrl + Alt + Del'd 🚀"
    ];

    // Function to pick a random funny name
    const getRandomFunnyName = () => {
        return funnyNames[Math.floor(Math.random() * funnyNames.length)];
    };

    return (
        <div className="min-h-screen bg-grey-50 p-10">
            <button 
                onClick={handleLogOut}
                className='bg-red-500 w-30 p-3 text-center text-white rounded-xl font-bold transition transform hover:scale-109 hover:bg-red-700 active:scale-95 mb-10 md:mb-4 lg:mb-0'
            >
                ← Logout
            </button>
            <div className="max-w-4xl mx-auto text-black p-8 rounded-xl shadow-2xl border border-gray-300">
                <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800 ">Admin Panel</h1>

                {/* Posts Section */}
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">All Posts</h2>
                <div className="space-y-6">
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <div key={post.id} className=" p-6 rounded-lg shadow-2xs transform transition-transform hover:shadow-xl border border-gray-400 bg-amber-50">
                                <h3 className="text-2xl font-semibold text-gray-800">{post.title}</h3>
                                <p className="text-gray-600 mt-2">{post.caption}</p>
                                <p className="text-gray-500 mt-1 text-sm">Posted by: {post.createdByName || getRandomFunnyName()}</p>
                                
                                {/* Comments Section */}
                                <div className="mt-4">
                                    <h4 className="text-lg font-semibold text-gray-700">Comments:</h4>
                                    {post.comments && post.comments.length > 0 ? (
                                        post.comments.map((comment, index) => (
                                            <p key={index} className="text-gray-500 bg-gray-200 p-2 rounded mt-2">{comment}</p>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">No comments yet.</p>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-4 mt-6">
                                    <button onClick={() => handleEdit(post.id)} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all ease-in-out duration-300">
                                        <FaRegEdit />
                                    </button>
                                    <button onClick={() => handleDelete(post.id)} className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-all ease-in-out duration-300">
                                        <MdDeleteOutline />
                                    </button>
                                    <button onClick={() => addComment(post.id)} className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-all ease-in-out duration-300">
                                        <FaRegComments />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center font-bold p-20">
                            No posts available.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;