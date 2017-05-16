const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const todoModel = require('../model/todos.js');

const router = express.Router();

router.use(bodyParser.json());
router.use(accessController); // Allows cross-origin HTTP requests

// Accomplish a TodoItem
// Edit a TodoItem
router.put("/todos/:userID/:id", function(req, res, next) {
	const {userID, id} = req.params;
	const accomplish = req.query.accomplish;
	if (accomplish !== "1") next();
	else {
		todoModel.accomplish(id, userID).then(accID => {
			res.json(accID);
		}).catch(next);
	}
}, function(req, res, next) {
	const {userID, id} = req.params;
	const {title, content, deadline, importance} = req.body;
	if (!title || !content || !deadline || !importance) {
		const err = new Error("Wrong arguments of PUT to /todos/id");
		err.status = 400;
		throw err;
	} else {
		todoModel.update(id, title, content, deadline, importance, userID).then(todo => {
			res.json(todo);
		}).catch(next);
	}
});

// Create a TodoItem
router.post("/todos/:userID", function(req, res, next) {
	const {title, content, deadline, importance} = req.body;
	const {userID} = req.params;
	if (!title || !content || !deadline || !importance) {
		const err = new Error("Missing body of POST to /todos");
		err.status = 400;
		throw err;
	} else {
		todoModel.create(title, content, deadline, importance, userID).then(todo => {
			res.json(todo);
		}).catch(next);
	}
});

// Delete a TodoItem
router.delete("/todos/:userID/:id", function(req, res, next) {
	const {userID, id} = req.params;
	todoModel.del(id, userID).then(delID => {
		res.json(delID);
	}).catch(next);
});

// List a TodoItem
router.get("/todos/:userID/:id", function(req, res, next) {
	const {userID, id} = req.params;
	todoModel.listSingle(id, userID).then(todo => {
		res.json(todo);
	}).catch(next);
});

// List TodoItems
router.get("/todos/:userID", function(req, res, next) {
	const {searchText, unaccomplishedOnly, start} = req.query;
	const {userID} = req.params;
	todoModel.list10(searchText, unaccomplishedOnly, start, userID).then(todo => {
		res.json(todo);
	}).catch(next);
});

module.exports = router;
