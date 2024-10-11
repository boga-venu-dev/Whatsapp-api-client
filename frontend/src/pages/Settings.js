import React, { useState, useEffect } from 'react';
import { getSettings, updateSettings } from '../services/api';
import '../styles/Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    whatsappPhoneNumber: '',
    shopifyWebhookUrl: '',
    defaultLanguage: 'en',
    messageTemplates: [],
    notificationEmail: '',
    autoRespondEnabled: false
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const response = await getSettings();
      setSettings(response.data);
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSettings(settings);
      alert('Settings updated successfully');
    } catch (error) {
      alert('Failed to update settings');
    }
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Settings</h1>
      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="settings-group">
          <label htmlFor="whatsappPhoneNumber">WhatsApp Phone Number</label>
          <input
            type="text"
            id="whatsappPhoneNumber"
            name="whatsappPhoneNumber"
            value={settings.whatsappPhoneNumber}
            onChange={handleChange}
          />
        </div>

        <div className="settings-group">
          <label htmlFor="shopifyWebhookUrl">Shopify Webhook URL</label>
          <input
            type="text"
            id="shopifyWebhookUrl"
            name="shopifyWebhookUrl"
            value={settings.shopifyWebhookUrl}
            onChange={handleChange}
          />
        </div>

        <div className="settings-group">
          <label htmlFor="defaultLanguage">Default Language</label>
          <select
            id="defaultLanguage"
            name="defaultLanguage"
            value={settings.defaultLanguage}
            onChange={handleChange}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>

        <div className="settings-group">
          <label htmlFor="notificationEmail">Notification Email</label>
          <input
            type="email"
            id="notificationEmail"
            name="notificationEmail"
            value={settings.notificationEmail}
            onChange={handleChange}
          />
        </div>

        <div className="settings-group">
          <label>
            <input
              type="checkbox"
              name="autoRespondEnabled"
              checked={settings.autoRespondEnabled}
              onChange={handleChange}
            />
            Enable Auto-Respond
          </label>
        </div>

        <button type="submit" className="settings-submit">Save Settings</button>
      </form>
    </div>
  );
};

export default Settings;