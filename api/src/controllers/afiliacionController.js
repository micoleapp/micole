const { Afiliacion, Afiliacion_tipo } = require('../db');

const getAfiliacion = async (req, res, next) => {
  try {
    const Afiliaciones = await Afiliacion.findAll({
      include: {
        model: Afiliacion_tipo,
      }
    });
    res.status(200).send(Afiliaciones);
  } catch (error) {
    return next(error);
  }
};

const getAfiliacion_tipo = async (req, res, next) => {
  try {
    const Afiliaciones_tipos = await Afiliacion_tipo.findAll();
    res.status(200).send(Afiliaciones_tipos);
  } catch (error) {
    return next(error);
  }
};

const createAfiliacion = async (req, res, next) => {
  const { nombre_afiliacion, slug, logo, Afiliacion_tipo_Id } = req.body;
  try {
    const ifExists = await Afiliacion.findOne({
      where: { nombre_afiliacion: nombre_afiliacion },
    });
    if (ifExists) {
      return next({
        statusCode: 400,
        message: 'El registro ingresado ya existe.',
      });
    }
    const newAfiliacion = await Afiliacion.create({
      nombre_afiliacion,
      slug,
      logo,
      Afiliacion_tipo_Id,
    });
    res.status(200).json(newAfiliacion);
  } catch (error) {
    return next(error);
  }
};

const createAfiliacion_tipo = async (req, res, next) => {
  const { afiliacion_tipo } = req.body;
  try {
    const ifExists = await Afiliacion_tipo.findOne({
      where: { afiliacion_tipo: afiliacion_tipo },
    });
    if (ifExists) {
      return next({
        statusCode: 400,
        message: 'El registro ingresado ya existe.',
      });
    }
    const id = await Afiliacion_tipo.count();
    const newAfiliacion_tipo = await Afiliacion_tipo.create({
      id: id + 1,
      afiliacion_tipo,
    });
    res.status(200).json(newAfiliacion_tipo);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAfiliacion,
  createAfiliacion,
  getAfiliacion_tipo,
  createAfiliacion_tipo,
};
