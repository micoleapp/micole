import axios from "axios";
import {
  getCitas,
  updateTasks,
  updateColumns,
  getError,
  isLoading,
  getSuccess,
  cleanSuccess,
  getCitasUsuario,
  getPagination,
} from "./CitasSlice";
import Swal from "sweetalert2";
export const getCita = () => (dispatch) => {
  dispatch(isLoading());
  const token = localStorage.getItem("token");
  axios
    .get(`/citas`, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => dispatch(getCitas(res.data)))
    .catch((err) => {
      dispatch(getError(err.response.data.error));
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: err.response.data.error,
      // });
    });
};
export const getCitaDnD_filtros = ({filterGrado, filterAño}) => (dispatch) => {
  dispatch(isLoading());
  console.log(filterGrado, filterAño);
  console.log(filterAño);
  const token = localStorage.getItem("token");
  axios
    .get(`/citas?grado=${filterGrado}&año=${filterAño}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log(res.data);
      dispatch(getCitas(res.data));
    })
    .catch((err) => {
      dispatch(getError(err.response.data.error));
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: err.response.data.error,
      // });
    });
};
export const updateTask = (taskId, NuevoEstado) => (dispatch) => {
  const idCita = taskId.idCita;

  axios
    .put(`/citas/${idCita}`, { estado: NuevoEstado })
    .then((res) => console.log(res.data))
    .catch((err) => {
      dispatch(getError(err.response.data.error));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.error,
      });
    });
};
export const updateColumn = (newColumn) => (dispatch) => {
  dispatch(updateColumns(newColumn));
};
export const putCita = (idCita) => (dispatch) => {
  dispatch(isLoading());
  axios
    .put(`/citas/activo/${idCita}`, { activo: true })
    .then((res) => dispatch(getSuccess(res.data)))
    .catch((err) => {
      dispatch(getError(err.response.data.error));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.error,
      });
    });
};

// citaRouter.delete("/:idCita", deleteCita);

export const deleteCita = (idCita) => (dispatch) => {
  console.log(idCita);
  axios
    .delete(`/citas/${idCita}`)
    .then((res) => {
      dispatch(getSuccess(res.data));
      Swal.fire({
        icon: "success",
        title: "Cita cancelada con exito",
        text: "Se notificará a la familia interesada",
      });
    })
    .catch((err) => {
      dispatch(getError(err.response.data.error));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.error,
      });
    });
};

export const cleanSuccessState = () => (dispatch) => {
  try {
    dispatch(cleanSuccess());
  } catch (err) {
    dispatch(getError(err.response.data.error));
  }
};

export const getCitaUsuario = (page) => (dispatch) => {
  dispatch(isLoading());
  console.log(page);
  const token = localStorage.getItem("token");
  axios
    .get(`/citas/users?limit=5&page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      dispatch(getPagination(res.data));
      dispatch(getCitasUsuario(res.data.CitasUsuario));
    })
    .catch((err) => {
      dispatch(getError(err.response.data.error));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.error,
      });
    });
};
