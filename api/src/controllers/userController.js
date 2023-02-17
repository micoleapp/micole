const { User, Auth } = require('../db');
const getPagination = require('../utils/getPagination');

const getUsers = async (req, res, next) => {
  try {
    const url = `${req.protocol}://${req.get('host')}${req.path}`;
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const skip = (page - 1) * limit;
    const totalUsers = await User.count();
    if (totalUsers === 0) {
      return next({
        statusCode: 404,
        message: 'No hay usuarios en la DB',
      });
    }
    const pagination = getPagination(url, page, limit, totalUsers);
    const users = await User.findAll({
      include: {
        model: Auth,
        attributes: ['email', 'rol'],
      },
      limit: limit,
      offset: skip,
    });
    res.status(200).send({
      count: totalUsers,
      pages: Math.ceil(totalUsers / limit),
      prev: pagination.prev,
      next: pagination.next,
      first: pagination.first,
      last: pagination.last,
      users,
    });
  } catch (error) {
    return next(error);
  }
};

const getUserbyId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      include: {
        model: Auth,
        attributes: ['email', 'rol'],
      },
    });
    if (!user) {
      return next({
        statusCode: 404,
        message: 'El usuario solicitado no existe',
      });
    }
    res.status(200).send(user);
  } catch (error) {
    return next(error);
  }
};

const deleteUserbyId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return next({
        statusCode: 404,
        message: 'El usuario ha eliminar no existe',
      });
    }
    const idAuth = user.idAuth;
    await User.destroy({ where: { id } });
    await Auth.destroy({ where: { id: idAuth } });
    res.status(200).send('El usuario ha sido eliminado con éxito');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getUsers,
  getUserbyId,
  deleteUserbyId,
};
