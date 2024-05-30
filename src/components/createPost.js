import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css'; // import styles
import PostValidation from '../utils/postValidation';
import axios from '../config/axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CreatePost() {
    
    const [post, setPost] = useState({
        title: '',
        featuredImage: null,
        context: '',
        clientErrors: null,
        serverErrors: null,
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };

    const handleContentChange = (value) => {
        setPost({ ...post, context: value });
    };

    const handleFile = (e) => {
        const file = e.target.files[0];
        setPost({ ...post, featuredImage: file });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = PostValidation(post);

        if (Object.keys(errors).length === 0) {
            const formData = {
                title: post.title,
                featuredImage: post.featuredImage,
                context: post.context,
            }


            try {
                const response = await axios.post('/api/posts', formData, {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                        'Content-Type': 'multipart/form-data',
                        
                    },
                });
                console.log(response.data);
                Swal.fire({
                    title: 'Successfully posted',
                    text: 'You can now view your post',
                    icon: 'success',
                });
                navigate('/api/posts/myposts');
            } catch (err) {
                console.log(err.response);
                if (err.response && err.response.data && err.response.data.errors) {
                    const serverErrors = err.response.data.errors.map((error) => error.msg);
                    setPost({
                        ...post,
                        serverErrors: serverErrors,
                        clientErrors: null,
                    });
                } else {
                    console.error('Unexpected error:', err);
                }
            }
        } else {
            setPost({ ...post, clientErrors: errors, serverErrors: null });
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                    />
                    {post.clientErrors && post.clientErrors.title && (
                        <p className="error-msg">{post.clientErrors.title}</p>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="featuredImage" className="form-label">Image Upload</label>
                    <input
                        type="file"
                        className="form-control"
                        id="featuredImage"
                        accept="image/*"
                        onChange={handleFile}
                    />
                    {post.clientErrors && post.clientErrors.featuredImage && (
                        <p className="error-msg">{post.clientErrors.featuredImage}</p>
                    )}
                </div>
                {post.clientErrors && post.clientErrors.context && (
                    <p className="error-msg">{post.clientErrors.context}</p>
                )}

                <ReactQuill theme="snow" value={post.context} onChange={handleContentChange} />

                <button type="submit" className="btn btn-outline-dark mt-3">Submit</button>
            </form>
        </div>
    );
}
