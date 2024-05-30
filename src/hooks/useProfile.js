import { useState, useEffect } from "react";
import axios from "../config/axios";
import profileValidation from "../utils/profileValidation";
import { useAuth } from "../context/authcontext";
import Swal from "sweetalert2"

const useProfile = () => {
  const { user,setImg, handleProfile } = useAuth();
  const [profile, setProfile] = useState({
    profilePicture: user ? user.profilePicture : "",
    username: user ? user.username : "",
    email: user ? user.email : "",
    bio: user ? user.bio : "",
    isEdit: false,
    clientErrors: null,
    serverErrors: null,
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
   
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setProfile({ ...profile, [name]: e.target.files[0] }); // Handle file input
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const errors = profileValidation(profile);

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Updated",
      width: 600,
      padding: "3em",
      color: "#716add",
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `
    });

    if (Object.keys(errors).length === 0) {
      const profileData = {
        profilePicture: profile.profilePicture,
        username: profile.username,
        email: profile.email,
        bio: profile.bio,

      }
      

      try {
        const profileResponse = await axios.put(
          "/api/users/profile",
          profileData,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        handleProfile(profileResponse.data);
        setProfile({ ...profile, isEdit: !profile.isEdit });
      } catch (err) {
        setProfile({
          ...profile,
          serverErrors: err.response.data.errors,
          clientErrors: null,
        });
      }
    } else {
      setProfile({ ...profile, clientErrors: errors, serverErrors: null });
    }
  };

  const handleToggle = () => {
    setProfile({ ...profile, isEdit: !profile.isEdit });
  };

  return { profile, handleChange, handleSubmit, handleToggle };
};

export default useProfile;
