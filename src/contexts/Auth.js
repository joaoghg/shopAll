import { createContext } from "react";

export const AuthContext = createContext({})

export function AuthProvider({ children }) {

  const server = "http://192.168.0.117:8000"

  return (
    <AuthContext.Provider value={{ server }}>
      {children}
    </AuthContext.Provider>
  )
}
