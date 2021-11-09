const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const passport = require("passport");

//Get lists of posts
router.get("/", postsController.list_GET);

// protected
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

// get post
router.get("/:id", postsController.post_GET);

//protected

// create new post
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postsController.post_POST
);

// delete post
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postsController.post_DELETE
);

// update post
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postsController.post_PUT
);
module.exports = router;
