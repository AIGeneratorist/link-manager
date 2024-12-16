import {Links} from "@/db/db.js";

export const GET = async () => {
	const links = await Links.findAll();
	return Response.json(links);
};

export const POST = async req => {
	const body = await req.json();
	const link = await Links.create(body);
	return Response.json(link);
};
