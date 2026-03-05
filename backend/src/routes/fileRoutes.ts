import express from "express";
import multer from "multer";
import { uploadFile, updateFile, listFiles, listPublicFiles, downloadFile, deleteFile, getStats, getFileDetails } from "../controllers/fileController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", authenticateToken, upload.single("file"), uploadFile as any);
router.put("/:id", authenticateToken, upload.single("file"), updateFile as any);
router.get("/", authenticateToken, listFiles);
router.get("/stats", authenticateToken, getStats);
router.delete("/:id", authenticateToken, deleteFile);

// Public routes
router.get("/public", listPublicFiles);
router.get("/details/:slug", getFileDetails);
router.get("/download/:slug", downloadFile);

export default router;
