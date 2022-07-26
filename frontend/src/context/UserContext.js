import { createContext  } from "react";

import useAuth from "../hooks/useAuth";

const Context = createContext()

function UserProvider({ children }) {
   
    const { authenticadet, register } = useAuth()

    return(
        <Context.Provider value={{ authenticadet, register }}>
            { children }
        </Context.Provider>
    )
}

export {Context, UserProvider}