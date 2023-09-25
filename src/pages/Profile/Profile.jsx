import React, { useEffect, useState,useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import styles from './profile.module.css';
const baseUrl = import.meta.env.VITE_BASE_URL;
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';



const ProfileSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'), // Validates email format and ensures it's not empty
    firstName: Yup.string().required('Required').max(50, 'Max 50 characters')
      .matches(/^[^0-9]*$/, 'Cannot contain numbers'), // Validates non-empty, max length, and no numbers
    lastName: Yup.string().required('Required').max(50, 'Max 50 characters')
      .matches(/^[^0-9]*$/, 'Cannot contain numbers'), // Validates non-empty, max length, and no numbers
    companyName: Yup.string().max(30, 'Max 30 characters'), // Validates max length
    street: Yup.string().max(50, 'Max 50 characters'), // Validates max length
    zipCode: Yup.string().max(10, 'Max 10 characters'), // Validates max length
    city: Yup.string().matches(/^[^0-9]*$/, 'Cannot contain numbers'), // Validates no numbers
    vat: Yup.string(), // Allows empty or any input
  });
  
  function Profile() {

    const { setMenuLogin} = useAuth()
    const {user,setUser} = useContext(AuthContext)

    const [backendError,setBackendError] = useState(null)
    const [success,setSuccess] = useState(null)

    useEffect(()=>{

      const fetchData =  async () => {
      try {

        const url = `${baseUrl}/getuser`;
 
        const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Set the withCredentials option to true
      };
  
      const response = await axios.get(url, config);
      setUser(response.data.user);

      }catch(err)
        {console.log(err)}
    }

    fetchData()
    },[])

    const handleFormSubmit = async (values) => {
      const updatedUser = { ...user, ...values };
      console.log(updatedUser);
    
      // Update the user state with the merged object
      setUser(updatedUser);

      const changedFields = {}
      for (const key in values) {

        if (values[key] !== user[key]) {
          changedFields[key] = values[key];
        }
      }

  
      try {
        const url = `${baseUrl}/updateuser`;
        const data = {
          data: changedFields,
        };
  
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        };
  
        const response = await axios.put(url, data, config);
              if (response.request.status == 200)  
        setSuccess(response.data.message)
        setTimeout(()=>{setMenuLogin(false) },1000)
      } catch (err) {
        setBackendError(err.message)
   
      }
    };
  
    return (
      <div className={styles.mainDiv}>
         {user && ( 
        <Formik
          initialValues={{
            email: user?.email,
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            companyName: user?.companyName || '',
            street: user?.street || '',
            zipCode: user?.zipCode || '',
            city: user?.city || '',
            vat: user?.vat || '',
          }}
          validationSchema={ProfileSchema}
          onSubmit={handleFormSubmit}
        >
          <Form>
            <h3 className={styles.signupFormH3}>Update Profile</h3>
  
            <div className={styles.formGroup}>
             <Field
                type="email"
                id="email"
                name="email"
                className={styles.inputBoxEmail}
                placeholder="Email"
                disabled={true} // or disabled={someBooleanValue}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.inputBoxError}
              />
            </div>
  
            <div className={styles.formGroup}>
              <Field
                type="text"
                id="firstName"
                name="firstName"
                className={styles.inputBox}
                placeholder="First Name"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className={styles.inputBoxError}
              />
            </div>
  
            <div className={styles.formGroup}>
              <Field
                type="text"
                id="lastName"
                name="lastName"
                className={styles.inputBox}
                placeholder="Last Name"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className={styles.inputBoxError}
              />
            </div>
            <div>Company details</div>
            <div className={styles.formGroup}>
              <Field
                type="text"
                id="companyName"
                name="companyName"
                className={styles.inputBox}
                placeholder="Company Name"
              />
              <ErrorMessage
                name="companyName"
                component="div"
                className={styles.inputBoxError}
              />
            </div>
  
            <div className={styles.formGroup}>
              <Field
                type="text"
                id="street"
                name="street"
                className={styles.inputBox}
                placeholder="Street"
              />
              <ErrorMessage
                name="street"
                component="div"
                className={styles.inputBoxError}
              />
            </div>
  
            <div className={styles.formGroup}>
              <Field
                type="text"
                id="zipCode"
                name="zipCode"
                className={styles.inputBox}
                placeholder="Zip Code"
              />
              <ErrorMessage
                name="zipCode"
                component="div"
                className={styles.inputBoxError}
              />
            </div>
  
            <div className={styles.formGroup}>
              <Field
                type="text"
                id="city"
                name="city"
                className={styles.inputBox}
                placeholder="City"
              />
              <ErrorMessage
                name="city"
                component="div"
                className={styles.inputBoxError}
              />
            </div>
  
            <div className={styles.formGroup}>
              <Field
                type="text"
                id="vat"
                name="vat"
                className={styles.inputBox}
                placeholder="VAT"
              />
              <ErrorMessage
                name="vat"
                component="div"
                className={styles.inputBoxError}
              />
            </div>
            { backendError ?  <p className={styles.notSuccess}>{backendError}</p> : null } 
            {success ?  <p className={styles.success}>{success}</p> : null } 
            
            <div className={styles.buttons}>
              <button type="submit" className={styles.inputBoxButton}>
                Update Profile
              </button>
              <button onClick={() => setMenuLogin(false)} className={styles.inputBoxCancelButton}>
                Go Back
              </button>
            </div>
          </Form>
        </Formik> 
        )}
      </div>
    );
  }
  

export default Profile