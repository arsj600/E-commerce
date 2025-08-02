import express from "express";

import { userPrompt } from "../controllers/aiController.js";

const aiRouter =express.Router();

aiRouter.post('/search',userPrompt)

export default aiRouter