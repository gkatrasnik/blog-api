const Post = require("../models/post");

//get list of published posts
exports.list_GET = (req, res, next) => {
  Post.find()
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
  Post.findById(req.params.id)
    .populate("user")
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
  Post.findByIdAndDelete(req.params.id, (err, deletedPost) => {
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
    _id: req.params.id,
  });

  Post.findByIdAndUpdate(
    req.params.id,
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
