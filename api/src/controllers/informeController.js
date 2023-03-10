const { Informe } = require('../db');
const mailer = require("../utils/sendMails/mailer");

const sendInfoEmail = async (req, res, next) => {
  const { nombre, email, ruc, telefono } = req.body;
  try {
    const newInforme = await Informe.create({
      nombre_colegio: nombre,
      email,
      ruc,
      telefono,
    });
    mailer.sendMailInforme(newInforme); 
    mailer.sendMailInformeAdmin(newInforme);
    res.status(200).send('Solicitud recibida correctamente');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  sendInfoEmail,
};
