const flags = [
  {
    key: "resource-optimization-module",
    name: "Resource Optimization Module",
    variations: [{ value: true, name: "On" }, { value: false, name: "Off" }],
    tags: ["demo"],
    temporary: false,
    clientSideAvailability: {
      usingEnvironmentId: true,
      usingMobileKey: false
    }
  },
  {
    key: "preparedness-resources",
    name: "Preparedness Resources",
    variations: [{ value: true, name: "On" }, { value: false, name: "Off" }],
    tags: ["demo"],
    temporary: false,
    isFlagOn: true,
    clientSideAvailability: {
      usingEnvironmentId: true,
      usingMobileKey: false
    }
  },
  {
    key: "active-disasters",
    name: "Active Disasters",
    variations: [{ value: true, name: "On" }, { value: false, name: "Off" }],
    tags: ["demo"],
    temporary: false,
    clientSideAvailability: {
      usingEnvironmentId: true,
      usingMobileKey: false
    }
  },
  {
    key: "new-optimization-feature",
    name: "New Optimization Feature",
    variations: [{ value: true, name: "On" }, { value: false, name: "Off" }],
    tags: ["demo"],
    temporary: false,
    clientSideAvailability: {
      usingEnvironmentId: true,
      usingMobileKey: false
    }
  }
];

module.exports = {
  flags
}