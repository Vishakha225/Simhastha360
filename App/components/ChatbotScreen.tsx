import { useState, useEffect, useRef } from 'react';
import { X, Send, Mic, MicOff, Volume2, Bot, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/Input';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotScreenProps {
  isOpen: boolean;
  onClose: () => void;
}

const SpeakingIndicator = () => {
  return (
    <div className="flex items-center gap-1 mb-2">
      <Volume2 className="w-3 h-3 text-[#2563eb]" />
      <div className="flex gap-1">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="w-1 h-3 bg-[#2563eb] rounded-full"
            animate={{
              scaleY: [1, 2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
      <span className="text-xs text-[#2563eb] ml-1">Speaking...</span>
    </div>
  );
};

export default function ChatbotScreen({ isOpen, onClose }: ChatbotScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '🙏 Namaste! Welcome to Simhastha360 AI Assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('ghat') || message.includes('schedule') || message.includes('book')) {
      return '🕉️ I can help you book ghat visits! We have 10 sacred ghats available:\n\n• Ram Ghat\n• Mangalnath Ghat\n• Siddhwat Ghat\n• Bhukhi Mata Ghat\n• Triveni Ghat\n• Kabir Ghat\n• Narsingh Ghat\n• Chhoti Ramlila Ghat\n• Bhuteshwar Ghat\n• Saraswati Ghat\n\nUse our Smart Ghats Scheduler to reserve your preferred time slot!';
    } else if (message.includes('lost') || message.includes('found') || message.includes('missing')) {
      return '🔍 Lost something at the Kumbh? Don\'t worry! Use our Lost & Found Center to report missing items or search for found ones. I can help you file a report right away.';
    } else if (message.includes('crowd') || message.includes('busy') || message.includes('people')) {
      return '👥 Check real-time crowd status at all 10 Ujjain ghats using our Crowd Monitor:\n\n🟢 Safe ghats: Usually Ram Ghat, Kabir Ghat, Bhuteshwar Ghat\n🟡 Busy ghats: Mangalnath Ghat, Triveni Ghat\n🔴 Overcrowded: Sometimes Siddhwat Ghat\n\nThis helps you plan your visit during less crowded times for a peaceful experience!';
    } else if (message.includes('help') || message.includes('guide') || message.includes('how')) {
      return '📱 I\'m here to help! You can:\n• Book ghat time slots\n• Report lost items\n• Check crowd levels\n• Get festival information\n• Find emergency contacts\n\nWhat would you like to do?';
    } else if (message.includes('emergency') || message.includes('contact') || message.includes('phone')) {
      return '🚨 Emergency contacts:\n• Medical Emergency: 108\n• Lost & Found: 1800-XXX-1234\n• Security: 1800-XXX-5678\n• General Help: 1800-SIMHASTHA\n\nStay safe! 🙏';
    } else if (message.includes('festival') || message.includes('kumbh') || message.includes('simhastha')) {
      return '🪷 Simhastha Kumbh Mela is one of the most sacred Hindu festivals. Our app helps pilgrims navigate the festival with features like ghat booking, crowd monitoring, and safety assistance. Har Har Mahadev! 🕉️';
    } else {
      return '🙏 Thank you for your message! I\'m here to help with ghat bookings, lost & found reports, crowd updates, and festival information. How can I assist you today?';
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot thinking delay
    setTimeout(() => {
      setIsTyping(false);
      setIsBotSpeaking(true);

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);

      // Simulate speaking duration
      setTimeout(() => {
        setIsBotSpeaking(false);
      }, 2000);
    }, 1000);
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Simulate voice recording
      setTimeout(() => {
        setIsRecording(false);
        setInputText("What are the ghat timings today?");
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed right-4 top-4 bottom-4 w-80 z-50 flex flex-col"
        >
          <Card className="flex-1 border-0 shadow-2xl bg-white rounded-3xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#ff6b35] to-[#2563eb] p-4 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-medium">Simhastha AI</h3>
                    <p className="text-white/80 text-xs">Your spiritual guide</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white hover:bg-white/20 p-1 h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-96">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-[#ff6b35] to-[#ff8c6b] ml-2' 
                        : 'bg-gradient-to-r from-[#2563eb] to-[#60a5fa] mr-2'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-3 h-3 text-white" />
                      ) : (
                        <Bot className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div>
                      {message.sender === 'bot' && isBotSpeaking && message.id === messages[messages.length - 1]?.id && (
                        <SpeakingIndicator />
                      )}
                      <div className={`rounded-2xl px-3 py-2 ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-[#ff6b35] to-[#ff8c6b] text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                      </div>
                      <p className={`text-xs text-gray-500 mt-1 ${
                        message.sender === 'user' ? 'text-right' : 'text-left'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa] flex items-center justify-center mr-2">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl px-3 py-2">
                      <div className="flex gap-1">
                        {[1, 2, 3].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: i * 0.2
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="pr-12 rounded-2xl border-gray-200 focus:border-[#ff6b35] focus:ring-[#ff6b35]/20"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleVoiceInput}
                    className={`absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 ${
                      isRecording 
                        ? 'text-red-500 hover:text-red-600 bg-red-50' 
                        : 'text-gray-400 hover:text-[#ff6b35]'
                    }`}
                  >
                    {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c6b] text-white rounded-2xl h-10 w-10 p-0 hover:shadow-lg transition-all duration-300"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              {isRecording && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-center"
                >
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-xs text-red-500">Recording... Speak now</span>
                  </div>
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}