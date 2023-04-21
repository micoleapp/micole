import Swal from "sweetalert2";
import Icon from "../assets/Icon.png";
import Error from '../assets/Error.png';

function SwalProp ({status,title,text}) {
   new Swal({
    title: title,
    imageUrl: status === true ? Icon : Error,
    text: text,
    confirmButtonClass: "buttonprop",
    confirmButtonText: 'Okey'
  })
}

export default SwalProp