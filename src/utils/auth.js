import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AUTHENTICATE_URL } from '../constants/url';
const AuthContext = React.createContext(null)


export const AuthProvider = ({ children }) => {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState(null);
  const login = (user) => {
    setUser(user);
  }
  const logout = async () => {
    setUser(null);
    localStorage.removeItem('access_token');
  }

  const requestLogin = async () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const res = await axios.post(AUTHENTICATE_URL, {}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        login(res.data);
        setLoader(false);
      } catch (error) {
        console.log(error.response.data);
        setLoader(false)
      }
        
    }else{
      setLoader(false)
    }
  }
  useEffect(() => {
    
    requestLogin();
    
  }, []);
  if(loader){
    return <div>Loading...</div>
  }
  return  <AuthContext.Provider value={{user, login, logout}}> {children} </AuthContext.Provider>
}

export const useAuth = () => {
  return React.useContext(AuthContext);
}