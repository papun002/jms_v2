import { useContext,createContext,useState } from "react";

const AuthContext = createContext(null);
const Authrize = ({children}) => {
    const [user, setUser] = useState(null);
    
  return (
     <AuthContext.Provider value={{user,setUser}}>
          {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);

export default Authrize