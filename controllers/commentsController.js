const Comment = require("../models/comment");
const Post = require("../models/post");

//get list of published posts
exports.comment_list_GET = (req, res, next) => {
  postid = req.params.postId;
  Comment.find({ id: postid })
    .sort([["timestamp", "ascending"]])
    .exec(function (err, list_comments) {
      if (err) {
        return next(err);
      }
      //Successful, so send
      res.status(200).json(list_comments);
    });
};

//post new comment
exports.comment_POST = (req, res, next) => {
  const postid = req.params.postId;
  const { author, content } = req.body;

  const newComment = new Comment({
    author: author,
    content: content,
    postId: postid,
    timestamp: Date.now(),
  });

  newComment
    .save()
    .then((comment) => {
      Post.findByIdAndUpdate(
        postid,
        { $push: { comments: comment._id } },
        (err, post) => {
          if (err) {
            return res.status(500).json({ success: false, msg: err.message });
          }
          res.status(200).json({ success: true, comment });
        }
      );
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: err.message });
    });
};

// get post
exports.comment_GET = (req, res, next) => {
  Comment.findById(req.params.commentId).exec(function (err, comment) {
    if (err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
    if (comment == null) {
      const err = new Error("Not found");
      return res.status(404).json({ success: false, msg: err.message });
    }
    return res.status(200).json({ success: true, comment: comment });
  });
};

//delete post
exports.comment_DELETE = (req, res) => {
  const postid = req.params.postId;

  Post.findByIdAndUpdate(
    postid,
    { $pull: { comments: req.params.commentId } },
    (err, comment) => {
      if (err) {
        return res.status(500).json({ success: false, msg: err.message });
      }
      return;
    }
  );
  Comment.findByIdAndDelete(req.params.commentId, (err, deletedComment) => {
    if (err) {
      return res.status(409).json({ success: false, msg: err.message });
    } else {
      res.status(200).json({
        success: true,
        msg: "Comment deleted",
        comment: deletedComment,
      });
    }
  });
};
