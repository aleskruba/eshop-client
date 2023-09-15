import React, { useState,useEffect } from 'react'
import {useLocation,useNavigate} from 'react-router-dom';
import styles from './adminuser.module.css';
import AdminUserViewComponent from '../../components/AdminUserComponent/AdminUserViewComponent';
import AdmiUserUpdateProfileComponent from '../../components/AdminUserComponent/AdmiUserUpdateProfileComponent';
import AdminUserChangePasswordComponent from '../../components/AdminUserComponent/AdminUserChangePasswordComponent';
const baseUrl = import.meta.env.VITE_BASE_URL;
import axios from 'axios';

function AdminUser() {

    const [userView,setUserView] = useState(true)
    const [userUpdate,setUserUpdate] = useState(false)
    const [userChangePassword,setUserChangePassword] = useState(false)
    const [user, setUser] = useState(null);
    const [updatedUser,setUpdatedUser] = useState(false)
    const [isLoading,setIsLoading] = useState(true)

    const location = useLocation()
    const navigate = useNavigate()

    const userFromLink = location.state.userFromLink._id ? location.state.userFromLink._id :location.state.userFromLink.id 

    useEffect(()=>{
        const fetchData =  async () => {
        try {
          const url = `${baseUrl}/getuserADMIN`;
    
          const params = {
            id: userFromLink,
          };
    
          const config = {
          headers: {
            'Content-Type': 'application/json',
          },
          params,
          withCredentials: true, // Set the withCredentials option to true
        };
    
    
        const response = await axios.get(url, config);
        setUser(response.data.user);
        setIsLoading(false)
        }catch(err)
          {console.log(err)}
      }
    
      fetchData()
      },[updatedUser])
  


    const updateProfile = () => {
        setUserChangePassword(false)
        setUserView(false)
        setUserUpdate(true)
    }

    const changePassword = () => {
        setUserChangePassword(true)
        setUserView(false)
        setUserUpdate(false)
    }

    const cancelFunction = () => {
        setUserView(true)
        setUserUpdate(false)
        setUserChangePassword(false)
    }

    const backFunction = () => {
        navigate('/admin-users')
    }

  return (
    <div className={styles.container}>
        {!isLoading ? 
        <div className={styles.mainDIV} >
            {userView ? 
             <AdminUserViewComponent user={user}
                                     updateProfile={updateProfile}
                                     changePassword={changePassword}
                                     backFunction={backFunction}
                                     userFromLink={userFromLink}
                                     updatedUser={updatedUser}
                                     
                                     />
            : null}

            {userUpdate ? 
               <AdmiUserUpdateProfileComponent cancelFunction={cancelFunction}
                                            //    userID={user}
                                                setUserView={setUserView}
                                                setUserUpdate={setUserUpdate}
                                                setUpdatedUser={setUpdatedUser} 
                                                updatedUser={updatedUser}
                                                user={user}
                                                setUser={setUser}// Pass the function here
                                                />
            : null}

            {userChangePassword ? 
               <AdminUserChangePasswordComponent cancelFunction={cancelFunction}
                                                 user={user}
                                                 setUserView={setUserView}
                                                 setUserChangePassword={setUserChangePassword}
                                                  />
            : null}

        </div>
            : <p>wait a second ....</p>}
    </div>
  )
}

export default AdminUser