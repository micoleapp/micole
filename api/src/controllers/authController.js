const { Auth, User, Colegio } = require('../db');
const { generateToken } = require('../utils/generateToken');
const mailer = require('../utils/sendMails/mailer');

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
        message: 'El usuario ingresado no existe',
      });
    }
    const validatePassword = await authInstance.comparePassword(password);
    if (!validatePassword) {
      return next({
        statusCode: 403,
        message: 'Error en las credenciales de acceso',
      });
    }
    const dataUser = await User.findOne({
      where: { idAuth: authInstance.id },
    });
    const jwToken = generateToken(authInstance.id);
    const sanitizedLogIn = {
      id: authInstance.id,
      email: authInstance.email,
      nombre: dataUser.nombre,
      apellidos: dataUser.apellidos,
      dni: dataUser.dni,
      telefono: dataUser.telefono,
      rol: authInstance.rol,
    };
    return res.status(200).send({ user: sanitizedLogIn, token: jwToken.token });
  } catch (error) {
    return next(error);
  }
};

const getAuthById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const authInstance = await Auth.findByPk(id);
    if (!authInstance) {
      return next({
        statusCode: 400,
        message: 'El usuario no existe en la BD',
      });
    }
    const dataUser = await User.findOne({
      where: { idAuth: authInstance.id },
    });
    const sanitizedUser = {
      id: authInstance.id,
      email: authInstance.email,
      nombre: dataUser.nombre,
      apellidos: dataUser.apellidos,
      dni: dataUser.dni,
      telefono: dataUser.telefono,
      rol: authInstance.rol,
    };
    return res.status(200).send({ user: sanitizedUser });
  } catch (error) {
    return next(error);
  }
};

const signUp = async (req, res, next) => {
  const {
    email,
    password,
    nombre,
    apellidos,
    nombre_colegio,
    dni,
    ruc,
    telefono,
    distrito,
    esColegio,
  } = req.body;
  try {
    const isUserRegistered = await Auth.findOne({ where: { email } });
    if (isUserRegistered) {
      return next({
        statusCode: 400,
        message: 'El email de usuario ya está registrado',
      });
    }
    const newAuth = await Auth.create({ email, password, rol:"Colegio" });
    const idAuth = newAuth.id;
    if (esColegio) {
      const newSchool = await Colegio.create({
        nombre_responsable: nombre,
        apellidos_responsable: apellidos,
        nombre_colegio,
        telefono,
        ruc,
        idAuth,
      });
      const sanitizedSchool = {
        email: newAuth.email,
        nombre: newSchool.nombre_colegio,
        rol: newAuth.rol,
      };
      mailer.sendMailSignUp(sanitizedSchool, 'Colegio'); //Enviamos el mail de Confirmación de Registro para el Usuario Colegio
      return res.status(201).send(sanitizedSchool);
    }
    const newUser = await User.create({ nombre, apellidos, dni, idAuth });
    const sanitizedUser = {
      email: newAuth.email,
      nombre: `${newUser.nombre} ${newUser.apellidos}`,
      rol: newAuth.rol,
      avatar: newUser.avatar,
    };
    mailer.sendMailSignUp(sanitizedUser, 'User'); //Enviamos el mail de Confirmación de Registro para el Usuario Normal
    return res.status(201).send(sanitizedUser);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  signIn,
  signUp,
  getAuthById,
};
