import {
  getUser,
  registerUser,
  loginUser,
  logoutUser,
  getError,
  isLoading,
  updateUser,
  getSchool,
  getVacantes,
  getInfraestructura,
  getAfiliacion
} from "./AuthSlice";
import axios from "axios";

import SwalProp from "../exports/SwalProp";

export const setVacantesRedux = (id) => (dispatch) => {
  try {
    axios.get(`/vacantes/colegio/${id}`).then((res)=>{
      dispatch(getVacantes(res.data))
    })
  } catch (error) {
    console.log(error)
  }
}
 
export const getUserByToken = () => (dispatch) => {
  dispatch(isLoading());
  const token = localStorage.getItem("token");
  if(token){
    axios
      .get(`/auth`,{headers:{'Authorization': `Bearer ${token}`}})
      .then((res) => dispatch(loginUser(res.data.user)))
      .catch((err) => {
        dispatch(getError(err.response.data.error)) 
        SwalProp({
        status: false,
        title: 'Algo salió mal',
        text: err.response.data.error
      })
    localStorage.removeItem("token");
    });
  }else{
    dispatch(logoutUser())
  }
};

export const getUserById = () => (dispatch) => {
  dispatch(isLoading());
  const id = localStorage.getItem("id");
  if(id){
    axios.get(`/auth/${id}`)
    .then(res=>dispatch(getUser(res.data.user)))
    .catch(err=>dispatch(getError(err.response.data.error)))
  }
}

export const register = (user) => (dispatch) => {
  const {
    esColegio,
    email,
    password,
    nombre,
    apellidos,
    nombre_colegio,
    ruc,
    telefono,
    DistritoId,
  } = user;

  console.log(
    esColegio,
    email,
    password,
    nombre,
    apellidos,
    nombre_colegio,
    ruc,
    telefono,
    DistritoId,

  );
  dispatch(isLoading());
  axios
    .post("/auth/signup", {
      esColegio,
      email,
      password,
      nombre,
      apellidos,
      nombre_colegio,
      ruc,
      telefono,
      DistritoId,
    })
    .then((res) => {

      dispatch(registerUser());
      axios.post("/auth/signin", { email, password })
      .then(res=>{
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.user.id);
        dispatch(loginUser(res.data.user));
        SwalProp({
          status: true,
          title: "Bienvenido a MiCole",
          text: 'Usuario creado exitosamente!'
        })
      })
    })
    .catch((err) => {
      dispatch(getError(err.response.data.error));
      SwalProp({
        status: false,
        title:'Algo salió mal',
        text: err.response.data.error
      })
    });
};

export const login = (user) => (dispatch) => {
  const { email, password } = user;
  console.log(user);
  dispatch(isLoading());
  axios
    .post("/auth/signin", { email, password })
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", res.data.user.id);
      dispatch(loginUser(res.data.user));
      SwalProp({
        status : true,
        title: "Bienvenido a MiCole",
        text: 'Inicio de sesion exitoso'
      })

    })
    .catch((err) => {dispatch(getError(err.response.data.error))
      SwalProp({
        status: false,
        title: 'Oops...',
        text: err.response.data.error
      })});
};

export const update = (user) => (dispatch) => {
  dispatch(isLoading());
  axios
    .put(`/auth/${user.email}`, { user })
    .then((res) => {
      dispatch(updateUser(res.data.user));
    })
    .catch((err) => dispatch(getError(err.response.data.error)));
};

export const logout = () => (dispatch) => {
  dispatch(isLoading());
  try {
    dispatch(logoutUser());
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    SwalProp({
      status: true,
      title: "Cerrando sesión!",
      text: 'Hasta pronto!!'
    })
  } catch (err) {
    dispatch(getError(err.response.data.error));
  }
};

export const getSchoolDetail = (id) => (dispatch) => {
  dispatch(isLoading())
  const token = localStorage.getItem("token");
  axios.get(`/colegios/${id}`,{headers:{'Authorization': `Bearer ${token}`}})
  .then(res=>dispatch(getSchool(res.data[0])))
  .catch(err=>dispatch(getError(err.message)))
}

export const getInfraestructuraSchool = (id) => (dispatch) => {
  dispatch(isLoading())
  axios.get(`/colegios/infraestructuras/${id}`)
  .then(res=>dispatch(getInfraestructura(res.data[0])))
  .catch(err=>dispatch(getError(err.message)))
}

export const getAfiliacionSchool = (id) => (dispatch) => {
  dispatch(isLoading())
  axios.get(`/colegios/afiliacion/${id}`)
  .then(res=>dispatch(getAfiliacion(res.data[0])))
  .catch(err=>dispatch(getError(err.message)))
}