const express = require("express");
const router = express.Router({ mergeParams: true });
const commentsController = require("../controllers/commentsController");
const passport = require("passport");

router.get("/", commentsController.comment_list_GET);

// get post
router.get("/:commentId", commentsController.comment_GET);

//protected

// create new comment
router.post("/", commentsController.comment_POST);

// delete post
router.delete(
  "/:commentId",
  passport.authenticate("jwt", { session: false }),
  commentsController.comment_DELETE
);

module.exports = router;
