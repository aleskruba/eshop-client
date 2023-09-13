// Layout.js
import React from 'react';
import styles from './layout.module.css';
import Header from '../../components/Header/Header';
import { Outlet, useLocation } from 'react-router-dom';

function Layout() {
  const location = useLocation();
  const shouldRenderHeader = !location.pathname.includes('/print-invoice'); // Exclude the header for the /print-invoice route

  return (
    <div>
      {shouldRenderHeader && <Header />}
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
