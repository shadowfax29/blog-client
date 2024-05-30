import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import blog from "../img/b.png"
import { useAuth } from "../context/authcontext";
import { useNavigate } from "react-router-dom";


export default function ProfileNavbar() {
    const navigate=useNavigate()
    const {handleLogout} = useAuth()
    const handleLogoutClick=()=>{
        handleLogout()
        navigate("/api/users/login")
    }
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/api/users/profile"><img width="50px"src={blog}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/api/posts">Blogs</Nav.Link>
            <Nav.Link as={Link} to="/api/posts/myposts">My-Blogs</Nav.Link>
            <Nav.Link as={Link} to="/api/users/profile">Profile</Nav.Link>
            <Nav.Link  onClick={handleLogoutClick}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
