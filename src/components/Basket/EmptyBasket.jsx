import React from 'react'
import styles from './basket.module.css'

function EmptyBasket() {
  return (
    <div className={styles.noItems}>No Items</div>
  )
}

export default EmptyBasket