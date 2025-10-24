import { useState, useEffect } from 'react';
import { Lightbulb, Leaf, Cloud } from 'lucide-react';
import { supabase, Activity } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { getRecommendations } from '../utils/carbonCalculator';

export default function Recommendations() {
  const { user } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadData();
      loadWeather();
    }
  }, [user]);

  const loadData = async () => {
    if (!user) return;

    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('user_id', user.id)
        .gte('activity_date', thirtyDaysAgo.toISOString().split('T')[0]);

      if (error) throw error;

      const activitiesData = data || [];
      setActivities(activitiesData);

      const totalCarbon = activitiesData.reduce((sum, activity) => sum + Number(activity.carbon_kg), 0);
      setRecommendations(getRecommendations(activitiesData, totalCarbon));
    } catch (error) {
      console.error('Error loading activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadWeather = async () => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=17.384&longitude=78.4564&current=temperature_2m,weather_code&timezone=auto`
      );
      const data = await response.json();
      setWeather(data.current);
    } catch (error) {
      console.error('Error loading weather:', error);
    }
  };

  const getWeatherRecommendation = () => {
    if (!weather) return null;

    const temp = weather.temperature_2m;
    const weatherCode = weather.weather_code;

    if (weatherCode === 0 || weatherCode === 1) {
      return 'Perfect weather today! Consider walking or biking instead of driving.';
    } else if (temp > 75) {
      return 'Hot day ahead. Use fans instead of AC when possible to save energy.';
    } else if (temp < 50) {
      return 'Cool weather. Layer clothing before turning up the heat to reduce energy use.';
    }

    return 'Weather looks good for eco-friendly transportation!';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Personalized Recommendations</h2>

      {weather && (
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <Cloud className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Weather-Based Tip</h3>
          </div>
          <p className="text-lg">{getWeatherRecommendation()}</p>
          <p className="text-sm opacity-90 mt-2">
            Current: {weather.temperature_2m}°C
          </p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="w-6 h-6 text-yellow-500" />
          <h3 className="text-lg font-semibold text-gray-800">Tips to Reduce Your Footprint</h3>
        </div>

        {recommendations.length > 0 ? (
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className="flex gap-4 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-100 hover:border-green-300 transition-all"
              >
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Leaf className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Start logging activities to get personalized recommendations!</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Impact Facts (India)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm font-semibold text-gray-800 mb-2">Transportation</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                    Switching from a private two-wheeler to Metro or Bus for a 10 km daily commute can save over 400 kg CO₂ per year.
                </p>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                <p className="text-sm font-semibold text-gray-800 mb-2">Energy</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                    Setting your AC temperature just 1 degree higher (from 24°C to 25°C) can save up to 6% on your electricity bill.
                </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <p className="text-sm font-semibold text-gray-800 mb-2">Diet</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                    Reducing food waste by just 25% in a typical Indian household can save over 100 kg of CO₂ equivalent annually.
                </p>
            </div>

            <div className="p-4 bg-teal-50 rounded-lg border border-teal-100">
                <p className="text-sm font-semibold text-gray-800 mb-2">Waste</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                    Using a cloth or reusable bag instead of single-use plastic bags for one year saves roughly 400 bags from landfills.
                </p>
            </div>
        </div>
    </div>
    </div>
  );
}
