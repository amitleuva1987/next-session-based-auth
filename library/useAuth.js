import useSWR from 'swr'
import custom_axios from './axios'
import {useRouter} from 'next/router'
import { useEffect, useState } from 'react';

function useAuth({middleware} = {}){
    const router = useRouter();
    const [isLoading,setIsloading] = useState(true);
    
    const {data:user,error,mutate} = useSWR('api/user',
        url => custom_axios.get(url).then(response => response.data),
        {shouldRetryOnError:false}
    )
    useEffect(() => {
    if(user || error)
    {
        setIsloading(false);
    }
    if(middleware === 'guest' && user) router.push('/');
    if(middleware === 'auth' && !user && error) router.push('/login');
    },[user,error])

    const csrf = () => custom_axios.get('/sanctum/csrf-cookie')

    const login = async (email,password,setErrors) => {
        setErrors([])

        await csrf()

        custom_axios
            .post('/api/login',{email:email,password:password})
            .then(() => mutate() && router.push('/'))
            .catch(error => {
                if (error.response.status != 422) throw error
                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    const logout = async () => {
        await custom_axios.post('/api/logout')
        mutate(null)
        router.push('/login')
    }

    return{
        user,
        error,
        login,
        logout,
        isLoading
    }
}

export default useAuth;