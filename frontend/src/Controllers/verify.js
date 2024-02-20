
const verify=async(setAuthorized,setUserData)=>{
    const response=await fetch("http://localhost:5000/board",{
        credentials:'include',
        method:'GET',
        headers:{
            'Content-Type':'application/json',
        }
    })
    await response.json().then((data)=>{
        setTimeout(()=>{
            setAuthorized(data.message);
            setUserData(data.objct)
        },500)
    })
}

const logout=async(setCheck)=>{
    const response=await fetch("http://localhost:5000/authentification/logout",{
            credentials:'include',
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
        })
    const data=await response.json
    (response.status === 301 || response.status === 404 )? setCheck(c=>!c) : null
}

module.exports={
    verify,
    logout
}