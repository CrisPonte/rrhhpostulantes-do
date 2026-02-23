import React, { useState, useEffect } from 'react';
import supportService from '../../services/support.service';

const ESTADOS_ENTREVISTA = ['Confirma', 'Desiste', 'No Responde', 'Volver A Contactar', 'Sin Categorizar'];
const ASISTENCIA = ['Presenta', 'Ausente', 'Sin Categorizar'];
const RESULTADOS_ENTR = ['Excelente', 'Muy Bueno', 'Bueno', 'Regular', 'Malo', 'Sin Calificar'];
const ESTADOS_CONTACTO = ['Contactado', 'Sin Contactar'];
const RESULTA_FINAL = ['Aprobado', 'No Aprobado', 'Sin Categorizar'];

const InterviewInfo = ({ formData, onChange, readOnly }) => {
    const [portales, setPortales] = useState([]);

    useEffect(() => {
        supportService.getPortales().then(setPortales).catch(console.error);
    }, []);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Proceso de Selección</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Portal de Búsqueda</label>
                    <select name="portalBusqueda" value={formData.portalBusqueda?._id || formData.portalBusqueda || ''} onChange={onChange} disabled={readOnly}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-60">
                        <option value="">Seleccione Portal</option>
                        {portales.map(p => <option key={p._id} value={p._id}>{p.nombre}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Referencia de Búsqueda</label>
                    <input type="text" name="referenciaBusqueda" value={formData.referenciaBusqueda || ''} onChange={onChange} disabled={readOnly}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-60" placeholder="Ej. LinkedIn, Aviso Clarin" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Estado del Contacto</label>
                    <select name="estadoContacto" value={formData.estadoContacto || 'Sin Contactar'} onChange={onChange} disabled={readOnly}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-60">
                        {ESTADOS_CONTACTO.map(e => <option key={e} value={e}>{e}</option>)}
                    </select>
                </div>

                <div className="md:col-span-3 border-t border-gray-100 mt-2 mb-2"></div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha de Entrevista</label>
                    {/* Format date for input type=date assumes YYYY-MM-DD string */}
                    <input type="date" name="fechaEntrevista"
                        value={formData.fechaEntrevista ? new Date(formData.fechaEntrevista).toISOString().split('T')[0] : ''}
                        onChange={onChange} disabled={readOnly}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-60" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Hora Entrevista</label>
                    <input type="time" name="horaEntrevista" value={formData.horaEntrevista || ''} onChange={onChange} disabled={readOnly}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-60" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Asistencia</label>
                    <select name="asistenciaEntrevista" value={formData.asistenciaEntrevista || 'Sin Categorizar'} onChange={onChange} disabled={readOnly}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-60">
                        {ASISTENCIA.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Estado de Entrevista</label>
                    <select name="estadoEntrevista" value={formData.estadoEntrevista || 'Sin Categorizar'} onChange={onChange} disabled={readOnly}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-60">
                        {ESTADOS_ENTREVISTA.map(e => <option key={e} value={e}>{e}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Desempeño</label>
                    <select name="resultadoEntrevista" value={formData.resultadoEntrevista || 'Sin Calificar'} onChange={onChange} disabled={readOnly}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-60">
                        {RESULTADOS_ENTR.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Resultado Final</label>
                    <select name="resultadoFinal" value={formData.resultadoFinal || 'Sin Categorizar'} onChange={onChange} disabled={readOnly}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-60 font-bold text-gray-800">
                        {RESULTA_FINAL.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default InterviewInfo;
