import React, {useContext } from 'react';
import styles from './products.module.css';
import { AuthContext } from '../../context/AuthContext';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css'

// import required modules
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';


function Products() {


  const {products,addToBasketFunction} = useContext(AuthContext)
   


  return (
    <div>
          

        <section className={styles.products} id={styles.products}>
            <h1 className={styles.heading}>Phones</h1>
            <div className={`swiper ${styles.productSlider}`}>
                <div className={`swiper ${styles.wrapper}`}>
               
                <Swiper
        slidesPerView={1}
        spaceBetween={50}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >

        {products && products.map((product,index)=>( 
                <SwiperSlide key={index}>
                <div className={styles.box}>
                    <h3>{product.name}</h3>
                      <div className={styles.BoxImageDiv}>
                        <img src={product.image} alt='' className={styles.BoxImage}/>
                        </div> 
                        <div className={styles.price}>${product.price}<span className={styles.stockAmount}>{product.amount}pc on stock</span></div>
                      
                      <div className={styles.stars}>
                            <i className='fas fa-star'></i>
                            <i className='fas fa-star'></i>
                            <i className='fas fa-star'></i>
                            <i className='fas fa-star'></i>
                            <i className='fas fa-star-half-alt'></i>
                      </div>
                      <div onClick={()=>addToBasketFunction(product.id)} className={styles.btn}>add to cart</div>

                      <Link to={`products/${product._id}`} className={styles.btn} >read more</Link>
                      
                      {product.title.length > 40 ? (
                        <h3 className={styles.BoxH3}>{product.title.slice(0, 100)}...</h3>
                      ) : (
                        <h3 className={styles.BoxH3}>{product.title}</h3>
                      )}
                              
                    {product.description.length > 30 ? (
                        <p className={styles.BoxP} dangerouslySetInnerHTML={{ __html: product.description.slice(0, 150) + '...' }}></p>
                      ) : (
                        <p className={styles.BoxP} dangerouslySetInnerHTML={{ __html: product.description }}></p>
                      )}        
                   
                   
                   
                </div>
                </SwiperSlide>

             ))}
               
                </Swiper>

                </div>

            </div>

        </section>

    </div>
  )
}

export default Products