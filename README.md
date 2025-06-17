# Disaster Coordinator Demo Platform

This project demonstrates full LaunchDarkly integration with feature flags, AI Config, experiments, and real-time rollout controls using OpenAI for AI-driven resource optimization.

---

## Requirements

* Node.js (20.x or later recommended)
* Docker and Docker Compose
* LaunchDarkly account with API access
* OpenAI account with API access

---

## Setup Instructions

### 1. Create LaunchDarkly API Token

* In LaunchDarkly, generate an API token with project write access.
* This token will be used for seeding flags, metrics, and experiments.

---

### 2. Environment Variables

#### `seed/.env`

```
LAUNCHDARKLY_API_TOKEN=your-launchdarkly-api-token
LAUNCHDARKLY_PROJECT_KEY=your-project-key
LAUNCHDARKLY_ENVIRONMENT_KEY=your-environment-key
```

#### `front/.env`

```
VITE_API_BASE_URL=http://localhost:4000
VITE_LAUNCHDARKLY_CLIENT_ID=your-client-side-id
```

#### `back/.env`

```
LAUNCHDARKLY_SDK_ID=your-sdk-server-side-id
LAUNCHDARKLY_AI_CONFIG_KEY=resource-optimization-ai
OPENAI_API_KEY=your-openai-api-key
```

---

### 3. Seed LaunchDarkly Data

Run the seeder script to create flags, metrics, and experiments:

```
cd seed
npm install
node seedData.js
```

---

### 4. Create AI Config in LaunchDarkly

In LaunchDarkly UI:

* Create an AI Config named `Resource Optimization AI`.
* Create a variation called `Control` with:

  * System Message:
    As an emergency management expert, provide resource allocation optimization to allocate resources based on disasters
  * Model: `gpt-4o-mini`
* Set the Control variation as the default serving variation.

---

### 5. Start the Full Platform

From the root folder, run:

```
docker-compose up --build
```

---

### 6. Access the Demo

Navigate to:

```
http://localhost:3000
```

---

## Feature Flags Overview

### Preparedness Resources Flag

* Enabled by default.
* Displays the Preparedness page.
* Disabling this flag hides the page while under construction.

### Active Disasters Flag

* Enables display of active disaster card as alternative navigation to the disasters page.
* Experiment is run based on page views of the disasters page.

### Resource Optimization Module Flag

* Enables the Resource Optimization module.
* The `/resource-optimization` endpoint will intentionally crash the backend server when accessed to demonstrate instant rollback.
* PM2 restarts the backend automatically after failure.

### New Optimization Feature Flag

* Enables AI-powered resource optimization using OpenAI.
* Results are cached for five minutes to limit calls to OpenAI.
* Enable both this flag and Resource Optimization Module to demonstrate this

## Context

The frontend provides LaunchDarkly with user context for targeting. The context includes a user key that can be used to demonstrate feature flag targeting behavior.

### Targeting Rule Example

To test context-based targeting, add a rule to the **Preparedness Resources** flag in LaunchDarkly:

**If user key contains `demo-user-001`, serve Off.**

#### Instructions

1. In LaunchDarkly, go to **Feature Flags**.
2. Select the **Preparedness Resources** flag.
3. Under **Targeting configuration**, click **+** and **build a custom rule**.
4. Select **User key** as the attribute.
5. Set the condition:
   `User key` `contains` `demo-user-001`
6. Set the rule to **Serve Off**.
7. Save changes.

This rule ensures that any user whose key includes `demo-user-001` will not see the Preparedness Resources page, allowing you to verify targeting behavior based on LaunchDarkly context. The same behavior can be accomplished by adding a **target individuals** rule and targetting the same user.

## Test Script: Simulate Traffic

The project includes a test script that uses Puppeteer to simulate user traffic to the platform. This can be used to generate activity for metrics and experiments.

### Setup

```
cd text
npm install
node simulate.js
```

The script will automatically open a headless browser, visit the homepage, navigate to the Disasters page, and repeat the process multiple times to simulate user activity. This allows you to observe LaunchDarkly metric tracking and experiment data population. The executablePath is configured for Chrome on a Mac so it will need to be changed if you have a different setup.

### GitHub Actions Integration

The **Find Code References in Pull Request** GitHub Actions workflow runs automatically when pull requests are opened or updated in this repository.