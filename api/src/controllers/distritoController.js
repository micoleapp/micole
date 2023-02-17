const { Distrito } = require('../db');

const getDistritos = async (req, res, next) => {
  try {
    const distritos = await Distrito.findAll();
    res.status(200).send(distritos);
  } catch (error) {
    return next(error);
  }
};

const getDistritobyId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const distrito = await Distrito.findByPk(id);
    if (!distrito) {
      return next({
        statusCode: 404,
        message: 'El distrito solicitado no existe',
      });
    }
    res.status(200).send(distrito);
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  getDistritos,
  getDistritobyId,
};
