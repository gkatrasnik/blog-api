const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const passport = require("passport");

//Get lists of posts
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  postsController.list_GET
);

router.get(
  "/published",
  passport.authenticate("jwt", { session: false }),
  postsController.list_published_GET
);

router.get(
  "/unpublished",
  passport.authenticate("jwt", { session: false }),
  postsController.list_unpublished_GET
);

module.exports = router;
