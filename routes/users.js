const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");

/* GET users listing. */

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// JWT token test route
router.get("/protected", (req, res) => {
  res.status(200).json({
    success: true,
    msg: "You accessed protected route with JWT token successfully! ",
  });
});

router.post("/login", userController.login_POST);

router.post("/register", userController.register_POST);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  userController.profile_GET
);

module.exports = router;
