const { Vacante, Grado, Colegio } = require('../db');

const getVacantes = async (req, res, next) => {
  try {
    const total = await Vacante.count();
    if (total === 0) {
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

const getVacantesColegio = async (req, res, next) => {
  const { idColegio } = req.params;
  try {
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
      where: {
        ColegioId: idColegio,
      },
    });

    res.status(200).send(vacantes);
  } catch (error) {
    return next(error);
  }
};

const createVacante = async (req, res, next) => {
  const { data } = req.body;
  const tokenUser = req.user;
  // data -> idColegio
  try {
    let colegio;
    if (tokenUser.rol === 'Admin') {
      colegio = await Colegio.findByPk(data.idColegio);

      if (!colegio) {
        return next({
          statusCode: 404,
          message: 'No se encontró el colegio especificado',
        });
      }
    } else {
      colegio = await Colegio.findOne({
        where: { idAuth: tokenUser.id },
      });
    }

    const year = data.year;
    delete data.year;

    const entries = Object.entries(data);

    for (const [gradeId, values] of entries) {
      const vacancy = await Vacante.findOne({
        where: {
          ColegioId: colegio.id,
          GradoId: gradeId,
          year: year,
        },
      });

      if (vacancy) {
        await vacancy.update({
          alumnos_matriculados: values.students,
          matricula: values.enrollmentFee,
          cuota_pension: values.tuitionFee,
          cuota_ingreso: values.admissionFee,
          capacidad: values.capacity,
          year: year,
        });
      } else {
        await Vacante.create({
          alumnos_matriculados: values.students,
          matricula: values.enrollmentFee,
          cuota_pension: values.tuitionFee,
          cuota_ingreso: values.admissionFee,
          capacidad: values.capacity,
          year: year,
          ColegioId: colegio.id,
          GradoId: gradeId,
        });
      }
    }
    res
      .status(200)
      .send({ message: 'Los registros se guardaron correctamente' });
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
  getVacantesColegio
};
