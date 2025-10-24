import { useState, useEffect } from 'react';
import { Leaf, LayoutDashboard, Plus, Lightbulb, Trophy, LogOut, UserCircle, Info } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Dashboard from './Dashboard';
import ActivityForm from './ActivityForm';
import Recommendations from './Recommendations';
import Leaderboard from './Leaderboard';
import Profile from './Profile';
import About from './About';
import ShareButton from './ShareButton';
import { supabase } from '../lib/supabase';

type View = 'dashboard' | 'activity' | 'recommendations' | 'leaderboard' | 'profile' | 'about';

export default function MainApp() {
  const { user, profile, signOut } = useAuth();
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [totalCarbon, setTotalCarbon] = useState(0);

  useEffect(() => {
    if (user) {
      loadTotalCarbon();
    }
  }, [user, refreshTrigger]);

  const loadTotalCarbon = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('activities')
        .select('carbon_kg')
        .eq('user_id', user.id);

      if (error) throw error;

      const total = (data || []).reduce((sum, activity) => sum + Number(activity.carbon_kg), 0);
      setTotalCarbon(total);
    } catch (error) {
      console.error('Error loading total carbon:', error);
    }
  };

  const handleActivityAdded = () => {
    setRefreshTrigger(prev => prev + 1);
    setCurrentView('dashboard');
  };

  const navItems = [
    { id: 'dashboard' as View, icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'activity' as View, icon: Plus, label: 'Log Activity' },
    { id: 'recommendations' as View, icon: Lightbulb, label: 'Tips' },
    { id: 'leaderboard' as View, icon: Trophy, label: 'Leaderboard' },
    { id: 'profile' as View, icon: UserCircle, label: 'Profile' },
    { id: 'about' as View, icon: Info, label: 'About' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-green-500 to-teal-600 p-2 rounded-xl">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                EcoTrack
              </h1>
            </div>

            <div className="hidden md:flex items-center gap-6">
              {profile && (
                <>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Welcome back,</p>
                    <p className="font-semibold text-gray-800">{profile.username}</p>
                  </div>
                  <ShareButton points={profile.total_points} carbonSaved={totalCarbon} />
                </>
              )}
              <button
                onClick={signOut}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>

          <div className="flex gap-1 pb-2 overflow-x-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  currentView === item.id
                    ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {profile && (
          <div className="md:hidden mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Welcome back,</p>
              <p className="font-semibold text-gray-800">{profile.username}</p>
            </div>
            <ShareButton points={profile.total_points} carbonSaved={totalCarbon} />
          </div>
        )}

        {currentView === 'dashboard' && <Dashboard key={refreshTrigger} />}
        {currentView === 'activity' && <ActivityForm onActivityAdded={handleActivityAdded} />}
        {currentView === 'recommendations' && <Recommendations key={refreshTrigger} />}
        {currentView === 'leaderboard' && <Leaderboard key={refreshTrigger} />}
        {currentView === 'profile' && <Profile />}
        {currentView === 'about' && <About />}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600">
            <p className="text-sm">Track. Reduce. Save the planet.</p>
            <p className="text-xs mt-2">EcoTrack - Your personal carbon footprint tracker</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
