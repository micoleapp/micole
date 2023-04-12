import React, { useEffect, useState } from "react";
import CardsOne from "../components/CardsOne";
import CardsTwo from "../components/CardsTwo";
import VectorPeople from "../assets/VectorPeople.png";
import VectorTalk from "../assets/VectorTalk.png";
import GroupSchool from "../assets/GroupSchool.png";
import Logo from "../assets/logoblanco.png";
import { Link, useLocation } from "react-router-dom";
import {  getAllDistrits} from "../redux/SchoolsActions";
import ModalInscripcion from "../components/ModalInscripcion/ModalInscripcion";
import { useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { useRef } from 'react';

function EnrollSchool() {
  const location = useLocation();
  const [OpenRegister, setOpenRegister] = useState(false);
  const [OpenPaymentPLan, setOpenPaymentPLan] = useState({
    state: false,
    plan: "",
    price: 0,
  });
  const myDivRef = useRef(null);

  const toggleInscripcion = () => {
    setOpenRegister(true);
  };
  const dispatch =useDispatch()
  useState(()=>{
    window.scrollTo(0, 0);
    dispatch(getAllDistrits())
    if(location.state !== null && location.state.register === true){
      setOpenRegister(true)
    }
  },[])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: e.target.colegio.value,
      email: e.target.email.value,
      ruc: e.target.ruc.value,
      celular: e.target.celular.value,
    }
    try {
      axios.post('/informes', data)
      .then(res=>{
        Swal.fire("Exito", "Datos enviados exitosamente", "success");
      })
      .catch(err=>{
        Swal.fire({
          icon: "error",
          title: "Algo salio mal",
          text: err.response.data.error,
        });
      })
    } catch (error) {
      console.log(error)
    }

    console.log(data)
  }
  
  return (
    <div>
      {/* <marquee
        scrollamount={10}
        direction=""
        className="flex bg-transparent absolute text-white"
      >
        Tenemos los mejores planes para ofrecerte - Haz que tu colegio brille
        frente a las familias - Completa tus vacantes disponibles - Cuenta con
        un proceso de admisión simple y eficiente
      </marquee> */}
      <header className="bg-[url('./assets/enroll.png')] h-[700px] flex justify-center items-center flex-col gap-10">
        <h1 className="text-white text-center text-4xl font-semibold" data-aos="fade-up" data-aos-delay="0"  data-aos-mirror={false}>
          Publica tu colegio. Concreta citas con familias interesadas. <br />
          Gestiona todo en línea. Obtén nuevos estudiantes
        </h1>
        <h2 className="text-white text-center text-3xl font-normal" data-aos="fade-up" data-aos-delay="100"  data-aos-mirror={false}>
          Todo en un solo lugar, de forma simple y a bajo costo
        </h2>
        <div onClick={toggleInscripcion} data-aos="fade-up"  data-aos-mirror={false} data-aos-delay="200">
          <button className="uppercase p-3 rounded-sm bg-[#0061dd] text-white font-semibold">
            inscribe tu colegio aquí
          </button>
        </div>
        {OpenRegister && (
          <ModalInscripcion
            handleClose={setOpenRegister}
            OpenPaymentPLan={OpenPaymentPLan}
          />
        )}

        <button onClick={()=>myDivRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })} className="px-4 py-1 rounded-md text-[#0061dd] bg-white font-semibold" data-aos="fade-up" data-aos-delay="300"   data-aos-mirror={false}>
          ¡Quiero más información por el momento!
        </button>
      </header>
      <section className="bg-[#f7f8fa] p-10 gap-10 flex flex-col justify-around">
        <h1 className="text-center text-3xl font-semibold">
          ¿Por qué escoger MiCole?
        </h1>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-5 text-black">
          <CardsOne
            img={GroupSchool}
            title="Haz que tu colegio brille frente a las familias"
            parrafe="Publica toda la información relevante sobre ti para las familias que están buscando colegios"
            duration={"0"}
          />
          <CardsOne
            img={VectorPeople}
            title="Completa tus vacantes 
disponibles"
            parrafe="Gestiona todas las vacantes de inicial, primaria y secundaria que tengas en un solo lugar.
"                        duration={"200"}
          />
          <CardsOne
            img={VectorTalk}
            title="Cuenta con un proceso de 
admisión simple y eficiente"
            parrafe="Olvídate de tener que mandar correos y comunicaciones uno a uno, hazlo todo masivo."
            duration={"400"}
          />
        </div>
      </section>
      {OpenPaymentPLan.state === true && (
        <ModalInscripcion
          OpenPaymentPLan={OpenPaymentPLan}
          handleClose={setOpenRegister}
          handleClosePayment={setOpenPaymentPLan}
        />
      )}
      <section className="bg-[#0061dd] flex flex-col justify-around p-10 gap-10">
        <h1 className="text-center text-2xl font-semibold text-white">
          Elige el plan que más se acomode a tus necesidades
        </h1>
        <div className="flex flex-col xl:flex-row items-center sm:gap-5 gap-10 justify-evenly mx-5">
          <CardsTwo
            title="Gratis"
            free={true}
            family={2}
            price={0}
            photos={3}
            plan="gratis"
            handlerOpen={setOpenPaymentPLan}
            duration={"0"}
          />
          <CardsTwo
            title="Básico"
            free={false}
            family={25}
            photos={15}
            price={50}
            plan="básico"
            handlerOpen={setOpenPaymentPLan}
            duration={"200"}
          />
          <CardsTwo
            price={80}
            title="Estándar"
            standard={true}
            free={false}
            family={50}
            photos={30}
            plan="estandar"
            handlerOpen={setOpenPaymentPLan}
            duration={"400"}
          />
          <CardsTwo
            price={120}
            title="Exclusivo"
            free={false}
            premium={true}
            photos={50}
            plan="exclusivo"
            handlerOpen={setOpenPaymentPLan}
            duration={"600"}
          />
        </div>

        <button className="px-4 mx-auto py-3 rounded-lg text-[#0061dd] bg-white font-normal" data-aos="zoom-in" data-aos-delay="200" data-aos-mirror={false}>
          ¿Prefieres usar otro medio de pago? Usa una billetera virtual
        </button>
      </section>
      <section ref={myDivRef} className="bg-[url('./assets/enroll2.png')] flex justify-center items-center text-center">
        <form className="flex flex-col bg-white m-14 h-[500px] p-5 w-[400px] justify-evenly items-center rounded-md"  data-aos="zoom-in" data-aos-delay="600" data-aos-mirror={false} onSubmit={handleSubmit}>
          <img src={Logo} alt="logoblanco" className="object-cover w-40" />
          <h1 className="text-[#037dda] font-bold text-xl">
            Completa tus datos
          </h1>
          <input
            type="text"
            name="colegio"
            className="border py-2 w-full text-center rounded-md shadow-md outline-none"
            placeholder="Nombre del colegio"
          />
          <input
            type="email"
            name="email"
            className="border py-2 w-full text-center rounded-md shadow-md outline-none"
            placeholder="Correo Electrónico"
          />
          <input
            type="number"
            name="ruc"
            className="border py-2 w-full text-center rounded-md shadow-md outline-none"
            placeholder="RUC"
          />
          <input
            type="number"
            className="border py-2 w-full text-center rounded-md shadow-md outline-none"
            name="celular"
            placeholder="Celular"
          />
          <button
            type="submit"
            className="bg-[#0061dd] w-full py-2 rounded-md font-medium text-white"
          >
            Quiero mas informacion
          </button>
        </form>
      </section>
    </div>
  );
}

export default EnrollSchool;
