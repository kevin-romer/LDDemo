require('dotenv').config();
const axios = require('axios');
const { flags } = require('./data/flags');
const { metrics } = require('./data/metrics');

const apiToken = process.env.LAUNCHDARKLY_API_TOKEN;
const projectKey = process.env.LAUNCHDARKLY_PROJECT_KEY;
const envKey = process.env.LAUNCHDARKLY_ENVIRONMENT_KEY;
const apiBase = `https://app.launchdarkly.com/api/v2`;
const flagKey = 'active-disasters';

const headers = {
  'Authorization': `${apiToken}`,
  'Content-Type': 'application/json'
};

async function createFlag(flag) {
  const url = `${apiBase}/flags/${projectKey}`;
  try {
    await axios.post(url, flag, { headers });
    console.log(`Created flag: ${flag.key}`);
  } catch (err) {
    if (err.response?.status === 409) {
      console.log(`Flag exists: ${flag.key}`);
    } else {
      console.error(`Error creating flag ${flag.key}:`, err.response?.data || err.message);
    }
  }
}

async function createMetric(metric) {
  const url = `${apiBase}/metrics/${projectKey}`;
  try {
    await axios.post(url, metric, { headers });
    console.log(`Created metric: ${metric.key}`);
  } catch (err) {
    if (err.response?.status === 409) {
      console.log(`Metric exists: ${metric.key}`);
    } else {
      console.error(`Error creating metric ${metric.key}:`, err.response?.data || err.message);
    }
  }
}

async function createExperiment(variationIdTrue, variationIdFalse, flagConfigVersion) {
  const url = `${apiBase}/projects/${projectKey}/environments/${envKey}/experiments`;

  const payload = {
    name: "Disasters Test",
    key: "disasters-test",
    iteration: {
      hypothesis: "If the disasters page is linked from the home page then users will go to the page and be more informed",
      metrics: [
        { key: "disasters-page-viewed" }
      ],
      primarySingleMetricKey: "disasters-page-viewed",
      treatments: [
        {
          name: "Control",
          baseline: true,
          allocationPercent: "50",
          parameters: [
            {
              flagKey: flagKey,
              variationId: variationIdFalse
            }
          ]
        },
        {
          name: "Treatment",
          baseline: false,
          allocationPercent: "50",
          parameters: [
            {
              flagKey: flagKey,
              variationId: variationIdTrue
            }
          ]
        }
      ],
      flags: {
        [flagKey]: {
          ruleId: "fallthrough",
          variationId: variationIdTrue,
          flagConfigVersion
        }
      }
    }
  };

  try {
    await axios.post(url, payload, { headers });
    console.log('Experiment created.');
  } catch (err) {
    if (err.response?.status === 409) {
      console.log('Experiment already exists.');
    } else {
      console.error('Error creating experiment:', err.response?.data || err.message);
    }
  }
}

async function getFlagDetails() {
  const url = `${apiBase}/flags/${projectKey}/${flagKey}`;
  try {
    const { data: flag } = await axios.get(url, { headers });

    const variationTrue = flag.variations.find(v => v.value === true);
    const variationFalse = flag.variations.find(v => v.value === false);
    const configVersion = flag._version;

    await createExperiment(variationTrue._id, variationFalse._id, configVersion);
  } catch (err) {
    console.error('Error fetching flag details:', err.response?.data || err.message);
  }
}

async function seed() {
  console.log("Seeding LaunchDarkly...");
  for (const flag of flags) await createFlag(flag)
  for (const metric of metrics) await createMetric(metric);
  await getFlagDetails()
  console.log("All seeding complete.");
}

seed();
