import { useAuth } from "../context/authcontext";
import axios from "../config/axios";
import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify"
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import DriveFileRenameOutlineTwoToneIcon from '@mui/icons-material/DriveFileRenameOutlineTwoTone';
import moment from "moment";
import Sidebar from "../components/SideBar"


export default function AllPosts() {
    const { user } = useAuth();
    const [myposts, setmyPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const res = await axios.get(`/api/posts/myposts/${user._id}`,);
                    // const fil=res.data.filter((ele)=>{
                    //     if(ele.author==user._id){
                    //         return ele
                    //     }
                    // })
                
                    setmyPosts(res.data);
                } catch (error) {
                    console.error("Error fetching posts:", error);
                }
            };
            fetchData();
        }
    }, [user]);
    
    const handleDeleteClick=async(id)=>{
try{
    const res=await axios.delete(`/api/posts/${id}`,{
        headers:{
            Authorization:localStorage.getItem("token")
        }
    })
    
}
catch(error){
    console.error("Error deleting post:", error);
}
    }
    const handleRenameClick=(id)=>{

        
        navigate("/api/posts/editPost", { state: { id } })
        
          
    
       
    }
    const handleDetail=(id)=>{
        navigate("/api/detail", { state: { id } })
    }

    return (
        <>
        <Sidebar disabled= {true}/>
        <div className="container mt-4">
        <div className="d-flex justify-content-around flex-wrap">
      
            {myposts.length > 0 ? (
                myposts.map((post, i) => (
                    <div className="col mb-4" key={i}>
                        <Card>
                            <Card.Img variant="top" src={post.featuredImage} alt="Post Image" />
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <div>
                                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.context) }} />

                                </div>
                                <Button variant="outline-danger" onClick={()=>{
                                    handleDetail(post._id)
                                }}>Find out more</Button>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Author: {post.author.username}</small><br/>
                            <small>Posted on: {moment(new Date(post.createdAt).toISOString()).format('MMMM DD YYYY')}
                    </small>   
                    <span className="d-flex justify-content-around">
        {/* Delete icon */}
        <button className="btn btn-dark" onClick={()=>{
            handleDeleteClick(post._id)
        }}>
            <DeleteTwoToneIcon />
        </button>
        
        {/* Rename icon */}
        <button class="btn btn-warning"onClick={()=>{
            handleRenameClick(post._id)
        }}>
            <DriveFileRenameOutlineTwoToneIcon />
        </button>
    </span>
                   
                            </Card.Footer>
                        </Card>
                    </div>
                ))
            ) : (
                <p align="center">NO BLOG</p>
            )}
        </div>
       
    </div></>
        
    );
}
