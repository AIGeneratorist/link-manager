import {DatabaseError, UniqueConstraintError, ValidationError} from "sequelize";

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
