// ShareCard.tsx
import { Award, Leaf } from 'lucide-react';

interface ShareCardProps {
  points: number;
  carbonSaved: number;
}

const ShareCard = ({ points, carbonSaved }: ShareCardProps) => {
  return (
    <div
      id="share-capture-card"
      className="fixed"
      style={{
        width: '600px',
        height: '350px',
        left: '-9999px',
        top: '0',
        zIndex: -9999,
      }}
    >
      <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-700 rounded-2xl p-8 shadow-2xl flex flex-col justify-between">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Leaf className="w-8 h-8 text-white" />
            <h1 className="text-3xl font-bold text-white">EcoTrack Achievement</h1>
          </div>
          <p className="text-white text-lg opacity-90">Making a difference for our planet</p>
        </div>

        <div className="flex justify-around items-center gap-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 flex-1 text-center border border-white/30">
            <div className="flex justify-center mb-2">
              <Award className="w-10 h-10 text-yellow-300" />
            </div>
            <p className="text-5xl font-bold text-white mb-2">{points}</p>
            <p className="text-white text-sm font-medium">Eco-Points Earned</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 flex-1 text-center border border-white/30">
            <div className="flex justify-center mb-2">
              <Leaf className="w-10 h-10 text-green-200" />
            </div>
            <p className="text-5xl font-bold text-white mb-2">{carbonSaved.toFixed(1)}</p>
            <p className="text-white text-sm font-medium">kg CO₂ Reduced</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-white text-base font-semibold">#EcoTrackIndia | Join the green journey!</p>
        </div>
      </div>
    </div>
  );
};

export default ShareCard;