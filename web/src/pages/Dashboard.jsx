import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import statsService from '../services/stats.service';
import { Users, CheckCircle, Clock, MapPin, MessageSquare, PhoneCall, Star, TrendingUp } from 'lucide-react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await statsService.getStats();
                setStats(data);
            } catch (err) {
                console.error('Error fetching stats:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    if (!stats) return <div>Error al cargar estadísticas</div>;

    // Chart Data Preparation
    const provinciaData = {
        labels: Object.keys(stats.byProvincia),
        datasets: [{
            label: 'Postulantes',
            data: Object.values(stats.byProvincia),
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
        }]
    };

    const estadoData = {
        labels: Object.keys(stats.byEstado),
        datasets: [{
            data: Object.values(stats.byEstado),
            backgroundColor: [
                'rgba(34, 197, 94, 0.8)',
                'rgba(239, 68, 68, 0.8)',
                'rgba(234, 179, 8, 0.8)',
                'rgba(156, 163, 175, 0.8)',
            ],
        }]
    };

    const puestoData = {
        labels: Object.keys(stats.byPuesto),
        datasets: [{
            label: 'Postulantes',
            data: Object.values(stats.byPuesto),
            backgroundColor: 'rgba(99, 102, 241, 0.8)',
        }]
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard de Reclutamiento</h1>
                    <p className="text-gray-500">Métricas clave y estado de postulaciones</p>
                </div>
                <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
                    <Clock className="text-blue-500" size={18} />
                    <span className="text-sm font-medium">Última actualización: Hoy, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Postulantes</p>
                        <h3 className="text-2xl font-bold text-gray-900">{stats.total}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Tasa de Aprobación</p>
                        <h3 className="text-2xl font-bold text-gray-900">
                            {stats.total > 0 ? Math.round((stats.byResultadoFinal['Aprobado'] || 0) / stats.total * 100) : 0}%
                        </h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl">
                        <PhoneCall size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Estado de Contacto</p>
                        <h3 className="text-2xl font-bold text-gray-900">
                            {stats.byEstadoContacto['Contactado'] || 0} <span className="text-sm text-gray-400 font-normal">/ {stats.total}</span>
                        </h3>
                        <p className="text-[10px] text-gray-400 mt-1">Contactados vs Total</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                        <Star className="text-purple-600" size={16} />
                        <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Desempeño</p>
                    </div>

                    <div className="space-y-1.5">
                        {[
                            { label: 'Excelente', color: 'bg-green-500' },
                            { label: 'Muy Bueno', color: 'bg-emerald-400' },
                            { label: 'Bueno', color: 'bg-blue-400' },
                            { label: 'Regular', color: 'bg-yellow-400' },
                            { label: 'Malo', color: 'bg-red-400' },
                            { label: 'Sin Calificar', color: 'bg-gray-300' }
                        ].map(({ label, color }) => {
                            const count = stats.byDesempeno[label] || 0;
                            const percentage = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                            return (
                                <div key={label} className="flex items-center gap-2">
                                    <span className="text-[11px] font-semibold text-gray-700 w-24 truncate">{label}</span>
                                    <div className="flex-grow bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                        <div
                                            className={`${color} h-full transition-all duration-1000`}
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-[11px] font-bold text-blue-700 w-8 text-right">{percentage}%</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h4 className="text-lg font-bold text-gray-900 mb-6">Postulantes por Provincia</h4>
                    <div className="h-[300px]">
                        <Bar
                            data={provinciaData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } }
                            }}
                        />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h4 className="text-lg font-bold text-gray-900 mb-6">Estado de Entrevistas</h4>
                    <div className="h-[300px] flex justify-center">
                        <Doughnut
                            data={estadoData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                cutout: '70%',
                                plugins: {
                                    legend: {
                                        position: 'bottom',
                                        labels: { usePointStyle: true, padding: 20 }
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
                    <h4 className="text-lg font-bold text-gray-900 mb-6">Postulantes por Puesto</h4>
                    <div className="h-[300px]">
                        <Bar
                            data={puestoData}
                            options={{
                                indexAxis: 'y',
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
