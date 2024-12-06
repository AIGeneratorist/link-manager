import {Router} from "express";
import {Links} from "./db.js";

const apiRouter = Router();

apiRouter.get("/links", async (req, res) => {
	const links = await Links.findAll();
	res.json(links);
});
apiRouter.post("/links", async (req, res) => {
	const link = await Links.create(req.body);
	res.json(link);
});
apiRouter.get("/links/:id", async (req, res) => {
	const link = await Links.findByPk(req.params.id);
	res.json(link);
});
apiRouter.put("/links/:id", async (req, res) => {
	const link = await Links.update(req.body, {where: {link_id: req.params.id}});
	res.json(link);
});
apiRouter.delete("/links/:id", async (req, res) => {
	const link = await Links.destroy({where: {link_id: req.params.id}});
	res.json(link);
});

export default apiRouter;
