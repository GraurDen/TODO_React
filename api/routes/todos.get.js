const Router = require("express");
const { todos } = require("../models/index");
const { query } = require("express-validator");
const { handleErrors, verifyToken } = require("../helpers");
const todoGetRouter = new Router();
const authMiddleWare = require("../authMiddleWare");

todoGetRouter.get(
    "/todos",
    query("orderBy")
        .isIn(["asc", "desc"])
        .withMessage(' Query "orderBy" must be "ascending" or "descending" '),
    query("sortBy")
        .isIn(["", "done", "undone"])
        .withMessage(' Query "filterBy" must be "all","done","undone" '),
    query("pp").isInt().withMessage(' query "pp" must be an integer '),
    query("page")
        .isInt()
        .custom((value) => value >= 1)
        .withMessage(' query "page" must be equal or greate then 0 '),
    handleErrors,
    authMiddleWare,
    async (req, res) => {
        // Get 'user id' from request headers
        const getUserId = (req) => {
            const headers = req.headers.authorization;
            const token = headers.split(" ")[1];
            const { id } = verifyToken(token);
            return id;
        };

        const user_id = getUserId(req);

        try {
            let sortBy;
            if (req.query.sortBy === "done") {
                sortBy = true;
            }
            if (req.query.sortBy === "undone") {
                sortBy = false;
            }

            const pp = req.query.pp || 5;
            const orderBy = req.query.orderBy || "desc";
            const page = req.query.page || 1;

            const getAll = await todos.findAndCountAll({
                where:
                    sortBy === undefined
                        ? { user_id }
                        : { done: sortBy, user_id },
                order: [["createdAt", orderBy]],
                offset: pp * (page - 1),
                limit: pp,
            });

            res.send(getAll);
            //
        } catch (error) {
            res.send({ message: error });
        }
    }
);

module.exports = todoGetRouter;
