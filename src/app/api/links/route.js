import {Links} from "@/db/db.js";
import {errorToResponse} from "@/utils/utils.js";

export const GET = async () => {
	try {
		const links = await Links.findAll();
		return Response.json(links);
	} catch (err) {
		return errorToResponse(err);
	}
};

export const POST = async req => {
	try {
		const body = await req.json();
		const link = await Links.create(body);
		return Response.json(link);
	} catch (err) {
		return errorToResponse(err);
	}
};
