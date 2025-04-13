
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, LockKeyhole, Trash2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const PrivacyDataPage = () => {
  const navigate = useNavigate();

  const handleDeleteDataRequest = () => {
    toast.info('Account deletion request has been submitted. Our team will contact you shortly.');
  };

  const handleDownloadData = () => {
    toast.success('Your data file has been prepared and will be emailed to you shortly.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 border-b flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="p-1"
        >
          <ArrowLeft className="h-6 w-6 text-secondary" />
        </button>
        <h1 className="text-xl font-semibold text-secondary ml-4">Privacy & Data</h1>
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Privacy Overview */}
        <div className="bg-white rounded-lg p-4 border border-gray-100">
          <div className="flex items-center mb-4">
            <Shield className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-lg font-medium">Privacy Policy</h2>
          </div>
          
          <p className="text-gray-600 mb-4">
            Our privacy policy outlines how we collect, use, and protect your personal information when you use our app.
          </p>
          
          <Button
            variant="outline"
            onClick={() => {
              toast.info('Opening privacy policy...');
              // In a real app, this would open the privacy policy
            }}
            className="w-full"
          >
            Read Full Privacy Policy
          </Button>
        </div>
        
        {/* Data Security */}
        <div className="bg-white rounded-lg p-4 border border-gray-100">
          <div className="flex items-center mb-4">
            <LockKeyhole className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-lg font-medium">Data Security</h2>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center">
              <div className="bg-green-50 p-1 rounded-full mr-2">
                <Shield className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm text-gray-600">End-to-end encryption for messages</span>
            </div>
            
            <div className="flex items-center">
              <div className="bg-green-50 p-1 rounded-full mr-2">
                <Shield className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm text-gray-600">Secure payment processing</span>
            </div>
            
            <div className="flex items-center">
              <div className="bg-green-50 p-1 rounded-full mr-2">
                <Shield className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm text-gray-600">Regular security audits</span>
            </div>
          </div>
        </div>
        
        {/* Data Management */}
        <div className="bg-white rounded-lg p-4 border border-gray-100">
          <div className="flex items-center mb-4">
            <Download className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-lg font-medium">Your Data</h2>
          </div>
          
          <Button
            variant="outline"
            onClick={handleDownloadData}
            className="w-full mb-3"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Your Data
          </Button>
          
          <Button
            variant="outline"
            onClick={handleDeleteDataRequest}
            className="w-full text-danger hover:text-danger border-danger hover:border-danger hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Request Account Deletion
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyDataPage;
