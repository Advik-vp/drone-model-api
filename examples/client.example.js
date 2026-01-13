/**
 * Drone API Client - Example Usage
 *
 * This file demonstrates how to interact with the Drone Model API
 * from a client application (Frontend, CLI, etc.)
 */

class DroneAPIClient {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API Error');
    }

    return data;
  }

  /**
   * Create a new drone model
   * @param {Object} droneData - Drone model data
   * @returns {Promise<Object>} Created drone
   */
  async createDrone(droneData) {
    return this.request('/drones', {
      method: 'POST',
      body: JSON.stringify(droneData)
    });
  }

  /**
   * Get all drone models
   * @param {number} page - Page number (default: 1)
   * @param {number} limit - Items per page (default: 10)
   * @param {string} category - Filter by category (optional)
   * @param {string} search - Search query (optional)
   * @returns {Promise<Object>} Drones with pagination
   */
  async getAllDrones(page = 1, limit = 10, category = null, search = null) {
    const params = new URLSearchParams({
      page,
      limit,
      ...(category && { category }),
      ...(search && { search })
    });

    return this.request(`/drones?${params}`);
  }

  /**
   * Get a single drone by ID
   * @param {string} id - Drone ID
   * @returns {Promise<Object>} Drone data
   */
  async getDroneById(id) {
    return this.request(`/drones/${id}`);
  }

  /**
   * Update a drone model
   * @param {string} id - Drone ID
   * @param {Object} updateData - Fields to update
   * @returns {Promise<Object>} Updated drone
   */
  async updateDrone(id, updateData) {
    return this.request(`/drones/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData)
    });
  }

  /**
   * Delete a drone model
   * @param {string} id - Drone ID
   * @returns {Promise<Object>} Deleted drone
   */
  async deleteDrone(id) {
    return this.request(`/drones/${id}`, {
      method: 'DELETE'
    });
  }

  /**
   * Get drone statistics
   * @returns {Promise<Object>} Statistics by category
   */
  async getDroneStats() {
    return this.request('/drones/stats/summary');
  }

  /**
   * Check API health
   * @returns {Promise<Object>} Health status
   */
  async checkHealth() {
    return this.request('/health');
  }
}

// ============================================
// EXAMPLE USAGE
// ============================================

(async () => {
  const client = new DroneAPIClient('http://localhost:3000');

  try {
    // Check API health
    console.log('Checking API health...');
    const health = await client.checkHealth();
    console.log('✓ API Health:', health.message);

    // Create a drone
    console.log('\nCreating a new drone...');
    const newDrone = await client.createDrone({
      name: 'DJI Air 2S',
      category: 'quadcopter',
      manufacturer: 'DJI',
      maxSpeed: 68,
      maxRange: 6000,
      weight: 586,
      dimensions: {
        length: 25,
        width: 25,
        height: 10
      },
      payloadCapacity: 1080,
      batteryCapacity: 3850,
      firmwareVersion: '2.1.0',
      features: ['20MP Camera', 'Obstacle Avoidance'],
      description: 'Powerful mid-range camera drone'
    });
    console.log('✓ Drone created:', newDrone.data._id);
    const droneId = newDrone.data._id;

    // Get all drones (with pagination)
    console.log('\nFetching all drones...');
    const allDrones = await client.getAllDrones(1, 5);
    console.log(`✓ Found ${allDrones.pagination.totalItems} drones`);
    console.log(`  Showing ${allDrones.data.length} of ${allDrones.pagination.itemsPerPage} per page`);

    // Get single drone
    console.log('\nFetching specific drone...');
    const drone = await client.getDroneById(droneId);
    console.log('✓ Drone fetched:', drone.data.name);

    // Update drone
    console.log('\nUpdating drone...');
    const updated = await client.updateDrone(droneId, {
      maxSpeed: 70,
      description: 'Updated: Very powerful mid-range camera drone'
    });
    console.log('✓ Drone updated:', updated.data.name);

    // Get statistics
    console.log('\nFetching statistics...');
    const stats = await client.getDroneStats();
    console.log('✓ Drone statistics by category:');
    stats.data.forEach(stat => {
      console.log(`  ${stat._id}: ${stat.count} drones, avg speed ${stat.avgMaxSpeed.toFixed(1)} km/h`);
    });

    // Filter drones by category
    console.log('\nFiltering drones by category...');
    const quadcopters = await client.getAllDrones(1, 10, 'quadcopter');
    console.log(`✓ Found ${quadcopters.data.length} quadcopters`);

    // Search drones
    console.log('\nSearching drones...');
    const searchResults = await client.getAllDrones(1, 10, null, 'DJI');
    console.log(`✓ Search found ${searchResults.data.length} drones matching "DJI"`);

    // Delete drone
    console.log('\nDeleting drone...');
    const deleted = await client.deleteDrone(droneId);
    console.log('✓ Drone deleted:', deleted.data.name);

    console.log('\n✨ All operations completed successfully!');

  } catch (error) {
    console.error('✗ Error:', error.message);
  }
})();

// ============================================
// BROWSER/REACT USAGE EXAMPLE
// ============================================

/*
import React, { useState, useEffect } from 'react';

function DroneList() {
  const [drones, setDrones] = useState([]);
  const [loading, setLoading] = useState(true);
  const client = new DroneAPIClient('https://api.dronemodels.com');

  useEffect(() => {
    client.getAllDrones()
      .then(res => setDrones(res.data))
      .catch(err => console.error('Failed to fetch drones:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Available Drones</h1>
      {drones.map(drone => (
        <div key={drone._id}>
          <h3>{drone.name}</h3>
          <p>Category: {drone.category}</p>
          <p>Max Speed: {drone.maxSpeed} km/h</p>
          <p>Max Range: {drone.maxRange}m</p>
        </div>
      ))}
    </div>
  );
}

export default DroneList;
*/

module.exports = DroneAPIClient;
