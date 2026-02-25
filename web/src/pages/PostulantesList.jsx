import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import postulanteService from '../services/postulante.service';
import SearchFilters from '../components/SearchFilters';
import { Plus, Eye, Trash2, ShieldAlert, ChevronLeft, ChevronRight } from 'lucide-react';

const PostulantesList = () => {
    const [postulantes, setPostulantes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0
    });
    const [activeFilters, setActiveFilters] = useState({});
    const { user } = useAuth();
    const navigate = useNavigate();

    const isAdmin = user?.rol?.toLowerCase() === 'admin';
    const isJefe = user?.rol?.toLowerCase() === 'jefe de rrhh';
    const canDelete = isAdmin || isJefe;
    const canCreate = isAdmin || isJefe;

    const fetchPostulantes = async (page = 1, limit = 10, filters = {}) => {
        setLoading(true);
        try {
            const data = await postulanteService.getAll({ ...filters, page, limit });
            setPostulantes(data.items);
            setPagination({
                total: data.total,
                page: data.page,
                limit: data.limit,
                totalPages: data.totalPages
            });
        } catch (error) {
            console.error('Error fetching postulantes:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPostulantes(pagination.page, pagination.limit, activeFilters);
    }, [pagination.page, pagination.limit, activeFilters]);

    const handleSearch = (filters) => {
        setActiveFilters(filters);
        setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page on new search
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPagination(prev => ({ ...prev, page: newPage }));
        }
    };

    const handleLimitChange = (e) => {
        setPagination(prev => ({ ...prev, limit: parseInt(e.target.value), page: 1 }));
    };

    const handleDelete = async (id, nombre) => {
        if (!window.confirm(`¿Está seguro que desea eliminar a ${nombre}? ${isAdmin ? '(Borrado físico permanente)' : '(Borrado lógico)'}`)) {
            return;
        }

        try {
            await postulanteService.remove(id);
            setPostulantes(prev => prev.filter(p => p._id !== id));
        } catch (error) {
            console.error('Error deleting postulante:', error);
            alert('Error al eliminar el postulante');
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestión de Postulantes</h1>
                    <p className="text-gray-500">Administra el talento, sus procesos y documentación</p>
                </div>
                {canCreate && (
                    <button
                        onClick={() => navigate('/postulantes/new')}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors"
                    >
                        <Plus size={18} /> Nuevo Postulante
                    </button>
                )}
            </div>

            <SearchFilters onSearch={handleSearch} />

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 font-semibold text-sm uppercase tracking-wider">
                                <th className="p-4">Postulante</th>
                                <th className="p-4">DNI</th>
                                <th className="p-4">Provincia</th>
                                <th className="p-4">Puesto</th>
                                <th className="p-4">Título</th>
                                <th className="p-4">Estado</th>
                                <th className="p-4 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="p-8 text-center text-gray-500">
                                        <div className="flex justify-center mb-2">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                        </div>
                                        Cargando postulantes...
                                    </td>
                                </tr>
                            ) : postulantes.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="p-8 text-center text-gray-500">
                                        No se encontraron postulantes que coincidan con los filtros.
                                    </td>
                                </tr>
                            ) : (
                                postulantes.map(postulante => (
                                    <tr key={postulante._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-medium text-gray-900 border-l-4 border-transparent hover:border-blue-500">
                                            {postulante.apellido}, {postulante.nombre}
                                        </td>
                                        <td className="p-4 text-gray-600">{postulante.dni}</td>
                                        <td className="p-4 text-gray-600">{postulante.provincia || '-'}</td>
                                        <td className="p-4 text-gray-600">{postulante.puesto?.nombre || '-'}</td>
                                        <td className="p-4 text-gray-600">{postulante.tituloPrincipal?.nombre || '-'}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                        ${postulante.estadoEntrevista === 'Confirma' ? 'bg-green-100 text-green-800' :
                                                    postulante.estadoEntrevista === 'Desiste' ? 'bg-red-100 text-red-800' :
                                                        postulante.estadoEntrevista === 'Volver A Contactar' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-gray-100 text-gray-800'}`}>
                                                {postulante.estadoEntrevista}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <Link
                                                    to={`/postulantes/${postulante._id}`}
                                                    className="p-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-800 rounded-md transition-colors"
                                                    title="Ver / Editar Recluta"
                                                >
                                                    <Eye size={18} />
                                                </Link>
                                                {canDelete && (
                                                    <button
                                                        onClick={() => handleDelete(postulante._id, `${postulante.nombre} ${postulante.apellido}`)}
                                                        className={`p-1.5 rounded-md transition-colors ${isAdmin ? 'text-red-700 bg-red-100 hover:bg-red-200' : 'text-orange-600 bg-orange-50 hover:bg-orange-100'}`}
                                                        title={isAdmin ? "Hard Delete (Admin)" : "Soft Delete"}
                                                    >
                                                        {isAdmin ? <ShieldAlert size={18} /> : <Trash2 size={18} />}
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="bg-gray-50 p-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <span>Mostrar:</span>
                            <select
                                value={pagination.limit}
                                onChange={handleLimitChange}
                                className="border border-gray-300 rounded-lg px-2 py-1.5 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            >
                                {[10, 20, 50, 100].map(val => (
                                    <option key={val} value={val}>{val}</option>
                                ))}
                            </select>
                        </div>
                        {!loading && (
                            <span>
                                Total: <span className="font-semibold text-gray-900">{pagination.total}</span> registros
                            </span>
                        )}
                    </div>

                    {!loading && pagination.totalPages > 1 && (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handlePageChange(pagination.page - 1)}
                                disabled={pagination.page === 1}
                                className="p-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                                title="Anterior"
                            >
                                <ChevronLeft size={18} />
                            </button>

                            <div className="flex items-center gap-1">
                                {[...Array(pagination.totalPages)].map((_, i) => {
                                    const pageNum = i + 1;
                                    if (
                                        pageNum === 1 ||
                                        pageNum === pagination.totalPages ||
                                        (pageNum >= pagination.page - 2 && pageNum <= pagination.page + 2)
                                    ) {
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => handlePageChange(pageNum)}
                                                className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${pagination.page === pageNum
                                                    ? 'bg-blue-600 text-white shadow-md'
                                                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    }
                                    if (
                                        (pageNum === 2 && pagination.page > 4) ||
                                        (pageNum === pagination.totalPages - 1 && pagination.page < pagination.totalPages - 3)
                                    ) {
                                        return <span key={pageNum} className="px-1 text-gray-400">...</span>;
                                    }
                                    return null;
                                })}
                            </div>

                            <button
                                onClick={() => handlePageChange(pagination.page + 1)}
                                disabled={pagination.page === pagination.totalPages}
                                className="p-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                                title="Siguiente"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostulantesList;
