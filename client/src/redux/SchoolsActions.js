import axios from 'axios'
import {getNiveles, cleanOneSchool,getSchools,getOneSchool,getError,isLoading,getDepartaments,filterByDepartament,getDistrits,getCategories,getProvincias,getInfraestructura,getPaises,getAfiliaciones} from './SchoolsSlice'

export const getAllAfiliaciones = () => (dispatch) => {
  dispatch(isLoading())
  axios.get("/afiliaciones")
  .then(res=>dispatch(getAfiliaciones(res.data)))
  .catch(err=>dispatch(getError(err.message)))
}

export const getAllProvincias = () => (dispatch) => {
  dispatch(isLoading())
  axios.get("/provincias")
  .then(res=>dispatch(getProvincias(res.data)))
  .catch(err=>dispatch(getError(err.message)))
}

export const getAllNiveles = () => (dispatch) => {
  dispatch(isLoading())
  axios.get("/niveles")
  .then(res=>dispatch(getNiveles(res.data)))
  .catch(err=>dispatch(getError(err.message)))
}

export const getAllPaises = () => (dispatch) => {
  dispatch(isLoading())
  axios.get("/paises")
  .then(res=>dispatch(getPaises(res.data)))
  .catch(err=>dispatch(getError(err.message)))
}

export const getAllCategories = () => (dispatch) => {
  dispatch(isLoading())
  axios.get("/categorias")
  .then(res=>dispatch(getCategories(res.data)))
  .catch(err=>dispatch(getError(err.message)))
}

export const getAllInfraestructura = () => (dispatch) => {
  dispatch(isLoading())
  axios.get("/infraestructuras")
  .then(res=>dispatch(getInfraestructura(res.data)))
  .catch(err=>dispatch(getError(err.message)))
}

export const getAllDistrits = () => (dispatch) => {
  dispatch(isLoading())
  axios.get("/distritos")
  .then(res=>dispatch(getDistrits(res.data)))
  .catch(err=>dispatch(getError(err.message)))
}

export const filterByDepartaments = (array) => (dispatch) => {
  dispatch(isLoading())
  dispatch(filterByDepartament(array))
} 

export const getAllDepartaments = () => (dispatch) => {
  dispatch(isLoading())
  axios.get("/departamentos")
  .then(res=>dispatch(getDepartaments(res.data)))
  .catch(err=>dispatch(getError(err.message)))
}

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





export const clannDetailid= () => (dispatch) => {
  dispatch(isLoading());
  try {
    dispatch(cleanOneSchool());
   
  } catch (err) {
    dispatch(getError(err.response.data.error));
  }
};
