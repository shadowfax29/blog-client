import { useLocation } from 'react-router-dom';
import axios from "../config/axios";
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../context/authcontext';
import DOMPurify from "dompurify";
import DriveFileRenameOutlineTwoToneIcon from '@mui/icons-material/DriveFileRenameOutlineTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';


export default function Detail() {
    const [detail, setDetail] = useState(null);
    const [comment, setComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingCommentContent, setEditingCommentContent] = useState('');
    const { user } = useAuth();

    const location = useLocation();
    const { id } = location.state;

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`/api/posts/${id}`);
                setDetail(res.data);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [id]);

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleEditCommentChange = (event) => {
        setEditingCommentContent(event.target.value);
    };

    const handleDeleteClick = async (commentId) => {
        try {
            await axios.delete(`/api/posts/${id}/comments/${commentId}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });

            setDetail((prevDetail) => ({
                ...prevDetail,
                comments: prevDetail.comments.filter((comment) => comment._id !== commentId),
            }));
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const handleEditClick = (commentId, content) => {
        setEditingCommentId(commentId);
        setEditingCommentContent(content);
    };

    const handleSaveClick = async (commentId) => {
        try {
            const response = await axios.put(`/api/posts/${id}/comments/${commentId}`, { content: editingCommentContent }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });

            setDetail((prevDetail) => ({
                ...prevDetail,
                comments: prevDetail.comments.map((comment) =>
                    comment._id === commentId ? response.data : comment
                ),
            }));

            setEditingCommentId(null);
            setEditingCommentContent('');
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`/api/posts/${id}/comments`, { content: comment }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });

            setDetail((prevDetail) => ({
                ...prevDetail,
                comments: [...prevDetail.comments, response.data],
            }));

            setComment('');
        } catch (err) {
            console.log(err);
        }
    };

    if (!detail) {
        return <div className="container mt-5 text-center">Loading...</div>;
    }

    return (
        <div className="container mt-5 pb-5" style={{ minHeight: '80vh' }}>
          
         
                <h1 className=" mb-4 status-tag status-pending">DETAIL</h1>
                {detail.featuredImage && (
                    <div className="mb-4">
                        <img src={detail.featuredImage} alt={detail.title} className="img-fluid rounded" />
                    </div>
                )}
                <div className="mb-3 ">
                    <b className='status-tag status-active'>Author:</b> {detail.author.username}
                </div>
                <div className="mb-3">
                    <b className='status-tag status-cancelled'>Created At:</b> {new Date(detail.createdAt).toLocaleString()}
                </div>
                <div className="mb-4">
                    <b className='status-tag status-completed'>Content:</b>
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(detail.context) }} />
          

                </div>
                <div className="mb-4">
                    <b className='status-tag status-cc'>Comments:</b>
                    {detail.comments && detail.comments.length > 0 ? (
                        detail.comments.map((comment) => (
                            <div key={comment._id} className="d-flex justify-content-between alert alert-secondary mt-2">
                                {editingCommentId === comment._id ? (
                                    <input
                                        type="text"
                                        value={editingCommentContent}
                                        onChange={handleEditCommentChange}
                                        className="form-control"
                                    />
                                ) : (
                                    <p className="mb-0">{comment.content}</p>
                                )}
                          
                            { user && (user._id === detail.author._id || user._id === comment.author[0]) && (
                                <div>
                                    {editingCommentId === comment._id ? (
                                        <button className="btn btn-success" onClick={() => handleSaveClick(comment._id)}>
                                            <SaveTwoToneIcon />
                                        </button>
                                    ) : (
                                        <>
                                            <button className="btn" onClick={() => handleDeleteClick(comment._id)}>
                                                <DeleteTwoToneIcon />
                                            </button>
                                            <button className="btn" onClick={() => handleEditClick(comment._id, comment.content)}>
                                                <DriveFileRenameOutlineTwoToneIcon />
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                </div>
                ))
                ) : (
                <div className="alert alert-secondary mt-2">No comments yet.</div>
                )}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="comment"
                    value={comment}
                    onChange={handleCommentChange}
                    className="form-control mb-2"
                    placeholder="Add a comment"
                    required
                />
                <button type="submit" className="btn btn-warning">Add</button>
            </form>
        </div>
    );
}
