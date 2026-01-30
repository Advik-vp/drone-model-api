import React from 'react';
import { Drone } from '../types/drone';

interface DroneDetailProps {
  drone: Drone | null;
}

const DroneDetail: React.FC<DroneDetailProps> = ({ drone }) => {
  if (!drone) {
    return <div className="text-center text-gray-500">Select a drone to view details</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{drone.name}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p><strong>Category:</strong> {drone.category}</p>
          <p><strong>Manufacturer:</strong> {drone.manufacturer}</p>
          <p><strong>Max Speed:</strong> {drone.maxSpeed} km/h</p>
          <p><strong>Max Range:</strong> {drone.maxRange} m</p>
          <p><strong>Weight:</strong> {drone.weight} g</p>
        </div>
        <div>
          <p><strong>Payload Capacity:</strong> {drone.payloadCapacity} g</p>
          <p><strong>Battery Capacity:</strong> {drone.batteryCapacity} mAh</p>
          <p><strong>Firmware Version:</strong> {drone.firmwareVersion}</p>
          <p><strong>Enabled:</strong> {drone.enabled ? 'Yes' : 'No'}</p>
        </div>
      </div>
      <div className="mt-4">
        <p><strong>Dimensions:</strong> {drone.dimensions.length} x {drone.dimensions.width} x {drone.dimensions.height} cm</p>
        <p><strong>Features:</strong> {drone.features.join(', ')}</p>
        <p><strong>Description:</strong> {drone.description}</p>
      </div>
    </div>
  );
};

export default DroneDetail;