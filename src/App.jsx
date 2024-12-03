import React ,{ useState,useEffect } from 'react'
import authService from './Appwrite/auth';
import {useDispatch} from 'react-redux';
import './App.css'
import { login, logout } from '../store/authslice';
import { Header, Footer } from './Components';
import {Outlet} from 'react-router-dom';
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect (()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      userData?dispatch(login({userData})):dispatch(logout());
    })
    .catch((error)=>{
      console.log('Error fetching user data:', error);
    })
    .finally(()=>{
      setLoading(false);
    })

  },[]);
  return !loading?(
    <div className='bg-gray-400 min-h-screen flex flex-wrap content-between'>
      <div className='w-full block'>
      <Header />
      <main>
       < Outlet />
      </main>
      <Footer />
      </div>
    </div>
  ):null;
  
}

export default App
