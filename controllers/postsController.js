const Post = require("../models/post");
const Comment = require("../models/comment");

//get list of published posts
exports.posts_list_GET = (req, res, next) => {
  Post.find()
    .populate("comments")
    .populate("user")
    .sort([["timestamp", "ascending"]])
    .exec(function (err, list_posts) {
      if (err) {
        return next(err);
      }
      //Successful, so send
      res.status(200).json(list_posts);
    });
};

//get list of published posts
exports.list_published_GET = (req, res, next) => {
  Post.find({ published: true })
    .sort([["timestamp", "ascending"]])
    .exec(function (err, list_posts) {
      if (err) {
        return next(err);
      }
      //Successful, so send
      res.status(200).json(list_posts);
    });
};

//get list of unpublished posts
exports.list_unpublished_GET = (req, res, next) => {
  Post.find({ published: false })
    .sort([["timestamp", "ascending"]])
    .exec(function (err, list_posts) {
      if (err) {
        return next(err);
      }
      //Successful, so send
      res.status(200).json(list_posts);
    });
};

//post new post
exports.post_POST = (req, res, next) => {
  const { userId, title, content } = req.body;
  const newPost = new Post({
    title: title,
    user: userId,
    content: content,
    comments: [],
    timestamp: Date.now(),
    published: true,
  });

  newPost
    .save()
    .then((post) => {
      res.status(200).json({ success: true, post });
    })
    .catch((err) => {
      return next(err);
    });
};

// get post
exports.post_GET = (req, res, next) => {
  Post.findById(req.params.postId)
    .populate("user")
    .populate("comments")
    .exec(function (err, post) {
      if (err) {
        return res.status(500).json({ success: false, msg: err.message });
      }
      if (post == null) {
        const err = new Error("Not found");
        return res.status(404).json({ success: false, msg: err.message });
      }
      return res.status(200).json({ success: true, post: post });
    });
};

//delete post
exports.post_DELETE = (req, res) => {
  Post.findByIdAndDelete(req.params.postId, (err, deletedPost) => {
    if (err) {
      return res.status(409).json({ success: false, msg: err.message });
    } else {
      res.status(200).json({
        success: true,
        msg: "Post deleted",
        post: deletedPost,
      });
    }
  });

  //deletes all comments on this post too
  Comment.deleteMany({ postId: req.params.postId })
    .then(function () {
      console.log("Data deleted"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
};

//update post
exports.post_PUT = (req, res) => {
  const { userId, title, content, published } = req.body;
  const updatedPost = new Post({
    title: title,
    user: userId,
    content: content,
    comments: [],
    timestamp: Date.now(),
    published: published,
    _id: req.params.postId,
  });

  Post.findByIdAndUpdate(
    req.params.postId,
    updatedPost,
    function (err, updatedpost) {
      if (err) {
        return res.status(400).json({ success: false, msg: err.message });
      }
      updatedpost.populate("user", (err, post) => {
        if (err) return next(err);

        return res.status(200).json({
          success: true,
          msg: "Successfuly updated post",
          post: post,
        });
      });
    }
  );
};
