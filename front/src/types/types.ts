export interface InfoCardProps {
  title: string;
  description: string;
  linkText: string;
  linkTo: string;
}

export interface Disaster {
  id: number;
  name: string;
  type: string;
  location: string;
  declaredDate: string;
  status: "Minimal" | "Elevated" | "Significant" | "Severe" | "Critical";
  statusLevel: number;
}

export interface Optimization {
  currentStatus: {
    fuelSupplies: string;
    medicalUnits: string;
    powerRestorationTeams: string;
  };
  forecast: {
    medicalUnitsIncrease: string;
    preStaging: string[];
    notes: string;
  };
}