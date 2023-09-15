import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './signup.module.css';
import { useAuth } from '../../context/AuthContext';
const baseUrl = import.meta.env.VITE_BASE_URL;
import axios from 'axios';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});


function Signup() {

  const { menuLogin,setMenuLogin,setMenuSignUp,menuSignUp} = useAuth();

  const [success,setSuccess] = useState(false)

  const [backendError,setBackendError] = useState(null)

const loginNavigateFunction = () => {
  setMenuSignUp(false)
  setMenuLogin(true)
  setMenuLogin(!menuLogin)
  
}

const handleFormSubmit = async (values) => {
  const { email, password, confirmPassword } = values;

  // Create an object with the form values
  const formData = {
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  };



  try {
    const url = `${baseUrl}/signup`;
    const data = {
        data:formData,
       };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Set the withCredentials option to true
    };

    const response = await axios.post(url, data, config);


    if (response.status == 201){ 
      setSuccess(true)
      setTimeout ( ()=> {
        setMenuSignUp(false)
        setMenuLogin(true) 
        setSuccess(false)
      },1000)

    } 
    else{
      console.log('not sucess')
    }
  } catch (err) {
    if (err.response && err.response.status === 409) {
      setBackendError(err.response.data.error);
    } else if (err.response && err.response.status === 500) {
      setBackendError(err.response.data.error);
    }
    else if (err.message === 'Network Error') {
      setBackendError('Connection to the server failed. Please try again later.');
    } else {
      setBackendError('An unexpected error occurred. Please try again later.');
    }
  }
};

  return (
    <div  className={menuSignUp ? `${styles.loginForm} ${styles.active}` : styles.loginForm}>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={SignupSchema}
        onSubmit={handleFormSubmit}
      >
        <Form>
          <h3 className={styles.signupFormH3}>Sign Up</h3>
          <Field type="email" name="email" placeholder="your email" className={styles.inputBox} />
          <ErrorMessage name="email" component="div" className={styles.inputBoxError} />
          <Field type="password" name="password" placeholder="password" className={styles.inputBox} />
          <ErrorMessage name="password" component="div" className={styles.inputBoxError} />
          <Field
            type="password"
            name="confirmPassword"
            placeholder="confirm password"
            className={styles.inputBox}
          />
          <ErrorMessage name="confirmPassword" component="div" className={styles.inputBoxError} />
          <p className={styles.inputBoxPtag}>
            already an account <span onClick={loginNavigateFunction} className={styles.inputBoxAtag}>log in here</span>
          </p>
          <button type="submit" className={styles.inputBox}>
            Sign Up
          </button>
        </Form>
      </Formik>
      { backendError ?  <p className={styles.success}>{backendError}</p> : null } 
      { success ?  <p className={styles.success}>Signed up successfully !! Login now</p> : null } 
    </div>
  );
}

export default Signup;
