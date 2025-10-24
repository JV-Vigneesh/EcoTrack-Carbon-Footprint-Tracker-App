import { Leaf, Target, Users, TrendingDown, Globe, Heart, Award, Lightbulb } from 'lucide-react';

export default function About() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl shadow-lg p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <Leaf className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">About EcoTrack</h1>
            <p className="text-lg opacity-90 mt-1">Track. Reduce. Save the planet.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          EcoTrack is India's personal carbon footprint tracker designed to help individuals understand and reduce their environmental impact. We believe that small, consistent actions by millions of people can create massive positive change for our planet.
        </p>
        <p className="text-gray-700 leading-relaxed">
          By tracking your daily activities across transportation, energy consumption, and food choices, EcoTrack empowers you with data-driven insights tailored specifically for Indian lifestyles and emission factors.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">What We Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Track Your Impact</h3>
              <p className="text-sm text-gray-600">
                Monitor your carbon footprint from transportation, energy usage, and dietary choices using India-specific emission factors.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Get Personalized Tips</h3>
              <p className="text-sm text-gray-600">
                Receive tailored recommendations based on your activities to help you make more sustainable choices every day.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Earn Eco Points</h3>
              <p className="text-sm text-gray-600">
                Get rewarded with points for eco-friendly choices like using public transport, reducing energy consumption, and plant-based meals.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-teal-600" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Join the Community</h3>
              <p className="text-sm text-gray-600">
                Compete with fellow eco-champions on the leaderboard and share your achievements to inspire others.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Carbon Tracking Matters</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Globe className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Climate Action Starts With You</h3>
              <p className="text-sm text-gray-600">
                India is the world's third-largest emitter of greenhouse gases. Individual actions, when multiplied across millions of people, can significantly reduce our national carbon footprint.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Target className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Meet Global Goals</h3>
              <p className="text-sm text-gray-600">
                India has committed to achieving net-zero emissions by 2070. Every small step you take today contributes to this ambitious national and global climate goal.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Heart className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Protect Our Future</h3>
              <p className="text-sm text-gray-600">
                By understanding and reducing your carbon footprint, you're helping protect the environment, improve air quality, and create a healthier future for generations to come.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl shadow-lg p-6 border border-green-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Data Sources</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          EcoTrack uses emission factors specifically calibrated for India, based on research from:
        </p>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">•</span>
            <span>Indian Network for Climate Change Assessment (INCCA)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">•</span>
            <span>Centre for Study of Science, Technology and Policy (CSTEP)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">•</span>
            <span>Indian Institute of Science (IISc) transportation studies</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">•</span>
            <span>National Centre for Biotechnology Information dietary research</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">•</span>
            <span>Indian grid emission factors from INSPANET</span>
          </li>
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Join the Movement</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Whether you're taking the metro instead of driving, choosing a vegetarian meal, or simply being mindful of your energy consumption, every action counts. EcoTrack is here to guide and motivate you on your sustainability journey.
        </p>
        <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-6 text-white text-center">
          <p className="text-lg font-semibold mb-2">Together, we can make a difference.</p>
          <p className="text-sm opacity-90">Start tracking your carbon footprint today and be part of India's green revolution!</p>
        </div>
      </div>
    </div>
  );
}
