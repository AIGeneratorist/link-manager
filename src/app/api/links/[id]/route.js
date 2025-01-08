import {Links} from "@/db/db.js";
import {errorToResponse} from "@/utils/utils.js";

export const GET = async (req, {params}) => {
	const {id} = await params;
	const parsedId = parseInt(id);
	if (isNaN(parsedId)) {
		return Response.json({error: "Invalid ID"}, {status: 404});
	}

	try {
		const link = await Links.findByPk(parsedId);
		if (!link) {
			return Response.json({error: "Link not found"}, {status: 404});
		}
		return Response.json(link);
	} catch (err) {
		return errorToResponse(err);
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
		return errorToResponse(err);
	}
};

export const DELETE = async (req, {params}) => {
	const {id} = await params;
	const parsedId = parseInt(id);
	if (isNaN(parsedId)) {
		return Response.json({error: "Invalid ID"}, {status: 404});
	}

	try {
		const deletedCount = await Links.destroy({where: {linkId: parsedId}});
		if (deletedCount == 0) {
			return Response.json({error: "Link not found"}, {status: 404});
		}
		return new Response();
	} catch (err) {
		return errorToResponse(err);
	}
};
