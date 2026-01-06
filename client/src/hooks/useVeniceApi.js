import { useState, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = '/api/venice';

export const useVeniceApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generatePrompt = useCallback(async (theme) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/chat`, {
        model: "fluency",
        messages: [
          {
            role: "system",
            content: "You are a creative director for music videos. Convert the user's theme into a detailed, cinematic video generation prompt. Focus on visual style, lighting, camera movement, and atmosphere. Keep the prompt concise but descriptive (under 1000 characters)."
          },
          {
            role: "user",
            content: `Theme: ${theme}`
          }
        ]
      });
      return response.data.choices[0].message.content;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate prompt');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const queueVideo = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/video/queue`, params);
      return response.data; // Should contain queue_id
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to queue video');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const checkStatus = useCallback(async (requestId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/video/retrieve/${requestId}`);
      return response.data;
    } catch (err) {
      console.error('Status check error:', err);
      return null;
    }
  }, []);

  return {
    generatePrompt,
    queueVideo,
    checkStatus,
    loading,
    error
  };
};
