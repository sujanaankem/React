import { useState } from 'react';
import './JoinPage.css';

function JoinPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    bio: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must contain at least 6 characters';
    }

    // Optional field validation
    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must contain exactly 10 digits';
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setMessage('Form submitted successfully!');
      console.log(formData);
    } else {
      setMessage('');
    }
  };

  return (
    <div className="join-page">
      <h1>Join Us</h1>

      <form className="join-form" onSubmit={handleSubmit}>
        <label>
          Name *
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </label>
        <p className="error">{errors.name}</p>

        <label>
          Email *
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </label>
        <p className="error">{errors.email}</p>

        <label>
          Password *
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </label>
        <p className="error">{errors.password}</p>

        <label>
          Phone number (optional)
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Optional phone number"
          />
        </label>
        <p className="error">{errors.phone}</p>

        <label>
          Bio (optional)
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself"
          />
        </label>

        <button type="submit">Join</button>

        {message && <p className="success">{message}</p>}
      </form>
    </div>
  );
}

export default JoinPage;