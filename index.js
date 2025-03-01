import express from "express";
import dotenv from "dotenv";
import "./config/connectDb.js";
import routes from "./routes/user.routes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

app.use("/api/user", routes);

app.listen(4000, () => {
  console.log("server is running at port 4000");
});
