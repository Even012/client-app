import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
} from '@mui/material';

export default function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch contacts when the component mounts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:8888/contacts');
        const uniqueContacts = response.data.filter((contact, index, self) =>
            index === self.findIndex((c) => (
                c.firstName === contact.firstName && c.lastName === contact.lastName
            ))
        );
        setContacts(uniqueContacts);
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
      setContacts(contacts.map((contact) =>
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
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <CircularProgress />
        <p>Loading contacts...</p>
      </div>
    );
  }

  return (
    <TableContainer 
      component={Paper}
      className='mt-8'
    >
      <Table aria-label="contacts table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>
                {contact.firstName} {contact.lastName}
              </TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phone}</TableCell>
              <TableCell>
                {contact.verified === 1 ? 'Verified' : 'Unverified'}
              </TableCell>
              <TableCell sx={{minWidth: '240px'}}>
                <Button
                  variant="contained"
                  color={contact.verified === 1 ? 'default' : 'success'}
                  onClick={() => markAsVerified(contact.id)}
                  disabled={contact.verified === 1}
                >
                  {contact.verified === 1 ? 'Verified' : 'Verify'}
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => deleteContact(contact.id)}
                  style={{ marginLeft: '10px' }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}