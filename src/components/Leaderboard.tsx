import { useState, useEffect } from 'react';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { supabase, Profile } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function Leaderboard() {
  const { user, profile } = useAuth();
  const [topUsers, setTopUsers] = useState<Profile[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, [user, profile]);

  const loadLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('total_points', { ascending: false })
        .limit(10);

      if (error) throw error;
      setTopUsers(data || []);

      if (user) {
        // NOTE: If a user isn't in the top 10, this code won't fetch their *actual* global rank. 
        // For a full app, a separate RPC call to the DB would be needed. 
        // For this context, we only check against the top 10.
        const rank = (data || []).findIndex(p => p.id === user.id);
        setUserRank(rank >= 0 ? rank + 1 : null);
      }
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-600" />;
      default:
        return <Award className="w-6 h-6 text-gray-400" />;
    }
  };

  const getRankClass = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-400 text-white';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-500 text-white';
      default:
        return 'bg-white';
    }
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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Leaderboard</h2>
        <div className="flex items-center gap-2 text-green-600">
          <TrendingUp className="w-5 h-5" />
          <span className="font-semibold">Top Eco-Champions (India)</span>
        </div>
      </div>

      {profile && (
        <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">Your Points</p>
              <p className="text-4xl font-bold">{profile.total_points}</p>
            </div>
            {userRank && (
              <div className="text-right">
                <p className="text-sm opacity-90 mb-1">Your Rank</p>
                <p className="text-4xl font-bold">#{userRank}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Top 10 Users</h3>
        </div>

        <div className="divide-y divide-gray-200">
          {topUsers.map((user, index) => (
            <div
              key={user.id}
              className={`p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors ${
                getRankClass(index + 1)
              }`}
            >
              <div className="flex-shrink-0 w-12 text-center">
                {getRankIcon(index + 1)}
              </div>

              <div className="flex-shrink-0 w-8 text-center">
                <span className={`font-bold ${index < 3 ? '' : 'text-gray-600'}`}>
                  #{index + 1}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <p className={`font-semibold truncate ${index < 3 ? '' : 'text-gray-800'}`}>
                  {user.username}
                </p>
                <p className={`text-sm ${index < 3 ? 'opacity-90' : 'text-gray-500'}`}>
                  Joined {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>

              <div className="text-right">
                <p className={`font-bold text-lg ${index < 3 ? '' : 'text-green-600'}`}>
                  {user.total_points}
                </p>
                <p className={`text-sm ${index < 3 ? 'opacity-90' : 'text-gray-500'}`}>
                  points
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">How to Earn Points</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm">
              100
            </div>
            <div>
              <p className="font-medium text-gray-800">Walk or Bike</p>
              <p className="text-sm text-gray-600">Up to 100 points (50% bonus) for zero-emission travel like walking or cycling 20km</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm">
              100
            </div>
            <div>
              <p className="font-medium text-gray-800">Public Transport</p>
              <p className="text-sm text-gray-600">Up to 100 points (20% bonus) using bus, metro, or shared auto for 20km</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm">
              100
            </div>
            <div>
              <p className="font-medium text-gray-800">Low Energy Use</p>
              <p className="text-sm text-gray-600">Up to 100 points for minimal daily energy usage (higher points for lower kWh)</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm">
              100
            </div>
            <div>
              <p className="font-medium text-gray-800">Plant-Based Local Diet</p>
              <p className="text-sm text-gray-600">100 points for choosing a local plant-based or vegan diet for the day</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm">
              75
            </div>
            <div>
              <p className="font-medium text-gray-800">Traditional Vegetarian</p>
              <p className="text-sm text-gray-600">75 points for a traditional vegetarian diet (dal, roti, rice)</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm">
              40
            </div>
            <div>
              <p className="font-medium text-gray-800">Poultry/Fish Moderate</p>
              <p className="text-sm text-gray-600">40 points for moderate poultry, fish, or egg consumption</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}