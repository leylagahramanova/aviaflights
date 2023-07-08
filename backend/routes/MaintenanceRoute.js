import express from "express";
import {
    getMaintenances,
    getMaintenanceById,
    createMaintenance,
    updateMaintenance,
    deleteMaintenance
} from "../controllers/Maintenances.js";
import { verifyUser } from "../middleware/AuthUser.js";
const router = express.Router();
router.get('/maintenances', verifyUser, getMaintenances);
router.get('/maintenances/:id', verifyUser, getMaintenanceById);
router.post('/maintenances', verifyUser, createMaintenance) ;
router.patch('/maintenances/:id', verifyUser, updateMaintenance);
router.delete('/maintenances/:id', verifyUser, deleteMaintenance);
export default router;

