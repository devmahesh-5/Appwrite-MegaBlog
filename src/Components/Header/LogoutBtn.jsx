import React from 'react'
import authService from '../../Appwrite/auth';
import {useDispatch} from 'react-redux';
import { logout } from '../../../store/authslice';
import { Navigate } from 'react-router-dom';
function LogoutBtn() {
    const dispatch=useDispatch();
    const  logoutHandler=()=>{
        authService.logout()
        .then(()=>{
            dispatch(logout());
            Navigate('/');

        }).catch((error)=>{
            console.log(error);
        })
    }
    return (
        <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
    )
}

export default LogoutBtn
