import React from "react";
import logoPremium from "../assets/premium.png";
import infoPlanes from "./FormPayment/utils/InfoPlanes";
function CardsTwo({
  title,
  price,
  free,
  family,
  photos,
  plan,
  premium,
  standard,
  handlerOpen,
  duration
}) {
  const handlerPlan = () => {
    handlerOpen({
      state:true,
      plan:plan,
      price:price
    })
  };
  return (
    <div className="relative"            data-aos="flip-right"
    data-aos-mirror={false} data-aos-delay={duration}>
      <div
        className={`text-white group py-5 ${
          standard ? "border-4 shadow-xl" : "border-2"
        } p-2 rounded-lg w-[350px] shadow-sm shadow-white sm:w-[270px] hover:shadow-none duration-500 hover:bg-white hover:text-[#0061dd] text-center flex flex-col gap-5`}
      >
        {standard && (
          <img
            src={logoPremium}
            alt=""
            className="w-24 absolute -left-2 -top-10"
          />
        )}

        <h1 className="text-3xl font-bold">{title}</h1>
        <h2 className="text-2xl">{price === 0 ? "Sin Costo" : `s/ ${price}`}</h2>
        <small>por mes</small>
        <hr />
        <p>{free ? "¡Siempre gratis!" : "¡30 días de prueba gratis!"}</p>
        <p>365 días de publicación</p>
        {premium ? (
          <p>Envío ilimitado de familias interesadas por mes</p>
        ) : (
          <p>Envío de hasta {family} familias interesadas por mes</p>
        )}
        <p>{photos} fotos del centro educativo en la plataforma</p>
        <p>Soporte operativo disponible</p>

        <button
          onClick={handlerPlan}
          className="px-4 my-5 mx-auto py-3 rounded-lg hover:animate-bounce duration-500 group-hover:bg-[#0061dd] group-hover:text-white text-[#0061dd] bg-white font-medium"
        > 
          {plan === "estandar" ? <>¡Quiero el plan estándar!</> : <>¡Quiero el plan {plan}!</> }
          
        </button>
      </div>
    </div>
  );
}

export default CardsTwo;
