import React, { useEffect, useState, useRef } from 'react'
import styles from './header.module.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Basket from '../Basket/Basket'
import EmptyBasket from '../Basket/EmptyBasket'
import Login from '../../pages/Login/Login'
import Signup from '../../pages/SignUp/SignUp'
import { useNavigate } from 'react-router-dom'
import Summary from '../../pages/Summary/Summary'

function Header() {

  const navigate = useNavigate()

  const { auth, isLoggedIn, menubtn, setMenuBtn,
    setIsSearching, setFilteredProducts, products,
    menuBasket, setMenuBasket, menuLogin, setMenuLogin, basket, setBasket, loginBtnRef,
    loginBtnDivRef, menuSignUp, setMenuSignUp,
    setMenuForgottenPassword, summaryWindow, setSummaryWindow,
    selfPickUp,
    setSelfPickUp,
    shipment, setShipment, shipmentCost, orderState, setOrdersState } = useAuth()

  const searchingProduct = useRef(null);
  const [searchingProductState, setSearchingProductState] = useState('');
  const [menuOptions, setMenuOptions] = useState(false)
  const [shipmentNotice, setShipmentNotice] = useState(false)


  let basketBtnRef = useRef()
  let basketBtnDivRef = useRef()
  let menubtnRef = useRef()
  let menubtnDivRef = useRef()

  useEffect(() => {
    let handler = (e) => {
      if (!basketBtnRef.current.contains(e.target) && !basketBtnDivRef.current.contains(e.target)) {
        setMenuBasket(false)
      }
    }
    document.addEventListener('mousedown', handler)

    return () => {

      document.removeEventListener('mousedown', handler);
    }

  }, [menuBasket])

  useEffect(() => {
    let handler = (e) => {
      if (!menubtnRef.current.contains(e.target) && !menubtnDivRef.current.contains(e.target)) {
        setMenuBtn(false)
      }
    }
    document.addEventListener('mousedown', handler)

    return () => {

      document.removeEventListener('mousedown', handler);
    }

  }, [menubtn])


  useEffect(() => {
    let handler = (e) => {
      if ((!loginBtnRef.current.contains(e.target) && !loginBtnDivRef.current.contains(e.target))

      ) {
        setMenuLogin(false)
        setMenuSignUp(false)
        setMenuForgottenPassword(false)
        setSearchingProductState('')
      }
    }
    document.addEventListener('mousedown', handler)

    return () => {

      document.removeEventListener('mousedown', handler);
    }

  }, [menuLogin,])

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // This creates a smooth scrolling effect
    });
  }

  const searchFormFunction = () => {
    setMenuBtn(!menubtn)
    navigate('/')
    setMenuBasket(false)
    setMenuLogin(false)
    setMenuOptions(false)

    setTimeout(() => {
      if (searchingProduct.current) {
        searchingProduct.current.focus();
      }
    }, 400);

  }


  const searchFormBasketFunction = () => {
    if (isLoggedIn) {
      setMenuBasket(!menuBasket)
      setMenuBtn(false)
      setMenuLogin(false)
      setMenuOptions(false)
    }
    else {
      setMenuBtn(false)
      setMenuOptions(false)
      setMenuLogin(!menuLogin)
      setMenuBasket(false)
    }

  }


  const loginFormFunction = () => {
    if (!menuSignUp) setMenuLogin(!menuLogin)
    if (!menuLogin) setMenuSignUp(false) 
    setMenuForgottenPassword(false)
    setMenuBtn(false)
    setMenuBasket(false)
    setMenuOptions(false)


  }

  const menuFormFunction = () => {
    setMenuBtn(false)
    setMenuBasket(false)
    setMenuLogin(false)
    setMenuOptions(!menuOptions)
  }

   useEffect(() => {
    const handleScroll = () => {
          setSearchingProductState('')
             setMenuBtn(false);
         
         /*    setMenuBasket(false);
            setMenuLogin(false);
            setMenuOptions(false); */
            setFilteredProducts(null);  
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 



  const handleClick = () => {
    setIsSearching(false)
    setMenuBasket(false);
    setMenuLogin(false);
    setMenuOptions(false);
    setMenuBtn(false)
    setFilteredProducts(null);
    setOrdersState(false)

  }

  const { amount, totalSum } = basket.reduce(
    (acc, item) => {
      const itemTotal = item.price * item.quantity;
      return {
        amount: acc.amount + item.quantity,
        totalSum: acc.totalSum + itemTotal,
      };
    },
    { amount: 0, totalSum: 0 }
  );



  const deleteItemsFromBasket = (ID) => {
    const updatedItems = basket.filter((element) => element.id !== ID)
    setBasket(updatedItems)
  }

  const increaseItems = (ID) => {
    const existingItem = basket.find((item) => item.id === ID);
    const selectedProduct = products.find((product) => product.id === ID);

    if (existingItem && selectedProduct && selectedProduct.amount > existingItem.quantity) {
      const updatedBasket = basket.map((item) =>
        item.id === ID ? { ...item, quantity: item.quantity + 1 } : item
      );
      setBasket(updatedBasket);
    } else {
      alert('No more items on stock');
    }
  };

  const decreaseItems = (ID) => {
    const existingItem = basket.find((item) => item.id === ID);

    if (existingItem && existingItem.quantity > 1) {
      const updatedBasket = basket.map((item) =>
        item.id === ID ? { ...item, quantity: item.quantity - 1 } : item
      );
      setBasket(updatedBasket);
    }
  };

  useEffect(() => { }, [isLoggedIn])

  const summaryFunction = ({ }) => {
    if (shipment || selfPickUp) {
      setMenuLogin(false);
      setMenuBasket(false);
      setSummaryWindow(true)


    }

    else { setShipmentNotice(true) }
  };


  const goBackFunctionFunction = () => {
    navigate('/')
    setMenuLogin(false)
    setMenuBasket(false)


  }

  const [message, setMessage] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        if (auth.user?.admin) {
          setMessage(`Hello ${auth.user?.firstName}`);
        } else {
          setMessage(`${auth.user?.email} is logged in`);
        }
      } else {
        setMessage('No user');
      }
    }, 200);

    // Clear the timer when the component unmounts or when dependencies change.
    return () => clearTimeout(timer);
  }, [isLoggedIn, auth]);

  return (<>


    <div className={summaryWindow ? styles.headerNoAction : styles.header}>


      <Link to="./admin" className={styles.logo}>
        <div onClick={handleClick}>
          {isLoggedIn ? (
            auth.user?.admin ? (
              <>
                <h3 className={styles.adminTitle}>ADMIN PAGE</h3>
              </>
            ) : (
              <>
                <i className='fas fa-shopping-basket'></i> Phones
              </>
            )
          ) : (
            <>
              <i className='fas fa-shopping-basket'></i> Phones
            </>
          )}
        </div>
      </Link>


      <h2>

   {message}

      </h2>


      <nav className={menuOptions ? `${styles.navbar} ${styles.active}` : styles.navbar}>
        <a href="/#home">home</a>
        <a href="/#phones">phones</a>
        <a href="/#reviews">reviews</a>
      </nav>

      <div className={!orderState ? styles.icons : styles.iconsnotactive}>

        <div className="fas fa-bars"
          id={styles.bars}
          onClick={menuFormFunction}
        >


        </div>
        <div className="fas fa-search"
          ref={menubtnRef}
          onClick={searchFormFunction}  >
        </div>
        <div className="fas fa-shopping-cart"
          id={styles.cartBtn}
          ref={basketBtnRef}
          onClick={searchFormBasketFunction}
        >
          {amount > 0 ? <div id={styles.amount}><span id={styles.amountSpan}>{amount} </span></div> : null}

        </div>
        <div className="fas fa-user"
          ref={loginBtnRef}
          id="login-btn"
          onClick={loginFormFunction}
        ></div>

      </div>



      <div ref={menubtnDivRef}>

        <form className={menubtn ? `${styles.searchForm} ${styles.active}` : styles.searchForm}>
          <input type='search'
            id='searchBox'
            className={styles.searchFormInput}
            placeholder='search here....'
            ref={searchingProduct}
            autoComplete='off'
            onChange={(e) => {
              scrollToTop()
              setSearchingProductState(e.target.value)

              if (e.target.value.length > 0) { setIsSearching(true) }
              else { setIsSearching(false) }
              const searchText = e.target.value.toLowerCase();

              const filtered = products.filter(product =>
                product.name.toLowerCase().includes(searchText)
              );

              setFilteredProducts(filtered);

            }}
            value={searchingProductState}
          />
          <label htmlFor='searchBox'
            className='fas fa-search'
            id={styles.searchFormLabel}></label>
        </form>

      </div>

      <div ref={basketBtnDivRef} className={menuBasket ? `${styles.shoppingCart} ${styles.active}` : styles.shoppingCart} >

        {basket.length > 0 ?
          basket.map((element, index) => (
            <Basket element={element}
              deleteItemsFromBasket={deleteItemsFromBasket}
              increaseItems={increaseItems}
              decreaseItems={decreaseItems}
              key={index}
            />
          ))
          :
          <EmptyBasket />
        }

        {basket.length > 0 ?
          <>
            <div>
              <div className={shipment ? styles.checkbox1 : null}>
                <div className={styles.checkBoxText}>Shipment $10</div>
                <input
                  type="checkbox"
                  className={shipment ? styles.checkBoxActive : styles.checkBox}
                  checked={shipment}
                  onChange={(e) => {
                    setShipment(e.target.checked);
                    setSelfPickUp(!e.target.checked);
                    setShipmentNotice(false);

                  }}
                  name="shipment"
                />
              </div>

              <div className={selfPickUp ? styles.checkbox2 : null}>
                <div className={styles.checkBoxText}>Self Pickup $0</div>
                <input
                  type="checkbox"
                  className={selfPickUp ? styles.checkBoxActive : styles.checkBox}
                  checked={selfPickUp}
                  onChange={(e) => {
                    setShipment(!e.target.checked);
                    setSelfPickUp(e.target.checked);
                    setShipmentNotice(false);

                  }}
                  name="selfpickup"
                />
              </div>
            </div>

            {shipmentNotice ? (
              <span className={styles.shipmentNotice}>Shipment or self pickup must be selected</span>
            ) : null}

            <div className={styles.total}>total price: {shipment ? <span>${totalSum + shipmentCost}</span> : <span>${totalSum} </span>}</div>
            <div className={styles.total}>total items: {amount}</div>

            <div onClick={summaryFunction} className={styles.btn}>go to summary</div>
            <div onClick={goBackFunctionFunction} className={styles.cancelBtn}>go back</div>


          </>
          : ''}
      </div>

      <div ref={loginBtnDivRef}>
        {menuLogin ? <Login /> : <Signup />}
      </div>

    </div>

    {summaryWindow ? <div className={styles.summaryWindow}>

      <Summary amount={amount}
        totalSum={totalSum}
        shipment={shipment}
        selfPickUp={selfPickUp}
      />
    </div>

      : null}

  </>


  )
}

export default Header

