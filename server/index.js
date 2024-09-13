const cors = require("cors");
const express = require("express");
const apiRouter = require("./api.js");
const {sequelize} = require("./db.js");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

sequelize.sync().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
});
