import { Routes, Route } from 'react-router-dom';
import styles from './app.module.css'
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Product from './pages/Product/Product';
import Orders from './pages/Orders/Orders';
import Summary from './pages/Summary/Summary';
import Order from './pages/Order/Order';
import PrintInvoice from './pages/PrintInvoice/PrintInvoice';
import { RequireAuth } from './components/RequireAuth.jsx/RequireAuth';
import Page404 from './pages/Page404/Page404';
import PrintInvoiceLayout from './pages/Layout/PrintInvoiceLayout';
import Admin from './pages/Admin/Admin';
import { RequireAuthAmin } from './components/RequireAuth.jsx/RequiereAdminAuth';
import AdminUsers from './pages/AdminUsers/AdminUsers';
import AdminProducts from './pages/AdminProducts/AdminProducts';
import AdminUser from './pages/AdminUser/AdminUser';
import AdminProduct from './pages/AdminProduct/AdminProduct';
import AdminNewProduct from './components/AdminProductComponent/AdminNewProduct';

function App() {


  return (
    <Routes>
      <Route path="/" element={<Layout />}>
          <Route path="/" index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} /> 
          <Route path="/products"  element={<Products/>} />
          <Route path="/products/:id"  element={<Product/>} />
          <Route path="/print-invoice"  element={<PrintInvoice/>} />
          <Route path="*"  element={<Page404/>} />
          
          <Route element={<RequireAuth />}>
            <Route path="/orders"  element={<Orders/>} />
            <Route path="/orders/:id"  element={<Order/>} />
            <Route path="/summary"  element={<Summary/>} />

            <Route
                    path="/orders/:id/print-invoice"
                    element={<PrintInvoiceLayout />}
                  >
                  <Route index element={<PrintInvoice />} />
           </Route>

       
        </Route>

            <Route element={<RequireAuthAmin />}>
                <Route path="/admin"  element={<Admin/>}/> 
                <Route path="/admin-users"  element={<AdminUsers/>}/> 
                <Route path="/admin-users/:id"  element={<AdminUser/>}/> 
                <Route path="/admin-products"  element={<AdminProducts/>}/> 
                <Route path="/admin-products/:id"  element={<AdminProduct/>}/> 
                <Route path="/admin-newproduct"  element={<AdminNewProduct/>}/> 
            </Route>
          </Route>
    </Routes>
  );
}

export default App;