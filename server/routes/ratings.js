import { Router } from "express";
import { getRatings, createRating, editRating, deleteRating} from "../controllers/ratings.js";

const router = Router();
import authentication from "../middlewares/authentication.js";

router.get("/:userId", getRatings);
router.post("/", authentication, createRating);
router.patch("/:id", authentication, editRating);
router.delete("/:id", authentication, deleteRating);

export default router;