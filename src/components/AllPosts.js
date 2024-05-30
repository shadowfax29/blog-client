import { useAuth } from "../context/authcontext";
import axios from "../config/axios";
import { useReducer, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import moment from "moment";
import Detail from "./detail";

// Define initial state
const initialState = {
  posts: [],
  currentView: "posts", // "posts" or "detail"
  selectedPostId: null,
};

// Define reducer function
function reducer(state, action) {
  switch (action.type) {
    case "SET_POSTS":
      return { ...state, posts: action.payload };
    case "SHOW_DETAIL":
      return { ...state, currentView: "detail", selectedPostId: action.payload };
    case "BACK_TO_POSTS":
      return { ...state, currentView: "posts", selectedPostId: null };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export default function AllPosts() {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const res = await axios.get("/api/posts", {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          });
          dispatch({ type: "SET_POSTS", payload: res.data });
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };
      fetchData();
    }
  }, [user]);

  if (state.currentView === "detail") {
    return <Detail id={state.selectedPostId} />;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-around flex-wrap">
        {state.posts.length > 0 ? (
          state.posts.map((post, i) => (
            <div className="col mb-4" key={i}>
              <Card>
                <Card.Img variant="top" src={post.featuredImage} alt="Post Image" />
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Button
                    variant="outline-success"
                    onClick={() => {
                      dispatch({ type: "SHOW_DETAIL", payload: post._id });
                    }}
                  >
                    Find out more
                  </Button>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Author: {post.author.username}</small>
                  <br />
                  <small>
                    Posted on:{" "}
                    {moment(new Date(post.createdAt).toISOString()).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
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
