import { useState } from "react";
import { useSelector } from "react-redux";
import abreviarDias from "./utils/abreviarDias";
import mesNumero from "./utils/mesNumero";
import style from "../../swiperCitas.module.css";

function CardsDia({ diasSemana, fechadelDia, mesdelDia, onCardSelect }) {
    const { oneSchool, grados, horariosColegio } = useSelector(
        (state) => state.schools
    );
    const [cardSelected, setCardSelected] = useState(false);
    // Cambia la propiedad dia por ejm "Viernes" a "Vie"
    const dataAbreviada = abreviarDias(horariosColegio)
    // Comprueba la disponibilidad de dias del colegio con la semana generada por la funcion GenCalendario  
   //Segun el resultado se aplicara el estilo de card activada o desactivada  
    const diaDisponible = dataAbreviada?.find((disponibilidadDia) => disponibilidadDia.dia === diasSemana);


    // este handler envia lainformacion a  HorariosColegios
    const handlerSelected = (e, horariosColegio) => {
        const fecha_actual = new Date();
        const year = fecha_actual.getFullYear();
        // pasa el nombre del mes a su numero 
        let numeroMeses = mesNumero(mesdelDia)

        const info = {
            date: fechadelDia + "/" + numeroMeses + '/' + year,
            time: horariosColegio.horarios,
            // numero del dia 
            dia: horariosColegio.dia

        }
        setCardSelected(!cardSelected)
        onCardSelect(info)
    }
 
    // finalmente se devuelven las cards con su css correspondiente segun la disponibilidad del colegio
    return (
        <>

            <div className={cardSelected && diaDisponible && style.divBorderSelected}
            
                onClick={diaDisponible ? (e) => handlerSelected(e, diaDisponible) : null}
            >
                <p
                    className={cardSelected && diaDisponible ? style.p_Selected : diaDisponible ? style.p : style.p_desactiv}
                >
                    {diasSemana}
                </p>
                <p
                    className={cardSelected && diaDisponible ? style.p_SelectedNumber : diaDisponible ? style.pNumber : style.p_desactiv}
                >
                    {fechadelDia}
                </p>
                <p
                    className={cardSelected && diaDisponible ? style.p_Selected : diaDisponible ? style.p : style.p_desactiv}
                >
                    {mesdelDia}
                </p>
            </div>

        </>
    );
};

export default CardsDia