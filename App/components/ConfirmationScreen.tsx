import { CheckCircle, QrCode, Calendar, MapPin, Clock, User, FileText, Phone, Home } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import type { BookingData, LostFoundData } from '../App';

interface ConfirmationScreenProps {
  onBack: () => void;
  bookingData?: BookingData | null;
  lostFoundData?: LostFoundData | null;
}

export default function ConfirmationScreen({ onBack, bookingData, lostFoundData }: ConfirmationScreenProps) {
  const isBooking = !!bookingData;
  const isLostFound = !!lostFoundData;

  // Generate a mock confirmation ID
  const confirmationId = `${isBooking ? 'BK' : 'LF'}${Date.now().toString().slice(-6)}`;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Success Header */}
      <div className="bg-gradient-to-r from-[#22c55e] to-[#2563eb] px-6 py-8 rounded-b-3xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-[#22c55e]" />
          </div>
          <h1 className="text-white text-2xl mb-2">Success!</h1>
          <p className="text-white/90 text-sm">
            {isBooking && 'Your ghat slot has been booked'}
            {isLostFound && `Your ${lostFoundData?.type} report has been submitted`}
          </p>
        </div>
      </div>

      {/* Confirmation Details */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <div className="space-y-6">
          {/* Confirmation ID */}
          <Card className="p-4 border-0 shadow-md">
            <div className="text-center">
              <h3 className="text-gray-800 mb-2">Confirmation ID</h3>
              <div className="text-2xl text-[#ff6b35] tracking-wider mb-2">{confirmationId}</div>
              <p className="text-sm text-gray-600">Save this ID for future reference</p>
            </div>
          </Card>

          {/* Booking Details */}
          {isBooking && bookingData && (
            <>
              <Card className="p-4 border-0 shadow-md">
                <h3 className="text-gray-800 mb-4">Booking Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-[#ff6b35] mr-3" />
                    <div>
                      <div className="text-sm text-gray-600">Ghat</div>
                      <div className="text-gray-800">{bookingData.ghat}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-[#2563eb] mr-3" />
                    <div>
                      <div className="text-sm text-gray-600">Date</div>
                      <div className="text-gray-800">{bookingData.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-[#ff6b35] mr-3" />
                    <div>
                      <div className="text-sm text-gray-600">Time Slot</div>
                      <div className="text-gray-800">{bookingData.time}</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* QR Code for Booking */}
              <Card className="p-4 border-0 shadow-md">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-3">
                    <QrCode className="w-5 h-5 text-[#2563eb] mr-2" />
                    <h3 className="text-gray-800">Digital Pass</h3>
                  </div>
                  <div className="w-32 h-32 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <QrCode className="w-16 h-16 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600">Show this QR code at the ghat entrance</p>
                </div>
              </Card>

              {/* Booking Instructions */}
              <Card className="p-4 border-0 bg-gradient-to-r from-[#ff6b35]/5 to-[#2563eb]/5 border-[#ff6b35]/20">
                <h4 className="text-gray-800 mb-3">Important Instructions</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#ff6b35] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Arrive 15 minutes before your scheduled time
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#2563eb] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Carry a valid government ID for verification
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#ff6b35] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Your slot is valid for 2 hours from the start time
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#2563eb] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Follow all safety protocols and guidelines
                  </li>
                </ul>
              </Card>
            </>
          )}

          {/* Lost & Found Details */}
          {isLostFound && lostFoundData && (
            <>
              <Card className="p-4 border-0 shadow-md">
                <h3 className="text-gray-800 mb-4">Report Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-[#ff6b35] mr-3" />
                    <div>
                      <div className="text-sm text-gray-600">Reported by</div>
                      <div className="text-gray-800">{lostFoundData.name}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FileText className="w-5 h-5 text-[#2563eb] mr-3 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-600">Description</div>
                      <div className="text-gray-800">{lostFoundData.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-[#ff6b35] mr-3" />
                    <div>
                      <div className="text-sm text-gray-600">Contact</div>
                      <div className="text-gray-800">{lostFoundData.contact}</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Lost & Found Next Steps */}
              <Card className="p-4 border-0 bg-gradient-to-r from-[#ff6b35]/5 to-[#2563eb]/5 border-[#ff6b35]/20">
                <h4 className="text-gray-800 mb-3">What happens next?</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#ff6b35] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Our team will search our database and contact you within 24 hours
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#2563eb] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Check our Lost & Found desk at the main help center
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#ff6b35] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Use your confirmation ID when visiting or calling
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#2563eb] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Updates will be sent to your provided contact number
                  </li>
                </ul>
              </Card>
            </>
          )}

          {/* Contact Information */}
          <Card className="p-4 border-0 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <h4 className="text-gray-800 mb-3">Need Help?</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Helpline:</span>
                <span className="text-gray-800">1800-XXX-XXXX</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">WhatsApp Support:</span>
                <span className="text-gray-800">+91 XXXXX XXXXX</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="text-gray-800">help@simhastha360.com</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="px-6 pb-6 space-y-3">
        <Button
          onClick={onBack}
          className="w-full bg-gradient-to-r from-[#ff6b35] to-[#2563eb] text-white py-4 rounded-2xl text-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Button>
        <p className="text-center text-gray-500 text-xs">
          🙏 May your pilgrimage be blessed and peaceful
        </p>
      </div>
    </div>
  );
}