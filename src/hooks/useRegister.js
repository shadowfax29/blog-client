import { useState } from "react";
import registerValidation from "../utils/registerValidation";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios"
import Swal from "sweetalert2"

const useRegister = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    bio: "", // Added bio field
    profilePicture: null, // Prepare for image handling
    clientErrors: null,
    serverErrors: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const convert = (e) => {
    const file = e.target.files[0];
    console.log(file)
    setForm({ ...form, profilePicture: file });
  };

  const errors = registerValidation(form);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = {
      username: form.username,
      email: form.email,
      password: form.password,
      bio: form.bio, 
profilePicture:form.profilePicture
    }
   

 

    try {
      if (Object.keys(errors).length === 0) {
        const user = await axios.post('/api/users/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        Swal.fire({
          title: "Successfully Registered",
          text: "You can now Login",
          icon: "success"
        });
      
        navigate("/api/users/login");
      } else {
        setForm({ ...form, clientErrors: errors, serverErrors: null });
      }
    } catch (err) {
      console.log(err)
      if (err.response && err.response.data && err.response.data.errors) {
        const serverErrors = err.response.data.errors.map(error => error.msg);
        setForm({
          ...form,
          serverErrors: serverErrors,
          clientErrors: null,
        });
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };

  return { form, handleChange, handleSubmit, convert };
};

export default useRegister;
