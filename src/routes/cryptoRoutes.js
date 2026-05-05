import { Router } from "express";
import { create, listAll, listGainers, listNew } from "../controllers/cryptoController.js";
import { authRequired } from "../middleware/authRequired.js";

export const cryptoRoutes = Router();

cryptoRoutes.get("/crypto", listAll);
cryptoRoutes.get("/crypto/gainers", listGainers);
cryptoRoutes.get("/crypto/new", listNew);
cryptoRoutes.post("/crypto", authRequired, create);

