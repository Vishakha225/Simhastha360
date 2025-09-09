import { Calendar, MapPin, Users, MoreHorizontal, ArrowRight } from 'lucide-react';
import { Card } from '../ui/card';
import type { Screen } from '../App';

interface DashboardScreenProps {
  onNavigate: (screen: Screen) => void;
}

export default function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  const featureCards = [
    {
      id: 'scheduler',
      title: 'Smart Ghats Scheduler',
      subtitle: 'Book your ghat slot',
      description: 'Avoid crowds with time-slot booking',
      icon: Calendar,
      gradient: 'from-[#ff6b35] to-[#ff8c6b]',
      available: true,
      isMain: true
    },
    {
      id: 'lostfound',
      title: 'Lost & Found',
      subtitle: 'Report or search',
      description: 'Quick assistance for lost items/persons',
      icon: MapPin,
      gradient: 'from-[#2563eb] to-[#60a5fa]',
      available: true,
      isMain: false
    },
    {
      id: 'crowd',
      title: 'Crowd Status',
      subtitle: 'Live updates',
      description: 'Real-time ghat occupancy levels',
      icon: Users,
      gradient: 'from-green-500 to-green-400',
      available: true,
      isMain: false
    },
    {
      id: 'more',
      title: 'More Features',
      subtitle: 'Coming Soon',
      description: 'Emergency contacts, maps & guides',
      icon: MoreHorizontal,
      gradient: 'from-purple-500 to-purple-400',
      available: false,
      isMain: false
    }
  ];

  const handleCardClick = (cardId: string) => {
    if (cardId === 'scheduler') {
      onNavigate('scheduler');
    } else if (cardId === 'lostfound') {
      onNavigate('lostfound');
    } else if (cardId === 'crowd') {
      onNavigate('crowdstatus');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#ff6b35] to-[#2563eb] px-6 py-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-white text-2xl mb-1">Welcome, Pilgrim!</h1>
            <p className="text-white/90 text-sm">May your journey be blessed</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-white text-lg">🙏</span>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-white text-lg">12</div>
            <div className="text-white/80 text-xs">Active Ghats</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-white text-lg">4.2M</div>
            <div className="text-white/80 text-xs">Pilgrims</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-white text-lg">24/7</div>
            <div className="text-white/80 text-xs">Support</div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="flex-1 px-6 py-6">
        <h2 className="text-gray-800 text-lg mb-4">Features</h2>
        
        <div className="space-y-4">
          {featureCards.map((card) => {
            const IconComponent = card.icon;
            
            return (
              <Card
                key={card.id}
                className={`p-4 border-0 shadow-md cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                  card.available ? 'hover:shadow-lg' : 'opacity-60'
                } ${card.isMain ? 'ring-2 ring-[#ff6b35]/20' : ''}`}
                onClick={card.available ? () => handleCardClick(card.id) : undefined}
              >
                <div className="flex items-center">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mr-4 shadow-lg`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-gray-800 mb-1">{card.title}</h3>
                        <p className="text-gray-600 text-sm mb-1">{card.subtitle}</p>
                        <p className="text-gray-500 text-xs">{card.description}</p>
                      </div>
                      {card.available && (
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    
                    {card.isMain && (
                      <div className="mt-2">
                        <span className="inline-block bg-[#ff6b35]/10 text-[#ff6b35] text-xs px-2 py-1 rounded-full">
                          Main Feature
                        </span>
                      </div>
                    )}
                    
                    {!card.available && (
                      <div className="mt-2">
                        <span className="inline-block bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
                          Coming Soon
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Bottom Notice */}
      <div className="px-6 pb-6">
        <div className="bg-gradient-to-r from-[#ff6b35]/10 to-[#2563eb]/10 border border-[#ff6b35]/20 rounded-2xl p-4">
          <p className="text-center text-gray-700 text-sm">
            🚨 <span className="font-medium">Emergency Helpline:</span> 1800-XXX-XXXX
          </p>
        </div>
      </div>
    </div>
  );
}