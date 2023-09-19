import React,{useEffect,useState} from 'react'
import styles from './adminproductviewcomponent.module.css';


function AdminProductViewComponent({updateProduct,backFunction,product}) {

     
  return (
   <>
           <div className={styles.box}>
                <div className={styles.boxKey}>name:</div> <div>{product?.name}</div>
            </div>
            <div className={styles.box}>
                <div className={styles.boxKey}>price:</div><div>$ {parseInt(product?.price)}</div>
            </div>
            <div className={styles.box}>
                <div className={styles.boxKey}>amount:</div><div>{parseInt(product?.amount)}</div>
            </div>
            <div className={styles.box}>
                <div className={styles.boxKey}>image</div><div>{product?.image}</div>
            </div>
            <div className={styles.box}>
                <div className={styles.boxKey}>title:</div><div>{product?.title}</div>
            </div>
            <div className={styles.box}>
                <div className={styles.boxKey}>desc:</div><div>{product?.description}</div>
            </div>
            <div className={styles.box}>
                <div className={styles.boxKey}>discount:</div><div>{product?.discount.toString()}</div>
            </div>
      
            <div className={styles.buttons}> 
                <button className={styles.updateProfile} onClick={()=>updateProduct()}>update product</button>
                <button className={styles.cancelBtn} onClick={backFunction}>back to products</button>
            </div>
     </>
  )
}

export default AdminProductViewComponent