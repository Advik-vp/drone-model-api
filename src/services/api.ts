import axios from 'axios';
import { Drone, DroneDetail } from '../types/drone';

const API_BASE_URL = 'http://localhost:3000'; // Backend URL

export const fetchDrones = async (): Promise<Drone[]> => {
  const response = await axios.get<Drone[]>(`${API_BASE_URL}/drones`);
  return response.data;
};

export const fetchDroneDetail = async (droneId: string): Promise<DroneDetail> => {
  const response = await axios.get<DroneDetail>(`${API_BASE_URL}/drones/${droneId}`);
  return response.data;
};

export const createDrone = async (drone: Omit<Drone, '_id' | 'createdAt' | 'updatedAt'>): Promise<Drone> => {
  const response = await axios.post<Drone>(`${API_BASE_URL}/drones`, drone);
  return response.data;
};

export const updateDrone = async (droneId: string, drone: Partial<Drone>): Promise<Drone> => {
  const response = await axios.put<Drone>(`${API_BASE_URL}/drones/${droneId}`, drone);
  return response.data;
};

export const deleteDrone = async (droneId: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/drones/${droneId}`);
};