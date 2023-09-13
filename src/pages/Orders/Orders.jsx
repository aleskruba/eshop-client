import React,{useContext,useEffect} from 'react'
import styles from './orders.module.css';
import { Link, useNavigate,useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import moment from 'moment'
import axios from 'axios'
const baseUrl = import.meta.env.VITE_BASE_URL;

function Orders() {

  const {orders,setOrdersState,orderState,setOrders,setIsLoading,auth} = useContext(AuthContext)
  const navigate = useNavigate()


  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/getorders`,{ withCredentials: true });
        setOrders(response.data.orders);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [orderState]);


  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        // Navigate to the root path on Enter key press
        navigate('/');
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [navigate]);


  return (
     <div className={styles.ordersMainContainer}>    

       <div className={styles.ordersMainDiv}>
       <h1 className={styles.title}>Your Orders</h1>
          {orders?.sort((a, b) => new Date(b.date) - new Date(a.date))
  .map((order,index)=> {
              let totalPrice = parseInt(order.shipmentCost) 
              order.basket.forEach(element=>{
              totalPrice += parseInt(element.price)*parseInt(element.quantity);
              })
            
              let totalQuantity = 0;
              for (const item of order.basket) {
                totalQuantity += item.quantity;
              }


          return (
            <Link
            to={order._id ? `/orders/${order._id}` : `/orders/${order.id}` }
            state={{ orderData: order , shipmentCost:order.shipmentCost, totalPrice: totalPrice , totalQuantity:totalQuantity }}
            key={index}
          >
                <div  className={`${styles.ordersList} ${index % 2 === 0 ? styles.even : styles.odd}`}>
                  <div className={styles.date}>  {moment(order.date).format('DD:MMM HH:mm , YYYY')} </div>
                  <div className={styles.order}> {order._id ? order._id : order.id}  </div>
                  <div className={styles.price}>  $ {totalPrice}  </div>
                  
                </div>
           </Link>    

          )
      })}
       </div>
       <div className={styles.buttons}>
      <button onClick={()=>{setOrdersState(false);navigate('/')}} className={styles.btn}>back</button>
      </div>
    </div>

  )
}

export default Orders