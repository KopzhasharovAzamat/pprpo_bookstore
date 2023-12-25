import { createContext, userReducer } from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = ({ha}) => {
    const [state, dispatch] = userReducer(authReducer)
}