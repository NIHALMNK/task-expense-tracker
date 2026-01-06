import { Router } from "express";
import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense
} from "../controllers/expense.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.use(protect);

router.post("/", createExpense);
router.get("/", getExpenses);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;
