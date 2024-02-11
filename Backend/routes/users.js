import express from "express";
import {
  getUser,
  getUserFriends,
  getallUser,
  addRemoveFriend,
  getUserParticipatedEvents,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";
import { checkRole } from "../middleware/CheckRole.js";

const router = express.Router();

/* READ */
// admin route
router.get("/alluser", verifyToken,checkRole(["admin"]), getallUser)
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/events/:id",verifyToken,getUserParticipatedEvents);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
