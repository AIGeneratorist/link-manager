import {DatabaseError, UniqueConstraintError, ValidationError} from "sequelize";

export function parseQueryParams(req, model) {
	const rawPage = req.nextUrl.searchParams.get("page");
	let page;
	if (rawPage) {
		page = parseInt(rawPage);
		if (isNaN(page) || page < 1) {
			return {error: "Invalid page"};
		}
	} else {
		page = 1;
	}

	const rawLimit = req.nextUrl.searchParams.get("limit");
	let limit;
	if (rawLimit) {
		limit = parseInt(rawLimit);
		if (isNaN(limit) || limit < 1) {
			return {error: "Invalid limit"};
		}
	} else {
		limit = 25;
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

		const attributes = model.getAttributes();
		if (!attributes[sortField]) {
			return {error: "Invalid sort field"};
		}
	} else {
		sortField = "createdAt";
		sortOrder = "DESC";
	}

	return {
		data: {
			limit,
			offset: (page - 1) * limit,
			order: [[sortField, sortOrder]]
		}
	};
}

export function errorToResponse(err) {
	if (err instanceof UniqueConstraintError) {
		return Response.json(
			{error: `Unique constraint error: ${err.errors[0].message}`},
			{status: 400}
		);
	}
	if (err instanceof DatabaseError && err.message.startsWith("invalid input syntax")) {
		return Response.json({error: `Invalid field value: ${err}`}, {status: 400});
	}
	if (err instanceof ValidationError) {
		return Response.json({error: `Invalid field value(s):\n${err.message}`}, {status: 400});
	}
	return Response.json({error: `Server error: ${err}`}, {status: 500});
}
