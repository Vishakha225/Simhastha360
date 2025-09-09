import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import DashboardScreen from './components/DashboardScreen';
import SchedulerScreen from './components/SchedulerScreen';
import LostFoundScreen from './components/LostFoundScreen';
import CrowdStatusScreen from './components/CrowdStatusScreen';
import ConfirmationScreen from './components/ConfirmationScreen';
import ChatbotScreen from './components/ChatbotScreen';
import FloatingChatButton from './components/FloatingChatButton';

export type Screen = 'welcome' | 'dashboard' | 'scheduler' | 'lostfound' | 'crowdstatus' | 'confirmation';

export interface BookingData {
  ghat: string;
  date: string;
  time: string;
}

export interface LostFoundData {
  type: 'lost' | 'found';
  name: string;
  category?: string;
  description: string;
  hasPhoto?: boolean;
  contact: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [lostFoundData, setLostFoundData] = useState<LostFoundData | null>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleBookingSubmit = (data: BookingData) => {
    setBookingData(data);
    setCurrentScreen('confirmation');
  };

  const handleLostFoundSubmit = (data: LostFoundData) => {
    setLostFoundData(data);
    setCurrentScreen('confirmation');
  };

  const handleOpenChatbot = () => {
    setIsChatbotOpen(true);
  };

  const handleCloseChatbot = () => {
    setIsChatbotOpen(false);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onGetStarted={() => navigateToScreen('dashboard')} />;
      case 'dashboard':
        return <DashboardScreen onNavigate={navigateToScreen} />;
      case 'scheduler':
        return <SchedulerScreen onBack={() => navigateToScreen('dashboard')} onSubmit={handleBookingSubmit} />;
      case 'lostfound':
        return <LostFoundScreen onBack={() => navigateToScreen('dashboard')} onSubmit={handleLostFoundSubmit} />;
      case 'crowdstatus':
        return <CrowdStatusScreen onBack={() => navigateToScreen('dashboard')} />;
      case 'confirmation':
        return (
          <ConfirmationScreen
            onBack={() => navigateToScreen('dashboard')}
            bookingData={bookingData}
            lostFoundData={lostFoundData}
          />
        );
      default:
        return <WelcomeScreen onGetStarted={() => navigateToScreen('dashboard')} />;
    }
  };

  return (
    // <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
    //   <div className="max-w-md mx-auto min-h-screen shadow-xl relative">
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center">
        <div className="w-full max-w-3xl p-6 rounded-xl shadow-lg bg-white/30">
      
          {renderScreen()}
        
        {/* Floating Chat Button - Hide on welcome screen */}
        <FloatingChatButton 
          onClick={handleOpenChatbot} 
          isVisible={currentScreen !== 'welcome'} 
        />
        
        {/* Chatbot Panel */}
        <ChatbotScreen isOpen={isChatbotOpen} onClose={handleCloseChatbot} />
      </div>
    </div>
  );
}