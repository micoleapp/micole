const { Disponibilidad } = require('../db');

const getDisponibilidad = async (req, res, next) => {
  const { idColegio } = req.params;
  try {
    const Disponibilidades = await Disponibilidad.findAll({
      where: { ColegioId: idColegio },
    });
    res.status(200).send(Disponibilidades);
  } catch (error) {
    return next(error);
  }
};

const createDisponibilidad = async (req, res, next) => {
  const { horarios, ColegioId } = req.body;
  try {
    const ifExists = await Disponibilidad.findOne({
      where: { ColegioId: ColegioId },
    });
    if (ifExists) {
      return next({
        statusCode: 400,
        message: 'El registro de horarios ya existe para este usuario.',
      });
    }

    const newDisponibilidad = await Disponibilidad.create({
      Lunes: horarios.Lunes,
      Martes: horarios.Martes,
      Miercoles: horarios.Miercoles,
      Jueves: horarios.Jueves,
      Viernes: horarios.Viernes,
      Sabado: horarios.Sabado,
      ColegioId,
    });
    res.status(200).json(newDisponibilidad);
  } catch (error) {
    return next(error);
  }
};

const updateDisponibilidad = async (req, res, next) => {
  const { horarios } = req.body;
  const { idColegio } = req.params;
  try {
    const disponibilidad = await Disponibilidad.findOne({
      where: { ColegioId: idColegio },
    });
    if (!disponibilidad) {
      return next({
        statusCode: 404,
        message: 'No se ha encontrado registro de disponibilidad.',
      });
    }
    await disponibilidad.update({
      Lunes: horarios.Lunes,
      Martes: horarios.Martes,
      Miercoles: horarios.Miercoles,
      Jueves: horarios.Jueves,
      Viernes: horarios.Viernes,
      Sabado: horarios.Sabado,
    });
    res.status(200).json(disponibilidad);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getDisponibilidad,
  createDisponibilidad,
  updateDisponibilidad,
};
