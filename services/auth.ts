// app/services/auth.ts

import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://logging-captured-weight-master.trycloudflare.com/api';

export const auth = {
  login: async (username: string, password: string): Promise<string> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      const token = data.token;
      await AsyncStorage.setItem('authToken', token);
      return token;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (username: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) throw new Error('Registration failed');
      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem('authToken');
  },

  getToken: async (): Promise<string | null> => {
    return await AsyncStorage.getItem('authToken');
  }
};