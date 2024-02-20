import React,{useState,useEffect,useContext} from 'react'
import { Outlet,useNavigate,Link } from 'react-router-dom'
import Contexte from '../Controllers/Context'
import { logout } from '../Controllers/verify'

const Nav = () => {
    const navigate=useNavigate()
    const conShare=useContext(Contexte);
    const handleLogout=async()=>{
        logout(conShare.setCheck);
    }
  return (
    <>
        <nav>
            <div className='logo'>
                <h1><Link to='/' className='link'>AKB Blog</Link></h1>
            </div>
            <div className='choices'>
                {(conShare.authorized)?
                <>
                    <div>
                        <p><Link to='user' className='link'>User</Link></p>
                    </div>
                    <div>
                        <p><Link to='create' className='link'>Create Post</Link></p>
                    </div>
                    <div>
                        <p><Link to='authors' className='link'>Authors</Link></p>
                    </div>
                    <div>
                        <p onClick={handleLogout} style={{cursor:'pointer'}}>Logout</p>
                    </div>
                </>
                :
                <>
                    <div>
                        <p>Authors</p>
                    </div>
                    <div>
                        <p><Link to='/login' className='link'>Login</Link></p>
                    </div>
                </>
                }
            </div>
        </nav>
        <Outlet/>
    </>
  )
}

export default Nav