import React,{useState} from 'react'
import InputLog from '../components/InputLog'
import ButtonLog from '../components/ButtonLog'
import {Link} from 'react-router-dom'

const LoginPage = () => {
    const parms=new URL(document.location).searchParams;
    const isSigned=parms.get('s');
    const [err,setErr]=useState('');
    const [inputs,setInputs]=useState({ email: '', password: ''})
    const [format,setFormat]=useState(true)
  return (
    <section className='log'>
        <div className='form'>
            <div className='title'>
                Login
            </div>
            {(err !== ''?<p className='err'>{err}</p>:(isSigned === 't'?<p className='err'>Signed Up Succesfully</p>:null))}
            <InputLog
                type='email'
                name='email'
                setContext={setInputs}
                context={inputs}
                label='E-mail'
                setFormat={setFormat}
                format={format}
            />
            <InputLog
                type='password'
                name='password'
                setContext={setInputs}
                context={inputs}
                label='Password'
            />
            <ButtonLog
                Dir='login'
                context={inputs}
                setErr={setErr}
                format={format}
            >
                Login
            </ButtonLog>
            <p>Don't Have An Accout Yet &#129320; <Link to='/signup' className='link'><span>SignUp Now &#128640;</span></Link></p>
        </div>
    </section>
  )
}

export default LoginPage