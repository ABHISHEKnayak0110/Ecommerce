const express = require("express");
const router = express.Router();
const {checkOut} = require("../controllers/checkoutController")
router.route(`/`).post(checkOut);
module.exports = router