
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import SOSButton from '@/components/emergency/SOSButton';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
}

const EmergencyContactsPage = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    { id: '1', name: 'Jane Smith', phone: '+1 (234) 567-8901' },
    { id: '2', name: 'Robert Johnson', phone: '+1 (345) 678-9012' }
  ]);
  const [newContact, setNewContact] = useState({ name: '', phone: '' });
  const [isAdding, setIsAdding] = useState(false);

  const handleSaveContact = () => {
    if (!newContact.name || !newContact.phone) {
      toast.error('Please provide both name and phone number');
      return;
    }

    const contact = {
      id: Date.now().toString(),
      name: newContact.name,
      phone: newContact.phone
    };

    setContacts([...contacts, contact]);
    setNewContact({ name: '', phone: '' });
    setIsAdding(false);
    toast.success('Emergency contact added');
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    toast.success('Emergency contact removed');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white p-4 border-b flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="p-1"
        >
          <ArrowLeft className="h-6 w-6 text-secondary" />
        </button>
        <h1 className="text-xl font-semibold text-secondary ml-4">Emergency Contacts</h1>
      </div>
      
      {/* Description */}
      <div className="p-4 bg-white border-b">
        <p className="text-gray-600">
          Add contacts who will be notified in case of an emergency. They will receive your location and ride details.
        </p>
      </div>
      
      {/* Contact List */}
      <div className="divide-y divide-gray-100 bg-white">
        {contacts.map(contact => (
          <div key={contact.id} className="p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{contact.name}</div>
              <div className="text-sm text-gray-500 flex items-center">
                <Phone className="h-3 w-3 mr-1" /> {contact.phone}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteContact(contact.id)}
              className="text-gray-400 hover:text-danger"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        ))}
      </div>
      
      {/* Add Contact Form */}
      {isAdding ? (
        <div className="p-4 mt-4 bg-white border-y">
          <div className="space-y-3">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Name
              </label>
              <Input
                id="name"
                value={newContact.name}
                onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                placeholder="Enter name"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <Input
                id="phone"
                value={newContact.phone}
                onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                placeholder="Enter phone number"
              />
            </div>
            <div className="flex space-x-2 pt-2">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsAdding(false)}
              >
                Cancel
              </Button>
              <Button 
                className="w-full"
                onClick={handleSaveContact}
              >
                Save Contact
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 mt-4">
          <Button 
            onClick={() => setIsAdding(true)} 
            className="w-full"
            variant="outline"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Emergency Contact
          </Button>
        </div>
      )}
      
      {/* SOS Button */}
      <SOSButton />
    </div>
  );
};

export default EmergencyContactsPage;
