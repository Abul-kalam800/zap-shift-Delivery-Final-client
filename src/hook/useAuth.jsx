import React, { use } from 'react';
import { AuthContex } from '../Contex/AuthContex';

const useAuth = () => {
    const authInfo = use(AuthContex)
    return authInfo;
  
};

export default useAuth;