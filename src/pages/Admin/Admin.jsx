import React, { useEffect, useState } from 'react';
import styles from './admin.module.css';
import moment from 'moment';
import { Link } from 'react-router-dom';

function Admin() {
  const today = new Date();
  return (
    <div className={styles.container}>
      <div className={styles.time}>
        <h1 className={styles.timeText}>
          Today is {moment(today).format('DD.MMMM YYYY')}
        </h1>
      </div>

      <Link to='../admin-users'>
        <div className={styles.users}>
          <h1 className={styles.usersText}>Users</h1>
          <img className={styles.imageUser} src="users.png" alt="" />
        </div>
      </Link>
      
      <Link to='../admin-products'>
      <div className={styles.products}>
          <h1 className={styles.productsText}>Products</h1>
        <img className={styles.imagePhone} src="phones.png" alt="" />  
      </div>
      </Link>

    </div>
  );
}

export default Admin;
