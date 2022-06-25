import { useState } from "react"
import useAuth from "../library/useAuth";
import styles from '../styles/Home.module.css'
function Login(){
    const [fields,setFields] = useState({
        email:'',
        password:'',
    });
    const [fielderror,setfieldError] = useState('');
    const [errors,setErrors] = useState([]);

    const { login,isLoading,user,error } = useAuth({middleware:'guest'});

    const handleInputChange = (event) => {
        setFields({
            ...fields,
            [event.target.name]:event.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(fields.email === ''){
            setfieldError('Email is required');
            return false;
        }
        
        if(fields.password === ''){
            setfieldError('Password is required');
            return false;
        }
        
        login(fields.email,fields.password,setErrors);
    }

    if(isLoading || user){
        return(
            <div className="d-flex justify-content-center">
              <div className={'spinner-border text-info ' + styles.spinner} role="status">
                <span className="visually-hidden align-middle">Loading...</span>
              </div>
            </div>
        )
    }
    else {
    return(
        <div className="row justify-content-center">
            <form onSubmit={handleSubmit} className="col-sm-5 border border-primary p-5">
                {error !== '' && <p className="text-danger">{fielderror}</p> }
                {errors.length > 0 && (
                <div>
                    <div className="font-medium text-red-600">
                        Whoops! Something went wrong.
                    </div>

                    <ul className="mt-3 list-disc list-inside text-sm text-red-600">
                        {errors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
                )}
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" onChange={handleInputChange}/>
                </div>
                <button className="btn btn-primary w-100 mt-3">Login</button>
            </form>
        </div>
    )
    }
}

export default Login;