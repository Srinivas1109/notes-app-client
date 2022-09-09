import React, { useContext, useState } from 'react'
// import auth_details from './auth'
// import { gapi } from 'gapi-script'
// import { GoogleLogin } from 'react-google-login'
import "../Styles/Login.css"
import AuthContext from '../Context/AuthContext'
import { Link } from 'react-router-dom'
import { SIGNUP_URL_FRONTEND } from './constants'
// import jwt_decode from 'jwt-decode'

const Login = () => {

    const { loginUser } = useContext(AuthContext)

    const [credentials, setCredentials] = useState({
        username: "", password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setCredentials((prev) => {
            // console.log(name, value)
            return {
                ...prev, [name]: value
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        loginUser(credentials)
        // console.log(credentials)
        // let response = await fetch(`${HOST_URL}${LOGIN_URL}`, {
        //     method: "POST",
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         username: credentials.username,
        //         password: credentials.password
        //     })
        // })

        // response = await response.json()
        // console.log(response)

    }
    // const [result, setResult] = useState(null)

    // const onSuccess = (res) => {
    //     console.log("response: ",res)
    //     console.log("access token: ", res.accessToken)
    //     setResult(JSON.stringify(res.accessToken))
    // }
    // const onFailure = (err) => {
    //     // console.log(err)
    //     setResult(JSON.stringify(err))
    // }
    // useEffect(() => {
    //     const initClient = () => {
    //         gapi.client.init({
    //             clientId: auth_details.web.client_id,
    //             scope: ''
    //         });
    //     };
    //     gapi.load('client:auth2', initClient);
    // })
    return (
        <div className='login-container'>
            {/* <GoogleLogin
                clientId={auth_details.web.client_id}
                buttonText="Sign in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
            <br />
            <br />
            <br />
            <div>

                {result && <div>{result}</div>}
            </div> */}
            {/* <form onSubmit={handleSubmit} className='form-container' autoComplete="off">
                <h1 className='text-center'>Login</h1>
                <div className='input-container'>
                    <input className='input-box' autoComplete="off" type="text" name="username" placeholder='Username' value={credentials.username} onChange={handleChange} />
                </div>
                <div className='input-container'>
                    <input className='input-box' autoComplete="new-password" type="password" name="password" placeholder='Password' value={credentials.password} onChange={handleChange} />
                </div>
                <div className='input-container'>
                    <input className='input-box' type='submit' onClick={handleSubmit} value="Login" />
                </div>
            </form> */}

            
            <div className="wrapper">
                <div className="inner-warpper text-center">
                    <h2 className="title">Login to your account</h2>
                    <form action="" id="formvalidate" onSubmit={handleSubmit}>
                        <div className="input-group">
                            {/* <label className="palceholder" for="userName">User Name</label> */}
                            <input className="form-control" name="username" id="userName" type="text" placeholder="Username" onChange={handleChange} value={credentials.username}/>
                            <span className="lighting"></span>
                        </div>
                        <div className="input-group">
                            {/* <label className="palceholder" for="userPassword">Password</label> */}
                            <input className="form-control" name="password" id="userPassword" type="password" placeholder="Password" onChange={handleChange} value={credentials.password}/>
                            <span className="lighting"></span>
                        </div>

                        <input className='submitBtn' type="submit" id="login" value="Login" onSubmit={handleSubmit}/>
                        <div className="clearfix supporter">
                            <div className="pull-left remember-me">
                                {/* <input id="rememberMe" type="checkbox" /> */}
                                {/* <label for="rememberMe">Remember Me</label> */}
                            </div>
                            {/* <Link className="forgot pull-right" to="/">Forgot Password?</Link> */}
                        </div>
                    </form>
                </div>
                <div className="signup-wrapper text-center">
                    <Link to={`${SIGNUP_URL_FRONTEND}`}>Don't have an accout? <span className="text-primary">Create One</span></Link>
                </div>
            </div>
        </div>
    )
}

export default Login