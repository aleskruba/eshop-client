import React,{useEffect} from 'react'
import styles from './adminproducts.module.css';
import axios from 'axios';
const baseUrl = import.meta.env.VITE_BASE_URL;

function AdminProducts() {
  useEffect(()=>{
    const fetchData = async () => {
      try {
          const url = `${baseUrl}/getproductsAdmin`;
          const response = await axios.get(url,{ withCredentials: true });
          console.log(response.data.products)
     

      } catch (err) {
          console.log(err);
      }
  };

  fetchData()
  },[])

  return (
    <div>AdminProducts</div>
  )
}

export default AdminProducts