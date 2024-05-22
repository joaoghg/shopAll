import { createContext } from "react";

export const AuthContext = createContext({})

export function AuthProvider({ children }) {

  const server = "https://shopall-fgr8.onrender.com"

  return (
    <AuthContext.Provider value={{ server }}>
      {children}
    </AuthContext.Provider>
  )
}
