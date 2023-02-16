import axios from 'axios'
import {getSchools,getOneSchool,getError,isLoading} from './SchoolsSlice'

export const getAllSchools = () => (dispatch) => {
  dispatch(isLoading())
  axios.get("/colegios")
  .then(res=>dispatch(getSchools(res.data)))
  .catch(err=>dispatch(getError(err.message)))
}

export const getSchoolDetail = (id) => (dispatch) => {
  dispatch(isLoading())
  axios.get(`/colegios/${id}`)
  .then(res=>dispatch(getOneSchool(res.data[0])))
  .catch(err=>dispatch(getError(err.message)))
}