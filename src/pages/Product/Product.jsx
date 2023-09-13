import React, { useEffect, useState,useContext } from 'react';
import styles from './product.module.css';
import { useParams, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
const baseUrl = import.meta.env.VITE_BASE_URL;
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';


function Product() {
    let { id } = useParams();
    const [offer, setOffer] = useState(null);
    const navigate = useNavigate(); // Use the useNavigate hook

    const {addToBasketFunction,menuBasket, menuLogin, menuSignUp,setMenuBtn} = useContext(AuthContext)
   
   
    useEffect(() => {
      
        const fetchData = async () => {
            try {
                const url = `${baseUrl}/getproducts`;
                const response = await axios.get(url);
                const foundOffer = response.data.products.find((o) => o._id == id);
                setOffer(foundOffer);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
        setMenuBtn(false);
    }, [id]);

    const handleBack = () => {
        navigate("/");

    };



    if (!offer) {
        return <div>Loading...</div>;
    }

  return (

    <div className={menuBasket || menuLogin || menuSignUp ? styles.homeMainDiv : null}>
    <div className={styles.container}>
          <div className={styles.section}>
              <div className={styles.box} key={offer.id}>
                     <h3>{offer.name}</h3>
                     <div   className={styles.imageCart}>
                        <img src={`/${offer.image}`} alt='iphone12' className={styles.BoxImage}/>
                        <div className={styles.cart}>
                                <div onClick={()=>addToBasketFunction(offer.id)} className={styles.btn}>add to cart</div>

                        </div>
                       </div>
                       <h1>${offer.price}</h1>
                      <h3 className={styles.BoxH3}>{offer.title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: offer.description }}></p>
             <div className={styles.buttons}>
                      <button onClick={handleBack} className={styles.btn}>
                            back
                        </button>
              </div>
             </div>
            </div>
    </div>
    </div>
  )
}

export default Product