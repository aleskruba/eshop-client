import React,{useContext} from 'react';
import moment from 'moment';
import styles from './PrintInvoice.module.css'; // Import your CSS styles for the invoice
import {  useLocation} from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AuthContext } from '../../context/AuthContext';

function PrintInvoice() {

  const location = useLocation();

  const { auth,shipment} = useAuth();
  const {user} = useContext(AuthContext)

  console.log(user)

  const { orderData, totalPrice } = location.state || {};


  const handlePrint = () => {
    window.print();
  };

  const cancelFunction = () => {
   window.history.back();

  };


  return (
    <div className={styles.invoiceContainer}>
    <div className={styles.header}>
      <div className={styles.supplier}>
         <div>DOKRAM s.r.o</div>
         <div>61900 Brno</div>
         <div>VAT:CZ00000000</div>
      </div>

      <div className={styles.customer}> 

      <div>Customer</div>
      <div className={styles.customerDetails}>
           <div>{auth.user?.email}</div>
          <div>{user.lastName ? user.lastName : auth.user?.lastName} </div>
          <div>{user.companyName ? user.lastName : auth.user?.lastName} </div>
          <div>{user.street ? user.street : auth.user?.street} </div>
          <div>{user.zipCode ? user.zipCode : auth.user?.zipCode} </div>
          <div>{user.city ? user.city : auth.user?.city} </div>
          <div>{user.vat ? user.vat : auth.user?.vat} </div>
        </div>
      </div>
   </div>

      <h1 className={styles.invoiceHeader}>Invoice {orderData?.invoiceNumber}</h1>
       <div className={styles.invoiceDetails}>
        <div className={styles.invoiceInfo}>
          <div>Order Number: {orderData?._id}</div>
          <div>Customer ID: {orderData?.mongoUserId}</div>
          <div>Order created at: {moment(orderData?.date).format('DD:MMM HH:mm , YYYY')}</div>
        </div>
        <div className={styles.invoiceItems}>
          {orderData?.basket.map((el, index) => (
            <div key={index} className={styles.invoiceItem}>
              <div className={styles.itemName}>{el.name}</div>
            
              <div className={styles.itemDescription}>
                <div className={styles.itemPrice}>Item Price: $ {el.price}</div>
                <div className={styles.itemQuantity}>{el.quantity} pieces</div>
              </div>
            </div>
          ))}
          
        </div>

        <div className={styles.summaryRow}>
          <div className={styles.summaryLabelShipment}>Shipment Cost:</div>
          <div className={styles.summaryValueShipment}>$ {orderData?.shipmentCost}</div>
        </div>
      </div>
      <div className={styles.invoiceSummary}>

 

        {totalPrice && (
          <div className={styles.summaryRow}>
            <div className={styles.summaryLabelTAX}>Total price without TAX::</div>
            <div className={styles.summaryValueTAX}>

            {shipment ? (
                    
                    <span>${(Math.round((parseInt(totalPrice) + orderData?.shipmentCost) / 1.21 * 100) / 100).toFixed(2)}</span>
                  ) : (
                    <span>${(Math.round(parseInt(totalPrice) / 1.21 * 100) / 100).toFixed(2)}</span>
                  )}


            </div>
          </div>
        )}

      {totalPrice && (
          <div className={styles.summaryRow}>
            <div className={styles.summaryLabelTAX}>TAX 21%:</div>
            <div className={styles.summaryValueTAX}>{shipment ? (
                    <span>${(Math.round((parseInt(totalPrice) - (parseInt(totalPrice) + orderData?.shipmentCost) / 1.21) * 100) / 100).toFixed(2)}</span>
                  ) : (
                    <span>${(Math.round((parseInt(totalPrice) - parseInt(totalPrice) / 1.21) * 100) / 100).toFixed(2)}</span>
                  )}</div>
          </div>
        )}



        {totalPrice && (
          <div className={styles.summaryRow}>
            <div className={styles.summaryLabel}>Total Price:</div>
            <div className={styles.summaryValue}>$ {totalPrice}</div>
          </div>
        )}
      </div>
      <div className={styles.buttons}>
        <button className={styles.printButton} onClick={handlePrint}>
          Print Invoice
        </button>
        <button className={styles.printButton} onClick={cancelFunction} >
          Back
        </button>
      </div>
    </div>
  );
}

export default PrintInvoice;
