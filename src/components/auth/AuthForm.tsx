
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface AuthFormProps {
  type: 'login' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    phoneNumber: '',
    gender: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/');
    }
  };

  const handleNext = () => {
    if (type === 'signup') {
      // Form validation for each step
      if (step === 1) {
        // Email validation
        if (!formData.email) {
          toast.error('Please enter your email');
          return;
        }
        setStep(2);
      } else if (step === 2) {
        // Name validation
        if (!formData.firstName || !formData.lastName) {
          toast.error('Please enter your full name');
          return;
        }
        setStep(3);
      } else if (step === 3) {
        // Date of birth validation
        if (!formData.dateOfBirth) {
          toast.error('Please enter your date of birth');
          return;
        }
        setStep(4);
      } else if (step === 4) {
        // Password validation
        if (!formData.password || formData.password.length < 8) {
          toast.error('Password must be at least 8 characters');
          return;
        }
        setStep(5);
      } else if (step === 5) {
        // Gender validation
        if (!formData.gender) {
          toast.error('Please select how you would like to be addressed');
          return;
        }
        setStep(6);
      } else if (step === 6) {
        // Phone validation
        if (!formData.phoneNumber) {
          toast.error('Please enter your phone number');
          return;
        }
        // Submit form
        handleSubmit();
      }
    } else {
      // Login
      if (!formData.email || !formData.password) {
        toast.error('Please fill in all fields');
        return;
      }
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    // Mock authentication
    toast.success(type === 'login' ? 'Successfully logged in!' : 'Account created successfully!');
    // Redirect to home after login/signup
    navigate('/home');
  };

  const renderSignupStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-primary-title">How do you want to sign up?</h1>
            
            <div className="space-y-4">
              <button 
                className="flex items-center w-full text-left py-3 px-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                onClick={() => handleSelectChange('signupMethod', 'email')}
              >
                <Mail className="h-5 w-5 mr-4 text-secondary" />
                <span className="text-secondary text-lg">Sign up with your email</span>
                <ArrowLeft className="ml-auto h-5 w-5 transform rotate-180 text-gray-400" />
              </button>
              
              <button 
                className="flex items-center w-full text-left py-3 px-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                onClick={() => handleSelectChange('signupMethod', 'facebook')}
              >
                <Facebook className="h-5 w-5 mr-4 text-blue-600" />
                <span className="text-secondary text-lg">Continue with Facebook</span>
                <ArrowLeft className="ml-auto h-5 w-5 transform rotate-180 text-gray-400" />
              </button>
            </div>
            
            <p className="text-gray-500 text-sm">
              By signing up, you accept our <a href="#" className="text-primary">Terms and Conditions</a> and <a href="#" className="text-primary">Privacy Policy</a>.
            </p>
            
            <div className="mt-8">
              <p className="text-secondary text-lg">Already a member?</p>
              <button 
                className="text-primary text-lg font-semibold"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-primary-title">What's your name?</h1>
            
            <div className="space-y-4">
              <Input
                className="input-base"
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <Input
                className="input-base"
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-primary-title">What's your date of birth?</h1>
            
            <Input
              className="input-base"
              type="text"
              name="dateOfBirth"
              placeholder="dd/MM/yyyy"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
            />
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-primary-title">Define your password</h1>
            <p className="text-gray-500">
              It must have at least 8 characters, 1 letter, 1 number and 1 special character.
            </p>
            
            <Input
              className="input-base"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-primary-title">How would you like to be addressed?</h1>
            
            <div className="space-y-2">
              <button 
                className={`flex justify-between w-full text-left py-3 px-4 border ${formData.gender === 'miss' ? 'border-primary' : 'border-gray-200'} rounded-lg hover:bg-gray-50`}
                onClick={() => handleSelectChange('gender', 'miss')}
              >
                <span className="text-secondary text-lg">Miss / Madam</span>
                <ArrowLeft className="h-5 w-5 transform rotate-180 text-gray-400" />
              </button>
              
              <button 
                className={`flex justify-between w-full text-left py-3 px-4 border ${formData.gender === 'sir' ? 'border-primary' : 'border-gray-200'} rounded-lg hover:bg-gray-50`}
                onClick={() => handleSelectChange('gender', 'sir')}
              >
                <span className="text-secondary text-lg">Sir</span>
                <ArrowLeft className="h-5 w-5 transform rotate-180 text-gray-400" />
              </button>
              
              <button 
                className={`flex justify-between w-full text-left py-3 px-4 border ${formData.gender === 'neutral' ? 'border-primary' : 'border-gray-200'} rounded-lg hover:bg-gray-50`}
                onClick={() => handleSelectChange('gender', 'neutral')}
              >
                <span className="text-secondary text-lg">I'd rather not say</span>
                <ArrowLeft className="h-5 w-5 transform rotate-180 text-gray-400" />
              </button>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-primary-title">Please verify your mobile number</h1>
            
            <div className="flex border rounded-full bg-gray-100 overflow-hidden">
              <div className="flex items-center px-4 bg-gray-100 border-r">
                <span className="mr-2">🇮🇳</span>
                <span>(+91)</span>
              </div>
              <Input
                className="border-0 bg-transparent px-4 py-3 flex-1 focus:outline-none"
                type="tel"
                name="phoneNumber"
                placeholder="Mobile phone"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="flex items-start mt-4">
              <input
                type="checkbox"
                id="optOut"
                className="mt-1 mr-2"
              />
              <label htmlFor="optOut" className="text-sm text-gray-600">
                I don't want to receive special offers and personalised recommendations via text messages or calls
              </label>
            </div>
            
            <p className="text-gray-500 text-sm">
              By entering your phone number, you agree to receive promotional SMS, WhatsApp messages and calls. Opt out now by checking the box above or at any time in your profile settings.
            </p>
            
            <div className="mt-4">
              <button className="text-secondary text-lg">I'll do it later</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderLoginForm = () => {
    return (
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-primary-title">Login to your account</h1>
        
        <div className="space-y-4">
          <Input
            className="input-base"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            className="input-base"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="flex justify-end">
          <a href="#" className="text-primary text-sm">Forgot password?</a>
        </div>
        
        <div className="space-y-4">
          <button
            className="btn-primary w-full"
            onClick={handleNext}
          >
            Login
          </button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>
          
          <button className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-full hover:bg-gray-50">
            <Facebook className="h-5 w-5 mr-2 text-blue-600" />
            <span>Continue with Facebook</span>
          </button>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-500">
            Don't have an account? <button onClick={() => navigate('/signup')} className="text-primary font-semibold">Sign up</button>
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full p-6">
      {/* Back button */}
      {(type === 'signup' && step > 1) || type === 'login' ? (
        <button
          className="mb-6 p-1 rounded-full hover:bg-gray-100"
          onClick={handleBack}
        >
          <ArrowLeft className="h-6 w-6 text-primary" />
        </button>
      ) : null}
      
      {/* Form content */}
      {type === 'signup' ? renderSignupStep() : renderLoginForm()}
      
      {/* Next button for signup flow */}
      {type === 'signup' && step > 1 && step < 7 && (
        <div className="fixed bottom-6 left-6 right-6">
          <Button onClick={handleNext} className="btn-primary w-full">
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
