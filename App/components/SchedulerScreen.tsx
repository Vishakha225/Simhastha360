import { useState } from 'react';
import { ArrowLeft, CalendarIcon, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Calendar } from '../ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import type { BookingData } from '../App';

interface SchedulerScreenProps {
  onBack: () => void;
  onSubmit: (data: BookingData) => void;
}

export default function SchedulerScreen({ onBack, onSubmit }: SchedulerScreenProps) {
  const [selectedGhat, setSelectedGhat] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');

  const ghats = [
    { id: 'ghat1', name: 'Ram Ghat', availability: 'High', booked: 24 },
    { id: 'ghat2', name: 'Mangalnath Ghat', availability: 'Medium', booked: 42 },
    { id: 'ghat3', name: 'Siddhwat Ghat', availability: 'Low', booked: 68 },
    { id: 'ghat4', name: 'Bhukhi Mata Ghat', availability: 'High', booked: 18 },
    { id: 'ghat5', name: 'Triveni Ghat', availability: 'Medium', booked: 35 },
    { id: 'ghat6', name: 'Kabir Ghat', availability: 'High', booked: 21 },
    { id: 'ghat7', name: 'Narsingh Ghat', availability: 'Low', booked: 51 },
    { id: 'ghat8', name: 'Chhoti Ramlila Ghat', availability: 'High', booked: 16 },
    { id: 'ghat9', name: 'Bhuteshwar Ghat', availability: 'Medium', booked: 29 },
    { id: 'ghat10', name: 'Saraswati Ghat', availability: 'High', booked: 33 }
  ];

  // Get today's date and set minimum date for calendar
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30); // Allow booking up to 30 days ahead

  const timeSlots = [
    { value: '04:00', label: '4:00 AM - Brahma Muhurta', availability: 'High' },
    { value: '05:30', label: '5:30 AM - Sunrise', availability: 'Medium' },
    { value: '07:00', label: '7:00 AM - Morning', availability: 'High' },
    { value: '09:00', label: '9:00 AM - Mid Morning', availability: 'High' },
    { value: '11:00', label: '11:00 AM - Late Morning', availability: 'Medium' },
    { value: '17:00', label: '5:00 PM - Evening', availability: 'Low' },
    { value: '18:30', label: '6:30 PM - Sunset', availability: 'Low' },
    { value: '19:30', label: '7:30 PM - Aarti Time', availability: 'Very Low' }
  ];

  const handleSubmit = () => {
    if (selectedGhat && selectedDate && selectedTime) {
      const ghatName = ghats.find(g => g.id === selectedGhat)?.name || selectedGhat;
      const dateLabel = selectedDate.toLocaleDateString('en-US', { 
        weekday: 'short',
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
      const timeLabel = timeSlots.find(t => t.value === selectedTime)?.label || selectedTime;
      
      onSubmit({
        ghat: ghatName,
        date: dateLabel,
        time: timeLabel
      });
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'High': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-orange-600 bg-orange-100';
      case 'Very Low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const isFormValid = selectedGhat && selectedDate && selectedTime;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#ff6b35] to-[#2563eb] px-6 py-8 rounded-b-3xl">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/20 p-2 mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-white text-xl">Book Your Ghat Slot</h1>
            <p className="text-white/90 text-sm">Select your preferred time & location</p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <div className="space-y-6">
          {/* Ghat Selection */}
          <Card className="p-4 border-0 shadow-md">
            <div className="flex items-center mb-3">
              <MapPin className="w-5 h-5 text-[#ff6b35] mr-2" />
              <h3 className="text-gray-800">Select Ghat</h3>
            </div>
            <Select onValueChange={setSelectedGhat}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose your preferred ghat" />
              </SelectTrigger>
              <SelectContent>
                {ghats.map((ghat) => (
                  <SelectItem key={ghat.id} value={ghat.id}>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col">
                        <span>{ghat.name}</span>
                        <div className="flex items-center gap-1 mt-1">
                          <Users className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{ghat.booked} booked today</span>
                        </div>
                      </div>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getAvailabilityColor(ghat.availability)}`}>
                        {ghat.availability}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>

          {/* Date Selection */}
          <Card className="p-4 border-0 shadow-md">
            <div className="flex items-center mb-3">
              <CalendarIcon className="w-5 h-5 text-[#2563eb] mr-2" />
              <h3 className="text-gray-800">Select Date</h3>
            </div>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < today || date > maxDate}
                className="rounded-md border shadow-sm"
                classNames={{
                  day_selected: "bg-gradient-to-r from-[#ff6b35] to-[#2563eb] text-white hover:from-[#ff6b35] hover:to-[#2563eb] hover:text-white focus:from-[#ff6b35] focus:to-[#2563eb] focus:text-white",
                  day_today: "bg-gradient-to-r from-[#ff6b35]/10 to-[#2563eb]/10 text-gray-800"
                }}
              />
            </div>
            {selectedDate && (
              <div className="mt-3 p-2 bg-gradient-to-r from-[#ff6b35]/10 to-[#2563eb]/10 rounded-lg text-center">
                <p className="text-sm text-gray-700">
                  Selected: {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            )}
          </Card>

          {/* Time Selection */}
          <Card className="p-4 border-0 shadow-md">
            <div className="flex items-center mb-3">
              <Clock className="w-5 h-5 text-[#ff6b35] mr-2" />
              <h3 className="text-gray-800">Select Time Slot</h3>
            </div>
            <Select onValueChange={setSelectedTime}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose your preferred time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot.value} value={slot.value}>
                    <div className="flex items-center justify-between w-full">
                      <span>{slot.label}</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getAvailabilityColor(slot.availability)}`}>
                        {slot.availability}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>

          {/* Selected Ghat Stats */}
          {selectedGhat && (
            <Card className="p-4 border-0 bg-gradient-to-r from-[#ff6b35]/10 to-[#2563eb]/10 border-[#ff6b35]/20">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-gray-800 mb-1">Today's Bookings</h4>
                  <p className="text-sm text-gray-600">
                    {ghats.find(g => g.id === selectedGhat)?.name}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#ff6b35]" />
                    <span className="text-2xl text-gray-800">
                      {ghats.find(g => g.id === selectedGhat)?.booked}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">pilgrims booked</p>
                </div>
              </div>
            </Card>
          )}

          {/* Info Card */}
          <Card className="p-4 border-0 bg-gradient-to-r from-[#ff6b35]/5 to-[#2563eb]/5 border-[#ff6b35]/20">
            <h4 className="text-gray-800 mb-2">Booking Guidelines</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Arrive 15 minutes before your slot</li>
              <li>• Carry a valid ID for verification</li>
              <li>• Slots are valid for 2 hours</li>
              <li>• Follow all safety protocols</li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-6 pb-6">
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`w-full py-4 rounded-2xl text-lg transition-all duration-300 ${
            isFormValid
              ? 'bg-gradient-to-r from-[#ff6b35] to-[#2563eb] text-white hover:shadow-lg transform hover:scale-[1.02]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Confirm Booking
        </Button>
        {!isFormValid && (
          <p className="text-center text-gray-500 text-xs mt-2">
            Please fill all fields to continue
          </p>
        )}
      </div>
    </div>
  );
}