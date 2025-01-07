import pg from "pg";
import Sequelize from "sequelize";
import config from "../../config.json" with {type: "json"};

export const sequelize = new Sequelize.Sequelize({
	dialect: "postgres",
	dialectModule: pg,
	host: config.postgresHost || "localhost",
	port: config.postgresPort || 5432,
	database: config.postgresDatabase,
	username: config.postgresUsername,
	password: config.postgresPassword
});

export const Links = sequelize.define("links", {
	linkId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		field: "link_id"
	},
	url: {
		type: Sequelize.TEXT,
		allowNull: false,
		unique: true,
		validate: {isUrl: true}
	},
	title: {
		type: Sequelize.STRING
	},
	folder: {
		type: Sequelize.STRING
	},
	category: {
		type: Sequelize.STRING
	},
	type: {
		type: Sequelize.STRING
	},
	foundAt: {
		type: Sequelize.DATE,
		field: "found_at"
	},
	readAt: {
		type: Sequelize.DATE,
		field: "read_at"
	},
	priority: {
		type: Sequelize.INTEGER,
		validate: {isIn: [[1, 2, 3]]}
	},
	favorited: {
		type: Sequelize.BOOLEAN
	},
	comments: {
		type: Sequelize.STRING
	}
});

await sequelize.sync();
