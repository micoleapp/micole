import {
  getUser,
  registerUser,
  loginUser,
  logoutUser,
  getError,
  isLoading,
  updateUser,
} from "./AuthSlice";
import axios from "axios";

export const getOneUser = () => (dispatch) => {
  dispatch(isLoading());
  const id = localStorage.getItem("id");
  axios
    .get(`/auth/${id}`)
    .then((res) => dispatch(getUser(res.data.user)))
    .catch((err) => dispatch(getError(err.message)));
};

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
    })
    .catch((err) => {
      dispatch(getError(err));
    });
};

export const login = (user) => (dispatch) => {
  const { email, password } = user;
  console.log(user);
  dispatch(isLoading());
  axios
    .post("/auth/signin", { email, password })
    .then((res) => {
      dispatch(loginUser(res.data.user));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", res.data.user.id);
    })
    .catch((err) => dispatch(getError(err.message)));
};

export const update = (user) => (dispatch) => {
  dispatch(isLoading());
  axios
    .put(`/auth/${user.email}`, { user })
    .then((res) => {
      dispatch(updateUser(res.data.user));
    })
    .catch((err) => dispatch(getError(err.message)));
};

export const logout = () => (dispatch) => {
  dispatch(isLoading());
  try {
    dispatch(logoutUser());
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  } catch (err) {
    dispatch(getError(err.message));
  }
};
