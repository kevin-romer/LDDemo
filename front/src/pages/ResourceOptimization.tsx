import React, { useEffect, useState } from "react";
import { useApi } from "../context/ApiProvider";
import type { Optimization } from "../types/types";

export const ResourceOptimization: React.FC = () => {
  const api = useApi();
  const [optimizations, setOptimizations] = useState<Optimization | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptimizations = async () => {
      try {
        const data = await api.getResourceOptimization();
        setOptimizations(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOptimizations();
  }, [api]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-lg text-gray-700">Loading resource optimization data...</p>
      </div>
    );
  }

  if (!optimizations) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-lg text-red-700">Failed to load resource optimization data.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-50 py-8">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">
            Resource Optimization
          </h2>
          <p className="text-base text-gray-700 mb-6">
            Leverage predictive models to allocate supplies, personnel, and equipment more efficiently during disaster response operations.
          </p>
        </div>
      </div>

      <section className="max-w-6xl mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded shadow flex flex-col h-full">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">
              Current Allocation Status
            </h3>
            <ul className="text-gray-700 list-disc list-inside">
              <li>Fuel Supplies: {optimizations.currentStatus.fuelSupplies}</li>
              <li>Medical Units: {optimizations.currentStatus.medicalUnits}</li>
              <li>Power Restoration Teams: {optimizations.currentStatus.powerRestorationTeams}</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded shadow flex flex-col h-full">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">
              Optimization Forecast
            </h3>
            <p className="text-gray-700 mb-4">{optimizations.forecast.notes}</p>
            <ul className="text-gray-700 list-disc list-inside">
              <li>Medical Units Increase: {optimizations.forecast.medicalUnitsIncrease}</li>
              {optimizations.forecast.preStaging.map((item, index) => (
                <li key={index}>Pre-staging: {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourceOptimization;
