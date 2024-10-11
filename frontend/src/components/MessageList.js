import React, { useState, useEffect } from 'react';
import { getMessageHistory } from '../services/api';
import '../styles/MessageList.css';

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await getMessageHistory();
      setMessages(response.data);
    };
    fetchMessages();
  }, []);

  return (
    <div>
      <h2>Message History</h2>
      <ul>
        {messages.map((message) => (
          <li key={message._id}>
            To: {message.to} | Template: {message.templateName} | Status: {message.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;