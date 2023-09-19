import React ,{useContext} from 'react'
import styles from './home.module.css'
import Offers from '../../components/Offer/Offers'
import Products from '../Products/Products'
import Reviews from '../Reviews/Reviews'
import Footer from '../../components/Footer/Footer'
import HomeComponent from '../../components/HomeComponent/HomeComponent'
import SearchingComponent from '../../components/SearchingComponent/SearchingComponent'
import { AuthContext } from '../../context/AuthContext'


function Home() {

  const {isSearching,menuBasket,menuLogin,menuSignUp,summaryWindow} = useContext(AuthContext)



  return (
  <div className={menuBasket || menuLogin || menuSignUp || summaryWindow ? styles.homeMainDiv : null}>

 
    <div id='home'>

    {isSearching  ? 
       <div  id='search'>
      <SearchingComponent/>
      </div>
:   
     menuBasket || menuLogin || menuSignUp || summaryWindow ?  null : <HomeComponent/>
    }

    </div>
    <div  id='offer'>
    <Offers/>
    </div>

    <div  id='phones'>
    <Products />
    </div>
    <div id='reviews'>
    <Reviews/>
    </div>
    <div>
      <Footer/>
    </div>
 
   </div>
   
  )
}

export default Home