import React, { useState } from 'react';
import axios from 'axios';

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
        console.log('running there');
        if (Object.keys(validationErrors).length === 0) {
            console.log('running here');
            try {
                const response = await axios.post('http://localhost:8888/contacts', formData);
                console.log(response.status);
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
    if (submitted) {
        return <h3>Thank you for contacting us! We will be in touch soon.</h3>;
    }
    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Clear field error when user starts typing
    };

  return (
    <>
    <p>Welcome to OpenAgent. We've been around since 2013, and our vision is to make it easy for people to buy, sell and own property.</p>

    <p>Here are the different ways you can contact us</p>
    <h4 style={{ textDecoration: 'underline' }}>Contact Us Details</h4>

    <p>Phone: 13 24 34</p>
    <p>Email: support@openagent.com.au</p>

    <h4 style={{ textDecoration: 'underline' }}>Postal Address:</h4>
    <p>PO Box 419, Alexandria NSW 1435</p>

    <h4 style={{ textDecoration: 'underline' }}>Contact centre hours of operation</h4>
    <p>Monday - Friday 8:30 - 5:00</p>

    <h4>Contact Us Form</h4>

    <form onSubmit={handleSubmit}>
        <div>
            <label>First Name</label>
            <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            />
            {errors.firstName && <span style={{ color: 'red' }}>{errors.firstName}</span>}
        </div>

        <div>
            <label>Last Name</label>
            <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            />
            {errors.lastName && <span style={{ color: 'red' }}>{errors.lastName}</span>}
        </div>

        <div>
            <label>Email</label>
            <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            />
            {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </div>

        <div>
            <label>Phone</label>
            <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            />
            {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
        </div>

        <div>
            <label>Additional Info/Note</label>
            <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            placeholder="Any additional information or notes"
            />
        </div>

        <button type="submit">Submit</button>
    </form>
    </>
  )
}
