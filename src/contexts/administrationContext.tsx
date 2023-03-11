import { createContext, ReactNode } from "react";

const AdmContext = createContext({})

type typeChildren = {
  children: ReactNode
}
export function AdmContextProvider({children}: typeChildren){

  return (
    <AdmContext.Provider value={{type: 'administrador'}}>
      {children}
    </AdmContext.Provider>
  )
}