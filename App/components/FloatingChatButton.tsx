import { MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';

interface FloatingChatButtonProps {
  onClick: () => void;
  isVisible?: boolean;
}

export default function FloatingChatButton({ onClick, isVisible = true }: FloatingChatButtonProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.3 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <Button
        onClick={onClick}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-[#ff6b35] to-[#2563eb] text-white shadow-2xl hover:shadow-lg transition-all duration-300 hover:scale-110 group"
      >
        <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />
      </Button>
      
      {/* Floating notification dot */}
      <motion.div
        className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-2 h-2 bg-white rounded-full" />
      </motion.div>
    </motion.div>
  );
}