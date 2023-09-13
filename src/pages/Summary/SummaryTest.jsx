import React, { Fragment } from 'react';
import styles from './summary.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import useAuth here
import axios from 'axios';
import { useEffect } from 'react';
const baseUrl = import.meta.env.VITE_BASE_URL;

function Summary() {
  

  const navigate = useNavigate();
  const location = useLocation();
  const { amount, totalSum, shipment,selfPickUp } = location.state || {};
  const today = new Date();

  const { setMenuBasket,basket } = useAuth();

  useEffect(() => {
    // You can perform any necessary actions with the basket data here
    console.log(basket);
  }, [basket]);

console.log('shipment:',shipment)

  const sendDataToBackend = async () => {
    const purchaseProducts = {
      basket,
      amount,
      totalSum,
      shipment,
    };
  
    try {
      const url = `${baseUrl}/purchaseproducts`;
      const response = await axios.post(url, purchaseProducts, { withCredentials: true });
  
      const responseData = response.data;
      console.log(responseData)
      // Handle the response from the backend as needed
    } catch (err) {
      console.error(err);
      // Handle errors here
    }
  };

 

  return (
    <div className={styles.summaryMainDiv}>
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

       {/*      <div className={styles.amount}> 
                 <div>Amount: </div> 
                 <div> {amount}</div>
            </div> */}

<div className={styles.priceTAX}>
  <div>Price without TAX:</div>
  <div>
    {shipment ? (
      <span>${(Math.round((totalSum + 10) / 1.21 * 100) / 100).toFixed(2)}</span>
    ) : (
      <span>${(Math.round(totalSum / 1.21 * 100) / 100).toFixed(2)}</span>
    )}
  </div>
</div>

<div className={styles.priceTAX}>
  <div>TAX 21%:</div>
  <div>
    {shipment ? (
      <span>${(Math.round((totalSum - (totalSum + 10) / 1.21) * 100) / 100).toFixed(2)}</span>
    ) : (
      <span>${(Math.round((totalSum - totalSum / 1.21) * 100) / 100).toFixed(2)}</span>
    )}
  </div>
</div>



            <div className={styles.price}>
              <div>Total Price:</div>
              <div> {shipment ? <span>${(totalSum + 10)/3}</span> : <span>${totalSum}</span>}</div>
            </div>

        <div className={styles.buttons}>
            <button className={styles.btnPay}
                    onClick={sendDataToBackend}


            >Pay now</button>
  
            <button className={styles.btnCancel}
              onClick={() => {
                navigate('/');
                setMenuBasket(true);
              }}
            >
              Go Back
            </button>

       </div>
          </div>
        ) : (
          navigate('/')
        )}
      </div>
    </div>
  );
}

export default Summary;
