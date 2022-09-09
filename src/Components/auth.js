import React, { createContext, useEffect, useState } from 'react'
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

// export default AuthContext

export const AuthProvider = ({ children }) => {

    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null)
    const [user, setUser] = useState(() => localStorage.getItem("authTokens") ? jwt_decode(JSON.parse(localStorage.getItem("authTokens")).access) : null)
    const [loading, setLoading] = useState(true)
    const navigateTo = useNavigate()

    const loginUser = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch("http://127.0.0.1:8000/api/token/",
                {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(
                        {
                            "username": e.target.username.value,
                            "password": e.target.password.value
                        }
                    )
                })
            const data = await res.json()
            if (res.status === 200) {
                setAuthTokens(data)
                setUser(jwt_decode(data?.access))
                localStorage.setItem("authTokens", JSON.stringify(data))
                navigateTo("/quizzes")

            } else {
                alert("Something went wrong")
            }

        } catch (error) {
            console.log("Login Error: ", error)
        }

        // const res = await fetch("http://127.0.0.1:8000/api/token/",
        //     {
        //         method: "POST",
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(
        //             {
        //                 "username": e.target.username.value,
        //                 "password": e.target.password.value
        //             }
        //         )
        //     })
        // const data = await res.json()
        // if (res.status === 200) {
        //     setAuthTokens(data)
        //     setUser(jwt_decode(data?.access))
        //     localStorage.setItem("authTokens", JSON.stringify(data))
        //     navigateTo("/quizzes")

        // } else {
        //     alert("Something went wrong")
        // }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        navigateTo("/login")
    }

    const contextData = {
        loginUser: loginUser,
        logoutUser: logoutUser,
        user: user,
        authTokens: authTokens
    }

    const updateToken = async () => {
        try {
            const res = await fetch("http://127.0.0.1:8000/api/token/refresh/",
                {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(
                        {
                            "refresh": authTokens?.refresh
                        }
                    )
                })
            const data = await res.json()
            // console.log("updated Token: ", data)

            if (res.status === 200) {
                setAuthTokens(data)
                setUser(jwt_decode(data?.access))
                localStorage.setItem("authTokens", JSON.stringify(data))
            } else {
                logoutUser()
            }

            if (loading) {
                setLoading(false)
            }
        } catch (error) {
            console.log("UpdateToken Error: ", error)
        }

    }

    useEffect(() => {

        if (loading) {
            updateToken()
        }

        const minutes = 1000 * 60 * 4
        const intervalId = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, minutes) // 4 minutes
        return () => clearInterval(intervalId)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}




const auth_details = {
    "web": {
        "client_id": "769531042764-olkfovgq3arqdb6o4hrvllq11bojbqid.apps.googleusercontent.com",
        "project_id": "mindful-hall-361410",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_secret": "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",
        "redirect_uris": [
            "http://localhost",
            "http://localhost:3000"
        ],
        "javascript_origins": [
            "http://localhost",
            "http://localhost:3000"
        ]
    }
}

export default auth_details


