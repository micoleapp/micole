const { Cita, Colegio, Grado, Plan_Pago } = require('../db');
const { Op } = require('sequelize');

const getCitas = async (req, res, next) => {
  const tokenUser = req.user;
  try {
    const user = await Colegio.findOne({ where: { idAuth: tokenUser.id } });
    if (!user) {
      return next({
        statusCode: 400,
        message: 'El usuario no es un Colegio',
      });
    }
    const include = { include: [{ model: Grado }] };
    const plan_pago = await Plan_Pago.findOne({
      where: { id: user.PlanPagoId },
    });
    const Citas = await Cita.findAll({
      ...include,
    });
    const CitasActivas = await Cita.findAll({
      where: { ColegioId: user.id, activo: true },
      ...include,
    });
    const CitasInactivas = await Cita.findAll({
      where: { ColegioId: user.id, activo: false },
      ...include,
      limit: plan_pago.cantidad_familias,
    });
    const fecha_actual = new Date();
    const mes_actual = fecha_actual.getMonth() + 1;
    console.log(mes_actual, fecha_actual.getFullYear());
    console.log(new Date(fecha_actual.getFullYear(), mes_actual - 1, 1));
    console.log(new Date(fecha_actual.getFullYear(), mes_actual, 0));
    console.log(new Date(Citas[0].fecha_cita));
    var elementos_fecha = Citas[0].fecha_cita.split('/');
    var anio = elementos_fecha[2];
    var mes = elementos_fecha[1] - 1;
    var dia = elementos_fecha[0];
    var fecha = new Date(anio, mes, dia);
    console.log(fecha);
    /*  const CitasInactivasMesActual = await Cita.findAll({
      where: {
        ColegioId: tokenUser.id,
        activo: false,
        fecha_cita: {
          [Op.and]: [
            { [Op.gte]: new Date(fecha_actual.getFullYear(), mes_actual - 1, 1) },
            { [Op.lte]: new Date(fecha_actual.getFullYear(), mes_actual, 0) },
          ],
        },
      },
      ...include,
    }); */
    res.status(200).send({ Citas, CitasActivas, CitasInactivas });
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
        message: 'El registro no existe.',
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
    const ifExists = await Cita.findOne({
      where: { email: correo, fecha_cita: date, ColegioId },
    });
    if (ifExists) {
      return next({
        statusCode: 400,
        message: 'El email ya cuenta con una cita con este Colegio.',
      });
    }
    const gradoId = await Grado.findOne({ where: { nombre_grado: grado } });
    var fechaSinFormateo = date.split('/');
    var anio = fechaSinFormateo[2];
    var mes = fechaSinFormateo[1] - 1;
    var dia = fechaSinFormateo[0];
    var fechaFormateada = new Date(anio, mes, dia);
    const newCita = await Cita.create({
      fecha_cita: fechaFormateada,
      hora_cita: time,
      modalidad: modo,
      nombre: nombre,
      email: correo,
      telefono: celular,
      añoIngreso,
      GradoId: gradoId.id,
      ColegioId,
    });

    res.status(200).json(newCita);
  } catch (error) {
    console.log(error);
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
        message: 'El registro no existe.',
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
        message: 'El registro no existe.',
      });
    }
    await Cita.update(
      {
        activo,
      },
      { where: { id: idCita } }
    );
    res.status(200).send('Se activo la Cita.');
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
        message: 'El registro no existe.',
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
};
