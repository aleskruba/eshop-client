import React,{useState,useContext} from 'react'
import styles from './reviewcomponent.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const baseUrl = import.meta.env.VITE_BASE_URL;
import axios from 'axios';
import ReviewStars from './ReviewStars';
import { AuthContext } from '../../context/AuthContext';



const messageSchema = Yup.object().shape({
  message: Yup.string().required('Required'),
});

function ReviewComponent({selectedStars, setSelectedStars}) {
  const [backendError, setBackendError] = useState(null);
  const [selectedStarsCheck, setSelectedStarsCheck] = useState(false); 
  const [messageConfirmation, setMessageConfirmation] = useState(false); 

  const {updateReview,setUpdateReview} = useContext(AuthContext)



  const handleFormSubmit = async (values, { resetForm }) => {

    if (selectedStarsCheck) {
    try {
      const url = `${baseUrl}/sendmessage`;
      const data = {
        data: values,
        stars:selectedStars
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };

      const response = await axios.post(url, data, config);
      if (response.status = 200) {setMessageConfirmation(true) }
  

      // Reset the form after successful submission
      resetForm();
      setSelectedStars(5)
      setTimeout(()=>{setMessageConfirmation(false)},[1500])
      setUpdateReview(!updateReview)

    } catch (err) {
      if (err.response.status === 401) {setBackendError('You have to to be logged in...')}
      if (err.message === 'Network Error') {
        console.log('Network Error encountered');
        setBackendError('Connection to the server failed. Please try again later.');
      } else {
        setBackendError('You have to to be logged in...')
      }
    }
    }
    else {setBackendError('you have to rate with stars too !!  ')}
  }

  return (

    <>
    {messageConfirmation ? <div className={styles.success} > Comment saved successfuly </div> :
    <Formik
      initialValues={{ message: '' }}
      validationSchema={messageSchema}
      onSubmit={handleFormSubmit}
    >
      {({ errors, touched, resetForm }) => (
        <Form>
          <div className={styles.formDiv}> 
            <div className={styles.textareaContainer}>
              <label className={styles.textareaLabel} htmlFor="message">
                Leave a Comment here
              </label>
              <Field
                as="textarea"
                name="message"
                id="message"
                placeholder="Share your thoughts..."
                className={`${styles.textareaField} ${errors.message && touched.message ? styles.error : ''}`}
              />
              <ErrorMessage name="message" component="div" className={styles.error} />
           
            <ReviewStars selectedStars={selectedStars} 
                         setSelectedStars={setSelectedStars}
                         setSelectedStarsCheck={setSelectedStarsCheck}/>
            </div>

            <button type="submit" className={styles.inputButton}>
              Send
            </button>
          
          </div>
          <div>
            {backendError ? <span className={styles.missingStartsRanking}>{backendError}</span> : null}
          </div>
          </Form>
      )}
    </Formik>
}
    </>
  );
}

export default ReviewComponent;
