import React from 'react'
import styles from './footer.module.css'

function Footer() {
  return (
    <div>
      <section className={styles.footer}>
        <div className={styles.boxContainer} >

        <div className={styles.box}>
          <h3 className={styles.boxH3}>phones <i className='fas fa-shopping-basket'></i> </h3>
          <p className={styles.boxP}>The best places to buy a phone</p>
        <div className={styles.share}>
          <div className={styles.options}>
              <a href='#' className='fab fa-facebook-f'> <span>facebook</span></a>
              <a href='#' className='fab fa-twitter'><span>twitter</span></a>
              <a href='#' className='fab fa-instagram'><span>instagram</span></a>
              <a href='#' className='fab fa-linkedin'><span>linkedin</span></a>
              </div>
       </div>
      </div>

       <div className={styles.box}>
          <h3 className={styles.boxH3}>contact info</h3>
          <div className={styles.share}>
          <div className={styles.options}>
            <a href='#' className={styles.links}><i className='fas fa-phone'></i><span> +420 555 555 555</span></a>
            <a href='#' className={styles.links}><i className='fas fa-phone'></i><span> +420 666 666 666</span></a>
            <a href='#' className={styles.links}><i className='fas fa-envelope'></i> <span>phones@email.com</span></a>
            <a href='#' className={styles.links}><i className='fas fa-map-marker-alt'></i><span> Brno , Czechia</span></a>
            </div>
            </div>
         </div>
       
       
  
       </div>
      </section>

    </div>
  )
}

export default Footer