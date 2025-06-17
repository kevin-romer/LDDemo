require('dotenv').config();

const express = require('express');
const cors = require('cors');
const ld = require('@launchdarkly/node-server-sdk');
const { OpenAI } = require('openai');
const { initAi } = require('@launchdarkly/server-sdk-ai');
const { resourceOptimizer } = require('./resourceOptimizer');
const { resourceOptimization, disasters } = require('./mockData');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const client = ld.init(process.env.LAUNCHDARKLY_SDK_ID);
const aiClient = initAi(client);

const app = express();
const PORT = 4000;

let cachedOptimizedData = null;
let lastOptimizedFetch = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

app.use(cors());
app.use(express.json());

client.once('ready', function () {
  client.track("resource-optimization-requested");
  console.log('SDK successfully initialized!');
});

const crash = () => {
  client.close();
  setTimeout(() => {
    process.exit(1);
  }, 100);
  throw new Error("Intentional server crash for demo purposes");
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Disaster data endpoint
app.get('/disasters', (req, res) => {
  res.json(disasters);
});

// Resource optimization endpoint
app.get('/resource-optimization', async (req, res) => {
  const platform = req.get('sec-ch-ua-platform');
  const context = {
    kind: "user",
    key: "anonymous-user",
    anonymous: true,
    platform: platform || "unknown"
  };

  try {
    const resourceModuleDeployed = await client.variation('resource-optimization-module', context, false);
    const aiModuleDeployed = await client.variation('new-optimization-feature', context, false);
    const crashFixTest = await client.variation('crash-fix-test', context, false);

    if (resourceModuleDeployed) {
      if (aiModuleDeployed) {
        const now = Date.now();

        if (!cachedOptimizedData || (now - lastOptimizedFetch > CACHE_TTL_MS)) {
          console.log("Refreshing optimized resource data...");
          cachedOptimizedData = await resourceOptimizer(openai, aiClient);
          lastOptimizedFetch = now;
        } else {
          console.log("Serving cached optimized resource data");
        }

        res.json(cachedOptimizedData);
      }
      else {
        if (crashFixTest) res.json(resourceOptimization);
        else crash();
      }
    }
  } catch (err) {
    console.error("LaunchDarkly evaluation failed", err);
    res.status(500).send("Error evaluating feature flag");
  }
});

// AI-generated resource optimization endpoint
app.get('/resource-optimization-ai', async (req, res) => {
  try {
    const optimizedData = await resourceOptimizer(openai, aiClient)

    res.json(optimizedData);
  } catch (err) {
    console.error('AI resource optimization failed:', err);
    res.status(500).send("Error generating AI-based resource optimization");
  }
});

// Intentional crash endpoint for demo/testing
app.get('/crash', (req, res) => {
  crash();
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
