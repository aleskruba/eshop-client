import React from 'react';
import styles from './order.module.css';
import {  useLocation,useNavigate } from 'react-router-dom';
import moment from 'moment'


function Order() {

  const location = useLocation();
  const navigate = useNavigate();

   const { orderData, totalPrice, totalQuantity,shipment,shipmentCost } = location.state || {};

  const redirectToPrintPage = () => {

    // Navigate to the printing page with the necessary data
    navigate('print-invoice', { 
      state: { orderData, totalPrice, totalQuantity },
    }
      );
  };


  return (
    <div className={styles.orderMainContainer}>
          <div className={styles.orderMainDIV}>
            <div className={styles.orderMainDIVTOP}>
            <div className={styles.orderMainDIVTOPtext}>Order Number: {orderData?._id ? orderData?._id : orderData?.id}</div>
            <div className={styles.orderMainDIVTOPtext}>Customer ID: {orderData?.mongoUserId}</div>
            <div className={styles.orderMainDIVTOPdate}>Order created at : {moment(orderData?.date).format('DD:MMM HH:mm , YYYY')}</div>
          </div>
        <div>
          {orderData?.basket.map( (el,index) => (
               <div key={index} className={styles.basket}>
                <div  className={styles.basketTop}>
                  <div className={styles.name}>{el.name}</div>
                  <div><img src={`/${el.image}`} className={styles.image}/></div> 
                  </div>
                <div  className={styles.desciption}>
                  <div className={styles.price}>Item Price :$ {el.price}</div>
                  <div className={styles.quantity}> {el.quantity} {el.quantity > 1 ?  'pieces' : 'piece'}</div>
                </div>
               </div>
          
          ))}
      
          </div>
      
          <div className={styles.shipment} >shipment cost : $ {orderData?.shipmentCost}</div>
          <div className={styles.summary}>    
      
      <div className={styles.pieces} >total pieces :  {totalQuantity}</div>    
   
      {totalPrice && 
      <div className={styles.priceTAX}>
                <div>Total price without TAX:</div>

 
                <div>
                  {shipment ? (
                    
                    <span>${(Math.round((parseInt(totalPrice) + shipmentCost) / 1.21 * 100) / 100).toFixed(2)}</span>
                  ) : (
                    <span>${(Math.round(parseInt(totalPrice) / 1.21 * 100) / 100).toFixed(2)}</span>
                  )}
                </div>


              </div>
      }
    {totalPrice && 
            <div className={styles.priceTAX}>
                <div>TAX 21%:</div>
                
                <div>
                  {shipment ? (
                    <span>${(Math.round((parseInt(totalPrice) - (parseInt(totalPrice) + shipmentCost) / 1.21) * 100) / 100).toFixed(2)}</span>
                  ) : (
                    <span>${(Math.round((parseInt(totalPrice) - parseInt(totalPrice) / 1.21) * 100) / 100).toFixed(2)}</span>
                  )}
                </div>
              </div>}
      

      {totalPrice && <div className={styles.totalPrice}>
        <div>Total Price: </div>  <div>$ {totalPrice}</div> 
        </div>
        }
     
      </div>
      
         </div>
     
      <div className={styles.buttons}>
            <button className={styles.btnInvoice}
               onClick={redirectToPrintPage}
            >
              Invoice
            
            </button>
            <button className={styles.btnBack}
                    onClick={()=>{navigate('/orders')}}
             >Back
            </button>
      </div>
 
    </div>
  );
}

export default Order;
