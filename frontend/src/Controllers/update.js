
const update=async(inputs,setErr)=>{
    console.log('fetching...');
    const response=await fetch('http://localhost:5000/board/update',{
        method:'POST',
        credentials:'include',
        body:inputs
    })
    await response.json().then(
        (data)=>{
            console.log(data);
            setErr(data.message)
        }
    )
}

const create=async(inputs,setErr)=>{
    const response=await fetch('http://localhost:5000/board/create',{
        method:'POST',
        credentials:'include',
        body:inputs
    })
    await response.json().then(
        (data)=>{
            setErr(data.message)
            console.log(data);
        }
    )
}

const findAuthors=async(setAuthors)=>{
    const response=await fetch('http://localhost:5000/board/findAuthors',{
        method:'GET',
        credentials:'include',
    })
    await response.json().then(
        (data)=>{
            setAuthors(data.elements)
        }
    )
}

module.exports={
    update,
    create,
    findAuthors
}