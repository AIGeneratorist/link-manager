import {DatabaseError, UniqueConstraintError} from "sequelize";
import {Links} from "@/db/db.js";

export const GET = async () => {
	try {
		const links = await Links.findAll();
		return Response.json(links);
	} catch (err) {
		return Response.json({error: `Server error: ${err}`}, {status: 500});
	}
};

export const POST = async req => {
	try {
		const body = await req.json();
		const link = await Links.create(body);
		return Response.json(link);
	} catch (err) {
		if (err instanceof UniqueConstraintError) {
			return Response.json({error: "Link already exists"}, {status: 400});
		}
		if (err instanceof DatabaseError && err.message.startsWith("invalid input syntax")) {
			return Response.json({error: `Invalid field value: ${err}`}, {status: 400});
		}
		return Response.json({error: `Server error: ${err}`}, {status: 500});
	}
};
