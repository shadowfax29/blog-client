
// import axios from "../config/axios";
import { useAuth } from "./context/authcontext";

import { Routes, Route } from 'react-router-dom'
import Navbar from "./components/navbar"
import Register from "./components/register";
import Home from "./components/home"
import Login from "./components/login";
import Profile from "./components/profile";
import ProfileNavbar from "./components/profileBar";
import PrivateRoutes from "./components/privateRoute";
import AllPosts from "./components/AllPosts";
import MyPost from "./components/myPost"
import CreatePost from "./components/createPost";
import EditPost from "./components/editPost";
import Detail from "./components/detail";
import Footer from "./components/footer";
import { useNavigate } from 'react-router-dom';

function App() {
const {user} = useAuth()

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user) {
      // Ensure the user state is updated based on the token
      // If necessary, fetch the user data using the token
    }
    if (token) {
      navigate('/api/users/profile');
    }
  }, [navigate, user]);

  return (
    <div>
      {user ? <><ProfileNavbar /><Footer /></> : <><Navbar /><Home /></>}
        <Routes>
            <Route index path="/" element={<Home/>}/>
            <Route path="/api/users/register" element={<Register/>}/>
            <Route path="/api/users/login" element={<Login/>}/>
            <Route path="/api/users/profile" element={
                <PrivateRoutes><Profile/></PrivateRoutes>
            
            }/>
            <Route path="/api/posts"element={<PrivateRoutes>
                <AllPosts/>
            </PrivateRoutes>} />
            <Route path="/api/posts/myposts" element={<PrivateRoutes><MyPost/></PrivateRoutes>}/>

            <Route path="/api/createpost" element={<PrivateRoutes><CreatePost/></PrivateRoutes>}/>
            <Route path="/api/posts/editPost" element={<PrivateRoutes><EditPost/></PrivateRoutes>}/>
            <Route path="/api/detail" element={<Detail/>}/>
        </Routes>
    </div>
 )
}

export default App;
