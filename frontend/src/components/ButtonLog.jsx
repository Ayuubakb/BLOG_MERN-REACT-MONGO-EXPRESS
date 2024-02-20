import React from 'react'
import { useNavigate } from 'react-router-dom'

const ButtonLog = ({children,Dir,context,setErr,format}) => {
    const navigate=useNavigate();
    const signLog=async()=>{
       const result =  await fetch('http://localhost:5000/authentification/'+Dir,{
            credentials:'include',
            body:JSON.stringify(context),
            headers:{
                'Content-Type':'application/json',
            },
            method:'POST'
        })
        const data=await result.json();
        if(result.status !== 301)
            setErr(data.message)
        else{
            Dir === 'signup'?navigate('../login?s=t'):navigate('../')
        }
    }
    const handleClick=()=>{
        if(format)
            signLog();
    }
  return (
    <button onClick={handleClick}>
        {children}
    </button>
  )
}

export default ButtonLog