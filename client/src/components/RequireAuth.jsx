import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
function RequireAuth({children}) {

  const {isAuth} = useSelector(state => state.auth)
  const navigate = useNavigate()
  useEffect(() => {
    if(!isAuth){
      navigate('/')
    }
  }, [isAuth])
  
  if(!isAuth){
    navigate('/')
  }else{
    return children
  }
}

export default RequireAuth