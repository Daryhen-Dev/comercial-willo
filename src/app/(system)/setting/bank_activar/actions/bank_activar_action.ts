'use server'
import { BankActivarActionInterface } from "../interfaces/bank_activar_action_interface"
import axios from 'axios';
import https from 'https';

const agent = new https.Agent({ 
  rejectUnauthorized: false 
});

const api = axios.create({
  baseURL: 'https://localhost:7090',
  httpsAgent: agent
});

export const bank_activar = async (): Promise<BankActivarActionInterface[]> => {
  try {
    const response = await api.get('/api/UserCad/GetAllUser');
    return response.data;
  } catch (error) {
    console.error('Error calling API:', error);
    return [];
  }
}
