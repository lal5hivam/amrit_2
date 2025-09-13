# Groundwater Quality Dashboard & HPI Calculator

A comprehensive web application for analyzing Heavy Metal Pollution Index (HPI) across various groundwater locations. The project consists of a Node.js backend API and a modern Next.js frontend application.

## 🚀 Quick Start

### Option 1: Automated Start (Windows)
Run one of these scripts to start both servers:
```bash
# Batch file
start-servers.bat

# PowerShell script
.\start-servers.ps1
```

### Option 2: Manual Start
1. **Start Backend:**
   ```bash
   cd backend
   npm install
   npm start
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── api/
│   │   │   ├── controllers/
│   │   │   └── routes/
│   │   ├── services/
│   │   ├── loaders/
│   │   └── app.js
│   ├── data/
│   │   └── groundwater_data.csv
│   └── package.json
├── frontend/               # Next.js React application
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── types/
│   └── package.json
├── start-servers.bat       # Windows batch script
├── start-servers.ps1       # PowerShell script
└── README.md
```

## 🔧 Features

### Backend API
- **RESTful API** for groundwater data management
- **HPI Calculation** using scientific formulas
- **CSV Data Loading** with automatic processing
- **CORS Support** for frontend integration
- **Data Validation** and error handling

### Frontend Application
- **Interactive Map** with Leaflet and heatmap visualization
- **Data Explorer** to browse existing locations
- **Add New Data** form with real-time validation
- **Responsive Design** with Tailwind CSS
- **TypeScript** for type safety
- **Modern React** with Next.js 15

## 🗺️ Map Features

- **Heatmap Visualization**: Shows pollution intensity across locations
- **Interactive Markers**: Click to view location details
- **Responsive Design**: Works on desktop and mobile
- **Real-time Updates**: Map updates when new data is added

## 📊 Data Management

### Existing Data
- Browse 100+ groundwater locations across India
- View HPI scores and water quality ratings
- Detailed metal concentration data
- Historical data by year

### Adding New Data
- Form-based data entry
- Real-time HPI calculation
- Validation and error handling
- Automatic map updates

## 🧪 Heavy Metal Pollution Index (HPI)

The application calculates HPI using scientific standards:

- **Arsenic (As)**: 10 µg/L standard
- **Iron (Fe)**: 300 µg/L standard  
- **Uranium (U)**: 30 µg/L standard
- **Lead (Pb)**: 10 µg/L standard
- **Cadmium (Cd)**: 3 µg/L standard
- **Nickel (Ni)**: 20 µg/L standard
- **Chromium (Cr)**: 50 µg/L standard

### Quality Ratings
- **Excellent**: HPI < 50
- **Good**: HPI 50-100
- **Slightly Polluted**: HPI 100-200
- **Unsuitable for drinking**: HPI > 200

## 🛠️ Technology Stack

### Backend
- **Node.js** with Express.js
- **CSV Parser** for data processing
- **CORS** middleware
- **File System** operations

### Frontend
- **Next.js 15** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Leaflet** for maps
- **React Leaflet** for React integration

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/all-data` | Get all groundwater data with HPI |
| GET | `/api/locations` | Get unique location names |
| GET | `/api/calculate/hpi/:location` | Calculate HPI for specific location |
| POST | `/api/add-data` | Add new data point |

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm run dev  # Next.js development server
```

### Building for Production
```bash
# Frontend
cd frontend
npm run build
npm start

# Backend
cd backend
npm start
```

## 📝 Data Format

### Input Data
```json
{
  "Location": "Sample Location",
  "Latitude": "28.6139",
  "Longitude": "77.2090",
  "As": "15",
  "Fe": "250",
  "U": "40",
  "Pb": "8",
  "Cd": "2.5",
  "Ni": "20",
  "Cr": "15"
}
```

### Output Data
```json
{
  "Location": "Sample Location",
  "hpi": 85.5,
  "quality": "Good",
  "State": "Delhi",
  "District": "New Delhi",
  "Year": "2024"
}
```

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📱 Mobile Support

The application is fully responsive and works on:
- iOS Safari
- Android Chrome
- Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Troubleshooting

### Common Issues

1. **Backend not starting**: Check if port 5000 is available
2. **Frontend not loading**: Ensure backend is running first
3. **Map not displaying**: Check browser console for errors
4. **CORS errors**: Verify backend CORS configuration

### Getting Help

- Check the console for error messages
- Ensure both servers are running
- Verify API endpoints are accessible
- Check network connectivity

## 🔄 Migration from index.html

This Next.js application replaces the original `index.html` file with:
- ✅ Modern React components
- ✅ TypeScript support
- ✅ Better error handling
- ✅ Improved performance
- ✅ Mobile responsiveness
- ✅ Maintainable code structure
