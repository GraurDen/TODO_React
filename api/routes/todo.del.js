const Router = require('express');
const { param } = require('express-validator');
const { todos } = require('../models/index');
const { handleErrors } = require('../helpers');
const todoDelRouter = new Router();
const authMiddleWare = require('../authMiddleWare');

todoDelRouter.delete(
    '/todo/:id',
    param('id').notEmpty().withMessage('Parametr "id" must be not empty'),
    handleErrors,
    authMiddleWare,
    async (req, res) => {
        try {
            await todos.destroy({
                where: {
                    id: req.params.id,
                },
            });
            res.sendStatus(200);
        } catch (error) {
            res.send({ message: error.message });
        }
    }
);

module.exports = todoDelRouter;
