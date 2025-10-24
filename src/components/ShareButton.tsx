import { Share2, Twitter, Facebook, Linkedin, Download, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';
import html2canvas from 'html2canvas';
import ShareCard from '../components/ShareCard.tsx';

interface ShareButtonProps {
  points: number;
  carbonSaved: number;
}

export default function ShareButton({ points, carbonSaved }: ShareButtonProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [loadingShare, setLoadingShare] = useState(false);

  const shareText = `I've earned ${points} eco-points and reduced my carbon footprint by ${carbonSaved.toFixed(1)} kg CO₂ with EcoTrack! Join me in tracking and reducing your environmental impact. 🌍🌱`;
  const shareUrl = window.location.origin;

  const handleGenerateAndShare = () => {
    setShowOptions(!showOptions);
  };

  const handleDownloadImage = async () => {
    setLoadingShare(true);

    const input = document.getElementById('share-capture-card');
    if (!input) {
        console.error("Share card element not found.");
        setLoadingShare(false);
        return;
    }

    try {
        const canvas = await html2canvas(input, {
            useCORS: true,
            scale: 2,
            backgroundColor: null,
        });

        canvas.toBlob((blob) => {
            if (!blob) return;

            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `EcoTrack_Achievement_${points}pts.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }, 'image/png');

    } catch (error) {
        console.error('Failed to generate image:', error);
    } finally {
        setLoadingShare(false);
    }
  };

  // --- Custom Social Media Share (Fallback) ---
  // (Note: These links will share the link and text, but NOT the image file.)

  const handleTwitterShare = () => {
    const text = `I've earned ${points} eco-points and reduced my carbon footprint by ${carbonSaved.toFixed(1)} kg CO₂ with EcoTrack! 🌍\n\nJoin me: ${shareUrl}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'width=600,height=400');
    setShowOptions(false);
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/dialog/share?app_id=YOUR_APP_ID&display=popup&href=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'width=600,height=400');
    setShowOptions(false);
  };

  const handleLinkedInShare = () => {
    const text = `I've earned ${points} eco-points and reduced my carbon footprint by ${carbonSaved.toFixed(1)} kg CO₂ with EcoTrack! 🌍 ${shareUrl}`;
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    navigator.clipboard.writeText(text);
    window.open(url, '_blank', 'width=600,height=400');
    setShowOptions(false);
  };

  const handleWhatsAppShare = () => {
    const text = `I've earned ${points} eco-points and reduced my carbon footprint by ${carbonSaved.toFixed(1)} kg CO₂ with EcoTrack! 🌍\n\nJoin me: ${shareUrl}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setShowOptions(false);
  };

  const handleTelegramShare = () => {
    const text = `I've earned ${points} eco-points and reduced my carbon footprint by ${carbonSaved.toFixed(1)} kg CO₂ with EcoTrack! 🌍`;
    const url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setShowOptions(false);
  };

  return (
    <>
      {/* 1. The Share Card component (Hidden from view) */}
      <ShareCard points={points} carbonSaved={carbonSaved} />
      
      {/* 2. The main button */}
      <div className="relative">
        <button
          onClick={handleGenerateAndShare} // Use the new image-generating handler
          disabled={loadingShare}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-teal-700 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-wait"
        >
          <Share2 className="w-4 h-4" />
          Share Achievement
        </button>

        {showOptions && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-10">
            <button
              onClick={handleDownloadImage}
              disabled={loadingShare}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors text-left border-b border-gray-200 disabled:opacity-50"
            >
              <Download className="w-5 h-5 text-green-600" />
              <span className="text-gray-700 font-medium">Download Image</span>
            </button>
            <p className="px-4 py-2 text-xs text-gray-500 border-b">Share on Social Media:</p>
            <button
              onClick={handleWhatsAppShare}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors text-left"
            >
              <MessageCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">WhatsApp</span>
            </button>
            <button
              onClick={handleTelegramShare}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left"
            >
              <Send className="w-5 h-5 text-blue-500" />
              <span className="text-gray-700">Telegram</span>
            </button>
            <button
              onClick={handleTwitterShare}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left"
            >
              <Twitter className="w-5 h-5 text-blue-400" />
              <span className="text-gray-700">Twitter</span>
            </button>
            <button
              onClick={handleFacebookShare}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left"
            >
              <Facebook className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">Facebook</span>
            </button>
            <button
              onClick={handleLinkedInShare}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left"
            >
              <Linkedin className="w-5 h-5 text-blue-700" />
              <span className="text-gray-700">LinkedIn</span>
            </button>
          </div>
        )}

        {showOptions && (
          <div
            className="fixed inset-0 z-0"
            onClick={() => setShowOptions(false)}
          />
        )}
      </div>
    </>
  );
}