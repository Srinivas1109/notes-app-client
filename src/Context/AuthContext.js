import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HOST_URL, LOGIN_URL, NOTES_URL_FRONTEND, LOGIN_URL_FRONTEND } from "../Components/constants";


const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)
    // const [loading, setLoading] = useState(true)
    const navigateTo = useNavigate()

    const loginUser = async (credentials) => {
        try {
            let response = await fetch(`${HOST_URL}${LOGIN_URL}`,
                {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(
                        {
                            "username": credentials.username,
                            "password": credentials.password
                        }
                    )
                })
            response = await response.json()
            if(response.status === 200){
                setUser(response.user)
                localStorage.setItem('user', JSON.stringify(response.user))
                navigateTo(`${NOTES_URL_FRONTEND}`)
            }else{
                alert("Something went wrong")
            }
        } catch (error) {
            console.log("Login Error: ", error)
        }
    }

    const logoutUser = ()=>{
        setUser(null)
        navigateTo(`${LOGIN_URL_FRONTEND}`)
    }

    const contextData = {
        loginUser,
        logoutUser,
        user,
    }

    return(
        <AuthContext.Provider value={contextData}>
            {/* {loading ? null : children} */}
            {children}
        </AuthContext.Provider>
    )
}