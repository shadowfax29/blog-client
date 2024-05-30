import React from "react";
import {useState} from "react"
import useRegister from "../hooks/useRegister";
import { Link } from "react-router-dom";
import face from "../img/user.jpg"
import "../index.css"

const Register = () => {
  const { form, handleChange, handleSubmit ,convert} = useRegister();



  
  return (
    <div className="register-container">
      <h2 align="center">Register</h2>
      {form.serverErrors &&
        form.serverErrors.map((ele) => {
          return <p className="error-msg">{ele.msg}</p>;
        })}
      <form onSubmit={handleSubmit} >
        <div className="form-field">
        {form.profilePicture?<img src={form.profilePicture} width="150px" alt="hi" htmlFor="profilePicture"/>:<img src={face} width="150px" alt="hi" htmlFor="profilePicture"/>}

        <input type="file" id="profilePicture" name="profilePicture" accept="image/*"  onChange={convert}/>
        {form.clientErrors && (
            <p className="error-msg">{form.clientErrors.profilePicture}</p>
          )}
          <label htmlFor="username">Username</label>
          <br />
          <input
            type="text"
            name="username"
            placeholder="username"
            id="username"
            value={form.username}
            onChange={handleChange}
          />
          {form.clientErrors && (
            <p className="error-msg">{form.clientErrors.username}</p>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            placeholder="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          {form.clientErrors && (
            <p className="error-msg">{form.clientErrors.email}</p>
          )}
          {form.serverErrors && form.serverErrors.includes('Email is already taken') && <p className="error-msg">Email is already taken</p>}
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="Password"
            name="password"
            id="password"
            placeholder="password"
            value={form.password}
            onChange={handleChange}
          />
          {form.clientErrors && (
            <p className="error-msg">{form.clientErrors.password}</p>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="bio">Bio</label>
          <br />
          <input
            type="bio"
            name="bio"
            id="bio"
            placeholder="bio"
            value={form.bio}
            onChange={handleChange}
          />
          {form.clientErrors && (
            <p className="error-msg">{form.clientErrors.bio}</p>
          )}
        </div>
        
       
        <input type="submit" className="form-btn" />
      </form>
      <h5>
        Already have an account?<Link to={"/api/users/login"}>Login</Link>
      </h5>
    </div>
  );
};

export default Register;
