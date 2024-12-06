import cors from "cors";
import express from "express";
import apiRouter from "./api.js";
import {sequelize} from "./db.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

await sequelize.sync();

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
