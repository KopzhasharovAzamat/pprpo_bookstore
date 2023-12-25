import { createContext, useReducer } from "react";

export const BooksContext = createContext()

export const booksReducer = (state, action) => {
    switch (action.type){
        case 'CREATE_BOOK':
            return {
                books: [action.payload, ...state.books]
            }
        default:
            return state
    }
}

export const BooksContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(booksReducer, {
        books: null
    })

    return(
        <BooksContext.Provider value={{state, dispatch}}>
            { children }
        </BooksContext.Provider>
    )
}