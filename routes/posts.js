const express = require("express");
const router = express.Router({ mergeParams: true });
const postsController = require("../controllers/postsController");
const passport = require("passport");
var commentsRouter = require("./comments");

router.use("/:postId/comments", commentsRouter);

//Get lists of posts
router.get("/", postsController.posts_list_GET);

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
router.get("/:postId", postsController.post_GET);

//protected

// create new post
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postsController.post_POST
);

// delete post
router.delete(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  postsController.post_DELETE
);

// update post
router.put(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  postsController.post_PUT
);

module.exports = router;
