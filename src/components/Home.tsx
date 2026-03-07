import { Leaf, TrendingDown, Award, Users, Zap, Lightbulb, ArrowRight } from 'lucide-react';

interface HomeProps {
  onGetStarted: () => void;
}

export default function Home({ onGetStarted }: HomeProps) {
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
            <button
              onClick={onGetStarted}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Track Your Carbon Footprint, Save the Planet
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                EcoTrack helps you understand and reduce your environmental impact with personalized insights tailored for Indian lifestyles. Make sustainable choices and earn rewards while making a difference.
              </p>
              <button
                onClick={onGetStarted}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl shadow-2xl p-8 text-white">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <TrendingDown className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Track Activities</p>
                    <p className="text-sm opacity-90">Log transportation, energy & diet</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Earn Points</p>
                    <p className="text-sm opacity-90">Get rewarded for eco-friendly choices</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Get Insights</p>
                    <p className="text-sm opacity-90">Receive personalized recommendations</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Join Community</p>
                    <p className="text-sm opacity-90">Compete on the leaderboard</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How It Works</h3>
              <p className="text-xl text-gray-600">Simple steps to make a sustainable impact</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-8 border border-green-100">
                <div className="bg-gradient-to-br from-green-500 to-teal-600 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">
                  1
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Sign Up & Create Profile</h4>
                <p className="text-gray-600">Create your account and tell us about yourself. It takes less than a minute!</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-100">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">
                  2
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Log Your Activities</h4>
                <p className="text-gray-600">Record your daily transportation, energy usage, and food choices in seconds.</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-8 border border-yellow-100">
                <div className="bg-gradient-to-br from-yellow-500 to-orange-600 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">
                  3
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Track & Improve</h4>
                <p className="text-gray-600">Get insights, earn points, and compete with others while reducing your footprint.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Choose EcoTrack?</h3>
            <p className="text-xl text-gray-600">Built for India, powered by science</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <Zap className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">India-Specific Data</h4>
                <p className="text-gray-600">All emission factors are calibrated for Indian transportation, energy grid, and food systems.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Award className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Gamified Experience</h4>
                <p className="text-gray-600">Earn points, climb the leaderboard, and share your achievements with friends.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Lightbulb className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Smart Recommendations</h4>
                <p className="text-gray-600">Get personalized tips based on your lifestyle and biggest emission sources.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Users className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Community Driven</h4>
                <p className="text-gray-600">Join thousands of eco-conscious Indians making a real difference together.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Make a Difference?</h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join EcoTrack today and start tracking, reducing, and sharing your journey toward a more sustainable future.
            </p>
            <button
              onClick={onGetStarted}
              className="px-8 py-4 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
            >
              Get Started Now
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-br from-green-500 to-teal-600 p-2 rounded-lg">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-gray-900">EcoTrack</span>
              </div>
              <p className="text-sm text-gray-600">Your personal carbon footprint tracker for India.</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><button onClick={onGetStarted} className="hover:text-green-600 transition-colors">Dashboard</button></li>
                <li><button className="hover:text-green-600 transition-colors">Leaderboard</button></li>
                <li><button className="hover:text-green-600 transition-colors">Tips</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><button className="hover:text-green-600 transition-colors">About Us</button></li>
                <li><button className="hover:text-green-600 transition-colors">Privacy</button></li>
                <li><button className="hover:text-green-600 transition-colors">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Impact</h4>
              <p className="text-sm text-gray-600 mb-3">Join thousands reducing their carbon footprint together.</p>
              <button
                onClick={onGetStarted}
                className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 transition-all"
              >
                Start Now
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <p className="text-center text-sm text-gray-600">
              Track. Reduce. Save the planet. © 2024 EcoTrack. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
