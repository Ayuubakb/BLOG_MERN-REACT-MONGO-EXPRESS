import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { verify } from '../Controllers/verify';
import Wait from '../components/Wait';
import Contexte from '../Controllers/Context';
import userContext from '../Controllers/userContext';
import { Footer } from '../components/Footer';

const Home = () => {
    const [authorized,setAuthorized]=useState(null);
    const [userData,setUserData]=useState({})
    const [check,setCheck]=useState(false);

    useEffect(()=>{
        setAuthorized(null);
        verify(setAuthorized,setUserData);
    },[check])

  return (
    (authorized ===null)?
        <Wait/>
        :
        <Contexte.Provider value={{authorized,setAuthorized,check,setCheck}}>
            <userContext.Provider value={userData}>
                <section>
                    <Nav/>
                    <Footer/>
                </section>
            </userContext.Provider>
        </Contexte.Provider>
  )
}

export default Home