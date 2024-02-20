import React,{useState} from 'react'
import InputLog from '../components/InputLog'
import ButtonLog from '../components/ButtonLog'
import { Link } from 'react-router-dom'

const SignUpPage = () => {
    const [err,setErr]=useState('');
    const [inputs,setInputs]=useState({ username:'',email: '', password: ''})
    const [format,setFormat]=useState(true)

    return (
      <section className='log'>
          <div className='form'>
              <div className='title'>
                    SignUp
              </div>
              {(err !== ''?<p className='err' style={{fontFamily:'Franklin Gothic Medium'}}>{err}</p>:null)}
              <InputLog
                  type='text'
                  name='username'
                  setContext={setInputs}
                  context={inputs}
                  label='Username'
              />
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
                Dir='signup'
                context={inputs}
                setErr={setErr}
                format={format}
              >
                  Signup
              </ButtonLog>
              <p>Already Have An Account &#128526; <Link to='/login' className='link'><span>Login &#128171;</span></Link></p>
          </div>
      </section>
    )
}

export default SignUpPage