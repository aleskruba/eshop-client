import React from 'react'
import styles from './basket.module.css'

function Basket({deleteItemsFromBasket,element,increaseItems,decreaseItems}) {

    return (

    <>
    <div className={styles.box} >
    <i className="fas fa-trash" id={styles.trash} onClick={()=>deleteItemsFromBasket(element.id)}></i>

    <div className={styles.counter}> 
                <div className={styles.counterButtons}>
                            <button className={styles.counterButtonsI} onClick={()=>increaseItems(element.id)}>+</button> 
                            <button className={styles.counterTotal}> {element.quantity} </button> 
                            <button className={styles.counterButtonsD} onClick={()=>decreaseItems(element.id)}>-</button>
                </div>
    </div>

     <div className={styles.imageDiv}>   
      <img src={`/${element.image}`}
          alt=""
          className={styles.images}
          />
     </div>
      <div className={styles.content}>
            <div>
                <h3 className={styles.contentH3}>{element.name}</h3> 
             </div>
                      
       <span className={styles.price}>${element.price}</span>
          <span className={styles.quantity}>on Stock {element.amount}</span>
      </div>

    </div>

      </>
  )
}

export default Basket