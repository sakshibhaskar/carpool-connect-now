
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Phone, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const faqItems = [
  {
    question: 'How do I book a ride?',
    answer: 'To book a ride, search for your destination, choose an available ride, and follow the booking instructions. Payment will be processed securely through our app.'
  },
  {
    question: 'What is the cancellation policy?',
    answer: 'You can cancel a ride up to 24 hours before departure for a full refund. Cancellations within 24 hours receive a partial refund of 50%.'
  },
  {
    question: 'How do I contact my driver?',
    answer: 'After booking a ride, you can message your driver through our in-app chat feature. Your driver\'s phone number will also be available in the ride details.'
  },
  {
    question: 'What if my ride is delayed or canceled?',
    answer: 'If your ride is delayed or canceled by the driver, you will receive an automatic notification and a full refund. We\'ll also help you find alternative transportation.'
  },
  {
    question: 'How do I use the SOS feature?',
    answer: 'The SOS button is available in the bottom corner of the app. Tap it in case of emergency, and our team will be notified immediately to assist you.'
  }
];

const HelpSupportPage = () => {
  const navigate = useNavigate();
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm({
      ...contactForm,
      [name]: value
    });
  };

  const handleSubmitContactForm = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Your message has been sent. We\'ll get back to you soon.');
    setContactForm({
      name: '',
      email: '',
      message: ''
    });
  };

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
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
        <h1 className="text-xl font-semibold text-secondary ml-4">Help & Support</h1>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Support Options */}
        <div className="bg-white rounded-lg mb-6">
          <a href="tel:+1234567890" className="flex items-center p-4 border-b">
            <div className="bg-primary-50 p-2 rounded-full mr-3">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="font-medium">Call Support</div>
              <div className="text-sm text-gray-500">24/7 customer service</div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </a>
          
          <a href="mailto:support@carpoolapp.com" className="flex items-center p-4 border-b">
            <div className="bg-primary-50 p-2 rounded-full mr-3">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="font-medium">Email Support</div>
              <div className="text-sm text-gray-500">support@carpoolapp.com</div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </a>
          
          <button 
            className="flex items-center p-4 w-full text-left"
            onClick={() => navigate('/messages/support')}
          >
            <div className="bg-primary-50 p-2 rounded-full mr-3">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="font-medium">Live Chat</div>
              <div className="text-sm text-gray-500">Chat with customer service</div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        </div>
        
        {/* FAQ Section */}
        <div className="bg-white rounded-lg overflow-hidden mb-6">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>
          </div>
          
          {faqItems.map((item, index) => (
            <div key={index} className="border-b last:border-0">
              <button
                className="flex items-center justify-between w-full p-4 text-left"
                onClick={() => toggleQuestion(index)}
              >
                <span className="font-medium">{item.question}</span>
                <ChevronRight className={`h-5 w-5 text-gray-400 transform transition-transform ${activeQuestion === index ? 'rotate-90' : ''}`} />
              </button>
              
              {activeQuestion === index && (
                <div className="px-4 pb-4 text-gray-600">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Contact Form */}
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="text-lg font-semibold">Contact Us</h2>
          </div>
          
          <form onSubmit={handleSubmitContactForm} className="p-4 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={contactForm.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={contactForm.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                How can we help you?
              </label>
              <Textarea
                id="message"
                name="message"
                rows={4}
                value={contactForm.message}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportPage;
