import React from 'react';
import { Drone } from '../types/drone';

interface DroneListProps {
  drones: Drone[];
  onSelectDrone: (drone: Drone) => void;
}

const DroneList: React.FC<DroneListProps> = ({ drones, onSelectDrone }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {drones.map((drone) => (
        <div
          key={drone._id}
          className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onSelectDrone(drone)}
        >
          <h3 className="text-lg font-semibold">{drone.name}</h3>
          <p className="text-gray-600">{drone.category}</p>
          <p className="text-sm text-gray-500">{drone.manufacturer}</p>
        </div>
      ))}
    </div>
  );
};

export default DroneList;