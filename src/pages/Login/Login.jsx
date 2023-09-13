import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import styles from './login.module.css';
import ForgottenPassword from '../FPassword/ForgottenPassword.jsx';
const baseUrl = import.meta.env.VITE_BASE_URL;
import axios from 'axios';
import Profile from '../Profile/Profile';
import ChangePassword from '../ChangePassword/ChangePassword';
import { useNavigate } from 'react-router-dom'

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

function Login() {
  const { isLoggedIn, menuLogin, setMenuLogin, setMenuProfile, setOrdersState, 
    setMenuChangePassword,setMenuSignUp,auth,setMenuBasket,
        setIsLoggedIn,setAuth,setMenuForgottenPassword} = useAuth();

        const [showForgottenPassword, setShowForgottenPassword] = useState(false);

        const [backendError,setBackendError] = useState(null)
        const navigate = useNavigate()

  const handleFormSubmit = (values) => {
    if (!isLoggedIn) {
      loginFunction(values); // Pass values to loginFunction
     }
  };
  
  const loginFunction = async (values) => {
 
    const formData = {
      email: values.email,
      password: values.password,
    };

    try {

      const url = `${baseUrl}/login`;
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
    
    if (response.status === 200){ 

            setAuth((prevAuth) => ({
        ...prevAuth,
        user:  response.data.userData,
      }));
      setIsLoggedIn(true);
      setMenuLogin(false);

      
     } 
    else{
      console.log('not sucess')
      setIsLoggedIn(false);
      setAuth({ user: null, tokens: null } )
    }
  
    }
    catch (err) {
       if (err.message === 'Network Error') {
        console.log('Network Error encountered');
        setBackendError('Connection to the server failed. Please try again later.');
      }
      else if (err.response.status === 400) {
          setBackendError(err.response.data.error)
        }
     else {
          console.log('Unexpected Error encountered');
          setBackendError('An unexpected error occurred. Please try again later.');
        }
      
    }

  };



  const logoutFunction = async () => {
   
    try {
        const url = `${baseUrl}/logout`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };

        const response = await axios.get(url, config);
    

        if (response.status === 200) {
            navigate('/')
             setIsLoggedIn(false);
             setMenuLogin(false)
      

        } else {
            console.log('Logout failed');
        }
    } catch (error) {
        console.error('Logout error:', error);
    }
};


  const signupFunction = () => {
   
    setMenuLogin(false)
    setMenuSignUp(true)
  

   }


 
   const toggleForgottenPassword = () => {
    setShowForgottenPassword(true);
    setMenuForgottenPassword(true)
  };


const [profile,setProfile] = useState(false)
const [changePassword,setChangePassword] = useState(false)

  const profileFunction = () => {
    setProfile(true)
    setMenuProfile(true)
    setMenuChangePassword(false)
    setChangePassword(false)
  }



  const changePasswordFunction = () => {
     setChangePassword(true)
     setMenuChangePassword(true)
     setProfile(false)
     setMenuProfile(false)
   }


   const  ordersFunction = () => {
    setMenuBasket(false);
    setMenuLogin(false)
    setOrdersState(true)
    navigate('/orders')
    }

  return (
    <>
    {showForgottenPassword   ?  <ForgottenPassword setShowForgottenPassword={setShowForgottenPassword} />:   
    
    <div className={menuLogin ? `${styles.loginForm} ${styles.active}` : styles.loginForm}>
    {!isLoggedIn ? 
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleFormSubmit}
      >
        <Form>
          <h3 className={styles.loginFormH3}>Login</h3>
          <Field type="email" name="email" placeholder="your email" className={styles.inputBox} />
          <ErrorMessage name="email" component="div" className={styles.inputBoxError} />
          <Field type="password" name="password" placeholder="password" className={styles.inputBox} />
          <ErrorMessage name="password" component="div" className={styles.inputBoxError} />
          <p className={styles.inputBoxPtag}>
            forget your password <span onClick={toggleForgottenPassword} className={styles.inputBoxAtag}>click here</span>
          </p>
          <p className={styles.inputBoxPtag}>
            don't have an account <span onClick={signupFunction} className={styles.inputBoxAtag}>create now</span>
          </p>
          <button type="submit" className={styles.inputBox}>
            Login
          </button>
        </Form>
      </Formik>
       { backendError ?  <p className={styles.notSuccess}>{backendError}</p> : null } 
      </div>
      : <>
      {!profile && !changePassword? 
      <>
      <button onClick={ordersFunction} className={styles.inputBox}>My orders</button>
      <button onClick={profileFunction} className={styles.inputBox}>Profile</button>
      <button onClick={changePasswordFunction} className={styles.inputBox}>Change Password</button>
      <button onClick={logoutFunction} className={styles.inputBox}>Logout</button>
      </>
      : <>
        { changePassword  ? <ChangePassword/> : <Profile/> }
        </>
   }
      
      </>  }
    </div>
}
    </>
  );
}

export default Login;
