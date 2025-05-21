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

	const rawSort = req.nextUrl.searchParams.get("sort");
	let sortField;
	let sortOrder;
	if (rawSort) {
		if (rawSort.endsWith("Desc")) {
			sortField = rawSort.slice(0, -4);
			sortOrder = "DESC";
		} else if (rawSort.endsWith("Asc")) {
			sortField = rawSort.slice(0, -3);
			sortOrder = "ASC";
		} else {
			sortField = rawSort;
			sortOrder = "ASC";
		}

		const attributes = Links.getAttributes();
		if (!attributes[sortField]) {
			return Response.json({error: "Invalid sort field"}, {status: 400});
		}
	} else {
		sortField = "createdAt";
		sortOrder = "DESC";
	}

	try {
		const {rows, count} = await Links.findAndCountAll({
			limit: 25,
			offset: (page - 1) * 25,
			order: [[sortField, sortOrder]]
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
