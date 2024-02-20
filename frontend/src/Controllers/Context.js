import {createContext} from "react";

const objct={
    authorized:null,
    setAuthorized:()=>{},
    check:false,
    setCheck:()=>{}
}
const Contexte = createContext(objct);

export default Contexte