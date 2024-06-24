import { createContext } from "react";
export const AuthContext=createContext({isLoggedIn:false,login:()=>{},logout:()=>{}});
//This createcontext object can be shared between components and when we update it,any component that listens to it will always update