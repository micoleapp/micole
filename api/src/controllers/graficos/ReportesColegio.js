const { Colegio, Cita } = require('../../db');
const { Sequelize } = require('sequelize');

const reportesPanelAdmin = async (req, res, next) => {
  try {
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto",
      "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    // Acumulado colegios por mes
    const dataColegios = await Colegio.findAll({
      attributes: [
        [Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('createdAt')), 'month'],
        [Sequelize.fn('COUNT', '*'), 'count'],
      ],
      group: 'month',
      order: Sequelize.literal("date_trunc('month', \"createdAt\") ASC")
    });

    const dataCitas = await Cita.findAll({
      attributes: [
        [Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('fecha_cita')), 'month'],
        [Sequelize.fn('COUNT', '*'), 'count'],
      ],
      group: 'month',
      order: Sequelize.literal("date_trunc('month', \"fecha_cita\") ASC")
    });

    const colegiosPorMes = dataColegios.map(item => {
      const date = new Date(item.dataValues.month);
      const monthName = meses[date.getUTCMonth()];
      return {
        mes: monthName,
        total: item.dataValues.count
      };
    });

    const citasPorMes = dataCitas.map(item => {
      const date = new Date(item.dataValues.month);
      const monthName = meses[date.getUTCMonth()];
      return {
        mes: monthName,
        total: item.dataValues.count
      };
    });

    res.status(200).send({acumuladoMesColegios: colegiosPorMes, acumuladoMesCitas: citasPorMes});
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  reportesPanelAdmin,
};
