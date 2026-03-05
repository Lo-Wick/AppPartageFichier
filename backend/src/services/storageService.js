"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageService = exports.S3StorageService = exports.LocalStorageService = void 0;
const promises_1 = __importDefault(require("fs/promises"));
class LocalStorageService {
    async saveFile(file) {
        // Multer already saved the file to 'uploads/'
        return file.path;
    }
    async deleteFile(filePath) {
        try {
            await promises_1.default.unlink(filePath);
        }
        catch (e) {
            console.error("Local storage: File not found for deletion", filePath);
        }
    }
    async getDownloadStream(filePath) {
        return filePath; // For res.download()
    }
}
exports.LocalStorageService = LocalStorageService;
// Mock S3 Storage Service for demonstration as the second option
class S3StorageService {
    async saveFile(file) {
        console.log(`[S3 Storage] Uploading ${file.originalname} to S3 bucket...`);
        // In a real implementation:
        // const params = { Bucket: 'my-bucket', Key: file.filename, Body: file.buffer };
        // const data = await s3.upload(params).promise();
        // return data.Location;
        return `s3://mock-bucket/${file.filename}`;
    }
    async deleteFile(filePath) {
        console.log(`[S3 Storage] Deleting ${filePath} from S3...`);
    }
    async getDownloadStream(filePath) {
        console.log(`[S3 Storage] Getting signed URL for ${filePath}`);
        return filePath;
    }
}
exports.S3StorageService = S3StorageService;
const storageType = process.env.STORAGE_TYPE || "local";
exports.storageService = storageType === "s3" ? new S3StorageService() : new LocalStorageService();
//# sourceMappingURL=storageService.js.map