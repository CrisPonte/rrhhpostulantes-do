const fs = require('fs');
const path = require('path');

class StorageService {
    constructor() {
        this.basePath = process.env.STORAGE_PATH || '/storage/postulantes';
        this.maxFilesPerApplicant = 10;
        this.blockedExtensions = ['.exe', '.bat', '.sh'];
    }

    getApplicantPath(apellido, nombre, dni) {
        const folderName = `${apellido.trim()}-${nombre.trim()}-${dni.trim()}`;
        // Ensure absolute path if not already
        const fullPath = path.isAbsolute(this.basePath)
            ? path.join(this.basePath, folderName)
            : path.join(process.cwd(), this.basePath, folderName);
        return fullPath;
    }

    initApplicantDirectory(apellido, nombre, dni) {
        const applicantPath = this.getApplicantPath(apellido, nombre, dni);
        if (!fs.existsSync(applicantPath)) {
            fs.mkdirSync(applicantPath, { recursive: true });
        }
        return applicantPath;
    }

    renameApplicantDirectory(oldData, newData) {
        const oldPath = this.getApplicantPath(oldData.apellido, oldData.nombre, oldData.dni);
        const newPath = this.getApplicantPath(newData.apellido, newData.nombre, newData.dni);

        if (oldPath !== newPath && fs.existsSync(oldPath)) {
            fs.renameSync(oldPath, newPath);
            return newPath;
        }
        return oldPath;
    }

    isValidFile(file) {
        const ext = path.extname(file.originalname).toLowerCase();
        return !this.blockedExtensions.includes(ext);
    }

    async saveFile(applicantData, file) {
        const { apellido, nombre, dni } = applicantData;
        const applicantPath = this.initApplicantDirectory(apellido, nombre, dni);

        // Check file count
        const files = fs.readdirSync(applicantPath);
        if (files.length >= this.maxFilesPerApplicant) {
            throw new Error(`Límite de ${this.maxFilesPerApplicant} archivos alcanzado para este postulante`);
        }

        if (!this.isValidFile(file)) {
            throw new Error('Tipo de archivo no permitido (ejecutables bloqueados)');
        }

        const targetPath = path.join(applicantPath, file.originalname);

        // Use fs.copyFileSync + fs.unlinkSync as fallback for cross-device moves (EXDEV)
        if (file.path) {
            try {
                fs.renameSync(file.path, targetPath);
            } catch (err) {
                if (err.code === 'EXDEV') {
                    fs.copyFileSync(file.path, targetPath);
                    fs.unlinkSync(file.path);
                } else {
                    throw err;
                }
            }
        } else if (file.buffer) {
            fs.writeFileSync(targetPath, file.buffer);
        }

        return targetPath;
    }

    deleteFile(applicantData, filename) {
        const applicantPath = this.getApplicantPath(applicantData.apellido, applicantData.nombre, applicantData.dni);
        const filePath = path.join(applicantPath, filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }

    deleteApplicantDirectory(applicantData) {
        const applicantPath = this.getApplicantPath(applicantData.apellido, applicantData.nombre, applicantData.dni);
        if (fs.existsSync(applicantPath)) {
            fs.rmSync(applicantPath, { recursive: true, force: true });
        }
    }

    listFiles(apellido, nombre, dni) {
        const applicantPath = this.getApplicantPath(apellido, nombre, dni);
        if (!fs.existsSync(applicantPath)) return [];
        return fs.readdirSync(applicantPath);
    }
}

module.exports = new StorageService();
