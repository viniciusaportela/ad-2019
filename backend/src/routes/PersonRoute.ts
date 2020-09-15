import { Router } from "express";

import PersonController from "../controllers/PersonController";
import handleValidatorErrors from "../middlewares/handleValidatorErrors";

const router = Router();

router.get("/", PersonController.list);

router.post(
  "/",
  PersonController.insertValidator,
  handleValidatorErrors,
  PersonController.create
);

router.put(
  "/:person",
  PersonController.insertValidator,
  handleValidatorErrors,
  PersonController.update
);

router.delete("/:person", PersonController.delete);

export default router;
