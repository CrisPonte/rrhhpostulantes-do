import React, { useState, useEffect } from 'react';
import supportService from '../../services/support.service';

const StudiesInfo = ({ formData, onChange, readOnly }) => {
    const [puestos, setPuestos] = useState([]);
    const [titulos, setTitulos] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [pData, tData] = await Promise.all([
                    supportService.getPuestos(),
                    supportService.getTitulos()
                ]);
                setPuestos(pData);
                setTitulos(tData);
            } catch (err) {
                console.error('Error loading support data for studies info', err);
            }
        };
        loadData();
    }, []);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Estudios y Profesional</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Puesto Solicitado</label>
                    <select name="puesto" value={formData.puesto?._id || formData.puesto || ''} onChange={onChange} disabled={readOnly}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-60">
                        <option value="">Seleccione Puesto</option>
                        {puestos.map(p => <option key={p._id} value={p._id}>{p.nombre}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Título Principal</label>
                    <select name="tituloPrincipal" value={formData.tituloPrincipal?._id || formData.tituloPrincipal || ''} onChange={onChange} disabled={readOnly}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-60">
                        <option value="">Seleccione Título</option>
                        {titulos.map(t => <option key={t._id} value={t._id}>{t.nombre}</option>)}
                    </select>
                </div>

                {/* Additional studies tracking could go here, per schema */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Título Secundario / Otro</label>
                    <input type="text" name="tituloSecundario" value={formData.tituloSecundario || ''} onChange={onChange} disabled={readOnly}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-60" placeholder="Ej. Bachiller en Economía" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Universidad / Institución</label>
                    <input type="text" name="universidad" value={formData.universidad || ''} onChange={onChange} disabled={readOnly}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-60" />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Observaciones Generales</label>
                    <textarea name="observaciones" value={formData.observaciones || ''} onChange={onChange} disabled={readOnly} rows="3"
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-60" placeholder="Notas sobre el perfil..."></textarea>
                </div>
            </div>
        </div>
    );
};

export default StudiesInfo;
