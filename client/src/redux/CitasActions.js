import axios from "axios";
import { getCitas,updateTasks,updateColumns , getError, isLoading } from "./CitasSlice";

export const getCita = () => (dispatch) => {
  dispatch(isLoading());
  const token = localStorage.getItem("token");
  axios
    .get(`/citas`, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => dispatch(getCitas(res.data)))
    .catch((err) => {
      dispatch(getError(err.response.data.error));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.error,
      });
    });
};

export const updateTask = (newTask) => (dispatch) => {
  dispatch(updateTasks(newTask));
}
export const updateColumn = (newColumn) => (dispatch) => {
  dispatch(updateColumns(newColumn));
}
export const putCita = ( idCita ) =>(dispatch) => {
  console.log(idCita)
  dispatch(isLoading());
    axios
      .put(`/citas/activo/${idCita}`, {activo: true})
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
