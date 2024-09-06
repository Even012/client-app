import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch contacts when the component mounts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:8888/contacts');
        setContacts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Mark contact as verified
  const markAsVerified = async (id) => {
    try {
      await axios.put(`http://localhost:8888/contacts/${id}/verify`);
      setContacts(contacts.map(contact =>
        contact.id === id ? { ...contact, verified: 1 } : contact
      ));
    } catch (error) {
      console.error('Error marking contact as verified:', error);
    }
  };

  // Delete a contact
  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:8888/contacts/${id}`);
      setContacts(contacts.filter(contact => contact.id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  if (loading) {
    return <p>Loading contacts...</p>;
  }

  return (
    <div>
      <h2>Contacts List</h2>
      {contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              <strong>{contact.firstName} {contact.lastName}</strong> ({contact.email}, {contact.phone})
              <div>
                <button
                  onClick={() => markAsVerified(contact.id)}
                  disabled={contact.verified === 1}
                >
                  {contact.verified === 1 ? 'Verified' : 'Mark as verified'}
                </button>
                <button onClick={() => deleteContact(contact.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}