import { useAuth } from "../context/authcontext";
import axios from "../config/axios";
import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import DOMPurify from "dompurify"
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function AllPosts() {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const res = await axios.get("/api/posts", {
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    });
                    
                    setPosts(res.data);
               
                } catch (error) {
                    console.error("Error fetching posts:", error);
                }
            };
            fetchData();
        }
    }, [user]);
    const handleDetail=(id)=>{
        navigate("/api/detail", { state: { id } })
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-around flex-wrap">
      
                {posts.length > 0 ? (
                    posts.map((post, i) => (
                        <div className="col mb-4" key={i}>
                            
                            <Card>
                                <Card.Img variant="top" src={post.featuredImage} alt="Post Image" />
                                <Card.Body>
                                    <Card.Title>{post.title}</Card.Title>
                                   
                                    <Button variant="outline-success"onClick={()=>{
                                    handleDetail(post._id)
                                }}>Find out more</Button>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Author: {post.author.username}</small><br/>
                                    <small>Posted on: {moment(new Date(post.createdAt).toISOString()).format('MMMM Do YYYY, h:mm:ss a')}
                    </small>   
                                </Card.Footer>
                            </Card>
                        </div>
                    ))
                ) : (
                    <p>Loading....</p>
                )}
            </div>
        </div>
    );
}
