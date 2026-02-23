import React, { useState, useEffect } from 'react';
import postulanteService from '../services/postulante.service';
import { FileText, Download, UploadCloud, Trash2, Loader2, AlertCircle } from 'lucide-react';

const FileManager = ({ postulanteId, readOnly }) => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    const fetchFiles = async () => {
        try {
            const data = await postulanteService.listFiles(postulanteId);
            setFiles(data);
        } catch (err) {
            console.error('Error fetching files:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (postulanteId && postulanteId !== 'new') {
            const loadFiles = async () => {
                try {
                    const data = await postulanteService.listFiles(postulanteId);
                    setFiles(data);
                } catch (err) {
                    console.error('Error fetching files:', err);
                } finally {
                    setLoading(false);
                }
            };
            loadFiles();
        }
    }, [postulanteId]);

    const handleDownload = async (filename) => {
        try {
            await postulanteService.downloadFile(postulanteId, filename);
        } catch (err) {
            console.error('Error downloading file:', err);
            alert('Error al descargar el archivo');
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Client-side block extension check
        const ext = file.name.split('.').pop().toLowerCase();
        if (['exe', 'bat', 'sh'].includes(ext)) {
            setError('Archivos ejecutables no permitidos.');
            e.target.value = null; // reset
            return;
        }

        if (files.length >= 10) {
            setError('Límite de 10 archivos alcanzado para este postulante.');
            e.target.value = null; // reset
            return;
        }

        setError('');
        setUploading(true);

        try {
            await postulanteService.uploadFile(postulanteId, file);
            await fetchFiles();
        } catch (err) {
            console.error('Upload error:', err);
            setError(err.response?.data?.error || 'Error al subir documento');
        } finally {
            setUploading(false);
            e.target.value = null; // reset
        }
    };

    if (postulanteId === 'new') {
        return (
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-8 text-center mt-6">
                <FileText className="mx-auto text-gray-400 mb-3" size={32} />
                <h4 className="text-gray-900 font-medium">Gestión de Archivos no disponible</h4>
                <p className="text-gray-500 text-sm mt-1">Guarde el postulante antes de intentar subir archivos o CVs.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 mt-6">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-4">
                <h3 className="text-lg font-bold text-gray-900">Documentos del Postulante</h3>
                <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{files.length}/10 máx</span>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 flex items-center gap-2 text-red-700 text-sm rounded">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center p-4"><Loader2 className="animate-spin text-blue-600" size={24} /></div>
            ) : (
                <>
                    {files.length === 0 ? (
                        <div className="text-center py-6 bg-gray-50 border border-gray-100 rounded-lg text-gray-500 text-sm mb-4">
                            No hay documentos subidos actualmente.
                        </div>
                    ) : (
                        <ul className="mb-6 space-y-2">
                            {files.map(f => (
                                <li key={f} className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-lg transition-colors group">
                                    <div className="flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap pr-4">
                                        <FileText size={18} className="text-blue-500 flex-shrink-0" />
                                        <span className="text-sm font-medium text-gray-700">{f}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleDownload(f)}
                                            className="p-1.5 bg-white text-gray-500 hover:text-blue-600 border border-gray-200 hover:border-blue-300 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1 text-xs font-semibold"
                                        >
                                            <Download size={14} /> Descargar
                                        </button>
                                        {/* Hard delete / specific delete endpoint for file could be mapped, but spec doesn't require individual file delete from UI if not specified, though it's nice. Let's omit visual UI logic for it unless required. */}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    {!readOnly && (
                        <div className="flex items-center justify-center w-full">
                            <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors ${uploading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}>
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    {uploading ? (
                                        <Loader2 className="animate-spin text-blue-500 mb-2" size={28} />
                                    ) : (
                                        <UploadCloud className="text-gray-500 mb-2" size={28} />
                                    )}
                                    <p className="mb-1 text-sm text-gray-500"><span className="font-semibold text-blue-600">Click para subir</span> o arrastre un archivo</p>
                                    <p className="text-xs text-gray-400">PDF, DOC, DOCX, JPG (Max 10MB)</p>
                                </div>
                                <input type="file" className="hidden" onChange={handleFileChange} disabled={uploading} />
                            </label>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default FileManager;
