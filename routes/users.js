const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const passport = require("passport");

/* GET users listing. */

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  usersController.list_GET
);

router.post("/login", usersController.login_POST);

router.post("/register", usersController.register_POST);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  usersController.profile_GET
);

module.exports = router;
