import { useFlags } from "launchdarkly-react-client-sdk";
import React from "react";
import { Link } from "react-router";

export const Header: React.FC = () => {
  const { preparednessResources, resourceOptimizationModule } = useFlags()
  return (
    <>
      <div className="bg-blue-900 text-white py-3 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/"><h1 className="text-2xl font-semibold">Federal Emergency Coordination</h1></Link>
        </div>
      </div>

      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex space-x-6 text-gray-700 font-medium">
            <Link to="disasters" className="hover:text-blue-700">
              Disasters & Emergencies
            </Link>
            {preparednessResources && <Link to="preparedness" className="hover:text-blue-700">
              Preparedness
            </Link>}
            {resourceOptimizationModule && <Link to="resources" className="hover:text-blue-700">
              Resource Optimization
            </Link>}
          </div>
        </div>
      </nav>
    </>
  );
};
