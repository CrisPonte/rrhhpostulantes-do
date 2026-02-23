import React from 'react';

const PROVINCIAS = [
    'Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'CABA', 'Córdoba',
    'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja',
    'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan',
    'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero',
    'Tierra del Fuego', 'Tucumán'
];

const GENEROS = ['Masculino', 'Femenino', 'No Binario', 'Sin Categorizar'];

const PersonalInfo = ({ formData, onChange, readOnly }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Información Personal</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre *</label>
                    <input type="text" name="nombre" value={formData.nombre || ''} onChange={onChange} disabled={readOnly} required
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-60" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Apellido *</label>
                    <input type="text" name="apellido" value={formData.apellido || ''} onChange={onChange} disabled={readOnly} required
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-60" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">DNI *</label>
                    <input type="text" name="dni" value={formData.dni || ''} onChange={onChange} disabled={readOnly} required
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-60" />
                </div>

                {/* Additional Fields */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                    <input type="email" name="email" value={formData.email || ''} onChange={onChange} disabled={readOnly}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-60" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono</label>
                    <input type="text" name="telefono" value={formData.telefono || ''} onChange={onChange} disabled={readOnly}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-60" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Edad</label>
                    <input type="number" name="edad" value={formData.edad || ''} onChange={onChange} disabled={readOnly}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-60" />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Género</label>
                    <select name="genero" value={formData.genero || 'Sin Categorizar'} onChange={onChange} disabled={readOnly}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-60">
                        {GENEROS.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Provincia</label>
                    <select name="provincia" value={formData.provincia || ''} onChange={onChange} disabled={readOnly}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-60">
                        <option value="">Seleccione</option>
                        {PROVINCIAS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nacionalidad</label>
                    <input type="text" name="nacionalidad" value={formData.nacionalidad || ''} onChange={onChange} disabled={readOnly}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-60" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Estado Civil</label>
                    <input type="text" name="estadoCivil" value={formData.estadoCivil || ''} onChange={onChange} disabled={readOnly}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-60" />
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;
