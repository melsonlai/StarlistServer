const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const starModel = require('../model/stars.js');

const router = express.Router();

router.use(bodyParser.json());
router.use(accessController); // Allows cross-origin HTTP requests

// Get User Stars
router.get("/stars/:userID", function(req, res, next) {
	const {userID} = req.params;
	starModel.listUserStars(userID).then(stars => {
		res.json(stars);
	}).catch(next);
});

module.exports = router;
