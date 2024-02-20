import React, { useState } from 'react'

const InputLog = ({type,context,setContext,name,label,val,setFormat,format}) => {
    const handleChange=(e)=>{
        setContext(c=>({...c,[name]:e.target.value}))
    }
    const handleBlur=(e)=>{
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(e.target.value.match(validRegex)){
            setFormat(true)
        }else{
            setFormat(false)
        }
    }
  return (
    <div className='inputContainer'>
        <label htmlFor={name}>
            {label}
        </label>
        <input
            type={type}
            name={name}
            onChange={handleChange}
            value={val?val:context.name}
            onBlur={type==='email'?handleBlur:null}
        />
        {type==='email'?(!format?<p style={{color:'red'}}>Invalide Email Format</p>:null):null}
    </div>
  )
}

export default InputLog