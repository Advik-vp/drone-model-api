# Drone Model API - Frontend

A simple, responsive web dashboard to interact with the Drone Model API.

## Features

- ✅ View all drone models with pagination
- ✅ Search and filter drones by category
- ✅ Create new drone models with validation
- ✅ Delete existing drone models
- ✅ View statistics by category
- ✅ Responsive design
- ✅ Beautiful UI with animations

## Quick Start

### Option 1: Using the Built-in Server

1. Make sure the backend API is running:
```bash
cd /path/to/drone-model-api
npm start
```

2. In a new terminal, start the frontend server:
```bash
node frontend/server.js
```

3. Open your browser and navigate to:
```
http://localhost:8080
```

### Option 2: Using any HTTP Server

You can also use any static file server to serve the `index.html` file:

```bash
# Using Python
python3 -m http.server 8080

# Using Node.js http-server
npx http-server frontend -p 8080

# Using PHP
php -S localhost:8080
```

## Configuration

The frontend is configured to connect to the backend API at `http://localhost:3000` by default.

To change this, edit the `API_URL` constant in `index.html`:

```javascript
const API_URL = 'http://localhost:3000';  // Change this to your API URL
```

## Usage

### View Drones
- Navigate to the "View Drones" tab
- Use the search box to find specific drones
- Filter by category using the dropdown
- Navigate through pages using pagination buttons

### Create Drone
- Navigate to the "Create Drone" tab
- Fill in all required fields (marked with *)
- Click "Create Drone Model" to submit
- The form will validate your input before submission

### Statistics
- Navigate to the "Statistics" tab
- View aggregated statistics by drone category
- See average speed and weight for each category

### Delete Drone
- In the "View Drones" tab, click "Delete" on any drone card
- Confirm the deletion when prompted

## API Endpoints Used

The frontend uses the following API endpoints:

- `GET /drones` - List all drones with pagination and filters
- `POST /drones` - Create a new drone
- `DELETE /drones/:id` - Delete a drone
- `GET /drones/stats/summary` - Get statistics

## Browser Compatibility

This dashboard works on all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### CORS Errors

If you see CORS errors in the browser console, make sure:
1. The backend API is running
2. CORS is enabled in the backend (it's enabled by default)
3. You're accessing the frontend through the correct URL

### Connection Errors

If the frontend can't connect to the API:
1. Verify the backend is running at `http://localhost:3000`
2. Check the `API_URL` constant in `index.html`
3. Make sure there are no firewalls blocking the connection

## Screenshots

The dashboard features:
- Modern gradient design
- Card-based drone display
- Interactive forms with validation
- Real-time statistics
- Smooth animations and transitions
