import React, { useEffect, useState } from "react";
import type { Disaster } from "../types/types";
import { SeverityScale } from "../components/SeverityScale";
import { useApi } from "../context/ApiProvider";

export const ActiveDisasters: React.FC = () => {
  const api = useApi();
  const [disasters, setDisasters] = useState<Disaster[]>([]);

  useEffect(() => {
    const fetchDisasters = async () => {
      try {
        const data = await api.getDisasters();
        setDisasters(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDisasters();
  }, [api]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-50 py-8">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">
            Active Disasters & Emergencies
          </h2>
          <p className="text-base text-gray-700 mb-6">
            Current federally declared disasters and ongoing response operations nationwide.
          </p>
        </div>
      </div>

      <SeverityScale />

      <section className="max-w-6xl mx-auto py-16 px-4">
        <div className="flex flex-col gap-6">
          {disasters.map((disaster) => (
            <div key={disaster.id} className="bg-white rounded shadow hover:shadow-lg transition flex h-full md:flex-row justify-between items-stretch">
              <div className="flex flex-col p-6  justify-between">
                <h3 className="text-2xl font-semibold text-blue-900 mb-2">{disaster.name}</h3>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Type:</span> {disaster.type}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Location:</span> {disaster.location}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Declared:</span> {disaster.declaredDate}
                </p>
              </div>

              <div className="mt-6 md:mt-0 md:ml-8 flex items-stretch">
                <div
                  className={`flex items-center justify-center w-48 text-white text-lg font-semibold px-6 py-4 rounded-r shadow h-full ${
                    disaster.statusLevel === 1
                      ? "bg-green-600"
                      : disaster.statusLevel === 2
                      ? "bg-yellow-500"
                      : disaster.statusLevel === 3
                      ? "bg-orange-500"
                      : disaster.statusLevel === 4
                      ? "bg-red-600"
                      : "bg-purple-700"
                  }`}
                >
                  {disaster.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};