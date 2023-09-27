import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './forgottenpassword.module.css';
import { useAuth } from '../../context/AuthContext';
import ResetPassword from '../ResetPassword/ResetPassword.jsx';
const baseUrl = import.meta.env.VITE_BASE_URL;
import axios from 'axios';
import ForgottenPasswordForm from './ForgottenPasswordForm';

const ForgotenPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
    });


function ForgottenPassword({setShowForgottenPassword}) {

  const { setMenuLogin, menuForgottenPassword,setMenuForgottenPassword} = useAuth();

  const [emailSent,setEmailSent] = useState(false)
  const [wrongCode,setWrongCode] = useState(false)
  const [allowResetPassword,setAllowResetPassword] = useState(false)
  const [backendError,setBackendError] = useState(null)
  const [otpSuccess,setOptSuccess] =useState(false)
  const [successChange,setSuccessChange] = useState(false)

const loginNavigateFunction = () => {
  setMenuForgottenPassword(false)
  setShowForgottenPassword(false)


  
}

const [emailSOS,setemailSOS] = useState()
const [email,setEmail] = useState('')
const [wrongOtp,setWrongOtp] = useState(false)


const handleFormSubmit = async (values) => {

  setemailSOS(values.email)

    
  try {

    const url = `${baseUrl}/fpassword`;
    const data = {
      email: values.email
          };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Set the withCredentials option to true
    };

    const response = await axios.post(url, data, config);
    const responseData = response.data;



    if (responseData.status) {
  
      setEmail(values.email);
      setEmailSent(true)
     // values.email = ''; // Clear the email field directly
      setWrongOtp(false);

     }

    if (responseData.error) {
      console.log(responseData.error);
    }   
  
  } catch (err) {
    console.log(err)
    console.log(err.response.status)
      if (err.response.status === 404);
       {setBackendError('This email is not registred')
  }

  }
};

const [code,setCode] = useState('')

/* const submitCodeFunction = () => {
  
  console.log('submited code : ',code)
  if (code !== '12345' ) {
    setWrongCode(true)
    return;
   }
   else {
   setAllowResetPassword(true)
   setEmailSent(false)
  
   }
} */

const submitCodeFunction = async () => {


  try {
    const url = `${baseUrl}/verifyOTP`;
        const data = {
          code: code ,
        };

        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Set the withCredentials option to true
        };

        const response = await axios.post(url, data, config);
        const responseData = response.data;
           if (responseData.message === 'OTP verified successfully!') {
           
 setOptSuccess(true)
} else {
  alert('Invalid OTP or session expired.');
}
} catch (error) {
  setWrongCode(true)
  if (error.response.status === 401) {
      console.log('Invalid OTP or session expired.')
  }
}
};


const [newPassword,setNewPassword] = useState({
  password:'',
  confirmPassword:''
})

const handleChangePassword = (e) => {
  const { name, value } = e.target;
  setNewPassword({
    ...newPassword,
    [name]: value
  });
};

//second option 
/* const handleChangePassword = (e) => {
  const { name, value } = e.target;
  setNewPassword(prevState => ({
    ...prevState,
    [name]: value
  }));
}; */


const submitNewPasswordFunction = async () => {

  if (newPassword.password === newPassword.confirmPassword)  { 

    try {
      const url = `${baseUrl}/resetpassword`;
            const data = {
              password: newPassword.password,
              email: emailSOS,
            };

          const config = {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true, // Set the withCredentials option to true
          };

          const response = await axios.post(url, data, config);
          if (response.status===200)  {
                setSuccessChange(true)
                setTimeout(()=>{setMenuLogin(false)},1500)  
              }

    } catch (err) {
      console.log(err);
      setBackendError("An error occurred while signing up.");
    
  };
} else setBackendError('Password do not match')
}

  return ( <>
      {allowResetPassword ? <ResetPassword />  : <> 
    <div  className={menuForgottenPassword ? `${styles.loginForm} ${styles.active}` : styles.loginForm}>
      <Formik
        initialValues={{ email: ''}}
        validationSchema={ForgotenPasswordSchema}
        onSubmit={handleFormSubmit}
      >
        <Form>
        {!emailSent ? <>
               <h3 className={styles.signupFormH3}>Enter your Email , we'll send you a code</h3>
              <Field type="email" name="email" placeholder="your email" className={styles.inputBox} />
                <ErrorMessage name="email" component="div" className={styles.inputBoxError} />
            
                <p className={styles.inputBoxPtag}>
                  or do you remember ?  <span onClick={loginNavigateFunction} className={styles.inputBoxAtag}>log in here</span>
                </p>
                <button type="submit" className={styles.inputBox}>
                  Send
                </button>
                {backendError ? <p className={styles.error}> this email is not registred </p> : null }
              </>
         : <> {!otpSuccess ?
                    <>
                      <input type="text" 
                                name="code" 
                                placeholder="enter the code" 
                                className={styles.inputBox} 
                                value={code}
                                onChange={(e)=>setCode(e.target.value)}/>
                        <button type='button'
                                onClick={submitCodeFunction} 
                                className={styles.inputBox}>Submit the code</button>
                       {wrongCode ? <span className={styles.wrongCode}>wrong code</span>  : null}   
                       </>
                       : 
                       <>
                     {!successChange ? 
                        <>
                        <ForgottenPasswordForm handleChangePassword={handleChangePassword}
                                                submitNewPasswordFunction={submitNewPasswordFunction}
                                                newPassword={newPassword}
                                                backendError={backendError}
                                                />
                        </>
                            : <>
                            <p className={styles.changedPasswordSuccess}>Password has been changed succesfully</p>
                            </> 
                            }
                       </>
                          }
                         </>
                    } 
        </Form>
     
      </Formik>
    </div>
    </>}
    </>

  );
}

export default ForgottenPassword;