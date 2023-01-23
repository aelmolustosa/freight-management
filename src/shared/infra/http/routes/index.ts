import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { companiesRoutes } from "./companies.route";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/login", authenticateRoutes);
router.use("/company", companiesRoutes);

export { router };
