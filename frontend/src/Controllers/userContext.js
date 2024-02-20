import { createContext } from "react";

const userData={
    username:'',
    pic:'',
    email:'',
}
const userContext=createContext(userData);

export default userContext;