import React, {useContext } from 'react';
import styles from './searchingcomponent.module.css';
import { AuthContext } from '../../context/AuthContext';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css'

// import required modules
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';


function SearchingComponent() {


  
    const {filteredProducts,addToBasketFunction} = useContext(AuthContext)
  
  return (
    <div>    <section className={styles.products} id={styles.products}>
                       <div className={`swiper ${styles.productSlider}`}>
                <div className={`swiper ${styles.wrapper}`}>
               
                <Swiper
        slidesPerView={1}
        spaceBetween={2}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >

        {filteredProducts && filteredProducts.map((product,index)=>( 
                <SwiperSlide key={product.id}>
                <div className={styles.box}>
                    <h3>{product.name}</h3>
                      <div className={styles.BoxImageDiv}>
                        <img src={product.image} alt='iphone12' className={styles.BoxImage}/>
                        </div> 
                        <div className={styles.price}>${product.price}</div>
                      
                      <div className={styles.stars}>
                            <i className='fas fa-star'></i>
                            <i className='fas fa-star'></i>
                            <i className='fas fa-star'></i>
                            <i className='fas fa-star'></i>
                            <i className='fas fa-star-half-alt'></i>
                      </div>
                      <div onClick={()=>addToBasketFunction(product.id)} className={styles.btn}>add to cart</div>
                      <Link to={`products/${product.id}`} className={styles.btn} >read more</Link>
                      
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

        </section></div>
  )
}

export default SearchingComponent