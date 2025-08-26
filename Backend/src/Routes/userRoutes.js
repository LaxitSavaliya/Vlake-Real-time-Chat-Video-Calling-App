import express from 'express';
import { protectRoute } from '../Middleware/authMiddleware.js';
import { acceptFriendRequest, getFriendRequests, getMyFriends, getOutgoingFriendReqs, getRecommendedUsers, rejectFriendRequest, sendFriendRequest } from '../Controllers/userController.js';

const router = express.Router();

router.use(protectRoute);

router.get("/", getRecommendedUsers);
router.get('/friends', getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);
router.put("/friend-request/:id/reject", rejectFriendRequest);

router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);

export default router;