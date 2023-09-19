import React, { useState } from 'react';
import styles from './adminnewproduct.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const baseUrl = import.meta.env.VITE_BASE_URL;
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductSchema = Yup.object().shape({
  name: Yup.string().required('Required').max(50, 'Max 50 characters'),
  price: Yup.string().required('Required').matches(/^\d+(\.\d{1,2})?$/, 'Price must be a valid number').max(2000, 'Max price is 2000'),
  amount: Yup.string().required('Required').matches(/^\d+$/, 'Amount must be a valid number').max(2000, 'Max amount is 2000'),
  image: Yup.string().max(100, 'Max 100 characters'),
  title: Yup.string().max(1000, 'Max 1000 characters'),
  description: Yup.string(),
  discount: Yup.boolean(),
});

function AdminNewProduct() {

  const [product, setProduct] = useState(null);
  const [backendError, setBackendError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate()

  const convertValuesToNumbers = (values) => {
    // Convert the price and amount values to numbers
    const convertedValues = {
      ...values,
      price: parseFloat(values.price),
      amount: parseInt(values.amount, 10),
    };
    return convertedValues;
  };

  const handleFormSubmit = async (values) => {
    const convertedValues = convertValuesToNumbers(values);

    try {
      const url = `${baseUrl}/savenewproductADMIN`;
      const data = {
        data: convertedValues
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };

      const response = await axios.post(url, data, config);
      console.log( response)

      if (response.request.status === 200) {
        const updatedProduct = { ...product, ...convertedValues };
        setProduct(updatedProduct);
      }
      setSuccess(response.data.message);
      setTimeout(() => {
        navigate('../admin-products')
      }, 1000);
    } catch (err) {
      console.log(err)
      setBackendError(err.response.data.error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainDiv}>
          <Formik
            initialValues={{
              name:  '',
              price:  '', // Convert price to a string
              amount: '', // Convert amount to a string
              image: '',
              title:  '',
              description:  '',
              discount: false,
            }}
            validationSchema={ProductSchema}
            onSubmit={handleFormSubmit}
          >
            <Form>
              <h3 className={styles.signupFormH3}>Product Form</h3>

              <div className={styles.formGroup}>
                <label htmlFor="name">Product Name</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className={styles.inputBox}
                  placeholder="Product Name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={styles.inputBoxError}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="price">Price</label>
                <Field
                  type="text" // Change to text type
                  id="price"
                  name="price"
                  className={styles.inputBox}
                  placeholder="Price"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className={styles.inputBoxError}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="amount">Amount</label>
                <Field
                  type="text" // Change to text type
                  id="amount"
                  name="amount"
                  className={styles.inputBox}
                  placeholder="Amount"
                />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className={styles.inputBoxError}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="image">Image URL</label>
                <Field
                  type="text"
                  id="image"
                  name="image"
                  className={styles.inputBox}
                  placeholder="Image URL"
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className={styles.inputBoxError}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="title">Title</label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className={styles.inputBox}
                  placeholder="Title"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className={styles.inputBoxError}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="description">Description</label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className={styles.inputBoxTextArea}
                  placeholder="Description"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className={styles.inputBoxError}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="discount">Discount</label>
                <Field
                  type="checkbox"
                  id="discount"
                  name="discount"
                  className={styles.inputBox}
                />
                <ErrorMessage
                  name="discount"
                  component="div"
                  className={styles.inputBoxError}
                />
              </div>

 
        { backendError ?  <p className={styles.notSuccess}>{backendError}</p> : null } 
          {success ?  <p className={styles.success}>{success}</p> : null } 
          
       
        <div className={styles.buttons}>
          <button type="submit" className={styles.inputBoxButton}>
            Submit
          </button>
          <button onClick={()=>{navigate('../admin-products')}} className={styles.inputBoxCancelButton}>
              Go Back
        </button>

        </div>
      </Form>
    
  </Formik>
  
 
    </div>


</div>
  );
}

export default AdminNewProduct