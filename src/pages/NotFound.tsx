
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <img 
        src="/lovable-uploads/dcfdc46b-dc19-4942-b1b9-c5435fac5470.png" 
        alt="Page not found"
        className="w-48 h-48 object-contain mb-8"
      />
      
      <h1 className="text-4xl font-bold text-secondary mb-2">404</h1>
      <p className="text-xl text-gray-600 mb-8 text-center">
        Oops! We couldn't find the page you're looking for
      </p>
      
      <div className="space-y-4 w-full max-w-xs">
        <Button
          onClick={() => navigate('/home')}
          className="w-full"
        >
          Go to Home
        </Button>
        
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="w-full"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
