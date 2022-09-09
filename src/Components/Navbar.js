import React, { useContext } from 'react'
import "../Styles/Navbar.css"
import { Link } from 'react-router-dom'
// import SearchContext from '../Context/Search'
import AuthContext from '../Context/AuthContext'

const Navbar = () => {
    // const { user, logoutUser } = useContext(AuthContext)

    const { user, logoutUser } = useContext(AuthContext)
    // const user = null
    // const logoutUser= ()=>{
    //     console.log("logout user")
    // }
    const style = {
        cursor: "pointer"
    }
    const handleLogout = () => {
        logoutUser()
        localStorage.removeItem("user")
    }
    return (
        <div>
            <header>
                <nav>
                    <ul className='nav-items'>
                        <li className="nav-item"><Link to="/all-notes" className='nav-item-link nav-title'>Notes</Link></li>
                        <li className="nav-item"><Link to="/about" className='nav-item-link'>About</Link></li>
                        <li className="nav-item"><Link to="/contact" className='nav-item-link'>Contact</Link></li>
                        {
                            user ?
                                <>
                                    <li className="nav-item" onClick={handleLogout} style={style}><span className='nav-item-link'>Logout</span></li>
                                    <li className="nav-item" style={style}><span className='nav-item-link'>Hello, {user.username}</span></li>
                                </>
                                :
                                <>
                                    <li className="nav-item"><Link to="/login" className='nav-item-link'>Login</Link></li>
                                    <li className="nav-item"><Link to="/create" className='nav-item-link'>Sign Up</Link></li>
                                </>
                        }

                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Navbar