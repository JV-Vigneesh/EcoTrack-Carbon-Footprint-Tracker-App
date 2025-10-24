import { useState } from 'react';
import { Car, Zap, Utensils, Plus } from 'lucide-react'; 
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { calculateTransportationCarbon, calculateEnergyCarbon, calculateFoodCarbon } from '../utils/carbonCalculator';

interface ActivityFormProps {
  onActivityAdded: () => void;
}

export default function ActivityForm({ onActivityAdded }: ActivityFormProps) {
  const { user, refreshProfile } = useAuth();
  const [activityType, setActivityType] = useState<'transportation' | 'energy' | 'food'>('transportation');
  // 1. STATE CHANGE: Renamed from distanceMiles to distanceKm
  const [transportationMode, setTransportationMode] = useState('two_wheeler'); 
  const [distanceKm, setDistanceKm] = useState(''); 
  const [energyKwh, setEnergyKwh] = useState('');
  // 2. STATE CHANGE: Updated initial diet type
  const [dietType, setDietType] = useState('traditional-vegetarian'); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      let carbonResult;
      let activityData: any = {
        user_id: user.id,
        activity_type: activityType,
        activity_date: new Date().toISOString().split('T')[0],
      };

      if (activityType === 'transportation') {
        // Use distanceKm state
        const distance = parseFloat(distanceKm);
        if (isNaN(distance) || distance <= 0) {
          throw new Error('Please enter a valid distance in kilometers');
        }
        carbonResult = calculateTransportationCarbon(transportationMode, distance); 
        activityData.transportation_mode = transportationMode;
        // 3. DATA FIELD CHANGE: distance_miles -> distance_km for database insertion
        activityData.distance_km = distance; 
      } else if (activityType === 'energy') {
        const kwh = parseFloat(energyKwh);
        if (isNaN(kwh) || kwh <= 0) {
          throw new Error('Please enter a valid energy amount');
        }
        carbonResult = calculateEnergyCarbon(kwh);
        activityData.energy_kwh = kwh;
      } else {
        carbonResult = calculateFoodCarbon(dietType);
        activityData.diet_type = dietType;
      }

      activityData.carbon_kg = carbonResult.carbon_kg;
      activityData.points_earned = carbonResult.points_earned;

      const { error: insertError } = await supabase
        .from('activities')
        .insert([activityData]);

      if (insertError) throw insertError;

      const { data: profile } = await supabase
        .from('profiles')
        .select('total_points')
        .eq('id', user.id)
        .single();

      if (profile) {
        await supabase
          .from('profiles')
          .update({ total_points: profile.total_points + carbonResult.points_earned })
          .eq('id', user.id);
      }

      setSuccess(true);
      setDistanceKm('');
      setEnergyKwh('');
      setTimeout(() => setSuccess(false), 3000);
      await refreshProfile();
      onActivityAdded();
    } catch (err: any) {
      setError(err.message || 'Failed to log activity');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Log Activity</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
          Activity logged successfully!
        </div>
      )}

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActivityType('transportation')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
            activityType === 'transportation'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Car className="w-5 h-5" />
          Transport
        </button>
        <button
          onClick={() => setActivityType('energy')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
            activityType === 'energy'
              ? 'bg-yellow-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Zap className="w-5 h-5" />
          Energy
        </button>
        <button
          onClick={() => setActivityType('food')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
            activityType === 'food'
              ? 'bg-green-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Utensils className="w-5 h-5" />
          Food
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {activityType === 'transportation' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transportation Mode
              </label>
              <select
                value={transportationMode}
                onChange={(e) => setTransportationMode(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="two_wheeler">Two-Wheeler (Scooter/Bike)</option>
                <option value="car">Car (Petrol/Diesel)</option>
                <option value="electric_car">Electric Car</option>
                <option value="auto_rickshaw">Auto Rickshaw</option>
                <option value="bus">Public Bus</option>
                <option value="metro_train">Metro / Train</option>
                <option value="bike">Bicycle / Cycle</option>
                <option value="walk">Walking</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distance (kilometers)
              </label>
              <input
                type="number"
                step="0.1"
                value={distanceKm} // Using distanceKm state
                onChange={(e) => setDistanceKm(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Enter distance traveled in km"
                required
              />
            </div>
          </>
        )}

        {activityType === 'energy' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Energy Usage (kWh)
            </label>
            <input
              type="number"
              step="0.1"
              value={energyKwh}
              onChange={(e) => setEnergyKwh(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
              placeholder="Enter daily energy usage"
              required
            />
            <p className="mt-2 text-xs text-gray-500">
              Average Indian urban home uses ~6-10 kWh per day
            </p>
          </div>
        )}

        {activityType === 'food' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Diet Type (Today)
            </label>
            <select
              value={dietType}
              onChange={(e) => setDietType(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            >
              <option value="dairy-meat-heavy">Heavy Dairy / Red Meat</option>
              <option value="poultry-moderate">Poultry, Fish, or Egg (Moderate)</option>
              <option value="traditional-vegetarian">Traditional Vegetarian (Dal, Roti/Rice)</option>
              <option value="plant-based-local">Plant-Based / Vegan (Local Focus)</option>
            </select>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          {loading ? 'Logging...' : 'Log Activity'}
        </button>
      </form>
    </div>
  );
}