"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const fileController_1 = require("../controllers/fileController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
router.post("/", authMiddleware_1.authenticateToken, upload.single("file"), fileController_1.uploadFile);
router.put("/:id", authMiddleware_1.authenticateToken, upload.single("file"), fileController_1.updateFile);
router.get("/", authMiddleware_1.authenticateToken, fileController_1.listFiles);
router.get("/stats", authMiddleware_1.authenticateToken, fileController_1.getStats);
router.delete("/:id", authMiddleware_1.authenticateToken, fileController_1.deleteFile);
// Public routes
router.get("/public", fileController_1.listPublicFiles);
router.get("/details/:slug", fileController_1.getFileDetails);
router.get("/download/:slug", fileController_1.downloadFile);
exports.default = router;
//# sourceMappingURL=fileRoutes.js.map