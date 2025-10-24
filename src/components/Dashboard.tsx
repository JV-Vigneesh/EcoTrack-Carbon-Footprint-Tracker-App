import { useState, useEffect } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { TrendingDown, Award, Calendar } from 'lucide-react';
import { supabase, Activity } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Dashboard() {
  const { user } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('week');

  useEffect(() => {
    if (user) {
      loadActivities();
    }
  }, [user, timeRange]);

  const loadActivities = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const daysAgo = timeRange === 'week' ? 7 : 30;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - daysAgo);

      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('user_id', user.id)
        .gte('activity_date', startDate.toISOString().split('T')[0])
        .order('activity_date', { ascending: true });

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error loading activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTotalCarbon = () => {
    return activities.reduce((sum, activity) => sum + Number(activity.carbon_kg), 0);
  };

  const getCarbonByType = () => {
    const byType: { [key: string]: number } = {
      transportation: 0,
      energy: 0,
      food: 0,
    };

    activities.forEach(activity => {
      byType[activity.activity_type] += Number(activity.carbon_kg);
    });

    return byType;
  };

  const getLineChartData = () => {
    const dateMap: { [key: string]: number } = {};

    activities.forEach(activity => {
      const date = activity.activity_date;
      dateMap[date] = (dateMap[date] || 0) + Number(activity.carbon_kg);
    });

    const sortedDates = Object.keys(dateMap).sort();

    return {
      // 1. CHANGE: Updated date formatting to Indian standard (DD/MM)
      labels: sortedDates.map(date => new Date(date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })),
      datasets: [
        {
          label: 'Carbon Footprint (kg CO₂)',
          data: sortedDates.map(date => dateMap[date]),
          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    };
  };

  const getDoughnutData = () => {
    const carbonByType = getCarbonByType();

    return {
      labels: ['Transportation', 'Energy', 'Food'],
      datasets: [
        {
          data: [carbonByType.transportation, carbonByType.energy, carbonByType.food],
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(234, 179, 8, 0.8)',
            'rgba(34, 197, 94, 0.8)',
          ],
          borderColor: [
            'rgb(59, 130, 246)',
            'rgb(234, 179, 8)',
            'rgb(34, 197, 94)',
          ],
          borderWidth: 2,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const label = context.label || '';
          const value = context.parsed || 0;
          return ` ${value.toFixed(2)} kg CO₂`;
        },
      },
    },
  },
};


  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const totalCarbon = getTotalCarbon();
  const avgDaily = activities.length > 0 ? totalCarbon / (timeRange === 'week' ? 7 : 30) : 0;
  const carbonByType = getCarbonByType();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        {/* 2. CHANGE: Minor title update for context */}
        <h2 className="text-2xl font-bold text-gray-800">Your EcoTrack Impact</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              timeRange === 'week'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              timeRange === 'month'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Month
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <TrendingDown className="w-6 h-6" />
            <h3 className="font-semibold">Total Carbon</h3>
          </div>
          <p className="text-3xl font-bold">{totalCarbon.toFixed(2)}</p>
          <p className="text-sm opacity-90">kg CO₂</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-6 h-6" />
            <h3 className="font-semibold">Daily Average</h3>
          </div>
          <p className="text-3xl font-bold">{avgDaily.toFixed(2)}</p>
          <p className="text-sm opacity-90">kg CO₂/day</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-6 h-6" />
            <h3 className="font-semibold">Activities</h3>
          </div>
          <p className="text-3xl font-bold">{activities.length}</p>
          <p className="text-sm opacity-90">logged</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Carbon Trend</h3>
          <div className="h-64">
            {activities.length > 0 ? (
              <Line data={getLineChartData()} options={chartOptions} />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                No data yet. Start logging activities!
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Carbon by Category</h3>
          <div className="h-64">
            {activities.length > 0 ? (
              <Doughnut data={getDoughnutData()} options={doughnutOptions} />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                No data yet. Start logging activities!
              </div>
            )}
          </div>
        </div>
      </div>

      {activities.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Breakdown</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Transportation</span>
              <span className="font-semibold">{carbonByType.transportation.toFixed(2)} kg CO₂</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Energy</span>
              <span className="font-semibold">{carbonByType.energy.toFixed(2)} kg CO₂</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Food</span>
              <span className="font-semibold">{carbonByType.food.toFixed(2)} kg CO₂</span>
            </div>
          </div>
        </div>
      )}

      {activities.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {activities.slice().reverse().map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 hover:border-green-300 transition-all"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-800 capitalize">
                      {activity.activity_type}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(activity.activity_date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {activity.activity_type === 'transportation' && activity.transportation_mode && (
                      <span>
                        {activity.transportation_mode.replace(/_/g, ' ')} - {activity.distance_km} km
                      </span>
                    )}
                    {activity.activity_type === 'energy' && activity.energy_kwh && (
                      <span>{activity.energy_kwh} kWh</span>
                    )}
                    {activity.activity_type === 'food' && activity.diet_type && (
                      <span>{activity.diet_type.replace(/-/g, ' ')}</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm font-semibold text-red-600">
                    {Number(activity.carbon_kg).toFixed(2)} kg CO₂
                  </span>
                  <span className="text-xs font-medium text-green-600">
                    +{activity.points_earned} pts
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}