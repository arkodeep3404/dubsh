const express = require("express");
const userRouter = require("./user");
const urlRouter = require("./url");

const router = express.Router();

router.use("/user", userRouter);
router.use("/account", urlRouter);

module.exports = router;
