import axios from "axios";
import { getCitas, getError, isLoading } from "./CitasSlice";

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

export const putCita = ({ idCita, estado }) =>(dispatch) => {
    dispatch(isLoading());
    axios
      .put(`/citas/${idCita}`, { estado:'Pendiente'})
      // .then((res) => dispatch(getCitas(res.data)))
      .catch((err) => {
        dispatch(getError(err.response.data.error));
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
  };
