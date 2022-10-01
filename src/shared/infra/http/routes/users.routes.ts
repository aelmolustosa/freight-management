import { ProfileUserController } from "@modules/accounts/useCases/profileUser/ProfileUserController";
import { Router } from "express";

import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const profileUserController = new ProfileUserController();
usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/profile/", profileUserController.handle);

export { usersRoutes };
