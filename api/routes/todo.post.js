const Router = require("express");
const { body } = require("express-validator");
const { todos } = require("../models/index");
const { handleErrors, verifyToken } = require("../helpers");
const todoPostRouter = new Router();
const authMiddleWare = require("../authMiddleWare");

todoPostRouter.post(
    "/todo",
    body("name")
        .isLength({ min: 2 })
        .withMessage("Task name must be at least 4 chars long"),
    body("done").exists(),
    handleErrors,
    authMiddleWare,
    async (req, res) => {
        const { name, done } = req.body;

        // Get 'user id' from request headers
        const getUserId = (req) => {
            const headers = req.headers.authorization;
            const token = headers.split(" ")[1];
            const { id } = verifyToken(token);
            return id;
        };

        const user_id = getUserId(req);

        try {
            const nameExisting = await todos.findOne({
                where: { name },
            });

            if (nameExisting) {
                return res.status(400).send({
                    message: `Task ${name} already exists`,
                });
            }

            const todoCreate = await todos.create({ name, done, user_id });

            res.send(todoCreate);
        } catch (error) {
            res.send({ message: error.message });
        }
    }
);

module.exports = todoPostRouter;
