const { Evento, Colegio } = require('../db');
const moment = require('moment');

const getEventosColegio = async (req, res, next) => {
  const tokenUser = req.user;
  try {
    const user = await Colegio.findOne({ where: { idAuth: tokenUser.id } });
    if (!user) {
      return next({
        statusCode: 400,
        message: 'El usuario no tiene permisos para crear un evento.',
      });
    }
    const eventos = await Evento.findAll({
      where: {
        ColegioId: user.id,
      },
    });

    res.status(200).send(eventos);
  } catch (error) {
    return next(error);
  }
};

const getEventoById = async (req, res, next) => {
  const { idEvento } = req.params;
  try {
    const evento = await Evento.findByPk(idEvento, {
      include: [
        {
          model: Colegio,
        },
      ],
    });
    if (!evento) {
      return next({
        statusCode: 400,
        message: 'El registro no existe.',
      });
    }
    res.status(200).send(evento);
  } catch (error) {
    return next(error);
  }
};

const createEvento = async (req, res, next) => {
  const {
    nombreEvento,
    descripcionEvento,
    fechaEvento,
    horaEvento,
    tipoEvento,
    capacidadEvento,
    image,
    idColegio,
  } = req.body;
  try {
    const fechaEventoF = moment(fechaEvento, ['DD/MM/YYYY', 'YYYY-MM-DD']);
    const newEvento = await Evento.create({
      fecha_evento: fechaEventoF,
      descripcion: descripcionEvento,
      hora_evento: horaEvento,
      nombre_evento: nombreEvento,
      tipo_evento: tipoEvento,
      capacidad: capacidadEvento,
      imagen_evento: image,
      ColegioId: idColegio,
    });
    res.status(200).json(newEvento);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const updateEvento = async (req, res, next) => {
  const { idEvento } = req.params;
  const {
    nombreEvento,
    descripcionEvento,
    fechaEvento,
    horaEvento,
    tipoEvento,
    capacidadEvento,
    image,
  } = req.body;
  const updateEvento = {
    nombre_evento: nombreEvento ? nombreEvento : undefined,
    descripcion: descripcionEvento ? descripcionEvento : undefined,
    fecha_evento: fechaEvento
      ? moment(fechaEvento, ['DD/MM/YYYY', 'YYYY-MM-DD'])
      : undefined,
    hora_evento: horaEvento ? horaEvento : undefined,
    tipo_evento: tipoEvento ? tipoEvento : undefined,
    capacidad: capacidadEvento ? capacidadEvento : undefined,
    imagen_evento: image ? image : undefined,
  };

  try {
    const evento = await Evento.findByPk(idEvento);
    if (!evento) {
      return next({
        statusCode: 400,
        message: 'El registro no existe.',
      });
    }
    await Evento.update(updateEvento, { where: { id: idEvento } });
    res.status(200).send('El evento se ha modificado.');
  } catch (error) {
    return next(error);
  }
};

const deleteEvento = async (req, res, next) => {
  const { idEvento } = req.params;
  try {
    const evento = await Evento.findByPk(idEvento);
    if (!evento) {
      return next({
        statusCode: 400,
        message: 'El registro no existe.',
      });
    }
    await Evento.destroy({ where: { id: idEvento } });
    res.status(200).send('Se eliminó el evento.');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getEventosColegio,
  getEventoById,
  createEvento,
  deleteEvento,
  updateEvento,
};
