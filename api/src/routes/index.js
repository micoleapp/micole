const { Router } = require("express");

const router = Router();

router.use("/", (req, res) => {
  res.send("MI COLE API");
});

module.exports = router;