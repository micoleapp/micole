import axios from "axios";
import { getCitas } from "./CitasSlice";

export const getCita = () => (dispatch) => {

  const token = localStorage.getItem("token");
  axios
    .get(`/citas`, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => dispatch(getCitas(res.data)))
    .catch((err) => {
   console.log(err)
    });
};
