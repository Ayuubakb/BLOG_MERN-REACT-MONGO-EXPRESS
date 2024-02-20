import React from 'react'

const Author = ({user,pic,count}) => {
  return (
    <div className='author'>
        <div className='imgContainer'>
            <img src={`http://localhost:5000/uploads/${pic}`}></img>
        </div>
        <div className='username'>
            <h1>{user}</h1>
        </div>
        <div className='postCount'>
            <p>{count} Posts</p>
        </div>
    </div>
  )
}

export default Author