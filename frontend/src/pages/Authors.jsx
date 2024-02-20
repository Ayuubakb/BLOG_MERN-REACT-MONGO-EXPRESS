import React, { useEffect, useState } from 'react'
import Author from '../components/Author'
import { findAuthors } from '../Controllers/update'

const Authors = () => {
    const [authors,setAuthors]=useState([])
    useEffect(()=>{
        findAuthors(setAuthors)
    },[])
  return (
    <section className='authors'>
       {authors.map((a)=>{
            return(
                <Author
                    user={a.username}
                    pic={a.pic}
                    count={a.count}
                />
            )
        })}
    </section>
  )
}

export default Authors