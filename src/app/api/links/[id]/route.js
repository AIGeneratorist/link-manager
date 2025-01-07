import {DatabaseError, ValidationError} from "sequelize";
import {Links} from "@/db/db.js";

export const GET = async (req, {params}) => {
	const {id} = await params;
	try {
		const link = await Links.findByPk(id);
		if (!link) {
			return Response.json({error: "Link not found"}, {status: 404});
		}
		return Response.json(link);
	} catch (err) {
		if (err instanceof DatabaseError && err.message.startsWith("invalid input syntax")) {
			return Response.json({error: "Invalid ID"}, {status: 404});
		}
		return Response.json({error: `Server error: ${err}`}, {status: 500});
	}
};

export const PATCH = async (req, {params}) => {
	const {id} = await params;
	const parsedId = parseInt(id);
	if (isNaN(parsedId)) {
		return Response.json({error: "Invalid ID"}, {status: 404});
	}

	try {
		const body = await req.json();

		const tempLink = Links.build(body);
		if (!tempLink.changed()) {
			return Response.json({error: "Invalid field name(s)"}, {status: 400});
		}
		tempLink.set("url", "https://example.com");
		await tempLink.validate();

		const [updatedCount] = await Links.update(body, {where: {linkId: parsedId}});
		if (updatedCount == 0) {
			return Response.json({error: "Link not found"}, {status: 404});
		}

		return new Response();
	} catch (err) {
		if (err instanceof DatabaseError && err.message.startsWith("invalid input syntax")) {
			return Response.json({error: `Invalid field value: ${err}`}, {status: 400});
		}
		if (err instanceof ValidationError) {
			return Response.json({error: `Invalid field value(s):\n${err.message}`}, {status: 400});
		}
		return Response.json({error: `Server error: ${err}`}, {status: 500});
	}
};

export const DELETE = async (req, {params}) => {
	const {id} = await params;
	try {
		const deletedCount = await Links.destroy({where: {linkId: id}});
		if (deletedCount == 0) {
			return Response.json({error: "Link not found"}, {status: 404});
		}
		return new Response();
	} catch (err) {
		if (err instanceof DatabaseError && err.message.startsWith("invalid input syntax")) {
			return Response.json({error: "Invalid ID"}, {status: 404});
		}
		return Response.json({error: `Server error: ${err}`}, {status: 500});
	}
};
