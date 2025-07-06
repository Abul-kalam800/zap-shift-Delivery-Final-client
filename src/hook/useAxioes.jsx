import axios from "axios";

const axiosInstance = axios.create({
      baseURL:'http://localhost:5000',
})

const useAxioes = () => {
    return axiosInstance
        
   
};

export default useAxioes;