import React from 'react';
import MessageForm from '../components/MessageForm';
import MessageList from '../components/MessageList';
import '../styles/Messages.css';

const Messages = () => (
  <div className="messages-container">
    <h1 className="messages-title">Messages</h1>
    <div className="messages-form">
      <MessageForm />
    </div>
    <div className="messages-list">
      <MessageList />
    </div>
  </div>
);

export default Messages;