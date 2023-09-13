import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './forgottenpassword.module.css';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

function ForgottenPasswordForm({ handleChangePassword, submitNewPasswordFunction, newPassword, backendError }) {
  const [errors, setErrors] = useState({});

  const handleValidation = async () => {
    try {
      await validationSchema.validate(newPassword, { abortEarly: false });
      setErrors({});
      submitNewPasswordFunction();
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach(error => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <>
      <input
        type="password"
        name="password"
        placeholder="enter new password"
        value={newPassword.password}
        className={styles.inputBox}
        onChange={handleChangePassword}
      />
      {errors.password && <div className={styles.error}>{errors.password}</div>}
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm new password"
        value={newPassword.confirmPassword}
        className={styles.inputBox}
        onChange={handleChangePassword}
      />
      {errors.confirmPassword && <div className={styles.error}>{errors.confirmPassword}</div>}
      <button type='button' onClick={handleValidation} className={styles.inputBox}>Save</button>
      {backendError ? <div className={styles.error}>{backendError}</div> : null}
    </>
  );
}

export default ForgottenPasswordForm;
