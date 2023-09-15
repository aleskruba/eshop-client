import React,{useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './adminuserchangepasswordcomponent.module.css';
const baseUrl = import.meta.env.VITE_BASE_URL;
import axios from 'axios';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

function AdminUserChangePasswordComponent({cancelFunction,user,setUserView,setUserChangePassword}) {

  const [backendError,setBackendError] = useState(null)
  const [success,setSuccess] = useState(null)
  
    const handleFormSubmit = async (values) => {
      const { password, confirmPassword } = values;
      setBackendError(null)
  
      // Create an object with the form values
      const formData = {
        password: password,
        confirmPassword: confirmPassword,
      };
  
    // Client-side code
  try {
      const url = `${baseUrl}/changepasswordADMIN`;
      const data = {
        newPassword: formData.password,
        userID : user._id
      };
    
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
    
    
      const response = await axios.put(url, data, config);
    
   
      if (response.status === 200) {
   
         setSuccess(response.data.message);
             setTimeout(()=>{setUserChangePassword(false); setUserView(true)},1000)
      } else {
        console.log('Password change request failed');
        // Handle the response or error status here
      }
    
    } catch (err) {

      if (err.response.data = 'incorrect new password') {
          setBackendError("Incorrect new password");
          }
    }
    
    };
  
    return (
      <div className={styles.passwordMainDiv}>
        <Formik
          initialValues={{ password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          <Form>
     
            <Field
              type="password"
              name="password"
              placeholder="New Password"
              className={styles.inputBox}
            />
            <ErrorMessage
              name="password"
              component="div"
              className={styles.inputBoxError}
            />
  
            <Field
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className={styles.inputBox}
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className={styles.inputBoxError}
            />
  
        <div className={styles.buttons}>
              <button type="submit" className={styles.inputBoxButton}>
               Update Password
             </button>
      
            <div onClick={cancelFunction} className={styles.inputBoxCancelButton}>
              Go Back
            </div>
            </div>
  
      
          </Form>
        </Formik>
        { backendError ?  <p className={styles.notSuccess}>{backendError}</p> : null } 
        { success ?  <p className={styles.success}>{success}</p> : null } 
      </div>
    );
  }

export default AdminUserChangePasswordComponent