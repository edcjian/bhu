import React, {createContext, useState} from 'react';
import {Login} from "./Login";


export const LoginContext = createContext({});

export const LoginProvider = props => {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState();
    return (isLogin === true && user !== undefined) ? <LoginContext.Provider value={user}>
        {props.children}
    </LoginContext.Provider> : <Login events={setIsLogin} user={setUser}/>

}
