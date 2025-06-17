// Mock Disaster Data
const disasters = [
  {
    id: 1,
    name: "Hurricane Oliver",
    type: "Hurricane",
    location: "Florida, USA",
    declaredDate: "2025-06-05",
    status: "Severe",
    statusLevel: 4,
  },
  {
    id: 2,
    name: "Wildfire Ridgecrest",
    type: "Wildfire",
    location: "California, USA",
    declaredDate: "2025-06-01",
    status: "Severe",
    statusLevel: 4,
  },
  {
    id: 3,
    name: "Flood Plains Rising",
    type: "Flood",
    location: "Mississippi, USA",
    declaredDate: "2025-06-10",
    status: "Significant",
    statusLevel: 3,
  },
  {
    id: 4,
    name: "Winter Storm Haven",
    type: "Winter Storm",
    location: "Colorado, USA",
    declaredDate: "2025-06-12",
    status: "Elevated",
    statusLevel: 2,
  },
  {
    id: 5,
    name: "Tornado Cluster Delta",
    type: "Tornado",
    location: "Oklahoma, USA",
    declaredDate: "2025-06-13",
    status: "Critical",
    statusLevel: 5,
  }
];

// Mock Resource Optimization Data
const resourceOptimization = {
  currentStatus: {
    fuelSupplies: "Staged",
    medicalUnits: "Active",
    powerRestorationTeams: "On Standby",
  },
  forecast: {
    medicalUnitsIncrease: "15% in Gulf Region",
    preStaging: ["Water restoration teams", "Power crews", "Evacuation transportation"],
    notes: "Expected surge in demand for medical resources over next 48 hours."
  }
};

module.exports = {
  disasters,
  resourceOptimization
}