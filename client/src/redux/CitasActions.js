import axios from "axios";
import { getCitas,updateTasks,updateColumns } from "./CitasSlice";

export const getCita = () => (dispatch) => {

  const token = localStorage.getItem("token");
  axios
    .get(`/citas`, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => dispatch(getCitas(res.data)))
    .catch((err) => {
   console.log(err)
    });
};

export const updateTask = (newTask) => (dispatch) => {
  dispatch(updateTasks(newTask));
}
export const updateColumn = (newColumn) => (dispatch) => {
  dispatch(updateColumns(newColumn));
}
