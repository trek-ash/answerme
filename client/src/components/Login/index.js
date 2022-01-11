import React, { Fragment, useState, useEffect } from 'react';
import AuthAPI from '../../services/auth'

const Login = (props) => {
    const [email, updateEmail] = useState("")
    const [password, updatePassword] = useState("")

    const [errorMessage, updateErrorMessage] = useState(null)
    const [successMessage, updateSuccessMessage] = useState(null)
    useEffect(()=>{
      
    }, )
    const onLogin = () => {
        updateErrorMessage(null)
        updateSuccessMessage(null)
        console.log(email, password)
        const loginData = {email, password}
        AuthAPI.login(loginData)
        .then(res=>{
            const {token} = res.data.result
            localStorage.setItem("auth", token)
            localStorage.setItem("isAuthenticated", true)
            updateSuccessMessage("Login Successfull")
            props.history.push("/questions")

        })
        .catch(err=>{
            updateErrorMessage(err.response.data.result)
        })
    }
    return(
        
            <Fragment>
               <div className="container w-50 mt-4">
                    <h3>Login</h3>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" 
                            onChange={($event)=>updateEmail($event.target.value)} 
                            className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" 
                            onChange={($event)=>updatePassword($event.target.value)} 
                            className="form-control" />
                    </div>
                    {
                        errorMessage ?
                        <>
                            <span className="text-danger">{errorMessage}</span>
                        </>: "" 
                    }
                    {
                        successMessage ?
                        <>
                            <span className="text-success">{successMessage}</span>
                        </>: "" 
                    }
                    <div>
                        <button className="btn btn-success" onClick={()=>{onLogin()}}>Login</button>
                    </div>
                    <div>
                        New user? <a href="/signup">Signup</a>
                    </div>
                
				</div>
            </Fragment>
    )
}

export default Login