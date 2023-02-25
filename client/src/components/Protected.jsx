import React from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
function Protected({children}) {

  const {isAuth} = useSelector(state=>state.auth)
  const navigate = useNavigate()
  return (
    <>
      {isAuth ? {children} : navigate('/')}
    </>
  )
}

export default Protected