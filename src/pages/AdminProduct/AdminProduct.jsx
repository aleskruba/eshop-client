import React, { useState,useEffect } from 'react'
import {useLocation,useNavigate} from 'react-router-dom';
import styles from './adminproduct.module.css';
const baseUrl = import.meta.env.VITE_BASE_URL;
import axios from 'axios';
import AdminProductViewComponent from '../../components/AdminProductComponent/AdminProductViewComponent';
import AdmiProductUpdateComponent from '../../components/AdminProductComponent/AdminProductUpdateComponent';

function AdminProduct() {

    const [productView,setProductView] = useState(true)
    const [productUpdate,setProductUpdate] = useState(false)
    const [product, setProduct] = useState(null);
    const [updatedProduct,setUpdatedProduct] = useState(false)
    const [isLoading,setIsLoading] = useState(true)

    const location = useLocation()
    const navigate = useNavigate()

    const productFromLink = location.state.productFromLink._id ? location.state.productFromLink._id :location.state.productFromLink.id 

    useEffect(()=>{
        const fetchData =  async () => {
        try {
          const url = `${baseUrl}/getproductADMIN`;
    
          const params = {
            id: productFromLink,
          };
    
          const config = {
          headers: {
            'Content-Type': 'application/json',
          },
          params,
          withCredentials: true, // Set the withCredentials option to true
        };
    
    
        const response = await axios.get(url, config);
      setProduct(response.data.product);
        setIsLoading(false)
        }catch(err)
          {console.log(err)}
      }
    
      fetchData()
      },[updatedProduct])
  


    const updateProduct = () => {
        setProductView(false)
        setProductUpdate(true)
    }


    const cancelFunction = () => {
        setProductView(true)
        setProductUpdate(false)

    }

    const backFunction = () => {
        navigate('/admin-products')
    }

  return (
    <div className={styles.container}>
        {!isLoading ? 
        <div className={styles.mainDIV} >
            {productView ? 
             <AdminProductViewComponent product={product}
                                     updateProduct={updateProduct}
                                     backFunction={backFunction}
                                     productFromLink={productFromLink}
                                     updatedProduct={updatedProduct}
                                     
                                     />
            : null}

            {productUpdate? 
               <AdmiProductUpdateComponent cancelFunction={cancelFunction}
                                          setProductView={setProductView}
                                          setProductUpdate={setProductUpdate}
                                          setUpdatedProduct={setUpdatedProduct} 
                                          updatedProduct={updatedProduct}
                                          product={product}
                                          setProduct={setProduct}// Pass the function here
                                                />
            : null}

   
        </div>
            : <p>wait a second ....</p>}
    </div>
  )
}

export default AdminProduct