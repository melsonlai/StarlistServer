const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const todoModel = require('../model/todos.js');

const router = express.Router();

router.use(bodyParser.json());
router.use(accessController); // Allows cross-origin HTTP requests

// Accomplish a TodoItem
router.post("/todos/:id", function(req, res, next) {
	const id = req.params.id;
	const accomplish = req.query.accomplish;
	if (accomplish !== "1") next();
	else {
		todoModel.accomplish(id).then(accID => {
			res.json(accID);
		}).catch(next);
	}
});

// Create a TodoItem
router.post("/todos", function(req, res, next) => {
	const {title, content, deadline, importance, starID} = req.body;
	if (!title || !content || !deadline || !importance || !starID) next();
	else {
		todoModel.create(title, content, deadline, importance, starID).then(todo => {
			res.json(todo);
		}).catch(next);
	}
});

// Edit a TodoItem
router.post("/todos/:id", function(req, res, next) {
	const id = req.params.id;
	const {title, content, deadline, importance, starID} = req.body;
	if (!title || !content || !deadline || !importance || !starID) next();
	else {
		todoModel.update(id, title, content, deadline, importance, starID).then(todo => {
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

// List
router.get('/posts', function(req, res, next) {
    const {searchText, start} = req.query;
    postModel.list(searchText, start).then(posts => {
        res.json(posts);
    }).catch(next);
});

// Create
router.post('/posts', function(req, res, next) {
    const {mood, text} = req.body;
    if (!mood || !text) {
        const err = new Error('Mood and text are required');
        err.status = 400;
        throw err;
    }
    postModel.create(mood, text).then(post => {
        res.json(post);
    }).catch(next);
});

// Vote
router.post('/posts/:id/:mood(clear|clouds|drizzle|rain|thunder|snow|windy)Votes', function(req, res, next) {
    const {id, mood} = req.params;
    if (!id || !mood) {
        const err = new Error('Post ID and mood are required');
        err.status = 400;
        throw err;
    }
    voteModel.create(id, mood).then(post => {
        res.json(post);
    }).catch(next);
});

module.exports = router;
