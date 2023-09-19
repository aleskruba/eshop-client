import React,{useEffect,useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import styles from './adminproducts.module.css';
import axios from 'axios';
const baseUrl = import.meta.env.VITE_BASE_URL;

function AdminProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [searchField, setSearchField] = useState('product'); // Default search field
  const [isLoading,setIsLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${baseUrl}/getproductsAdmin`;
        const response = await axios.get(url, { withCredentials: true });
        setAllProducts(response.data.products);
        setIsLoading(false)
        } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);


  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchFieldChange = (field) => {
    setSearchField(field);
  };

  const filteredProducts = allProducts.filter((product) => {
    if (query === '') {
      return true; 
    }
    
    if (searchField === 'product' && product.name.toLowerCase().includes(query.toLowerCase())) {
      return true;
    }
    
     //mongo
    if (product._id) {
          if (searchField === 'id' && (product._id).toString().includes(query.toLowerCase())) {
            return true;
          }
        } 

  //sql
      if (product.id) {
          if (searchField === 'id' && (product.id).toString().includes(query.toLowerCase())) {
            return true;
          }
        } 


    return false;
  });

  const initialProductstoShow = filteredProducts.slice(0, 5); // Display the first 5 users initially


  return (
    <div className={styles.container}>
      {!isLoading ? <> 
      <div className={styles.top}>
        <h1 className={styles.topTitle}>Products</h1>
      </div>
      <div className={styles.searchBar}>
        <div className={styles.searchField}>
          <div>Search by:</div>
          <select value={searchField} onChange={(e) => handleSearchFieldChange(e.target.value)}>
            <option value="product">Product</option>
            <option value="id">ID</option>
          </select>
        </div>

        <div className={styles.searchField}>
          <div>Search</div>
          <input
            value={query}
            type="search"
            onChange={handleChange}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.results}>
      {initialProductstoShow.map((product) => (
          <Link to={`../admin-products/${product._id ? product._id : product.id}`} 
                key={product._id ? product._id : product.id}
                state={{productFromLink:product}}
                > 
          <div className={styles.filteredResults} >
            <div className={styles.searchField1}>{product.name}</div>
            <div className={styles.searchField3}>{product._id}</div>
          </div>
        </Link>           
        ))}
        {filteredProducts  && (
          <div className={styles.filteredResults}>
            <div className={styles.searchField1}></div>
            <div className={styles.searchField2}> 
                <span className={styles.nextUsers}>... next {allProducts.length-5} { allProducts.length-5 > 1 ? 'products':'product'} </span></div>
            <div className={styles.searchField3}></div>
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className={styles.filteredResults}>
            <div className={styles.noResults}>No matching users found.</div>
          </div>
        )}
      </div>
      </> : <p>wait a second ...</p>}
    <div className={styles.buttons}>
      <button onClick={()=>{navigate('../admin-newproduct')}} className={styles.newProductBtn}>New product</button>
      <button onClick={()=>{navigate('../admin')}} className={styles.backBtn}>Back</button>
    </div>
     </div>
  );
}
export default AdminProducts