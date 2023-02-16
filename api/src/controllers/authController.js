const { Auth, User } = require('../db');
const { generateToken } = require('../utils/generateToken');
const mailer = require("../utils/sendMails/mailer");

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(400);
  }
  try {
    const authInstance = await Auth.findOne({ where: { email } });
    if (!authInstance) {
      return next({
        statusCode: 404,
        message: 'No usuario ingresado no existe',
      });
    }
    const validatePassword = await authInstance.comparePassword(password);
    if (!validatePassword) {
      return next({
        statusCode: 403,
        message: 'Error en las credenciales de acceso',
      });
    }
    const jwToken = generateToken(authInstance.id);
    const sanitizedLogIn = {
      email: authInstance.email,
      rol: authInstance.rol,
      token: jwToken.token
    };
    return res.status(200).send(sanitizedLogIn);
  } catch (error) {
    return next(500);
  }
};

const signUp = async (req, res, next) => {
  const { email, password, nombre, apellidos, dni, ruc, school } = req.body;
  try {
    const isUserRegistered = await Auth.findOne({ where: { email } });
    if (isUserRegistered) {
      return next({
        statusCode: 400,
        message: 'El email de usuario ya está registrado',
      });
    }
    const newAuth = await Auth.create({ email, password });
    const idAuth = newAuth.id;
    if (school) {
      // Aún en revisión Modelo Colegio
      /*
      const newSchool = await User.create({ nombre, ruc, idAuth });
      const sanitizedSchool = {
        email: newAuth.email,
        nombre: newSchool.nombre,
        rol: newAuth.rol,
      };*/
      mailer.sendMailSignUp(sanitizedSchool, "Colegio"); //Enviamos el mail de Confirmación de Registro para el Usuario Colegio
      return res.status(201).send(sanitizedSchool);
    }
    const newUser = await User.create({ nombre, apellidos, dni, idAuth });
    const sanitizedUser = {
      email: newAuth.email,
      nombre: `${newUser.nombre} ${newUser.apellidos}`,
      rol: newAuth.rol,
      avatar: newUser.avatar,
    };
    mailer.sendMailSignUp(sanitizedUser, "User"); //Enviamos el mail de Confirmación de Registro para el Usuario Normal
    return res.status(201).send(sanitizedUser);
  } catch (error) {
    return next(500);
  }
};

module.exports = {
  signIn,
  signUp,
};