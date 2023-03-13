const { mercadopago } = require("../mercadoPago.js");
const { Colegio, Plan_Pago } = require("../db");
const { NGROK_URL } = process.env;

const payController = async (req, res) => {
  const data = req.body;

  const colegio = await Colegio.findByPk(`${data.colegioId}`);
  const id_colegio = colegio.id;
  const nombre_colegio = colegio.nombre_colegio;
  const direccion = colegio.direccion;
  const ruc = colegio.ruc;
  const email = data.email;

  const plan = await Plan_Pago.findByPk(`${data.planPagoId}`);
  const id_plan = data.planPagoId;
  const nombre_plan_pago = plan.nombre_plan_pago;
  const precio = plan.precio;

  let preference = {
    binary_mode: true,
    payer: {
      id_colegio: id_colegio,
      name: nombre_colegio,
      direccion: direccion,
      ruc: ruc,
      email: email,
    },
    items: [
      {
        id: id_plan,
        title: nombre_plan_pago,
        unit_price: precio,
        quantity: data.cantidad,
        // currency_id: "PEN",
      },
    ],
    external_reference: id_colegio,
    back_urls: {
      //definir las verdaderas aca
      success: "https://1ea4-177-246-245-112.ngrok.io/payments/success",
      failure:
        "https://www.microsoft.com/es-mx/download/internet-explorer.aspx",
      pending: "https://tupcideal.vercel.app/",
    },
    notification_url: `${NGROK_URL}/payments/notification`,
  };
  console.log(preference.payer);
  console.log(preference.items);
  mercadopago.preferences
    .create(preference)
    //le pasamos las preference que definimos de linea 35 a 72
    .then(function (response) {
      console.log(response.body.init_point);
      res.send(
        response.body.init_point //este id es el id de la compra, que mandamos al front para que reenvie a MercadoPago
      );
    })
    .catch(function (error) {
      console.log(error);
    });
};

module.exports = payController;
