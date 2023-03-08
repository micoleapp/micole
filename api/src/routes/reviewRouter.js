const { Router } = require("express");
const reviewRouter = Router();

const { getReviews, createReview, deleteReviewById } = require("../controllers/reviewController");

reviewRouter.get("/", getReviews);
reviewRouter.post("/", createReview);
reviewRouter.delete("/:idReview", deleteReviewById);

module.exports = reviewRouter;