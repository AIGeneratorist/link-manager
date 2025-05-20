import {Links} from "@/db/db.js";
import {errorToResponse} from "@/utils/utils.js";

export const GET = async req => {
	const rawPage = req.nextUrl.searchParams.get("page");
	let page;
	if (rawPage) {
		page = parseInt(rawPage);
		if (isNaN(page) || page < 1) {
			return Response.json({error: "Invalid page"}, {status: 400});
		}
	} else {
		page = 1;
	}

	try {
		const {rows, count} = await Links.findAndCountAll({
			limit: 25,
			offset: (page - 1) * 25
		});
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
