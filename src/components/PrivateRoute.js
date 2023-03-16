import React from 'react'
import { Navigate } from 'react-router';
import { useLocalState } from "../util/useLocalState";

const PrivateRoute = ({ children }) => {
    const [jwt, setJwt] = useLocalState("", "jwt");
  return jwt ? children : <Navigate to="/"/>
    
  
}

export default PrivateRoute