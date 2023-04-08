const { Cita, Colegio, Grado, Plan_Pago, User, Auth } = require('../db');
const { Op } = require('sequelize');
const moment = require('moment');
const mailer = require('../utils/sendMails/mailer');
const getPagination = require('../utils/getPagination');

const getCitas = async (req, res, next) => {
  const tokenUser = req.user;
  try {
    const user = await Colegio.findOne({ where: { idAuth: tokenUser.id } });
    if (!user) {
      return next({
        statusCode: 400,
        message: "El usuario no es un Colegio",
      });
    }
    const fecha_actual = new Date();
    const year = fecha_actual.getFullYear();
    const mes_actual = fecha_actual.getMonth() + 1;
    const firstDayOfMonth = new Date(year, mes_actual - 1, 1);
    const lastDayOfMonth = new Date(year, mes_actual, 0);
    const include = { include: [{ model: Grado }] };
    const plan_pago = await Plan_Pago.findOne({
      where: { id: user.PlanPagoId },
    });

    const CitasActivas = await Cita.findAll({
      where: {
        ColegioId: user.id,
        activo: true,
      },
      ...include,
      order: [["fecha_cita", "ASC"]],
    });

    const CitasInactivasTotales = await Cita.findAll({
      where: {
        ColegioId: user.id,
        activo: false,
      },
      ...include,
      order: [["fecha_cita", "ASC"]],
    });

    const CitasActivasMesActual = await Cita.findAll({
      where: {
        ColegioId: user.id,
        activo: true,
        fecha_cita: {
          [Op.and]: [
            { [Op.gte]: firstDayOfMonth },
            { [Op.lte]: lastDayOfMonth },
          ],
        },
      },
      ...include,
      order: [["fecha_cita", "ASC"]],
    });

    const CitasInactivasMesActual = await Cita.findAll({
      where: {
        ColegioId: user.id,
        activo: false,
        fecha_cita: {
          [Op.and]: [
            { [Op.gte]: firstDayOfMonth },
            { [Op.lte]: lastDayOfMonth },
          ],
        },
      },
      ...include,
      order: [["fecha_cita", "ASC"]],
    });

    let cantidadCitasPermitidasMesActual = 0;
    if (CitasActivasMesActual.length < plan_pago.cantidad_familias) {
      cantidadCitasPermitidasMesActual =
        plan_pago.cantidad_familias - CitasActivasMesActual.length;
    }

    let CitasPermitidasMesActual = await Cita.findAll({
      where: {
        ColegioId: user.id,
        activo: false,
        fecha_cita: {
          [Op.and]: [
            { [Op.gte]: firstDayOfMonth },
            { [Op.lte]: lastDayOfMonth },
          ],
        },
      },
      ...include,
      order: [["fecha_cita", "ASC"]],
      limit: cantidadCitasPermitidasMesActual,
    });

    if (CitasActivasMesActual.length >= plan_pago.cantidad_familias) {
      CitasPermitidasMesActual = [];
    }

    const CitasInactivas = CitasInactivasTotales.filter((cita) => {
      return !CitasPermitidasMesActual.some(
        (permitida) => permitida.id === cita.id
      );
    });

    res.status(200).send({
      CitasActivas,
      CitasActivasMesActual,
      CitasPermitidasMesActual,
      CantidadCitasNoPermitidasMesActual:
        CitasInactivasMesActual.length - CitasPermitidasMesActual.length,
      CitasInactivasTotales:
        CitasInactivasTotales.length - CitasPermitidasMesActual.length,
      CitasInactivas,
    });
  } catch (error) {
    return next(error);
  }
};

const getCitasUser = async (req, res, next) => {
  const tokenUser = req.user;
  try {
    const user = await Auth.findOne({ where: { id: tokenUser.id } });
    if (!user) {
      return next({
        statusCode: 400,
        message: "El usuario no es un Colegio",
      });
    }
    const include = { include: [{ model: Grado }, {model: Colegio, attributes: ['id', 'nombre_colegio', 'logo', 'direccion', 'telefono'],}] };
    const CitasUsuario = await Cita.findAll({
      where: {
        email: user.email,
        activo: true,
      },
      ...include,
      order: [['fecha_cita', 'ASC']],
    });

    res.status(200).send({
      CitasUsuario,
    });
  } catch (error) {
    return next(error);
  }
};

const getCitaById = async (req, res, next) => {
  const { idCita } = req.params;
  try {
    const cita = await Cita.findByPk(idCita, {
      include: [
        {
          model: Colegio,
        },
        {
          model: Grado,
        },
      ],
    });
    if (!cita) {
      return next({
        statusCode: 400,
        message: "El registro no existe.",
      });
    }
    res.status(200).send(cita);
  } catch (error) {
    return next(error);
  }
};

const createCita = async (req, res, next) => {
  const {
    celular,
    correo,
    date,
    time,
    modo,
    nombre,
    añoIngreso,
    grado,
    ColegioId,
  } = req.body;
  try {
    const fechaCita = moment(date, ["DD/MM/YYYY", "YYYY-MM-DD"]);
    const ifExists = await Cita.findOne({
      where: { email: correo, fecha_cita: fechaCita, ColegioId },
    });
    if (ifExists) {
      return next({
        statusCode: 400,
        message: "El email ya cuenta con una cita con este Colegio.",
      });
    }
    const gradoId = await Grado.findOne({ where: { nombre_grado: grado } });
    const newCita = await Cita.create({
      fecha_cita: fechaCita,
      hora_cita: time,
      modalidad: modo,
      nombre: nombre,
      email: correo,
      telefono: celular,
      añoIngreso,
      GradoId: gradoId.id,
      ColegioId,
    });
    const colegio = await Colegio.findByPk(ColegioId);
    mailer.sendMailSolicitudCita(newCita, colegio);
    res.status(200).json(newCita);
  } catch (error) {
    return next(error);
  }
};

const changeStatusCita = async (req, res, next) => {
  const { idCita } = req.params;
  const { estado } = req.body;
  try {
    const cita = await Cita.findByPk(idCita);
    if (!cita) {
      return next({
        statusCode: 400,
        message: "El registro no existe.",
      });
    }
    await Cita.update(
      {
        estado,
      },
      { where: { id: idCita } }
    );
    res.status(200).send('El estado de la cita se ha modificado.');
  } catch (error) {
    return next(error);
  }
};

const changeActivoCita = async (req, res, next) => {
  const { idCita } = req.params;
  const { activo } = req.body;
  try {
    const cita = await Cita.findByPk(idCita);
    if (!cita) {
      return next({
        statusCode: 400,
        message: "El registro no existe.",
      });
    }
    await Cita.update(
      {
        activo,
      },
      { where: { id: idCita } }
    );
    res.status(200).send("Se activo la Cita.");
  } catch (error) {
    return next(error);
  }
};

const deleteCita = async (req, res, next) => {
  const { idCita } = req.params;
  try {
    const cita = await Cita.findByPk(idCita);
    if (!cita) {
      return next({
        statusCode: 400,
        message: "El registro no existe.",
      });
    }
    await Cita.destroy({ where: { id: idCita } });
    res.status(200).send('Se eliminó la Cita.');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getCitas,
  getCitaById,
  createCita,
  changeStatusCita,
  changeActivoCita,
  deleteCita,
  getCitasUser,
};
