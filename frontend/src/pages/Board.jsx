import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { Link } from 'react-router-dom'

const Board = () => {
    const [posts,setPost]=useState([])
    const showPosts=async()=>{
        const resp=await fetch('http://localhost:5000/board/showPosts',{
            method:"GET",
            credentials:'include'
        })
        await resp.json().then(
            (data)=>{
                setPost(data.elements)
            }
        )
    }
    useEffect(()=>{ 
        showPosts();
    },[])
  return (
    <div className='Board'>
        {
            posts.map((post)=>{
                return (
                   <Link to={`article/${post.id}`} style={{textDecoration:'none'}}>
                    <Card
                            cover={`http://localhost:5000/uploads/${post.cover}`}
                            paragraph={post.paragraph}
                            title={post.title}
                            tag={post.tag}
                            profile={`http://localhost:5000/uploads/${post.profile}`}
                        />
                    </Link> 
                )
            })
        }
    </div>
  )
}

export default Board