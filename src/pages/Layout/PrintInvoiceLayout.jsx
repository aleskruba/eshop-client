// PrintInvoiceLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';

function PrintInvoiceLayout() {
  return (
    <div>
      {/* Render only the PrintInvoice component without header and footer */}
      <Outlet />
    </div>
  );
}

export default PrintInvoiceLayout;
