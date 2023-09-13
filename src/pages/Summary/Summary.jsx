import React, { useState } from 'react';
import styles from './summary.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import useAuth here

function Summary({ totalSum }) {

  const { basket, setMenuBasket, setSummaryWindow, checkOutFunction, successMessage,
    paymentWaiting, shipment,shipmentCost } = useAuth()

  const navigate = useNavigate();
  const today = new Date();

  return (
    <div className={styles.summaryMainDiv}>
      {!paymentWaiting ? <>
        <h1>Summary</h1>
        <div className={styles.summaryDate}> Date :  {today.toLocaleString()} </div>
        <div className={styles.summaryDiv}>
          {basket.length ? (
            <div className={styles.summary} >

              {basket.map((element, index) => (
                <div key={index} className={styles.summaryProduct} >
                  <div>{element.name}  </div>
                  <div className={styles.summaryProductDetails}>
                    <div>{element.quantity} colli</div>
                    <div className={styles.summaryProductDetailsPrice}>
                      <div>item price:</div>
                      <div>${element.price}</div>

                    </div>
                  </div>
                </div>
              ))}
              {shipment ?
                <div className={styles.shipment}>
                  <div>shipment:</div>
                  <div> $10</div>
                </div>
                :
                <div className={styles.shipment}>
                  <div>selfPickUp:</div>
                  <div>$0.00</div>
                </div>

              }

              <div className={styles.priceTAX}>
                <div>Total price without TAX:</div>
                <div>
                  {shipment ? (
                    <span>${(Math.round((totalSum + shipmentCost) / 1.21 * 100) / 100).toFixed(2)}</span>
                  ) : (
                    <span>${(Math.round(totalSum / 1.21 * 100) / 100).toFixed(2)}</span>
                  )}
                </div>
              </div>

              <div className={styles.priceTAX}>
                <div>TAX 21%:</div>
                <div>
                  {shipment ? (
                    <span>${(Math.round((totalSum - (totalSum + shipmentCost) / 1.21) * 100) / 100).toFixed(2)}</span>
                  ) : (
                    <span>${(Math.round((totalSum - totalSum / 1.21) * 100) / 100).toFixed(2)}</span>
                  )}
                </div>
              </div>

              <div className={styles.price}>
                <div>Total Price:</div>
                <div> {shipment ? <span>${(totalSum + shipmentCost) }</span> : <span>${totalSum}</span>}</div>
              </div>

              <div className={styles.buttons}>
                <button className={styles.btnPay}
                  onClick={checkOutFunction}
                >Pay now</button>

                <button className={styles.btnCancel}
                  onClick={() => {
                    navigate('/');
                    setMenuBasket(true);
                    setSummaryWindow(false)
                  }}
                > Go Back  </button>

              </div>
            </div>
          ) : null}
        </div>

      </> : <>
        {successMessage ? 
                <>
                  <p>{successMessage}</p>
                  {shipment  &&  <p>We have sent you an invoice to your email</p>}
                </>
         : <p>waiting for confirmation</p>}
      </>
      }
    </div>
  );
}

export default Summary;
