import { ProfileUserController } from "@modules/accounts/useCases/profileUser/ProfileUserController";
import { Router } from "express";

import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { ensureAuthentcated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const profileUserController = new ProfileUserController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/profile/", ensureAuthentcated, profileUserController.handle);

export { usersRoutes };
