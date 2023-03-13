const { Router } = require("express");
const mercadopago = require("mercadopago");
const router = Router();
const { Colegio, Ventas, Plan_Pago } = require("../db.js");
const payController = require("../controllers/payController");

router.get("/success", (req, res) => {
  res.send("Todo bien al 100");
});
router.post("/notification", async (req, res) => {
  console.log("yo soy la mera mera: ");
  const { query } = req;
  console.log({ query });
  const topic = query.topic;

  var merchantOrder;
  var ventas;

  switch (topic) {
    case "payment":
      const paymentId = query.id;
      const payment = await mercadopago.payment.findById(paymentId);

      merchantOrder = await mercadopago.merchant_orders.findById(
        payment.body.order.id
      );

      ventas = await Ventas.findOne({
        where: {
          mp_merchantOrder_id: [merchantOrder.body.id],
        },
      });
      console.log(merchantOrder.body);

      if (ventas && ventas.status === "Pending") {
        if (merchantOrder.body.payments[0].status === "approved") {
          ventas.status = "Paid";
          ventas.mp_payment_id = paymentId;
          ventas.PlanPagoId = merchantOrder.body.items[0].id;
          const plan = merchantOrder.body.items[0].id;
          const idColegio = merchantOrder.body.external_reference;
          console.log("id del plan=" + plan);
          console.log("id del Colegio=" + idColegio);
          await ventas.setPlan_Pago(plan);
          await ventas.setColegio(idColegio);
          await ventas.save();

          res.status(200).send(merchantOrder);
        }
      } else if (merchantOrder.body.payments[0].status === "canceled") {
        ventas.status = "Canceled";
        ventas.mp_payment_id = paymentId;
        await ventas.save();
        res.status(200).send(merchantOrder);
      }

      break;

    case "merchant_order":
      const orderId = query.id;
      merchantOrder = await mercadopago.merchant_orders.findById(orderId);

      ventas = await Ventas.findOrCreate({
        where: {
          mp_merchantOrder_id: [merchantOrder.body.id],
          totalprice: [merchantOrder.body.total_amount],
        },
      });

      ventas = await Ventas.findOne({
        where: {
          mp_merchantOrder_id: [merchantOrder.body.id],
        },
      });

      // const colegio = await Colegio.findOne({
      //   where: { email: merchantOrder.body.aditional_info },
      // });

      // await ventas.setColegioId(colegio);
      res.status(200).send(merchantOrder);
      break;
  }
});

router.post("/", payController);

module.exports = router;
