const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const userModel = require('../model/users.js');

const router = express.Router();

router.use(bodyParser.json());
router.use(accessController); // Allows cross-origin HTTP requests

// Request New User
router.post("/users", function(req, res, next) {
	userModel.newUser().then(id => {
		res.json(id);
	}).catch(next);
});

module.exports = router;
