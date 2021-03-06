const express = require('express');
const Action = require('./actions-model');
const router = express.Router();
const { 
    checkActionId,
    validateAction,
    serverError 
} = require('../Middleware/middleware.js');

router.get('/', async (req, res, next) => {
    try {
        const actions = await Action.get();
        res.status(200).json(actions);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', checkActionId, (req, res) => {
    res.status(200).json(req.action);
});


router.post('/', validateAction, async (req, res, next) => {
    console.log(req.body);
    try {
        const newAction = await Action.insert(req.body);
        res.status(201).json(newAction);
    } catch (err) {
        next(err);
    }
});


router.put('/:id', validateAction, checkActionId, async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    try {
        await Action.update(id, body);
        const updatedAction = await Action.get(id);
        res.status(201).json(updatedAction);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', checkActionId, async (req, res, next) => {
    const id = req.params.id;
    try {
        await Action.remove(id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

router.use(serverError);

module.exports = router;  