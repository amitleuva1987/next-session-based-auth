import axios from "axios";

const custom_axios = axios.create({
    baseURL:'http://localhost',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials:true  
});

export default custom_axios;