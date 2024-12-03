import React from 'react'
import Container from '../container/Container';
import {Logo, LogoutBtn} from '../index';
import { Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Header() {
    const navigate = useNavigate();
    const authStatus = useSelector((state)=>state.auth.status);
    const userData = useSelector((state)=>state.auth.userData);
    const navItems = [
        {
          name: 'Home',
          slug: "/",
          active: true
        }, 
        {
          name: "Login",
          slug: "/login",
          active: !authStatus,
      },
      {
          name: "Signup",
          slug: "/signup",
          active: !authStatus,
      },
      {
          name: "All Posts",
          slug: "/all-posts",
          active: authStatus,
      },
      {
          name: "Add Post",
          slug: "/add-post",
          active: authStatus,
      },
      ]
    
    return (
        <header className='py-3 shadow bg-gray-500'>
          <Container>
          <nav className='flex'>
            <div className='mr-4'>
            <Link to="/">
              <Logo width='70px'/>
              <h2 className='text-2xl font-bold cursor-pointer capitalize' >{ authStatus && (`Namaskar ${userData.name}`)}</h2>
            </Link>
            
            </div>
                <ul className='flex ml-auto'>
                {
                    navItems.map((navItem)=>
                        navItem.active?(
                            <li key={navItem.slug}>
                                <button onClick={()=>navigate(navItem.slug) }className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                                    {navItem.name}
                                </button>
                            </li>
                        ):null
                    )
                }
                 { authStatus && (
                        <li>
                            <LogoutBtn/>
                        </li>
                    )}
                   </ul>
            </nav>
          </Container>
            </header>
    )
}

export default Header
