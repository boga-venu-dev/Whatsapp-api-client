import React, { useState, useEffect } from 'react';
import { sendMessage, getMessageTemplates } from '../services/api';
import '../styles/MessageForm.css';

const MessageForm = () => {
  const [to, setTo] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [templateData, setTemplateData] = useState('');
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    getMessageTemplates().then(response => setTemplates(response.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendMessage(to, templateName, JSON.parse(templateData));
      alert('Message sent successfully!');
    } catch (error) {
      alert('Error sending message');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="Recipient's phone number"
        required
      />
      <select
        value={templateName}
        onChange={(e) => setTemplateName(e.target.value)}
        required
      >
        <option value="">Select a template</option>
        {templates.map(template => (
          <option key={template.name} value={template.name}>{template.name}</option>
        ))}
      </select>
      <textarea
        value={templateData}
        onChange={(e) => setTemplateData(e.target.value)}
        placeholder="Template data (JSON format)"
        required
      />
      <button type="submit">Send Message</button>
    </form>
  );
};

export default MessageForm;