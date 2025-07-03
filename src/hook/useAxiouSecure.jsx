
import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';
   const axiouSecure = axios.create({
      baseURL:'http://localhost:5000',
    })
const useAxiouSecure = () => {
    const {user} = useAuth()
   axiouSecure.interceptors.request.use(confiq=>{

       confiq.headers.Authorization=`Berer,${user.accessToken}`
       return confiq;
    
    },error=>{
    return Promise.rejects(error)
    
   })
    return  axiouSecure
      
  
};

export default useAxiouSecure;