const Router = require('express');
const { param } = require('express-validator');
const { handleErrors } = require('../helpers');
const todoLangRouter = new Router();

todoLangRouter.get(
    '/lang',
    param('lng').notEmpty().withMessage('Parametr "lng" must be not empty'),
    //handleErrors,
    async (req, res) => {
        try {
            const response = await req.t('language');
            res.status(200);
            res.send(response);
        } catch (error) {
            res.send({ message: error });
        }
    }
);

module.exports = todoLangRouter;
