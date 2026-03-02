import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MessageSquare, Calendar, User, PlusCircle } from 'lucide-react';

const ObservationsNotes = ({ formData, onNewObservationChange, newObservation }) => {
    const { user } = useAuth();
    const [editingIndex, setEditingIndex] = useState(null);
    const [editText, setEditText] = useState('');

    const userRol = user?.rol?.toLowerCase();
    const isAdmin = userRol === 'admin';
    const isJefe = userRol === 'jefe de rrhh';
    const canAdd = isAdmin || isJefe;

    const startEditing = (index, text) => {
        setEditingIndex(index);
        setEditText(text);
    };

    const cancelEditing = () => {
        setEditingIndex(null);
        setEditText('');
    };

    const saveEdit = (index) => {
        const updatedObs = [...formData.observaciones];
        updatedObs[index].texto = editText;
        // In this implementation, we directly modify the formData object's property.
        // It relies on the reference being the same for the parent's update call.
        formData.observaciones = updatedObs;
        setEditingIndex(null);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
                <MessageSquare size={20} className="text-blue-600" />
                Observaciones y Notas
            </h3>

            {/* Historical Observations */}
            <div className="space-y-4 mb-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {formData.observaciones && formData.observaciones.length > 0 ? (
                    formData.observaciones.map((obs, index) => (
                        <div key={index} className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative group border-l-4 border-l-blue-500">
                            <div className="flex justify-between items-start mb-2 text-[11px] text-gray-500">
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-full">
                                        <Calendar size={12} />
                                        {new Date(obs.fecha).toLocaleString()}
                                    </span>
                                    <span className="flex items-center gap-1 font-semibold text-gray-700 bg-blue-50 px-2 py-0.5 rounded-full">
                                        <User size={12} className="text-blue-500" />
                                        {obs.usuarioNombre}
                                    </span>
                                </div>

                                {isAdmin && editingIndex !== index && (
                                    <button
                                        type="button"
                                        onClick={() => startEditing(index, obs.texto)}
                                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors opacity-0 group-hover:opacity-100 text-xs"
                                    >
                                        Editar
                                    </button>
                                )}
                            </div>

                            {editingIndex === index ? (
                                <div className="mt-2 text-sm">
                                    <textarea
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        className="w-full p-2 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                        rows="3"
                                    ></textarea>
                                    <div className="flex justify-end gap-2 mt-2">
                                        <button type="button" onClick={cancelEditing} className="text-xs text-gray-500 hover:text-gray-700">Cancelar</button>
                                        <button type="button" onClick={() => saveEdit(index)} className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Aplicar</button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{obs.texto}</p>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 text-gray-400 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                        <MessageSquare size={40} className="mx-auto mb-3 opacity-10" />
                        <p className="text-sm font-medium">No hay observaciones registradas aún.</p>
                        <p className="text-xs mt-1">Las notas que agregue aparecerán aquí.</p>
                    </div>
                )}
            </div>

            {/* Add New Observation */}
            {canAdd && (
                <div className="mt-6 pt-6 border-t border-gray-100 bg-blue-50/20 -mx-6 px-6 -mb-6 rounded-b-xl">
                    <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <PlusCircle size={18} className="text-blue-600" />
                        Nueva Observación
                    </label>
                    <textarea
                        value={newObservation}
                        onChange={(e) => onNewObservationChange(e.target.value)}
                        placeholder="Describa el progreso, feedback o detalles relevantes..."
                        rows="3"
                        className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm placeholder:text-gray-400 text-sm"
                    ></textarea>
                    <div className="flex justify-between items-center mt-3 pb-4">
                        <p className="text-[11px] text-gray-500 flex items-center gap-1">
                            <User size={12} />
                            Se guardará como: <span className="font-semibold">{user?.nombre} {user?.apellido}</span>
                        </p>
                        <p className="text-[10px] text-blue-600/60 font-medium italic">
                            Requiere presionar "Guardar Cambios" al final.
                        </p>
                    </div>
                </div>
            )}

            {!canAdd && (
                <div className="mt-4 p-4 bg-gray-50 rounded-xl text-xs text-gray-500 flex items-center gap-3 border border-gray-100">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                        <User size={16} className="text-gray-400" />
                    </div>
                    <span className="italic">Solo usuarios con rol Administrador o Jefe de RRHH tienen permisos para añadir observaciones.</span>
                </div>
            )}
        </div>
    );
};

export default ObservationsNotes;
