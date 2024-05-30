import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../config/axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/authcontext';
import '../index.css';

const Login = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const tokenResponse = await axios.post('/api/users/login', values);
        localStorage.setItem('token', tokenResponse.data.token);
        const userResponse = await axios.get('/api/users/profile', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        handleLogin(userResponse.data);
        navigate('/api/users/profile');
      } catch (err) {
        console.log(err);
        if (err.response && err.response.data.error) {
          setErrors({ server: err.response.data.error});
        }
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="register-container">
      <h2>Login</h2>
      {formik.errors.server && (
        <div className="error-msg">
          {typeof formik.errors.server === 'string' ? (
            <p>{formik.errors.server}</p>
          ) : (
            <ul>
              {formik.errors.server.map((ele, index) => (
                <li key={index}>{ele.msg}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      <form onSubmit={formik.handleSubmit}>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="error-msg">{formik.errors.email}</p>
          ) : null}
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="error-msg">{formik.errors.password}</p>
          ) : null}
        </div>
        <input type="submit" className="form-btn" disabled={formik.isSubmitting} value="Login" />
      </form>
      <h5>
        Don't have an account? <Link to="/api/users/register">Register</Link>
      </h5>
    </div>
  );
};

export default Login;