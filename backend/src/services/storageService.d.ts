export interface IStorageService {
    saveFile(file: Express.Multer.File): Promise<string>;
    deleteFile(filePath: string): Promise<void>;
    getDownloadStream(filePath: string): Promise<any>;
}
export declare class LocalStorageService implements IStorageService {
    saveFile(file: Express.Multer.File): Promise<string>;
    deleteFile(filePath: string): Promise<void>;
    getDownloadStream(filePath: string): Promise<any>;
}
export declare class S3StorageService implements IStorageService {
    saveFile(file: Express.Multer.File): Promise<string>;
    deleteFile(filePath: string): Promise<void>;
    getDownloadStream(filePath: string): Promise<any>;
}
export declare const storageService: LocalStorageService | S3StorageService;
//# sourceMappingURL=storageService.d.ts.map