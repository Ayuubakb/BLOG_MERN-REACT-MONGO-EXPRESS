import React, { useEffect, useState } from 'react' 
import { useParams} from 'react-router-dom'

const Artcle = () => {
    const {id}=useParams()
    const [post,setPost]=useState({});
    
    const findArticle=async()=>{
        const resp=await fetch('http://localhost:5000/board/findArticle',{
            method:'POST',
            credentials:'include',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({postId:id})
        })
        await resp.json().then(
            (data)=>{
                setPost(data)
            }
        )
    }
    useEffect(()=>{
        findArticle();
    },[])
    
  return (
    <section className='artCon'>
    <div className='article'>
        <div className='imgContainer'>
            <img src={`http://localhost:5000/uploads/${post.cover}`}></img>
        </div>
        <div className='textContainer'>
            <h1>{post.title}</h1>
            <p>
                {post.paragraph}
            </p>
        </div>
        <div className='prof'>
            <div className='profile'>
                <img src={`http://localhost:5000/uploads/${post.profile}`}></img>
                <p>{post.author}</p>
            </div>
            <div className='tag'>
                <p>{post.tag}</p>
            </div>
            <div className='date'>
                <p>28 / 11 / 2023</p>
            </div>
        </div>
    </div>
    </section>
  )
}

export default Artcle