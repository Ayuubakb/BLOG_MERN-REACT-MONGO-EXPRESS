import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Card = ({cover,profile,title,paragraph,tag}) => {
    const navigate=useNavigate();
    const [theme,setTheme]=useState('');
    let tab=paragraph.split(' ',18);
    let text='';
    let text2='';
    for(let i=0; i<16; i++){
        text+=tab[i]+' '
    }
    for(let i=16; i<18; i++){
        text2+=tab[i]+' '
    }
    useEffect(()=>{
        switch(tag){
            case 'News':
                setTheme('#F13C20')
                break;
            case 'Sports':
                setTheme('#D79922')
                break;
            case 'Cinema':
                setTheme('#4056A1')
                break;
            case 'Health':
                setTheme('green')
                break;
            case 'Tech':
                setTheme('#0E0C0A')
                break;
        }
    },[])
  return (
    <div className='Card' onClick={()=>{navigate('/article')}}>
        <div className='imgContainer'>
            <img src={cover}/>
        </div>
        <div className='desc'>
            <h1 style={{color:theme}}>{title}</h1>
            <p>{text}<span>{text2}...</span></p>
        </div>
        <div className='foot'>
            <div className='image'>
                <img src={profile}></img>
            </div>
            <div className='tag' style={{backgroundColor:theme}}>
                <p>{tag}</p>
            </div>
        </div>
    </div>
  )
}

export default Card