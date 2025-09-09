import { ArrowLeft, Users, RefreshCw, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card } from '../ui/card';

interface CrowdStatusScreenProps {
  onBack: () => void;
}

interface GhatStatus {
  name: string;
  status: 'safe' | 'busy' | 'overcrowded';
  pilgrims: number;
  emoji: string;
  color: string;
  bgColor: string;
}

export default function CrowdStatusScreen({ onBack }: CrowdStatusScreenProps) {
  const ghatData: GhatStatus[] = [
    {
      name: 'Ram Ghat',
      status: 'safe',
      pilgrims: 320,
      emoji: '🟢',
      color: 'text-success-green',
      bgColor: 'bg-success-green/10'
    },
    {
      name: 'Mangalnath Ghat',
      status: 'busy',
      pilgrims: 860,
      emoji: '🟡',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      name: 'Siddhwat Ghat',
      status: 'overcrowded',
      pilgrims: 1450,
      emoji: '🔴',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      name: 'Bhukhi Mata Ghat',
      status: 'safe',
      pilgrims: 280,
      emoji: '🟢',
      color: 'text-success-green',
      bgColor: 'bg-success-green/10'
    },
    {
      name: 'Triveni Ghat',
      status: 'busy',
      pilgrims: 720,
      emoji: '🟡',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      name: 'Kabir Ghat',
      status: 'safe',
      pilgrims: 180,
      emoji: '🟢',
      color: 'text-success-green',
      bgColor: 'bg-success-green/10'
    },
    {
      name: 'Narsingh Ghat',
      status: 'busy',
      pilgrims: 650,
      emoji: '🟡',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      name: 'Chhoti Ramlila Ghat',
      status: 'safe',
      pilgrims: 150,
      emoji: '🟢',
      color: 'text-success-green',
      bgColor: 'bg-success-green/10'
    },
    {
      name: 'Bhuteshwar Ghat',
      status: 'safe',
      pilgrims: 340,
      emoji: '🟢',
      color: 'text-success-green',
      bgColor: 'bg-success-green/10'
    },
    {
      name: 'Saraswati Ghat',
      status: 'busy',
      pilgrims: 580,
      emoji: '🟡',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ];

  // Calculate summary stats
  const totalPilgrims = ghatData.reduce((sum, ghat) => sum + ghat.pilgrims, 0);
  const safeGhats = ghatData.filter(ghat => ghat.status === 'safe').length;
  const busyGhats = ghatData.filter(ghat => ghat.status === 'busy').length;
  const overcrowdedGhats = ghatData.filter(ghat => ghat.status === 'overcrowded').length;

  const getStatusText = (status: string) => {
    switch (status) {
      case 'safe':
        return 'Safe';
      case 'busy':
        return 'Busy';
      case 'overcrowded':
        return 'Overcrowded';
      default:
        return status;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#ff6b35] to-[#2563eb] px-6 py-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <RefreshCw className="w-5 h-5 text-white" />
          </button>
        </div>
        
        <div className="text-center">
          <h1 className="text-white text-2xl mb-2">Live Crowd Status</h1>
          <p className="text-white/90 text-sm">Real-time crowd density at ghats</p>
        </div>

        {/* Last Updated */}
        <div className="mt-4 text-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 inline-block">
            <span className="text-white/80 text-xs">Last updated: 2 min ago</span>
          </div>
        </div>
      </div>

      {/* Real-time Data Summary */}
      <div className="px-6 pt-4">
        <Card className="p-4 border-0 shadow-lg bg-gradient-to-r from-[#ff6b35]/5 to-[#2563eb]/5">
          <h3 className="text-gray-800 mb-3 text-center">Live Data Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Users className="w-4 h-4 text-[#ff6b35]" />
                <span className="text-2xl text-gray-800">{totalPilgrims.toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-600">Total Pilgrims</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-2xl text-gray-800">{safeGhats}</span>
              </div>
              <p className="text-xs text-gray-600">Safe Ghats</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <span className="text-2xl text-gray-800">{busyGhats}</span>
              </div>
              <p className="text-xs text-gray-600">Busy Ghats</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-2xl text-gray-800">{overcrowdedGhats}</span>
              </div>
              <p className="text-xs text-gray-600">Overcrowded</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Ghat Status Cards */}
      <div className="flex-1 px-6 py-4">
        <h3 className="text-gray-800 mb-4">Individual Ghat Status</h3>
        <div className="space-y-4">
          {ghatData.map((ghat) => (
            <Card
              key={ghat.name}
              className="p-5 border-0 shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#ff6b35] to-[#ff8c6b] rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-gray-800 mb-2">{ghat.name}</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{ghat.emoji}</span>
                      <span className={`inline-block ${ghat.bgColor} ${ghat.color} px-3 py-1 rounded-full`}>
                        {getStatusText(ghat.status)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-gray-800 text-xl">{ghat.pilgrims}</div>
                  <div className="text-gray-500 text-xs">pilgrims</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8">
          <Card className="p-4 border-0 shadow-md bg-gradient-to-r from-[#ff6b35]/5 to-[#2563eb]/5">
            <h4 className="text-gray-700 text-center mb-3">Status Guide</h4>
            <div className="flex justify-center items-center gap-2 flex-wrap text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <span>🟢</span>
                <span>Safe (0–500)</span>
              </div>
              <span className="text-gray-400">|</span>
              <div className="flex items-center gap-1">
                <span>🟡</span>
                <span>Busy (500–1000)</span>
              </div>
              <span className="text-gray-400">|</span>
              <div className="flex items-center gap-1">
                <span>🔴</span>
                <span>Overcrowded (1000+)</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Tips */}
        <div className="mt-4">
          <div className="bg-gradient-to-r from-[#ff6b35]/10 to-[#2563eb]/10 border border-[#ff6b35]/20 rounded-2xl p-4">
            <p className="text-center text-gray-700 text-sm">
              💡 <span className="font-medium">Pro Tip:</span> Visit during green status for a peaceful experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}