
import useAuth from '../hook/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivetRouter = ({children}) => {
    const {user,loading}= useAuth()
    const location = useLocation();
    console.log(location)
    if(loading){
        return <span className="loading loading-bars loading-xl"></span>
    }
    if(!user){
        return <Navigate state={{form:location.pathname}}to="/login"></Navigate>
    }
    return (
        <div>
          {children}  
        </div>
    );
};

export default PrivetRouter;