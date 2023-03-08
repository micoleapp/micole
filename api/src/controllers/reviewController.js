const { Review, Colegio } = require('../db');

const getReviews = async (req, res, next) => {
  const tokenUser = req.user;
  try {
    const authColegio = await Colegio.findOne({
      where: { idAuth: tokenUser.id },
    });
    const reviews = await Review.findAll({
      where: { ColegioId: authColegio.id },
    });
    res.status(200).send(reviews);
  } catch (error) {
    return next(error);
  }
};

const createReview = async (req, res, next) => {
  const { nombre, email, comentario, rating, ColegioId } = req.body;
  try {
    const colegio = await Colegio.findByPk(ColegioId);
    const reviews = await Review.findAll({ where: { ColegioId } });
    const newReview = await Review.create({
      nombre,
      email,
      comentario,
      rating,
      ColegioId,
    });
    let totalRating = rating;
    for (let i = 0; i < reviews.length; i++) {
      console.log(reviews[i]);
      totalRating += reviews[i].rating;
    }
    colegio.rating = (totalRating / (reviews.length + 1)).toFixed(1);
    await colegio.save();
    res.status(200).send(newReview);
  } catch (error) {
    return next(error);
  }
};

const deleteReviewById = async (req, res, next) => {
  const { idReview } = req.params;
  try {
    const review = await Review.findByPk(idReview);
    if (!review) {
      return next({
        statusCode: 404,
        message: 'El registro ha eliminar no existe',
      });
    }
    await Review.destroy({ where: { id: idReview } });
    res.status(200).send('El registro ha sido eliminado con éxito');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getReviews,
  createReview,
  deleteReviewById
};
