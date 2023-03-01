const { Vacante, Grado, Colegio } = require('../db');

const getVacantes = async (req, res, next) => {
  try {
    const totalVacantes = await Vacante.count();
    if (totalVacantes === 0) {
      return next({
        statusCode: 404,
        message: 'No hay registros en la DB',
      });
    }
    const vacantes = await Vacante.findAll({
      include: [
        {
          model: Colegio,
          attributes: ['nombre_colegio'],
        },
        {
          model: Grado,
          attributes: ['nombre_grado'],
        },
      ],
    });
    res.status(200).send(vacantes);
  } catch (error) {
    return next(error);
  }
};

const createVacante = async (req, res, next) => {
  const {
    alumnos_matriculados,
    cuota_pension,
    cuota_ingreso,
    matricula,
    capacidad,
    GradoId,
    año
  } = req.body;
  try {
    const authColegio = await Colegio.findOne({ where: { idAuth: req.user.id } });
    if (!authColegio) {
      return next({
        statusCode: 400,
        message: 'Debes tener permisos de Colegio para crear Vacantes.',
      });
    }
    const vacanteExists = await Vacante.findOne({
      where: { ColegioId: authColegio.id, GradoId },
    });
    if (vacanteExists) {
      return next({
        statusCode: 400,
        message: 'El registro de vacante para el grado ya existe',
      });
    }
    const newVacante = await Vacante.create({  
      alumnos_matriculados,
      cuota_pension,
      cuota_ingreso, 
      matricula,
      capacidad,
      ColegioId: authColegio.id,
      GradoId,
      año
    });
    res.status(200).json(newVacante);
  } catch (error) {
    return next(error);
  }
};

const getVacanteById = async (req, res, next) => {
  const { idVacante } = req.params;
  try {
    const vacante = await Vacante.findByPk(idVacante, {
      include: [
        {
          model: Colegio,
          attributes: ['nombre_colegio'],
        },
        {
          model: Grado,
          attributes: ['nombre_grado'],
        },
      ],
    });
    if (!vacante) {
      return next({
        statusCode: 404,
        message: 'La Vacante solicitada no existe',
      });
    }
    res.status(200).send(vacante);
  } catch (error) {
    return next(error);
  }
};

const deleteVacanteById = async (req, res, next) => {
  const { idVacante } = req.params;
  try {
    const vacante = await Vacante.findByPk(idVacante);
    if (!vacante) {
      return next({
        statusCode: 404,
        message: 'El registro ha eliminar no existe',
      });
    }
    await Vacante.destroy({ where: { id: idVacante } });
    res.status(200).send('El registro ha sido eliminado con éxito');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getVacantes,
  createVacante,
  getVacanteById,
  deleteVacanteById,
};
