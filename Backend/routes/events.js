import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { getAllEvents, getLatestEvent, participate, participationCertificateGenration } from '../controllers/events.js';
import { generateCertificate } from '../middleware/CertificateGenration.js';


const router = express.Router();

/*Read */
router.get("/",verifyToken,getAllEvents);
router.get("/latestevent",verifyToken,getLatestEvent);

/*Upadte*/
router.patch("/participate/:id",verifyToken,participate);

// Admin Route
router.get("/genrate-certificates/:id",participationCertificateGenration);

export default router