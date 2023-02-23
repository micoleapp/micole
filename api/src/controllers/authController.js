const { Auth, User, Colegio } = require('../db');
const { generateToken } = require('../utils/generateToken');
const mailer = require('../utils/sendMails/mailer');

const getResponse = (from, auth, data) => {
  return from === 'Colegio'
    ? {
        id: auth.id,
        email: auth.email,
        nombre_responsable: data.nombre_responsable,
        apellidos_responsable: data.apellidos_responsable,
        ruc: data.ruc,
        telefono: data.telefono,
        rol: auth.rol,
      }
    : {
        id: auth.id,
        email: auth.email,
        nombre: data.nombre,
        apellidos: data.apellidos,
        dni: data.dni,
        telefono: data.telefono,
        rol: auth.rol,
      };
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  const tokenUser = req.user;
  try {
    if (tokenUser) {
      if (tokenUser.rol === 'Colegio') {
        const dataColegio = await Colegio.findOne({
          where: { idAuth: tokenUser.id },
        });
        return res
          .status(200)
          .send({ user: getResponse('Colegio', tokenUser, dataColegio) });
      } else {
        const dataUser = await User.findOne({
          where: { idAuth: tokenUser.id },
        });
        return res
          .status(200)
          .send({ user: getResponse('Usuario', tokenUser, dataUser) });
      }
    } else {
      if (!email || !password) {
        return next(400);
      }
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
      if (authInstance.rol === 'Colegio') {
        const dataColegio = await Colegio.findOne({
          where: { idAuth: authInstance.id },
        });
        const jwToken = generateToken(authInstance.id);
        return res.status(200).send({ user: getResponse("Colegio", authInstance, dataColegio), token: jwToken.token });
      } else {
        const dataUser = await User.findOne({
          where: { idAuth: authInstance.id },
        });
        const jwToken = generateToken(authInstance.id);
        return res.status(200).send({ user: getResponse("Usuario", authInstance, dataUser), token: jwToken.token });
      }
    }
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
    const promises = [
      User.findOne({ where: { idAuth: authInstance.id } }),
      Colegio.findOne({ where: { idAuth: authInstance.id } }),
    ];
    const [dataUser, dataColegio] = await Promise.all(promises);
    const user = dataColegio
      ? {
          id: authInstance.id,
          email: authInstance.email,
          nombre_responsable: dataColegio.nombre_responsable,
          apellidos_responsable: dataColegio.apellidos_responsable,
          ruc: dataColegio.ruc,
          telefono: dataColegio.telefono,
          rol: authInstance.rol,
        }
      : {
          id: authInstance.id,
          email: authInstance.email,
          nombre: dataUser.nombre,
          apellidos: dataUser.apellidos,
          dni: dataUser.dni,
          telefono: dataUser.telefono,
          rol: authInstance.rol,
        };

    return res.status(200).send({ user });
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
    DistritoId,
    esColegio,
  } = req.body;

  try {
    // Validaciones
    if (esColegio) {
      const colegioValidation = Colegio.build({
        nombre_responsable: nombre,
        apellidos_responsable: apellidos,
        nombre_colegio,
        telefono,
        ruc,
        DistritoId,
      });
      await colegioValidation.validate();
    } else {
      const userValidation = User.build({
        nombre,
        apellidos,
        dni,
      });
      await userValidation.validate();
    }

    const isUserRegistered = await Auth.findOne({ where: { email } });
    if (isUserRegistered) {
      return next({
        statusCode: 400,
        message: 'El email de usuario ya está registrado',
      });
    }
    const newAuth = await Auth.create({
      email,
      password,
      rol: esColegio ? 'Colegio' : 'Usuario',
    });
    const idAuth = newAuth.id;
    if (esColegio) {
      const newColegio = await Colegio.create({
        nombre_responsable: nombre,
        apellidos_responsable: apellidos,
        nombre_colegio,
        telefono,
        ruc,
        DistritoId,
        idAuth,
      });
      const sanitizedSchool = {
        email: newAuth.email,
        nombre_responsable: newColegio.nombre_responsable,
        apellidos_responsable: newColegio.apellidos_responsable,
        nombre: newColegio.nombre_colegio,
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
