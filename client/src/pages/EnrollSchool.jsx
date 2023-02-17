import React, { useState } from "react";
import CardsOne from "../components/CardsOne";
import CardsTwo from "../components/CardsTwo";
import VectorPeople from "../assets/VectorPeople.png";
import VectorTalk from "../assets/VectorTalk.png";
import GroupSchool from "../assets/GroupSchool.png";
import Logo from "../assets/logoblanco.png";
import { Link } from "react-router-dom";
import ModalInscripcion from "../components/ModalInscripcion/ModalInscripcion";
function EnrollSchool() {
  const [OpenRegister, setOpenRegister] = useState(false);
  const [OpenPaymentPLan, setOpenPaymentPLan] = useState({
    state: false,
    plan: "",
    price: 0,
  });
  const toggleInscripcion = () => {
    setOpenRegister(true);
  };
  return (
    <div>
      <header className="bg-[url('./assets/enroll.png')] h-[700px] flex justify-center items-center flex-col gap-10">
        <h1 className="text-white text-center text-4xl font-bold">
          Publica tu colegio. Concreta citas con familias interesadas. <br />
          Gestiona todo en línea. Obtén nuevos estudiantes
        </h1>
        <h2 className="text-white text-center text-3xl font-bold">
          Todo en un solo lugar, de forma simple y a bajo costo
        </h2>
        <div onClick={toggleInscripcion}>
          <button className="uppercase p-3 rounded-sm bg-[#0061dd] text-white font-semibold">
            inscribe tu colegio aquí
          </button>
        </div>
        {OpenRegister && <ModalInscripcion handleClose={setOpenRegister}   OpenPaymentPLan={OpenPaymentPLan} />}

        <button className="px-4 py-1 rounded-md text-[#0061dd] bg-white font-semibold">
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
          />
          <CardsOne
            img={VectorPeople}
            title="Completa tus vacantes 
disponibles"
            parrafe="Gestiona todas las vacantes de inicial, primaria y secundaria que tengas en un solo lugar.
"
          />
          <CardsOne
            img={VectorTalk}
            title="Cuenta con un proceso de 
admisión simple y eficiente"
            parrafe="Olvídate de tener que mandar correos y comunicaciones uno a uno, hazlo todo masivo."
          />
        </div>
      </section>
      {OpenPaymentPLan.state === true && <ModalInscripcion   OpenPaymentPLan={OpenPaymentPLan}  handleClose={setOpenRegister}  handleClosePayment={setOpenPaymentPLan} />}
      <section className="bg-[#0061dd] flex flex-col justify-around p-10 gap-10">
        <h1 className="text-center text-2xl font-semibold text-white">
          Elije el plan que más se acomode a tus necesidades
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
          />
          <CardsTwo
            title="Básico"
            free={false}
            family={25}
            photos={15}
            price={50}
            plan="básico"
            handlerOpen={setOpenPaymentPLan}
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
          />
          <CardsTwo
            price={120}
            title="Exclusivo"
            free={false}
            premium={true}
            photos={50}
            plan="exclusivo"
            handlerOpen={setOpenPaymentPLan}
          />
        </div>

        <button className="px-4 mx-auto py-3 rounded-lg text-[#0061dd] bg-white font-normal">
          ¿Prefieres usar otro medio de pago? Usa una billetera virtual
        </button>
      </section>
      <section className="bg-[url('./assets/enroll2.png')] flex justify-center items-center text-center">
        <form className="flex flex-col bg-white m-14 h-[500px] p-5 w-[400px] justify-evenly items-center rounded-md">
          <img src={Logo} alt="logoblanco" className="object-cover w-40" />
          <h1 className="text-[#037dda] font-bold text-xl">
            Completa tus datos
          </h1>
          <input
            type="text"
            className="border py-2 w-full text-center rounded-md shadow-md outline-none"
            placeholder="Nombre del colegio"
          />
          <input
            type="email"
            className="border py-2 w-full text-center rounded-md shadow-md outline-none"
            placeholder="Correo Electrónico"
          />
          <input
            type="text"
            className="border py-2 w-full text-center rounded-md shadow-md outline-none"
            placeholder="RUC"
          />
          <input
            type="text"
            className="border py-2 w-full text-center rounded-md shadow-md outline-none"
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
