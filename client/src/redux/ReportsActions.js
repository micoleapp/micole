import axios from "axios";
import {
  getDataGraphics,
} from "./ReportsSlice";
export const getDataGraphicsAdmin = () => (dispatch) => {
  axios
    .get(`/reportes/admin`)
    .then((res) => dispatch(getDataGraphics(res.data)))
    .catch((err) => {
      dispatch(getError(err.response.data.error));
    });
};