
import axios from 'axios';
import React from 'react';
   const axiouSecure = axios.create({
      baseURL:'http://localhost:5000',
    })
const useAxiouSecure = () => {
 
    return  axiouSecure
      
  
};

export default useAxiouSecure;