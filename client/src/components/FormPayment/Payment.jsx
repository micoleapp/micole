import React, { useEffect, useState } from "react";
import style from "./Payment.module.css";
import MercadoPagoLogo from "../../assets/mercado-pago-logo-.png";
import MaterialCheckBox from "@mui/material/Checkbox";
import Logo from "../../assets/logoPayment.png";
import MasterCard from "./svg/MasterCard";
import Visa from "./svg/Visa";
import Union from "./svg/Union";
import Paypal from "./svg/Paypal";
import ImageMG from "./svg/infoMG.png";
import YapeLogo from "./svg/yape.png";
import InfoPlanes from "./utils/InfoPlanes";
import { useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress'
import {
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
function Payment({ plan: Plan }) {
  const { user } = useSelector((state) => state.auth);
  console.log(Plan)
  const [plan, setPlan] = useState('gratis');

  const [months, setMonths] = useState(1);
  const [isLoading,setIsLoading] = useState(false)
  useEffect(() => {
    if(!Plan){
      setPlan("gratis");
    }else{
      setPlan(Plan);
    }
  }, []);

  const [selectedMethod, setSelectedMethod] = useState("");

  const planPagoId =
    plan === "gratis" ? 1 : plan === "básico" ? 2 : plan === "estandar" ? 3 : 4;

  const price =
    plan === "gratis"
      ? 0
      : plan === "básico"
      ? 50
      : plan === "estandar"
      ? 80
      : 120;

  /*
1='gratis' 0
2='basico' 50
3='estandar' 80
4='exclusivo' 120
*/
  //.post(/payments,data)
  /*
data: {
  "colegioId":"13b57af0-d887-4bb5-ba41-f5d3f38c650b",
  "planPagoId":3,
  "cantidad": 3,
  "email":"soyelemail@sisoy.com"
}

return{
  link pago
}
----------------------------------------------------------------
mercado pago



*/

  const planes = [
    {
      label: "Free",
      value: "gratis",
    },
    {
      label: "Básico",
      value: "básico",
    },
    {
      label: "Estándar",
      value: "estandar",
    },
    {
      label: "Exclusivo",
      value: "exclusivo",
    },
  ];

  const handleChangePlan = (event) => {
    setPlan(event.target.value);
  };

  const meses = [
    {
      label: "1 mes",
      value: 1,
    },
    {
      label: "2 meses",
      value: 2,
    },
    {
      label: "3 meses",
      value: 3,
    },
    {
      label: "4 meses",
      value: 4,
    },
    {
      label: "5 meses",
      value: 5,
    },
    {
      label: "6 meses",
      value: 6,
    },
    {
      label: "7 meses",
      value: 7,
    },
    {
      label: "8 meses",
      value: 8,
    },
    {
      label: "9 meses",
      value: 9,
    },
    {
      label: "10 meses",
      value: 10,
    },
    {
      label: "11 meses",
      value: 11,
    },
    {
      label: "12 meses",
      value: 12,
    },
  ];

  const handleChangeMonths = (event) => {
    setMonths(event.target.value);
  };

  const [buttonMp,setButtonMp] = useState(null)
  
  const handleMp = (e) => {
    e.preventDefault();
    const data = {
      colegioId: user.id,
      planPagoId,
      cantidad: months,
      email: user.email,
    }
    try {      
      setIsLoading(true)
      axios.post("/payments",data)
      .then(res=>{
        setButtonMp(res.data)
        setIsLoading(false)
      })
      .catch(err=>{
        console.log(err)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleYape = (e) => {
    e.preventDefault();
    const data = {
      colegioId: user.id,
      planPagoId,
      cantidad: months,
      email: user.email,
    }
    Swal.fire({
      imageUrl: 'https://c7.alamy.com/compes/j54064/ejemplo-de-codigo-qr-en-la-forma-de-una-cara-sonriente-aislado-sobre-fondo-blanco-j54064.jpg',
      imageWidth: 300,
      imageHeight: 300,
      title: "¡Escanea el QR!",
      text: "Al apretar OK, revise su correo y espere a que un asesor se ponga en contacto con usted.",
    })
  }

  return (
    <div>
      {" "}
      <div className={style.h1_div}>
        <img src={Logo} />
      </div>
      <div className={style.PaymentLayout}>
        <div className={style.container}>
          {
            plan !== 'gratis' && (
              <div className={style.Divdetalle}>
              <h1>Detalles de Compra</h1>
              <div className={style.detalle}>
                <p>Plan Especial + IGV</p>
                <p>S/ {price}</p>
              </div>
              <div className={style.detalle}>
                <p>Total</p>
                <p>S/ {price * months}</p>
              </div>
            </div>
            )
          }

          {
            plan !== 'gratis' && (
              <>
                        <div className={style.containerMetodoPago}>
            <h1>Elige tu método de pago</h1>

            <div className={style.mercadoPago}>
              <div
                style={{
                  display: "flex",
                  fleDirection: "row",
                  alignItems: "center",
                }}
              >
                <MaterialCheckBox
                  name="paymentMethod"
                  type="checkbox"
                  checked={selectedMethod === "mercadoPago"}
                  onChange={() => setSelectedMethod("mercadoPago")}
                />

                <img
                  style={{ width: "90px", height: "30px" }}
                  src={MercadoPagoLogo}
                />
              </div>

              <div
                className={style.tarjetas}
                // style={{
                //   display: "flex",
                //   fleDirection: "row",
                //   alignItems: "center",
                //   gap: "20px",
                // }}
              >
                <Visa />
                <MasterCard />
                <Union />
                <Paypal />
              </div>
            </div>

            <img style={{ width: "100%", height: "200px" }} src={ImageMG} />
          </div>
          <div className={style.mercadoPago}>
            <div
              style={{
                display: "flex",
                fleDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialCheckBox
                name="paymentMethod"
                type="checkbox"
                checked={selectedMethod === "yape"}
                onChange={() => {
                  setButtonMp(null)
                  setSelectedMethod("yape")}}
              />
              <img
                style={{ width: "40px", height: "30px", borderRadius: "5px" }}
                src={YapeLogo}
              />
              <small className="ml-5">
                Se enviara un correo a tu email para continuar con el proceso
              </small>
            </div>
          </div>
              </>
            )
          }


        </div>
        <div className={style.divBeneficios}>
          <h1>Información Detallada del Plan {plan === 'gratis' ? "Free" : plan === "básico" ? "Basico" : plan === "estandar" ? "Estándar" : "Exclusivo"} </h1>
          <InfoPlanes plan={plan} />
          <div className="mt-7 flex flex-col gap-5">
            <FormControl
              variant="standard"
              style={{ width: "200px", height: "70px" }}
              size="small"
            >
              <InputLabel id="demo-simple-select-standard-label">
                Cambiar plan
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-type-select-standard"
                value={plan}
                onChange={handleChangePlan}
                label="Cambiar plan"
              >
                {planes.map((type, index) => (
                  <MenuItem value={type.value} key={index}>
                    <ListItemText primary={type.label} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {
              plan !== 'gratis' && (
                <FormControl
                variant="standard"
                style={{ width: "200px", height: "70px" }}
                size="small"
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Cuántos meses quieres pagar?
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-type-select-standard"
                  value={months}
                  onChange={handleChangeMonths}
                  label="Cuántos meses quieres pagar?"
                >
                  {meses.map((type, index) => (
                    <MenuItem value={type.value} key={index}>
                      <ListItemText primary={type.label} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              )
            }

            {buttonMp == null && selectedMethod === "mercadoPago" ? (
              <div className={style.divButton}>
                <button onClick={handleMp}>          {isLoading ? (
            <CircularProgress
              size="1rem"
              style={{ color: '#fff', marginTop: '5px' }}
            />
          ) : (
            'GENERAR LINK DE PAGO'
          )}</button>
              </div>
            ) : buttonMp == null && selectedMethod === "yape" ? (
              <div className={style.divButton}>
                <button onClick={handleYape}>GENERAR QR</button>
              </div>
            ) : null}
            {buttonMp &&               <div className={style.divButton}>
                <a className="text-white bg-[#0061df] rounded-md px-3 py-2" href={buttonMp} onClick={()=>setButtonMp(null)}>PAGAR</a>
              </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
