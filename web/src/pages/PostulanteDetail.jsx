import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import postulanteService from '../services/postulante.service';
import PersonalInfo from '../components/forms/PersonalInfo';
import StudiesInfo from '../components/forms/StudiesInfo';
import InterviewInfo from '../components/forms/InterviewInfo';
import FileManager from '../components/FileManager';
import { ArrowLeft, Save, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

const PostulanteDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = id === 'new';

    const [formData, setFormData] = useState({
        nombre: '', apellido: '', dni: '', provincia: '',
        estadoEntrevista: 'Sin Categorizar',
        asistenciaEntrevista: 'Sin Categorizar',
        resultadoEntrevista: 'Sin Calificar',
        resultadoFinal: 'Sin Categorizar',
        estadoContacto: 'Sin Contactar',
        genero: 'Sin Categorizar'
    });

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (!isNew) {
            const loadPostulante = async () => {
                setLoading(true);
                try {
                    const data = await postulanteService.getById(id);
                    setFormData(data);
                } catch (err) {
                    console.error('Error fetching postulante:', err);
                    setError('Error al cargar datos del postulante.');
                } finally {
                    setLoading(false);
                }
            };
            loadPostulante();
        }
    }, [id, isNew]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccess('');

        try {
            if (isNew) {
                const newData = await postulanteService.create(formData);
                navigate(`/postulantes/${newData._id}`, { replace: true });
                setSuccess('Postulante creado correctamente.');
            } else {
                await postulanteService.update(id, formData);
                setSuccess('Datos actualizados correctamente.');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Error al guardar el postulante. Verifique los campos obligatorios y el DNI.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center p-12"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;
    }

    return (
        <div className="max-w-5xl mx-auto pb-12 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/postulantes')} className="p-2 hover:bg-gray-200 bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-800">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {isNew ? 'Nuevo Postulante' : `Editar Perfil: ${formData.nombre} ${formData.apellido}`}
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Complete los campos estructurales del candidato
                        </p>
                    </div>
                </div>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 flex items-center gap-3 text-red-700 rounded-r-md">
                    <AlertCircle size={20} />
                    <span className="text-sm font-medium">{error}</span>
                </div>
            )}

            {success && (
                <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 flex items-center gap-3 text-green-700 rounded-r-md">
                    <CheckCircle size={20} />
                    <span className="text-sm font-medium">{success}</span>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <PersonalInfo formData={formData} onChange={handleChange} />
                <StudiesInfo formData={formData} onChange={handleChange} />
                <InterviewInfo formData={formData} onChange={handleChange} />

                <div className="flex justify-end gap-3 mt-8">
                    <button type="button" onClick={() => navigate('/postulantes')} className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                        Cancelar
                    </button>
                    <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-all disabled:opacity-70 group">
                        {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} className="group-hover:scale-110 transition-transform" />}
                        {saving ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </div>
            </form>

            {/* File Manager Section completely decoupled from main form */}
            {!isNew && (
                <div className="mt-8 border-t border-gray-200">
                    <FileManager postulanteId={id} />
                </div>
            )}
        </div>
    );
};

export default PostulanteDetail;
