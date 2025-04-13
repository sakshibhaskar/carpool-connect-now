
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { toast } from 'sonner';

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'de', name: 'German', native: 'Deutsch' },
  { code: 'it', name: 'Italian', native: 'Italiano' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'zh', name: 'Chinese', native: '中文' },
  { code: 'ar', name: 'Arabic', native: 'العربية' },
  { code: 'pt', name: 'Portuguese', native: 'Português' },
  { code: 'ja', name: 'Japanese', native: '日本語' }
];

const LanguagePage = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
    toast.success('Language updated successfully');
  };

  const handleSave = () => {
    toast.success('Language preferences saved');
    navigate('/settings');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="p-1"
          >
            <ArrowLeft className="h-6 w-6 text-secondary" />
          </button>
          <h1 className="text-xl font-semibold text-secondary ml-4">Language</h1>
        </div>
        <button 
          className="text-primary font-medium"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
      
      {/* Language Selection */}
      <div className="p-4">
        <div className="bg-white rounded-lg">
          {languages.map((language) => (
            <button
              key={language.code}
              className="flex items-center justify-between w-full p-4 text-left border-b last:border-0"
              onClick={() => handleLanguageChange(language.code)}
            >
              <div>
                <div className="font-medium">{language.name}</div>
                <div className="text-sm text-gray-500">{language.native}</div>
              </div>
              {selectedLanguage === language.code && (
                <Check className="h-5 w-5 text-primary" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguagePage;
