const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const todoModel = require('../model/todos.js');

const router = express.Router();

router.use(bodyParser.json());
router.use(accessController); // Allows cross-origin HTTP requests

// Accomplish a TodoItem
// Edit a TodoItem
router.put("/todos/:id", function(req, res, next) {
	const id = req.params.id;
	const accomplish = req.query.accomplish;
	if (accomplish !== "1") next();
	else {
		todoModel.accomplish(id).then(accID => {
			res.json(accID);
		}).catch(next);
	}
}, function(req, res, next) {
	const id = req.params.id;
	const {title, content, deadline, importance, starID} = req.body;
	if (!title || !content || !deadline || !importance || !starID) {
		const err = new Error("Wrong arguments of PUT to /todos/id");
		err.status = 400;
		throw err;
	} else {
		todoModel.update(id, title, content, deadline, importance, starID).then(todo => {
			res.json(todo);
		}).catch(next);
	}
});

// Create a TodoItem
router.post("/todos", function(req, res, next) => {
	const {title, content, deadline, importance, starID} = req.body;
	if (!title || !content || !deadline || !importance || !starID) {
		const err = new Error("Missing body of POST to /todos");
		err.status = 400;
		throw err;
	} else {
		todoModel.create(title, content, deadline, importance, starID).then(todo => {
			res.json(todo);
		}).catch(next);
	}
});

// Delete a TodoItem
router.delete("/todos/:id", function(req, res, next) {
	const id = req.params.id;
	todoModel.delete(id).then(delID => {
		res.json(delID);
	}).catch(next);
});

// List a TodoItem
router.get("/todos/:id", function(req, res, next) {
	const id = req.params.id;
	todoModel.listSingle(id).then(todo => {
		res.json(todo);
	}).catch(next);
});

// List TodoItems
router.get("/todos", function(req, res, next) {
	const {searchText, unaccomplishedOnly, start} = req.query;
	todoModel.list10(searchText, unaccomplishedOnly, start).then(todo => {
		res.json(todo);
	}).catch(next);
});

module.exports = router;
