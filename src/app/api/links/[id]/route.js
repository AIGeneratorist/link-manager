import {Links} from "@/db/db.js";

export const GET = async (req, {params}) => {
	const link = await Links.findByPk(params.id);
	return Response.json(link);
};

export const PATCH = async (req, {params}) => {
	const body = await req.json();
	await Links.update(body, {where: {link_id: params.id}});
	return new Response();
};

export const DELETE = async (req, {params}) => {
	await Links.destroy({where: {link_id: params.id}});
	return new Response();
};
