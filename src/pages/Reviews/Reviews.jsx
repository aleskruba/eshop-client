import React, { useEffect, useState,useContext } from 'react'
import styles from './reviews.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
const baseUrl = import.meta.env.VITE_BASE_URL;
import axios from 'axios';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css'
import ReviewComponent from '../../components/Review/ReviewComponent';
import moment from 'moment'
import { AuthContext } from '../../context/AuthContext';




function Reviews() {


  const {updateReview,fetchedComments,setSelectedStars,selectedStars} = useContext(AuthContext)

 

  return (

    <div>
         <h1 className={styles.heading}>Reviews</h1>

    <section className={styles.review}>

    <Swiper
        slidesPerView={1}
        spaceBetween={10}
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
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >

        {fetchedComments.map( (comment,index) => ( 
                <SwiperSlide key={index}>
                    <div className={styles.box}>
           {/*          <div className={styles.BoxImageDiv}>
                       <img src={comment.image} alt="" className={styles.BoxImage} />
                    </div> */}
                      <p><span className={styles.name}>{comment.username}</span> wrote on <span className={styles.date}>{moment(comment.date).format('DD.MMM YYYY')} </span></p>
                <p className={styles.message}>{comment.message}</p>
       

            <div className={styles.stars}>
  {Array.from({ length: 5 }).map((_, index) => (
    <i
      key={index}
      className={`fas fa-star ${styles.starIcon} ${index < comment.stars ? styles.selected : ''}`}
    ></i>
  ))}
</div>


                    </div>
                </SwiperSlide>
      )) }

       </Swiper>




    </section>
  <div className={styles.comments}>
        <ReviewComponent selectedStars={selectedStars} setSelectedStars={setSelectedStars}/>
      </div>
  
    </div>
  )
}

export default Reviews