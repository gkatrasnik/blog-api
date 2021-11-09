const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");

/* GET users listing. */

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// JWT token test route
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  userController.protected_GET
);

router.post("/login", userController.login_POST);

router.post("/register", userController.register_POST);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  userController.profile_GET
);

module.exports = router;
