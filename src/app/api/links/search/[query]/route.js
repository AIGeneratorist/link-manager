import Sequelize from "sequelize";
import {Links} from "@/db/db.js";
import {errorToResponse} from "@/utils/utils.js";

function parseSearchQuery(query, model) {
	const attributes = model.getAttributes();

	const filters = {};
	const defaultFilterWords = [];

	const queryRegex = /(\w+):(?:"(.+?)"|(\S+))|(\S+)/g;
	let match;
	while (match = queryRegex.exec(query)) {
		const operator = match[1];
		if (operator) {
			const foundAttribute = attributes[operator];
			if (foundAttribute) {
				if (match[3] == "null") {
					filters[operator] = {[Sequelize.Op.is]: null};
				} else {
					const keywords = match[2] || match[3];
					if (foundAttribute.type instanceof Sequelize.INTEGER) {
						filters[operator] = parseInt(match[2]);
					} else if (
						foundAttribute.type instanceof Sequelize.STRING ||
						foundAttribute.type instanceof Sequelize.TEXT
					) {
						filters[operator] = {
							[Sequelize.Op.iLike]: `%${keywords.replace(/([%_])/g, "\\$1")}%`
						};
					} else if (foundAttribute.type instanceof Sequelize.DATE) {
						filters[operator] = new Date(keywords);
					} else {
						filters[operator] = keywords;
					}
				}
			}
		} else {
			defaultFilterWords.push(match[4].replace(/([%_])/g, "\\$1"));
		}
	}

	return {filters, defaultFilterWords};
}

export const GET = async (req, {params}) => {
	const {query} = await params;
	const {filters, defaultFilterWords} = parseSearchQuery(query, Links);
	if (Object.keys(filters).length == 0 && defaultFilterWords.length == 0) {
		return Response.json([]);
	}

	try {
		const links = await Links.findAll({
			where: {
				...filters,
				url: {
					[Sequelize.Op.iLike]: `%${defaultFilterWords.join("_")}%`
				}
			}
		});
		return Response.json(links);
	} catch (err) {
		return errorToResponse(err);
	}
};
