const { Router } = require("express");

const {login} = require("./auth");
const menu = require("./menu");
const createuser = require("./user");
const changepassword = require("./changepswrd");

const router = Router();

router.use("/login", login);
router.use("/menu", menu);
router.use("/createuser", createuser);
router.use("/change-password", changepassword);

module.exports = router;