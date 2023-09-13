import React, { Fragment, useContext, useEffect } from 'react'
import styles from './offers.module.css'
import { AuthContext } from '../../context/AuthContext';
import { Link } from "react-router-dom";

function Offers() {


  const {products} = useContext(AuthContext)


  

  return (
    <>
        <section className={styles.offer} id={styles.offer}>

            <h1 className={styles.heading}>Best <span className={styles.span}>Offer</span></h1>

            <div className={styles.boxContainer}>   


            {products && products.map( (offer,index) => ( 
            
            <Fragment key={index} >
              {offer.discount && 
               
                <Link to={`products/${offer._id}`}   >
                        <div className={styles.box} >
                            <h3>{offer.name}</h3>
                                <img src={offer.image} alt='iphone12' className={styles.BoxImage}/>
                                <h1>${offer.price}  <span className={styles.stockAmount}>{offer.amount}pc on stock</span></h1>
                                <h3 className={styles.BoxH3}>{offer.title}</h3>
                                <p dangerouslySetInnerHTML={{ __html: offer.description }}></p>
                   
                        </div>
                </Link>
              }
              </Fragment >
           )
           )}
            
           
           
            </div>
        </section>
    </>
  )
}

export default Offers