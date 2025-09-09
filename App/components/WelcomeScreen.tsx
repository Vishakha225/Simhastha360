import { Button } from '../ui/button';
import templeImage from '../assets/temple.png';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export default function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#ff6b35] via-orange-400 to-[#2563eb]">
      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl text-white mb-4 tracking-wide">
            Simhastha360
          </h1>
          <p className="text-white/90 text-lg leading-relaxed max-w-xs">
            Your Digital Companion for a Safer Pilgrimage
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative w-full max-w-sm h-64 mb-8 rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={templeImage}
            alt="Sacred temples and ghats"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-white/90 text-sm">Smart</div>
            <div className="text-white text-xs">Ghat Booking</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-white/90 text-sm">Lost &</div>
            <div className="text-white text-xs">Found Center</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-white/90 text-sm">Live</div>
            <div className="text-white text-xs">Crowd Status</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-white/90 text-sm">24/7</div>
            <div className="text-white text-xs">Support</div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-6 pb-8 pt-4">
        <Button
          onClick={onGetStarted}
          className="w-full bg-white text-[#ff6b35] hover:bg-gray-50 shadow-lg py-4 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105"
        >
          Get Started
        </Button>
        <p className="text-center text-white/70 text-xs mt-4">
          Join thousands of pilgrims for a blessed journey
        </p>
      </div>
    </div>
  );
}