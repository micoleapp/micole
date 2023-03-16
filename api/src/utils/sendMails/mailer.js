const nodemailer = require("nodemailer");
const moment = require("moment");
var actualDate = moment().format("DD/MM/YYYY HH:mm:ss A");
/* Mail Templates */
const confirmationSignUpTemplate = require("./confirmationSignUpTemplate");
const informeMailUser = require("./Informes/informeMailUser");
const informeMailAdmin = require("./Informes/informeMailAdmin");

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
  await transporter.sendMail({
    from: '"MiCole App " <micole.test.app@gmail.com>',
    to: `${user.email}`,
    subject: "Confirmamos tu Registro | MiCole",
    html: confirmationSignUpTemplate(user, type, actualDate)
  });
  return;
};

const sendMailInforme = async(user) => {
  const transporter = createTransport();
  await transporter.sendMail({
    from: '"MiCole App " <micole.test.app@gmail.com>',
    to: `${user.email}`,
    subject: "Confirmación de solicitud de información sobre MiCole",
    html: informeMailUser(user, actualDate)
  });
  return;
};

const sendMailInformeAdmin = async(user) => {
  const transporter = createTransport();
  await transporter.sendMail({
    from: '"MiCole App " <micole.test.app@gmail.com>',
    to: `informes@micole.com.pe`,
    subject: "Nueva solicitud de información sobre MiCole",
    html: informeMailAdmin(user, actualDate)
  });
  return;
};

exports.sendMailSignUp = (user , type) => sendMailSignUp(user , type);
exports.sendMailInforme = (user) => sendMailInforme(user);
exports.sendMailInformeAdmin = (user) => sendMailInformeAdmin(user);