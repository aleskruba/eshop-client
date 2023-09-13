import React, { useEffect, useState, useRef } from 'react';
import styles from './adminusers.module.css';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

function AdminUsers() {
  const [allusers, setAllUsers] = useState([]);
  const [query, setQuery] = useState('');

  const filteredUsers = allusers?.filter(item=>{
    if (item.lastName) {
   return  (item.lastName).toLowerCase().includes(query.toLowerCase())
    }
    else {console.log('no last name')}
  })

  const initialUsersToShow = filteredUsers.slice(0, 2); // Display the first 5 users initially


  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${baseUrl}/getUsers`;
        const response = await axios.get(url, { withCredentials: true });
        setAllUsers(response.data.users);
        console.log(response.data.users)
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleChangeByEmail = (e) => {

  };

  const handleChangeByName = (e) => {
    setQuery(e.target.value);
  };

  const handleChangeByID = (e) => {

  };


  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1 className={styles.topTitle}>Users</h1>
      </div>

      <div className={styles.searchBar}>
        <div className={styles.searchField}>
          <div>Search by Email</div>
          <input
           
            type="search"
            onChange={handleChangeByEmail}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.searchField}>
          <div>Search by Last Name</div>
          <input
           value={query}
             type="search"
            onChange={handleChangeByName}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.searchField}>
          <div>Search by ID</div>
          <input
            type="search"
            onChange={handleChangeByID}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.results}>
     
             {initialUsersToShow.map((user) => (<>
          <div className={styles.filteredResults} key={user._id}>
            <div className={styles.searchField1}>{user.email}</div>
            <div className={styles.searchField2}>{user.lastName}</div>
            <div className={styles.searchField3}>{user._id}</div>
          </div>
                   </>
        ))}
        {filteredUsers && filteredUsers.length > 2 && (
          <div className={styles.filteredResults}>
            <div className={styles.searchField1}></div>
            <div className={styles.searchField2}> 
                <span className={styles.nextUsers}>... next {allusers.length-2} { allusers.length-2 > 1 ? 'users':'user'} </span></div>
            <div className={styles.searchField3}></div>
          </div>
        )}
    
      </div>
    </div>
  );
}

export default AdminUsers;
