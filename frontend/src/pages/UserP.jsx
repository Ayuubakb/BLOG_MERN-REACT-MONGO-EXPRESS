import React, { useState,useContext, useEffect } from 'react'
import InputLog from '../components/InputLog'
import Contexte from '../Controllers/Context';
import userContext from '../Controllers/userContext';
import {useNavigate } from 'react-router-dom';
import {update} from '../Controllers/update'

const UserP = () => {
    const navigate=useNavigate();
    const conShare=useContext(Contexte);
    const userShare=useContext(userContext);
    const [inputs,setInputs]=useState({pic:'',username:userShare.username,email:userShare.email,currPass:'',newPass:''});
    const [err,setErr]=useState('');
    const [format,setFormat]=useState(true);

    const handleClick=(e)=>{
        e.preventDefault()
        const formData=new FormData()
        formData.append('username',inputs.username);
        formData.append('email',inputs.email);
        formData.append('currPass',inputs.currPass);
        formData.append('newPass',inputs.newPass);
        formData.append('pic',inputs.pic);

        if(inputs.username !== '' && inputs.email !== '' && inputs.currPass !== ''){
            if(format){
                update(formData,setErr)
            }
        }else 
            setErr("Username, Email and Current Password can not be empty")
    }
    

    useEffect(()=>{
        if(!conShare.authorized){
            navigate('/login')
        }
    },[conShare.check])
  return (
    conShare.authorized?
    <section className='userPage'>
        <div className='infoChange'>
                <button className='toPosts'>My Posts</button>
                <form onSubmit={handleClick} encType='multipart/form-data'>
                    <div className='picture'>
                        <img src={'http://localhost:5000/uploads/'+userShare.pic}></img>
                        <div className='editImage'>
                            <label><i class="fa-solid fa-pen fa-xs" style={{color:'bisque'}}></i>
                                <input type='file' name='pic' accept='images/*' onChange={(e)=>{setInputs((i)=>({...i,pic:e.target.files[0]}))}}></input>
                            </label>
                        </div>
                    </div>
                    <h1>Ayoub Akoubri</h1>
                    {err !== ''?<p className='err'>{err}</p>:null}
                    <div className='inputsContainer'>
                        <InputLog
                            type='text'
                            name='username'
                            setContext={setInputs}
                            context={inputs}
                            label='Username'
                            val={inputs.username}
                        />
                        <InputLog
                            type='email'
                            name='email'
                            setContext={setInputs}
                            context={inputs}
                            label='E-mail'
                            val={inputs.email}
                            setFormat={setFormat}
                            format={format}
                        />
                        <InputLog
                            type='password'
                            name='currPass'
                            setContext={setInputs}
                            context={inputs}
                            label='Current Password'
                        />
                        <InputLog
                            type='password'
                            name='newPass'
                            setContext={setInputs}
                            context={inputs}
                            label='New Password'
                        />
                    </div>
                    <button type='submit'>Update</button>
                </form>
        </div>
    </section>
    :null
  )
}

export default UserP