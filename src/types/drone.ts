export interface Drone {
  _id: string;
  name: string;
  category: string;
  manufacturer: string;
  maxSpeed: number;
  maxRange: number;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  payloadCapacity: number;
  batteryCapacity: number;
  firmwareVersion: string;
  enabled: boolean;
  features: string[];
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface DroneDetail extends Drone {
  // Additional fields if needed
}