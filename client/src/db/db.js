import pg from "pg";
import Sequelize from "sequelize";
import config from "../../../config.json" with {type: "json"};

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
	link_id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	url: {
		type: Sequelize.TEXT,
		allowNull: false,
		unique: true
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
	found_at: {
		type: Sequelize.DATE
	},
	read_at: {
		type: Sequelize.DATE
	},
	priority: {
		type: Sequelize.INTEGER
	},
	favorited: {
		type: Sequelize.BOOLEAN
	},
	comments: {
		type: Sequelize.STRING
	}
});

await sequelize.sync();
