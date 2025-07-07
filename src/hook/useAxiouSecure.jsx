import axios from "axios";
import React from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiouSecure = axios.create({
  baseURL: "http://localhost:5000",
});
const useAxiouSecure = () => {
  const { user,logOut } = useAuth();
  const navigator = useNavigate()
  axiouSecure.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Berer ${user.accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axiouSecure.interceptors.response.use(res=>{
    return res;

  },error=>{
      console.log('Inside the res interceptor',error.status)
      const status = error.status;
      if(status==403){
        navigator('/forbidden')
      }
      else if(status==401){
        logOut() 
        .then(()=>{

            navigator('/login')
        }).catch(()=>{
            

        })
      }
      return Promise.reject(error)
  });
return axiouSecure;
};



export default useAxiouSecure ;
