import { Router } from "express";

import PersonRoute from "./routes/PersonRoute";

const router = Router();

router.use("/people", PersonRoute);

export default router;
