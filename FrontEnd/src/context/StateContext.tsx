import React, {createContext} from "react";
import {LocalUser} from "../types/AuthTypes.ts";
import {BookGetAllDto} from "../types/BookTypes.ts";


export type AppUserContextType = {
    appUser:LocalUser | undefined,
    setAppUser:React.Dispatch<React.SetStateAction<LocalUser | undefined>>,
}

export const AppUserContext = createContext<AppUserContextType>({
    appUser:undefined,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setAppUser: () => {},
});


export const BooksContext = createContext<BooksContextType>({
    books:[],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setBooks:() => {},
})