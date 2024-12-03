import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect,useState } from 'react'

export default function Protected({children,authentication}) {
    const navigate=useNavigate()
    const authStatus=useSelector((state)=>state.auth.status)
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        if(authentication && authStatus!==authentication){//true && false = false     true && true = true
            navigate('/login');
        }else if(!authentication && authStatus!==authentication){ //true  && false=false   false && true = false
            navigate('/');
        }
        setLoading(false);
    },[authentication,authStatus,navigate])
    return loading?(<h1>Loading...</h1>):(<>{children}</>)
}


