// ContactForm.tsx
import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setResponseMessage('Your message has been sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setResponseMessage('Failed to send the message. Please try again.');
      }
    } catch (error) {
      setResponseMessage('An error occurred while sending your message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6">Get in touch</h2>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Your email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
          Subject <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          value={formData.subject}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          value={formData.message}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="bg-eisha text-white font-bold py-2 px-4 rounded-md">
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
