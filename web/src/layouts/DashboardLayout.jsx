import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Settings, LogOut, User } from 'lucide-react';

import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Top Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-8">
                            <div className="flex-shrink-0 flex items-center">
                                <img src="/logo-tubhier.png" alt="Tubhier Logo" className="h-10 w-auto object-contain" />
                            </div>
                            <nav className="hidden md:flex space-x-4">
                                <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-md font-medium text-gray-900 bg-gray-100 hover:bg-gray-200">
                                    <LayoutDashboard size={20} />
                                    Dashboard
                                </Link>
                                <Link
                                    to="/postulantes"
                                    className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors ${window.location.pathname === '/postulantes' ? 'text-blue-700 bg-blue-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                                >
                                    <Users size={20} />
                                    Postulantes
                                </Link>
                                {user.rol === 'admin' && (
                                    <Link
                                        to="/usuarios"
                                        className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors ${window.location.pathname === '/usuarios' ? 'text-blue-700 bg-blue-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                                    >
                                        <Settings size={20} />
                                        Usuarios
                                    </Link>
                                )}
                            </nav>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                to="/profile"
                                className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors border border-blue-100"
                            >
                                <User size={16} />
                                <span>{user.nombre} ({user.rol})</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                                title="Cerrar sesión"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-4 mt-auto">
                <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} Tubhier Recruitment System. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default DashboardLayout;
