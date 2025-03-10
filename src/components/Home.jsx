import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home({ user }) {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    //This state holds the data for the post that the user is currently writing. It has fields for the title, caption, and image.
    const [newPost, setNewPost] = useState({title: '', caption:''});


    //useEffect: This hook runs after the component mounts (loads) and is used to fetch the posts from localStorage when the component first loads.
	//localStorage.getItem('posts'): Fetches posts that were previously saved in localStorage. If there are no posts saved, it returns null.
	//JSON.parse: Converts the string stored in localStorage back into an array of posts.
	//setPosts(fetchedPosts): Updates the posts state with the fetched posts.
	//The empty array [] as the second argument means that this useEffect will only run once, when the component mounts.

    useEffect(() => {
        const fetchedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        setPosts(fetchedPosts);
    }, []);

    //This function is triggered when the user wants to create a new post.
    const createPost = () => {
        const post = {
            id: Date.now(),
            title: newPost.title,
            caption: newPost.caption,
            createdBy: user.id,
            createdByName: user.name,  // Add the user's name to the post data
            createdAt: new Date().toISOString(),
        };

        //This adds the new post to the existing list of posts (spread operator ... to copy the old posts).
        const updatedPosts = [...posts, post];
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        setNewPost({title: '', caption: ''});
    }

    const editPost = (postId, updatedContent) => {
        //Loops through all the posts and updates the one with the matching postId. If it finds a match, it merges 
        const updatedPosts = posts.map((post) => 
            //({ ...post, ...updatedContent }) the old post with the updated content.
            post.id === postId ? { ...post, ...updatedContent } : post
        );
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    const deletePost = (postId) => {
        const updatedPosts = posts.filter((post) => post.id !== postId);
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    // Logout function
    const logout = () => {
        // Clear user session or token (you can modify this based on your auth strategy)
        localStorage.removeItem('user');  // Assuming you stored user info in localStorage
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 py-10 px-6">
            {/* Left Side: Create Post Section */}
            <div className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-lg mb-6 md:mb-0">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create a New Post</h2>
                <div className="space-y-4">
                    <div className="flex items-center mb-4">
                        <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="profile" className="w-10 h-10 rounded-full mr-3" />
                        <h3 className="text-lg font-semibold text-gray-700">{user.name}</h3>
                    </div>
                    {/* Post Title Input */}
                    <input
                        type="text"
                        placeholder="Post Title"
                        className="w-full p-3 border rounded-lg bg-gray-50 mb-4"
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    />
                    {/* Post Caption Textarea */}
                    <textarea
                        placeholder="What's on your mind?"
                        className="w-full p-3 border rounded-lg bg-gray-50 mb-4 resize-none"
                        value={newPost.caption}
                        onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
                    />
                    <button
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                        onClick={createPost}
                        disabled={!newPost.title || !newPost.caption}
                    >
                        Post
                    </button>

                    <button
                        className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                        onClick={logout}
                        
                    >
                        Logout
                    </button>
                </div>
            </div>
    
            {/* Right Side: Posts Section */}
            <div className="w-full md:w-2/3 p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Feed</h2>
    
                {/* Display Posts */}
                {posts.map((post) => (
                    <div key={post.id} className="mb-6 p-4 border-b">
                        <div className="flex items-center mb-4">
                        <img 
                            src="https://plus.unsplash.com/premium_photo-1732757787074-0f95bf19cf73?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGVmYXVsdCUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D" 
                            alt="profile" 
                            className="w-10 h-10 rounded-full mr-3" 
                        />
                        <h3 className="text-lg font-semibold text-gray-700">{post.createdByName}</h3>
                    </div>
                        <p className="text-gray-700 mb-4">{post.caption}</p>
                        
                        {/* Edit/Delete Buttons (Only visible for the current user's posts) */}
                        {post.createdBy === user.id && (
                            <div className="flex space-x-6 text-gray-600">
                                <button
                                    className="flex items-center space-x-2 text-blue-500"
                                    onClick={() => editPost(post.id, { caption: prompt('Edit Caption', post.caption) || post.caption })}
                                >
                                    Edit
                                </button>
                                <button
                                    className="flex items-center space-x-2 text-red-500"
                                    onClick={() => deletePost(post.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;