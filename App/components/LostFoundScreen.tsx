import { useState } from 'react';
import { ArrowLeft, Search, AlertCircle, User, Phone, FileText, Camera, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import type { LostFoundData } from '../App';

interface LostFoundScreenProps {
  onBack: () => void;
  onSubmit: (data: LostFoundData) => void;
}

export default function LostFoundScreen({ onBack, onSubmit }: LostFoundScreenProps) {
  const [activeTab, setActiveTab] = useState<'lost' | 'found'>('lost');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reportId, setReportId] = useState('');

  const categories = [
    { value: 'person', label: 'Person' },
    { value: 'luggage', label: 'Luggage' },
    { value: 'jewelry', label: 'Jewelry' },
    { value: 'documents', label: 'Documents' },
    { value: 'others', label: 'Others' }
  ];

  const handleSubmit = () => {
    if (name.trim() && description.trim() && contact.trim() && (activeTab === 'found' || category)) {
      const generatedReportId = `LF2025-${Math.floor(Math.random() * 900) + 100}`;
      setReportId(generatedReportId);
      setIsSubmitted(true);
      
      onSubmit({
        type: activeTab,
        name: name.trim(),
        category: category,
        description: description.trim(),
        contact: contact.trim(),
        hasPhoto: hasPhoto
      });
    }
  };

  const handlePhotoUpload = () => {
    setHasPhoto(true);
    // Simulate photo upload
    setTimeout(() => {
      alert('Photo uploaded successfully! 📷');
    }, 500);
  };

  const isFormValid = name.trim() && description.trim() && contact.trim() && (activeTab === 'found' || category);

  if (isSubmitted && activeTab === 'lost') {
    return (
      <div className="flex flex-col h-screen bg-gradient-to-br from-orange-50 to-blue-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#ff6b35] to-[#2563eb] px-6 py-8 rounded-b-3xl">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsSubmitted(false);
                setName('');
                setCategory('');
                setDescription('');
                setContact('');
                setHasPhoto(false);
                setReportId('');
              }}
              className="text-white hover:bg-white/20 p-2 mr-4"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-white text-xl">Report Submitted</h1>
              <p className="text-white/90 text-sm">Your report has been recorded</p>
            </div>
          </div>
        </div>

        {/* Confirmation Content */}
        <div className="flex-1 px-6 py-6 flex items-center justify-center">
          <Card className="p-6 border-0 shadow-lg max-w-sm w-full text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-[#ff6b35] to-[#2563eb] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-gray-800 text-xl mb-2">Report Submitted Successfully!</h2>
            
            <div className="bg-gradient-to-r from-[#ff6b35]/10 to-[#2563eb]/10 rounded-2xl p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">Your Report ID</p>
              <p className="text-2xl font-mono text-gray-800">{reportId}</p>
            </div>
            
            <p className="text-gray-600 mb-6">
              Our Lost & Found team will start searching immediately. 
              We'll contact you at {contact} with any updates.
            </p>
            
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-4 mb-6">
              <p className="text-sm text-gray-700 text-center">
                Need urgent help? Call Lost & Found Helpline<br/>
                📞 <span className="font-medium">1800-XXXX-LOST</span>
              </p>
            </div>
            
            <Button
              onClick={onBack}
              className="w-full bg-gradient-to-r from-[#ff6b35] to-[#2563eb] text-white rounded-2xl py-3"
            >
              Back to Dashboard
            </Button>
          </Card>
        </div>
      </div>
    );
  }

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
            <h1 className="text-white text-xl">Lost & Found Center</h1>
            <p className="text-white/90 text-sm">Help us help you find what's missing</p>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-white/20 backdrop-blur-sm rounded-2xl p-1">
          <button
            onClick={() => setActiveTab('lost')}
            className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl transition-all duration-300 ${
              activeTab === 'lost'
                ? 'bg-white text-[#ff6b35] shadow-md'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            Report Lost
          </button>
          <button
            onClick={() => setActiveTab('found')}
            className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl transition-all duration-300 ${
              activeTab === 'found'
                ? 'bg-white text-[#2563eb] shadow-md'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <Search className="w-4 h-4 mr-2" />
            Search Found
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <div className="space-y-6">
          {/* Info Card */}
          <Card className={`p-4 border-0 ${
            activeTab === 'lost' 
              ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200' 
              : 'bg-gradient-to-r from-blue-50 to-green-50 border-blue-200'
          }`}>
            <div className="flex items-start">
              {activeTab === 'lost' ? (
                <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
              ) : (
                <Search className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
              )}
              <div>
                <h3 className="text-gray-800 mb-1">
                  {activeTab === 'lost' ? 'Report a Lost Item/Person' : 'Search for Found Items'}
                </h3>
                <p className="text-sm text-gray-600">
                  {activeTab === 'lost'
                    ? 'Fill out the form below to report something missing. Our team will help locate it.'
                    : 'Describe what you\'re looking for. We\'ll check our found items database.'
                  }
                </p>
              </div>
            </div>
          </Card>

          {/* Reporter's Name */}
          <Card className="p-4 border-0 shadow-md">
            <div className="flex items-center mb-3">
              <User className="w-5 h-5 text-[#ff6b35] mr-2" />
              <Label htmlFor="name" className="text-gray-800">Reporter's Name</Label>
            </div>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </Card>

          {/* Description with Category */}
          <Card className="p-4 border-0 shadow-md">
            <div className="flex items-center mb-3">
              <FileText className="w-5 h-5 text-[#2563eb] mr-2" />
              <Label htmlFor="description" className="text-gray-800">
                {activeTab === 'lost' ? 'Item/Person Description' : 'What are you looking for?'}
              </Label>
            </div>
            
            {activeTab === 'lost' && (
              <div className="mb-4">
                <Label className="text-sm text-gray-600 mb-2 block">Category</Label>
                <Select onValueChange={setCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <Textarea
              id="description"
              placeholder={
                activeTab === 'lost'
                  ? 'Describe the lost item or person in detail (color, size, distinctive features, last seen location, etc.)'
                  : 'Describe what you\'re looking for (item type, color, size, distinguishing features, etc.)'
              }
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[120px] resize-none"
            />
            
            {activeTab === 'lost' && (
              <div className="mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePhotoUpload}
                  className="flex items-center gap-2 text-gray-600 border-gray-300 hover:bg-gray-50"
                >
                  <Camera className="w-4 h-4" />
                  📷 {hasPhoto ? 'Photo Uploaded' : 'Upload Photo'}
                </Button>
                {hasPhoto && (
                  <p className="text-xs text-green-600 mt-1">✓ Photo attached successfully</p>
                )}
              </div>
            )}
          </Card>

          {/* Contact Number */}
          <Card className="p-4 border-0 shadow-md">
            <div className="flex items-center mb-3">
              <Phone className="w-5 h-5 text-[#ff6b35] mr-2" />
              <Label htmlFor="contact" className="text-gray-800">Contact Number (for updates)</Label>
            </div>
            <Input
              id="contact"
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full"
            />
          </Card>

          {/* Emergency Contacts */}
          <Card className="p-4 border-0 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <h4 className="text-gray-800 mb-2">Emergency Contacts</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Lost & Found Desk:</span>
                <span className="text-gray-800">1800-XXX-1234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Security Control Room:</span>
                <span className="text-gray-800">1800-XXX-5678</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Medical Emergency:</span>
                <span className="text-gray-800">108</span>
              </div>
            </div>
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
              ? 'bg-gradient-to-r from-[#ff6b35] to-[#ff8c6b] text-white hover:shadow-lg transform hover:scale-[1.02]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {activeTab === 'lost' ? 'Submit Report' : 'Search Database'}
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