import React,{use, useContext, useEffect} from 'react'
import { AuthenticationContext } from './App'
import { useNavigate } from 'react-router-dom';

const UserPage = () => {

  const navigate = useNavigate();
  const { userInfo} = useContext(AuthenticationContext);

  useEffect(() => {
    if (userInfo.isAuthenticated === false) {
      navigate('/login');
    }
  }, [userInfo.isAuthenticated]);

  return (
    <div className='text-5xl font-bold'>User Page</div>
  )
}

export default UserPage