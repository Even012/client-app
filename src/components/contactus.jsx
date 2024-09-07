import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';

export default function ContactUS() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        additionalInfo: '',
      });
    
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    // Basic form validation function
    const validate = () => {
        const newErrors = {};

        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'A valid email is required';
        if (!formData.phone || !/^\d{10}$/.test(formData.phone)) newErrors.phone = 'A valid 10-digit phone number is required';

        return newErrors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post('http://localhost:8888/contacts', formData);
                if (response.status === 201) {
                  setSubmitted(true);
                }
              } catch (error) {
                console.error('Error:', error);
              }
        } else {
            setErrors(validationErrors);
        }
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Clear field error when user starts typing
    };

  return (
    <div >
    <Typography variant="body1" gutterBottom sx={{ pl: '2rem', fontSize: '2rem',fontWeight: 'bold' }} className='pt-4 sm:pt-8 sm:pb-8'>
        Contact us, we love to hear from you
    </Typography>
   
    <div className="flex flex-wrap justify-between items-start">
        <Box className="w-full md:w-1/2 pr-8 pb-8 pl-8">
            <Typography variant="body1" gutterBottom>
                Welcome to OpenAgent. We've been around since 2013, and our vision is to make it easy for people to buy, sell and own property.
            </Typography>

            <Typography variant="body1" gutterBottom sx={{ pt: 2, pb: 2 }}>
                Here are the different ways you can contact us
            </Typography>

            <Typography variant="body1" sx={{ pb: 2, textDecoration: 'underline', fontWeight: 'bold' }} gutterBottom>
                Contact Us Details
            </Typography>

            <Typography variant="body1" gutterBottom>
                Phone: 13 24 34
            </Typography>
            <Typography variant="body1" gutterBottom>
                Email: support@openagent.com.au
            </Typography>

            <Typography variant="body1" sx={{ pt: 2, pb: 2, textDecoration: 'underline', fontWeight: 'bold' }} gutterBottom>
                Postal Address
            </Typography>

            <Typography variant="body1" gutterBottom>
                PO Box 419, Alexandria NSW 1435
            </Typography>

            <Typography variant="body1" sx={{ pt: 2, pb: 2,  textDecoration: 'underline', fontWeight: 'bold' }} gutterBottom>
                Contact Centre Hours of Operation
            </Typography>

            <Typography variant="body1" gutterBottom>
                Monday - Friday 8:30 - 5:00
            </Typography>
        </Box>

        <Box className="w-full md:w-1/2 p-8 bg-gray-50 min-h-[450px]">
        { submitted ? (
            <Box className="text-center">
                <Typography variant="h5" sx={{fontWeight:'bold'}}>Thank you</Typography>
                <Typography variant="body1" >Thank you for your feedback. We'll be in touch shortly.</Typography>
            </Box>
        ) : (
        <form onSubmit={handleSubmit}> 
            <Typography variant="body1" gutterBottom sx={{pb: 2}}>
                Fill in your details and we'll be in touch right away. Or if you prefer, call us on 13 24 34
            </Typography>      
            <Box mb={2}>
            <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName}
                variant="outlined"
            />
            </Box>

            <Box mb={2}>
            <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                error={!!errors.lastName}
                helperText={errors.lastName}
                variant="outlined"
            />
            </Box>

            <Box mb={2}>
            <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                error={!!errors.email}
                helperText={errors.email}
                variant="outlined"
            />
            </Box>

            <Box mb={2}>
            <TextField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                error={!!errors.phone}
                helperText={errors.phone}
                variant="outlined"
            />
            </Box>

            <Box mb={2}>
            <TextField
                label="What do you want to speak to us about"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                fullWidth
                multiline
                rows={8}
                variant="outlined"
            />
            </Box>

            <Button 
              type="submit" 
              variant="contained" 
              sx={{
                backgroundColor: '#00AC55',   
                color: '#fff',               
                height: '55px',               
                '&:hover': {
                  backgroundColor: '#408A4E', 
                },
              }}
              fullWidth>
                send message
            </Button>
        </form>
        )}
        </Box>
    </div>        
    </div>

  )
}
