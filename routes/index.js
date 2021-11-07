var express = require("express");
var router = express.Router();
var postController = require("../controllers/postController");

/* GET home page. */
router.get("/", postController.index);

module.exports = router;
