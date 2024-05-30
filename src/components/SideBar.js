import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaBars } from 'react-icons/fa';
import { Container, Row, Col, Button } from 'react-bootstrap';

const RightSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate('/api/createpost');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
   
   
        
         <Button
            variant="secondary"
            onClick={toggleSidebar}
            className="toggle-sidebar-btn"
          >
           <FaPlus className="plus-icon" />
          </Button>
      
      
      
      <Row>
        <Col className={`sidebar${isOpen ? ' open' : ''}`}>
          <div className="sidebar-content m-5">
            <Button
              variant="outline-info"
              onClick={handleCreatePost}
              className="create-post-btn"
            >
               Create Post
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RightSidebar;
