import React,{use, useContext, useEffect} from 'react'
import { AuthenticationContext } from './App'
import { useNavigate } from 'react-router-dom';

const UserPage = () => {

  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthenticationContext);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/login');
    }
  }, [isAuthenticated]);

  return (
    <div>UserPage</div>
  )
}

export default UserPage