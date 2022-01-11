import React, { Fragment, useState } from 'react';
import AuthAPI from '../../services/auth'

const Signup = (props) => {
    const [email, updateEmail] = useState("")
    const [password, updatePassword] = useState("")

    const [errorMessage, updateErrorMessage] = useState(null)
    const [successMessage, updateSuccessMessage] = useState(null)

    const onSignup = () => {
        updateErrorMessage(null)
        updateSuccessMessage(null)
        console.log(email, password)
        const loginData = {email, password}
        AuthAPI.signup(loginData)
        .then(res=>{
            localStorage.setItem("isAuthenticated", true)
            updateSuccessMessage("Signup Successfull")
            props.history.push("/questions")
        })
        .catch(err=>{
            updateErrorMessage(err.response.data.result)
        })
    }
    return (
        <Fragment>
            <div className="container w-50 mt-4" >
                <h3>Signup</h3>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" onChange={($event)=>updateEmail($event.target.value)}  className="form-control"/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={($event)=>updatePassword($event.target.value)}  className="form-control" />
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
                        <button className="btn btn-success" onClick={()=>{onSignup()}}>Signup</button>
                    </div>
                    <div>
                        Existing user? <a href="/login">Login</a> 
                    </div>
            </div>
        </Fragment>
    )
}

export default Signup
