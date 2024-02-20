import React, {useEffect, useContext, useState} from 'react'
import Contexte from '../Controllers/Context';
import { useNavigate } from 'react-router-dom';
import { create } from '../Controllers/update';

const Create = () => {
    const navigate=useNavigate()
    const conShare=useContext(Contexte);
    const [inputs,setInputs]=useState({pic:'',title:'',paragraph:'',tag:'News'})
    const [err,setErr]=useState('');

    const handleInput=(e)=>{
        e.target.type !== 'file'?
            setInputs(i=>({...i,[e.target.name]:e.target.value}))
        :
            setInputs(i=>({...i,[e.target.name]:e.target.files[0]}))
    }
    console.log(inputs);
    const handleSubmit=(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('pic',inputs.pic)
        formData.append('title',inputs.title)
        formData.append('paragraph',inputs.paragraph)
        formData.append('tag',inputs.tag)

        create(formData,setErr)
    }

    useEffect(()=>{
        if(!conShare.authorized){
            navigate('/login')
        }
    },[conShare.check])

  return (
    <section className='create'>
        {err !== ''? <p className='err' style={{width:'50%',marginLeft:'25%'}}>{err}</p> : null}
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className='imgHolder'>
                <label>Cover Image <i class="fa-solid fa-upload" style={{marginLeft:'10px'}}></i>
                    <input onChange={handleInput} type='file' name='pic' accept='images/*'></input>
                </label>
            </div>
            <div>
                <select name='tag' onChange={handleInput}>
                    <option value='News' checked>News</option>
                    <option value='Sports'>Sports</option>
                    <option value='Tech'>Tech</option>
                    <option value='Health'>Health</option>
                    <option value='Cinema'>Cinema</option>
                </select>
            </div>
            <div>
                <label>Title :</label>
                <input onChange={handleInput} type='text' name='title'></input>
            </div>
            <div>
                <textarea name='paragraph' onChange={handleInput} placeholder='Enter Your Article' rows={18}></textarea>
            </div>
            <button type='submit'>Post</button>
        </form>
    </section>
  )
}

export default Create