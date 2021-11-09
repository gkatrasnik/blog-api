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
      res.json(list_posts);
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
      res.json(list_posts);
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
      res.json(list_posts);
    });
};
