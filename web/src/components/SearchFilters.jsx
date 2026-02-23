import React, { useState, useEffect } from 'react';
import supportService from '../services/support.service';
import { Search, X, Filter } from 'lucide-react';

const PROVINCIAS = [
    'Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'CABA', 'Córdoba',
    'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja',
    'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan',
    'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero',
    'Tierra del Fuego', 'Tucumán'
];

const ESTADOS_ENTREVISTA = [
    'Confirma', 'Desiste', 'No Responde', 'Volver A Contactar', 'Sin Categorizar'
];

const SearchFilters = ({ onSearch }) => {
    const [filters, setFilters] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        provincia: '',
        puesto: '',
        tituloPrincipal: '',
        estadoEntrevista: ''
    });

    const [puestos, setPuestos] = useState([]);
    const [titulos, setTitulos] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const loadSupportData = async () => {
            try {
                const [puestosData, titulosData] = await Promise.all([
                    supportService.getPuestos(),
                    supportService.getTitulos()
                ]);
                setPuestos(puestosData);
                setTitulos(titulosData);
            } catch (error) {
                console.error('Error loading support data for filters', error);
            }
        };
        loadSupportData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Clean empty values
        const cleanFilters = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== ''));
        onSearch(cleanFilters);
    };

    const handleClear = () => {
        const empty = {
            nombre: '', apellido: '', dni: '', provincia: '', puesto: '', tituloPrincipal: '', estadoEntrevista: ''
        };
        setFilters(empty);
        onSearch({});
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div
                className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-2 text-gray-700 font-semibold">
                    <Filter size={18} />
                    <span>Filtros de Búsqueda Avanzada</span>
                </div>
                <span className="text-sm text-gray-500 font-medium">
                    {isExpanded ? 'Ocultar' : 'Mostrar'}
                </span>
            </div>

            {isExpanded && (
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Nombre</label>
                            <input type="text" name="nombre" value={filters.nombre} onChange={handleChange} className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none" placeholder="Ej. Juan" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Apellido</label>
                            <input type="text" name="apellido" value={filters.apellido} onChange={handleChange} className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none" placeholder="Ej. Pérez" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">DNI</label>
                            <input type="text" name="dni" value={filters.dni} onChange={handleChange} className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none" placeholder="Sin puntos" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Provincia</label>
                            <select name="provincia" value={filters.provincia} onChange={handleChange} className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none bg-white">
                                <option value="">Todas</option>
                                {PROVINCIAS.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Puesto</label>
                            <select name="puesto" value={filters.puesto} onChange={handleChange} className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none bg-white">
                                <option value="">Todos</option>
                                {puestos.map(p => <option key={p._id} value={p._id}>{p.nombre}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Título</label>
                            <select name="tituloPrincipal" value={filters.tituloPrincipal} onChange={handleChange} className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none bg-white">
                                <option value="">Todos</option>
                                {titulos.map(t => <option key={t._id} value={t._id}>{t.nombre}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Estado Entrevista</label>
                            <select name="estadoEntrevista" value={filters.estadoEntrevista} onChange={handleChange} className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none bg-white">
                                <option value="">Cualquiera</option>
                                {ESTADOS_ENTREVISTA.map(e => <option key={e} value={e}>{e}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
                        <button type="button" onClick={handleClear} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
                            <X size={16} /> Limpiar
                        </button>
                        <button type="submit" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors shadow-sm">
                            <Search size={16} /> Buscar
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default SearchFilters;
