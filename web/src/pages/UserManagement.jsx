import React, { useState, useEffect } from 'react';
import {
    UserPlus, Edit2, Trash2, Key, Shield, Mail, User,
    Search, AlertCircle, Loader2, X, Check, Eye, EyeOff
} from 'lucide-react';
import userService from '../services/user.service';
import supportService from '../services/support.service';
import { useAuth } from '../context/AuthContext';

const UserManagement = () => {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Modals
    const [showUserModal, setShowUserModal] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);

    // Form state
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        rol: ''
    });
    const [resetData, setResetData] = useState({
        userId: '',
        userName: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [usersData, rolesData] = await Promise.all([
                userService.getAll(),
                supportService.getRoles()
            ]);
            setUsers(usersData);
            setRoles(rolesData);
        } catch (err) {
            setError('Error al cargar datos. Por favor, reintente.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenCreateModal = () => {
        setEditingUser(null);
        setFormData({
            nombre: '',
            apellido: '',
            email: '',
            password: '',
            rol: roles.length > 0 ? roles[roles.length - 1].nombre : ''
        });
        setShowUserModal(true);
    };

    const handleOpenEditModal = (user) => {
        setEditingUser(user);
        setFormData({
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            password: '', // Leave blank when editing
            rol: user.rol
        });
        setShowUserModal(true);
    };

    const handleOpenResetModal = (user) => {
        setResetData({
            userId: user._id,
            userName: `${user.nombre} ${user.apellido}`,
            newPassword: '',
            confirmPassword: ''
        });
        setShowResetModal(true);
    };

    const handleSubmitUser = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            if (editingUser) {
                // Remove password if empty during update
                const updatePayload = { ...formData };
                if (!updatePayload.password) delete updatePayload.password;

                await userService.update(editingUser._id, updatePayload);
            } else {
                await userService.create(formData);
            }
            setShowUserModal(false);
            fetchData();
        } catch (err) {
            setError(err.response?.data?.error || 'Error al guardar el usuario.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (resetData.newPassword !== resetData.confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setSubmitting(true);
        setError('');
        try {
            await userService.resetPassword(resetData.userId, resetData.newPassword);
            setShowResetModal(false);
            // Optionally show success toast
        } catch (err) {
            setError(err.response?.data?.error || 'Error al resetear la contraseña.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteUser = async (user) => {
        if (user._id === currentUser.id) {
            alert('No puedes eliminar tu propio usuario.');
            return;
        }

        if (window.confirm(`¿Estás seguro de que deseas eliminar al usuario ${user.nombre} ${user.apellido}?`)) {
            try {
                await userService.deleteUser(user._id);
                fetchData();
            } catch {
                setError('Error al eliminar el usuario.');
            }
        }
    };

    const filteredUsers = users.filter(u =>
        u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 size={40} className="animate-spin text-blue-600 mb-4" />
                <p className="text-gray-500">Cargando usuarios...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
                    <p className="text-gray-500">Administra el acceso y roles del personal de RRHH.</p>
                </div>
                <button
                    onClick={handleOpenCreateModal}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                    <UserPlus size={20} />
                    Nuevo Usuario
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border-l-4 border-red-500 flex items-center gap-3 text-red-700 rounded-md">
                    <AlertCircle size={20} />
                    <p>{error}</p>
                </div>
            )}

            {/* List and Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                    <div className="relative max-w-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Search size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar por nombre o email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none sm:text-sm transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Usuario</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Rol</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredUsers.map((u) => (
                                <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                                                {u.nombre[0].toUpperCase()}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{u.nombre} {u.apellido}</div>
                                                <div className="text-xs text-gray-500">ID: {u._id.substring(0, 8)}...</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-600">{u.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${u.rol === 'admin' ? 'bg-purple-100 text-purple-800' :
                                                u.rol === 'jefe de rrhh' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-green-100 text-green-800'}`}
                                        >
                                            {u.rol}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleOpenResetModal(u)}
                                                className="p-2 text-gray-400 hover:text-orange-600 transition-colors"
                                                title="Resetear contraseña"
                                            >
                                                <Key size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleOpenEditModal(u)}
                                                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                                title="Editar datos"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            {u._id !== currentUser.id && (
                                                <button
                                                    onClick={() => handleDeleteUser(u)}
                                                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                                    title="Eliminar usuario"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredUsers.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No se encontraron usuarios que coincidan con la búsqueda.
                    </div>
                )}
            </div>

            {/* User Create/Edit Modal */}
            {showUserModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">
                                {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
                            </h3>
                            <button onClick={() => setShowUserModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmitUser} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">Nombre</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.nombre}
                                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">Apellido</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.apellido}
                                        onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>

                            {!editingUser && (
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">Contraseña Inicial</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required={!editingUser}
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Rol</label>
                                <select
                                    required
                                    value={formData.rol}
                                    onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                >
                                    <option value="" disabled>Seleccione un rol</option>
                                    {roles.map(r => (
                                        <option key={r._id} value={r.nombre}>{r.nombre}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowUserModal(false)}
                                    className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 py-2 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                                >
                                    {submitting && <Loader2 size={18} className="animate-spin" />}
                                    {editingUser ? 'Actualizar' : 'Crear Usuario'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Reset Password Modal */}
            {showResetModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Key className="text-orange-500" />
                                Resetear Contraseña
                            </h3>
                            <button onClick={() => setShowResetModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="mb-6 p-3 bg-orange-50 text-orange-800 rounded-lg text-sm border border-orange-100 italic">
                            Estás reseteando la contraseña del usuario: <strong>{resetData.userName}</strong>
                        </div>

                        <form onSubmit={handleResetPassword} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Nueva Contraseña</label>
                                <input
                                    type="password"
                                    required
                                    value={resetData.newPassword}
                                    onChange={(e) => setResetData({ ...resetData, newPassword: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Confirmar Contraseña</label>
                                <input
                                    type="password"
                                    required
                                    value={resetData.confirmPassword}
                                    onChange={(e) => setResetData({ ...resetData, confirmPassword: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowResetModal(false)}
                                    className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 py-2 px-4 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                                >
                                    {submitting && <Loader2 size={18} className="animate-spin" />}
                                    Resetear
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
