import React,{useEffect,useState} from 'react'
import styles from './adminuserviewcomponent.module.css';
const baseUrl = import.meta.env.VITE_BASE_URL;
import axios from 'axios';

function AdminUserViewComponent({updateProfile,changePassword,backFunction,updatedUser,userFromLink}) {

    const [user,setUser] = useState(null)
    const [isLoading,setIsLoading] = useState(true)

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
  

    
  return (
    <>      {!isLoading ? <>
           <div className={styles.box}>
                <div>email:</div> <div>{user?.email}</div>
            </div>
            <div className={styles.box}>
                <div>first name:</div><div>{user?.firstName}</div>
            </div>
            <div className={styles.box}>
                <div>last name:</div><div>{user?.lastName}</div>
            </div>
            <div className={styles.box}>
                <div>company name</div><div>{user?.companyName}</div>
            </div>
            <div className={styles.box}>
                <div>street:</div><div>{user?.street}</div>
            </div>
            <div className={styles.box}>
                <div>ZIP Code:</div><div>{user?.zipCode}</div>
            </div>
            <div className={styles.box}>
                <div>city:</div><div>{user?.city}</div>
            </div>
            <div className={styles.box}>
                <div>vat</div><div>{user?.vat}</div>
            </div>
            <div className={styles?.box}>
                <div>admin</div><div>{user?.admin.toString()}</div>
            </div>

            <div className={styles.buttons}> 
                <button className={styles.updateProfile} onClick={()=>updateProfile()}>update profile</button>
                <button className={styles.changePassword} onClick={()=>changePassword()}>change password</button>
                <button className={styles.cancelBtn} onClick={backFunction}>back to users</button>
            </div>
          </>  : <p> wait a second ..</p>}

    </>
  )
}

export default AdminUserViewComponent