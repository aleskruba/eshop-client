import React from 'react'
import styles from './page404.module.css';
import {useNavigate } from 'react-router-dom';

function Page404() {

  const navigate = useNavigate()

  return (
    <div className={styles.container}>
        <h1 className={styles.h1Text}>This page does not exist ...</h1>
        <button className={styles.btn}
                onClick={()=>navigate('/')}>
                  Go back
        </button>

    </div>
  )
}

export default Page404