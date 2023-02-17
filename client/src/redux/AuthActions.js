import {getUser,registerUser,loginUser,logoutUser,getError,isLoading,updateUser} from './AuthSlice'
import axios from 'axios'

export const getUser = () => (dispatch) => {
  dispatch(isLoading())
  const id = localStorage.getItem('id')
  axios.get(`/auth/${id}`)
  .then(res=>dispatch(getUser(res.data.user)))
  .catch(err=>dispatch(getError(err.message)))
}

export const registerUser = (user) => (dispatch) => {
  dispatch(isLoading())
  axios.post('/auth/signup',{user})
  .then(res=>{dispatch(registerUser())})
  .catch(err=>{dispatch(getError(err.message))})
}

export const loginUser = (user) => (dispatch) => {
  dispatch(isLoading())
  axios.post('/auth/signin',{user})
  .then(res=>{
    dispatch(loginUser(res.data.user))
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('id', res.data.user.id);
  })
  .catch(err=>dispatch(getError(err.message)))
}

export const updateUser = (user) => (dispatch) => {
  dispatch(isLoading())
  axios.put(`/auth/${user.email}`,{user})
  .then(res=>{
    dispatch(updateUser(res.data.user))
  })
  .catch(err=>dispatch(getError(err.message)))
}

export const logoutUser = () => (dispatch) => {
  dispatch(isLoading())
  try {
    dispatch(logoutUser())
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  } catch (err) {
    dispatch(getError(err.message))
  }
}