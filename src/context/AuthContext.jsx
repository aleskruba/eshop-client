import React,{useState,useEffect,useContext,createContext,useRef} from 'react'
import axios from 'axios'
const baseUrl = import.meta.env.VITE_BASE_URL;

export const AuthContext = createContext({})

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider(props) {

    const [auth, setAuth] = useState({ user: null, tokens: null });
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const [products,setProducts] = useState()
    const [orders,setOrders] = useState()
    const [isLoading,setIsLoading] = useState(false)
    const [isSearching,setIsSearching] = useState(false)
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [menuBasket,setMenuBasket] = useState(false)
    const [menuLogin,setMenuLogin] = useState(false)
    const [ menuProfile, setMenuProfile] =useState(false)
    const [ menuChangePassword, setMenuChangePassword] =useState(false)
    const [menuSignUp,setMenuSignUp] = useState(false)
    const [menuForgottenPassword,setMenuForgottenPassword] = useState(false)
    const [basket,setBasket] = useState([])
     const [menubtn,setMenuBtn] = useState(false)
    const [summaryWindow,setSummaryWindow] = useState(false)
    const [successMessage,setSuccessMessage] = useState(null)
    const [paymentWaiting,setPaymentWaiting] = useState(false)
    const [shipment,setShipment] = useState(false)
    const [selfPickUp,setSelfPickUp] = useState(false)
    const [orderState,setOrdersState] = useState(false)
    const [updateReview,setUpdateReview] = useState(false)
    const [fetchedComments,setFetchedComments] = useState([])
    const [selectedStars, setSelectedStars] = useState(5); 
    const [user,setUser] = useState(null)
    
    const shipmentCost = 10

    let loginBtnRef = useRef() 
    let loginBtnDivRef = useRef() 
    let signUpBtnDivRef = useRef() 

    
  
    useEffect(() => {
    
      const checkAuthentication = () => {
        if (auth.user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      };
    
      checkAuthentication();
    }, [auth.user]);
    
    
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const url = `${baseUrl}/checkuser`;
          const response = await axios.get(url, { withCredentials: true });
          const responseData = response.data;

          if (responseData.user) {
            setAuth({
              user: responseData.user,
              tokens: {
                jwt: responseData.accessToken,
                refreshToken: responseData.refreshToken,
              },
            });
            setUser(responseData.user)
          } else {
            setAuth({ user: null, tokens: null });
            setUser(null)
          }
        } catch (err) {
          console.log('Error fetching user data:', err);
          setAuth({ user: null, tokens: null });
        } 
      };
    
      fetchUserData();
    }, []);


    useEffect(() => {
      const fetchProductsData = async () => {
        try {
          const response = await axios.get(`${baseUrl}/getproducts`);
          setProducts(response.data.products);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
          setIsLoading(false);
        }
      };
  
      fetchProductsData();
    }, []);
  
    // Fetch messages data when selectedStars or updateReview changes
    useEffect(() => {
      const fetchMessagesData = async () => {
        try {
          const url = `${baseUrl}/getmessages`;
          const response = await axios.get(url, { withCredentials: true });
          setFetchedComments(response.data.comments);
        } catch (err) {
          console.log(err);
        }
      };
  
      fetchMessagesData();
    }, [selectedStars, updateReview]);

   

        const addToBasketFunction = (ID) => {
          const existingItem = basket.find((item) => item.id === ID);
          const selectedProduct = products.find((product) => product.id === ID);
        
          if (existingItem) {
            if (selectedProduct && selectedProduct.amount > existingItem.quantity) {
              const updatedBasket = basket.map((item) =>
                item.id === ID ? { ...item, quantity: item.quantity + 1 } : item
              );
              setBasket(updatedBasket);
            } else {
              alert('No more items on stock');
            }
          } else {
            if (selectedProduct && selectedProduct.amount > 0) {
              setBasket([...basket, { ...selectedProduct, quantity: 1 }]);
            } else {
              alert('No more items on stock');
            }
          }
        };
        
        const checkOutFunction = async () => {
          try {
            const updatedProducts = products.map((product) => {
              const basketItem = basket.find((item) => item.id === product.id);
              if (basketItem) {
                return {
                  ...product,
                  amount: product.amount - basketItem.quantity,
                };
              }
              return product;
            });
        
            const url = `${baseUrl}/purchaseproducts`;
            const data = {
              products: updatedProducts,
              basket: basket,
              shipment: shipment,
              shipmentCost:shipmentCost
            };
        
            const config = {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            };
        
            const response = await axios.put(url, data, config);
             
            if (response.status === 200) {
              // Update the state with the updated product list from the response
              setProducts(updatedProducts);
              setPaymentWaiting(true);
              setSuccessMessage(response.data.message);
        
              setTimeout(() => {
                setSummaryWindow(false);
                setPaymentWaiting(false);
                setBasket([]);
              }, 1000);
            }
          } catch (err) {
            console.log(err);
          }
        };
        

      
    
        
const value = {
    auth, 
    setAuth,
    isLoggedIn,
    setIsLoggedIn,
    isLoading,
    setIsLoading,
    products,
    isSearching,
    setIsSearching,
    filteredProducts,
    setFilteredProducts,
    menuBasket,
    setMenuBasket,
    menuLogin,
    setMenuLogin,
    basket,
    setBasket,
    addToBasketFunction,
    loginBtnRef,
    loginBtnDivRef,
    signUpBtnDivRef,
    menuSignUp,
    setMenuSignUp,
    menuForgottenPassword,
    setMenuForgottenPassword,
    menuProfile, 
    setMenuProfile,
    menubtn,
    setMenuBtn,
    menuChangePassword, 
    setMenuChangePassword,
    summaryWindow,
    setSummaryWindow,
    checkOutFunction,
    successMessage,
    paymentWaiting,
    selfPickUp,
    setSelfPickUp,
    shipment,
    setShipment,
    orders,
    setOrders,
    shipmentCost,
    orderState,setOrdersState,
    setUpdateReview,updateReview,fetchedComments,setSelectedStars,selectedStars,
    user,setUser

}

return (
    <AuthContext.Provider value={value}>
         {props.children}
    </AuthContext.Provider>
)

}

