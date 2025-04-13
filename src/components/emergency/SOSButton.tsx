
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, X, Phone } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

const SOSButton: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [emergencyActivated, setEmergencyActivated] = useState(false);
  const [countdown, setCountdown] = useState(5);
  
  const handleEmergencyPress = () => {
    setIsDialogOpen(true);
  };
  
  const startEmergency = () => {
    setEmergencyActivated(true);
    let timer = 5;
    
    const countdownInterval = setInterval(() => {
      timer -= 1;
      setCountdown(timer);
      
      if (timer === 0) {
        clearInterval(countdownInterval);
        sendEmergencyAlert();
      }
    }, 1000);
  };
  
  const cancelEmergency = () => {
    setEmergencyActivated(false);
    setIsDialogOpen(false);
    setCountdown(5);
  };
  
  const sendEmergencyAlert = () => {
    // In a real app, this would send the emergency alert to the backend
    toast.success("Emergency services have been alerted");
    setIsDialogOpen(false);
    setEmergencyActivated(false);
    setCountdown(5);
  };
  
  const callEmergencyServices = () => {
    // In a real app, this would trigger a phone call
    window.location.href = "tel:911";
  };

  return (
    <>
      <Button 
        className="fixed right-4 bottom-20 z-50 w-14 h-14 rounded-full bg-danger hover:bg-danger shadow-lg flex items-center justify-center"
        onClick={handleEmergencyPress}
      >
        <AlertTriangle className="h-6 w-6" />
      </Button>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="rounded-lg sm:max-w-md">
          {!emergencyActivated ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-danger flex items-center">
                  <AlertTriangle className="mr-2" /> Emergency SOS
                </DialogTitle>
                <DialogDescription className="text-base text-gray-700">
                  This will alert emergency services and your emergency contacts with your current location.
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4 space-y-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-100 text-red-800">
                  <p className="font-semibold">Only use in case of an emergency.</p>
                  <p className="text-sm mt-1">False alarms may result in account restrictions.</p>
                </div>
                
                <div className="space-y-2">
                  <div className="font-medium">Actions that will be taken:</div>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Your location will be shared with emergency contacts</li>
                    <li>• Your ride will be immediately canceled</li>
                    <li>• Our support team will be alerted</li>
                    <li>• Local authorities will be notified if needed</li>
                  </ul>
                </div>
              </div>
              
              <DialogFooter className="flex flex-col gap-2 sm:flex-row">
                <Button 
                  className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="w-full sm:w-auto bg-danger hover:opacity-90 text-white"
                  onClick={startEmergency}
                >
                  Activate Emergency SOS
                </Button>
              </DialogFooter>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <AlertTriangle className="h-12 w-12 text-danger" />
              </div>
              
              <h3 className="text-2xl font-bold text-danger mb-2">
                Emergency SOS activating
              </h3>
              
              <p className="text-lg font-semibold mb-6">
                {countdown} seconds
              </p>
              
              <div className="flex justify-center space-x-3 mb-4">
                <Button 
                  onClick={callEmergencyServices}
                  className="rounded-full bg-green-600 hover:bg-green-700 text-white px-8"
                >
                  <Phone className="mr-2 h-4 w-4" /> Call 911
                </Button>
                <Button 
                  onClick={cancelEmergency}
                  className="rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-8"
                >
                  <X className="mr-2 h-4 w-4" /> Cancel
                </Button>
              </div>
              
              <p className="text-sm text-gray-600">
                Tap cancel to stop the emergency alert
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SOSButton;
