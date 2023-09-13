import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './resetpassword.module.css';
import { useAuth } from '../../context/AuthContext';


const SignupSchema = Yup.object().shape({
  password: Yup.string().required('Required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});


function ResetPassword() {

  const { setMenuLogin} = useAuth();

  const [updateSuccess,setUpdateSuccess] = useState(false)

const handleFormSubmit = (values) => {
  const { password, confirmPassword } = values;

  // Create an object with the form values
  const formData = {
    password: password,
    confirmPassword: confirmPassword,
  };

  console.log('Form Data:', formData);
  setUpdateSuccess(true)
  setTimeout(()=>{  setMenuLogin(false)},1000)
  // Add your logic for signup here
};

  return (
    <div  className={`${styles.loginForm} ${styles.active}` }>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={SignupSchema}
        onSubmit={handleFormSubmit}
      >
        <Form>
          <h3 className={styles.signupFormH3}>RESET YOUR PASSWORD</h3>
       
          <Field type="password" name="password" placeholder="password" className={styles.inputBox} />
          <ErrorMessage name="password" component="div" className={styles.inputBoxError} />
          <Field
            type="password"
            name="confirmPassword"
            placeholder="confirm password"
            className={styles.inputBox}
          />
          <ErrorMessage name="confirmPassword" component="div" className={styles.inputBoxError} />
      
          <button type="submit" className={styles.inputBox}>
            SAVE
          </button>
         {updateSuccess ? <span className={styles.updatedPassword}>Updated succesfully</span> : null} 
        </Form>
      </Formik>
    </div>
  );
}

export default ResetPassword;
