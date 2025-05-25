import {Links} from "@/db/db.js";
import {errorToResponse, parseQueryParams} from "@/utils/utils.js";

export const GET = async req => {
	const parseRes = parseQueryParams(req, Links);
	if (parseRes.error) {
		return Response.json(parseRes, {status: 400});
	}

	try {
		const {rows, count} = await Links.findAndCountAll(parseRes.data);
		return Response.json({results: rows, count});
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
