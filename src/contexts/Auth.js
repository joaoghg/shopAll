import { createContext } from "react";

export const AuthContext = createContext({})

export function AuthProvider({ children }) {

  const server = "http://10.100.59.134:8000"

  return (
    <AuthContext.Provider value={{ server }}>
      {children}
    </AuthContext.Provider>
  )
}
