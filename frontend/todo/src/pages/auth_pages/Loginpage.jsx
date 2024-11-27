import InputFeild from "../../components/authcomponents/InputFeild";
import AuthButton from "../../components/authcomponents/AuthButton";
import { useState, useRef } from 'react';
import validaotor from 'validator';
import DOMPurify from 'dompurify';
import { Link } from "react-router-dom";
import { login } from "../../services/AuthService";


export default function LoginPage() {

    const usernameRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState({
        username: "",
        password: "",
    });



    const handleSubmit = (e)=> {
        e.preventDefault();

        const username = usernameRef.current.value.replace(/\s/g, "");;
        const password = passwordRef.current.value.replace(/\s/g, "");;

        let errors = {}

        if (!username || username.length < 5) {
            errors.username = "Please enter a valid username";
        }

        if (!password || password.length < 6)  {
            errors.password = "Please enter password";
        }

        if (Object.keys(errors).length > 0) {
            setError(errors)
            return;
        }

        const sanitizedUsername = DOMPurify.sanitize(username); 
        const sanitizedPassword = DOMPurify.sanitize(password);

        const data = { username: sanitizedUsername, password: sanitizedPassword };
        handleLogin(data);

    }


    const handleLogin = async(data) => {
        try {
          const response  = await login(data.username, data.password);
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      };
    


    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-center">
                    Login
                </h1>
            </header>
            
            <section className="w-full max-w-md px-4">
                <form onSubmit={handleSubmit} className="flex flex-col items-center ">
                    
                    <InputFeild name = "username" type = "text" htmlFor ="username" id="username" label="Username" refer={usernameRef} error ={error.username ? error.username : ""}/>
                    
                    

                    <InputFeild name = "password" type = "password" htmlFor ="password" id="password" label="Password" refer={passwordRef} error ={error.password ? error.password : ""}/>
                   
                        
                    <AuthButton buttonName = "Login"/>

                    <div className="text-center">
                        <p className="text-gray-600">
                            New to here? {' '}
                            <Link 
                                to="/signup" 
                                className="text-blue-500 hover:underline"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>

                    <div className="text-center mt-3">
                        <p className="text-gray-600">
                            Forget password? {' '}
                            <Link 
                                to="/resetpassword" 
                                className="text-blue-500 hover:underline"
                            >
                                Reset
                            </Link>
                        </p>
                    </div>
                </form>
            </section>
        </div>
    )
    }

