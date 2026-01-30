import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchDrones, fetchDroneDetail } from '../services/api';
import { Drone } from '../types/drone';
import Header from '../components/Header';
import DroneList from '../components/DroneList';
import DroneDetail from '../components/DroneDetail';

const Dashboard: React.FC = () => {
  const [selectedDrone, setSelectedDrone] = useState<Drone | null>(null);

  const { data: drones, isLoading, error } = useQuery({
    queryKey: ['drones'],
    queryFn: fetchDrones,
  });

  const handleSelectDrone = async (drone: Drone) => {
    setSelectedDrone(drone);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading drones</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Drone List</h2>
            {drones && <DroneList drones={drones} onSelectDrone={handleSelectDrone} />}
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Drone Details</h2>
            <DroneDetail drone={selectedDrone} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;