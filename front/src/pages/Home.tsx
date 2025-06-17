import React, { useEffect, useState } from "react";
import { InfoCard } from "../components/InfoCard";
import { useFlags } from "launchdarkly-react-client-sdk";
import type { InfoCardProps } from "../types/types";

export const Home: React.FC = () => {
  const { resourceOptimizationModule, preparednessResources, activeDisasters } = useFlags();
  const [infoCards, setInfoCards] = useState<InfoCardProps[]>();

  useEffect(() => {
    setInfoCards([
      activeDisasters && {
        title: "Active Disasters",
        description: "View current declared disasters and federal response efforts nationwide.",
        linkText: "View Updates",
        linkTo: "/disasters",
      },
      preparednessResources && {
        title: "Preparedness Resources",
        description: "Access guides and checklists to help your family and organization prepare for disasters.",
        linkText: "Learn More",
        linkTo: "/preparedness",
      },
      resourceOptimizationModule && {
        title: "Resource Optimization",
        description: "Leverage predictive models to allocate supplies, personnel, and equipment more efficiently during disaster response operations.",
        linkText: "View Module",
        linkTo: "/resources",
      }
    ].filter(Boolean));
  }, [preparednessResources, activeDisasters, resourceOptimizationModule])
  

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-50 py-16">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-blue-900 mb-6">
            Coordinating Rapid Federal Response for Disasters Nationwide
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Our mission is to help people before, during, and after disasters with reliable
            emergency management, coordination, and recovery services.
          </p>
        </div>
      </div>

      <section className="max-w-6xl mx-auto py-16 px-4">
        <div className="flex flex-nowrap justify-center gap-8 overflow-x-auto">
          {infoCards?.map((card, index) => (
            <div key={index} className="w-80 flex-shrink-0">
              <InfoCard
                title={card.title}
                description={card.description}
                linkText={card.linkText}
                linkTo={card.linkTo}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
