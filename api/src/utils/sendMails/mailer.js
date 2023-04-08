const nodemailer = require("nodemailer");
const moment = require("moment");
var actualDate = moment().format("DD/MM/YYYY HH:mm:ss A");
/* Mail Templates */
const confirmationSignUpTemplate = require("./Auth/confirmationSignUpTemplate");
const informeMailUser = require("./Informes/informeMailUser");
const informeMailAdmin = require("./Informes/informeMailAdmin");
const solicitudCita = require("./Citas/User/solicitudCita");
const aplicacionCita = require("./Citas/User/aplicacionCita");
const entrevistaDirector = require("./Citas/User/entrevistaDirector");
const vacanteOfrecida = require("./Citas/User/vacanteOfrecida");
const vacanteAceptada = require("./Citas/User/vacanteAceptada");
const sendPaymentSuccessEmail = require("./Ventas/VentaExitosa");
const sendPaymentCanceledEmail = require("./Ventas/VentaCancelada");

const createTransport = () => {
  /* Test with MailTrap */
  /* const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c5ede4159841b3",
      pass: "19572a2f48110a"
    }
  }); */

  /* Config for send Email with Gmail */
  const transport = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
      user: "micole.test.app@gmail.com",
      pass: process.env.GMAIL_MAILS_PASS,
    }
  });
  transport.verify().then( ()=>{
    console.log("Listo para enviar emails");
  });
  return transport;
};

const sendMailSignUp = async(user, type) => {
  const transporter = createTransport();
  if(type === "Colegio"){
    await transporter.sendMail({
      from: '"MiCole App " <micole.test.app@gmail.com>',
      to: `${user.email}`,
      subject: `¡Bienvenido colegio ${user.nombre} a MiCole!`,
      html: confirmationSignUpTemplate(user, type, actualDate)
    });
  }
  return;
};

const sendMailInforme = async(user) => {
  const transporter = createTransport();
  await transporter.sendMail({
    from: '"MiCole App" <micole.test.app@gmail.com>',
    to: `${user.email}`,
    subject: "Confirmación de solicitud de información sobre MiCole",
    html: informeMailUser(user, actualDate)
  });
  await transporter.sendMail({
    from: '"MiCole App" <micole.test.app@gmail.com>',
    to: `informes@micole.com.pe`,
    subject: "Nueva solicitud de información sobre MiCole",
    html: informeMailAdmin(user, actualDate)
  });
  return;
};

const sendMailSolicitudCita = async(user, colegio) => {
  const transporter = createTransport();
  await transporter.sendMail({
    from: '"MiCole App" <micole.test.app@gmail.com>',
    to: `${user.email}`,
    subject: `Solicitud de cita con el colegio ${colegio.nombre_colegio}`,
    html: solicitudCita(user, colegio, actualDate)
  });
  return;
};

exports.sendMailSignUp = (user , type) => sendMailSignUp(user , type);
exports.sendMailInforme = (user) => sendMailInforme(user);
exports.sendMailSolicitudCita = (user, colegio) => sendMailSolicitudCita(user, colegio);