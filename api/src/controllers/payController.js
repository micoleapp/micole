const { mercadopago } = require("../mercadoPago.js");
const { Colegio } = require("../db");

const payController = async (req, res) => {
  const data = req.body;
  const plan_pago = data.plan_pago;

  const colegio = await Colegio.findByPk(`${data.id}`);
  const id_colegio = data.id;
  const nombre_colegio = colegio.nombre_colegio;
  const direccion = colegio.direccion;
  const ruc = colegio.ruc;
  const email = colegio.email;
  console.log(id_colegio + "  " + nombre_colegio + "  ");

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
        id: 1,
        title: "miproducto",
        unit_price: 100,
        quantity: 2,
        // currency_id: "PEN",
      },
    ],
    back_urls: {
      //definir las verdaderas aca
      success: "https://google.com/",
      failure:
        "https://www.microsoft.com/es-mx/download/internet-explorer.aspx",
      pending: "https://tupcideal.vercel.app/",
    },
    notification_url:"",
  };
  console.log(preference.payer);
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
