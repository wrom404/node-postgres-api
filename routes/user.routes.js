import express from "express";
import {
  getUsersById,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/user.controller.js";

const routes = express.Router();

routes.get("/", getUsers);

routes.get("/:id", getUsersById);

routes.post("/", createUser);

routes.put("/:id", updateUser);

routes.delete("/:id", deleteUser);

export default routes;
