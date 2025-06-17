const { disasters } = require("./mockData");

const resourceOptimizer = async (openai, aiClient) => {
  const context = {
    kind: "system",
    key: "ai-demo-system",
    name: "Resource Optimization",
  };

  const aiConfig = await aiClient.config(
    process.env.LAUNCHDARKLY_AI_CONFIG_KEY || 'resource-optimization-ai',
    context,
    {
      model: { name: 'gpt-4o-mini' },
    },
    { resourceData: disasters } // <-- Send disasters as resources input
  );

  const { tracker } = aiConfig;

  const completion = await tracker.trackOpenAIMetrics(async () => {
    console.log("aiConfig", aiConfig)
    return await openai.chat.completions.create({
      model: aiConfig.model?.name || 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an emergency resource optimization model. Given the following disaster data, output an optimized resource allocation object in the following JSON format only (no extra text): 

{
"currentStatus": {
  "fuelSupplies": "...",
  "medicalUnits": "...",
  "powerRestorationTeams": "..."
},
"forecast": {
  "medicalUnitsIncrease": "...",
  "preStaging": ["...","..."],
  "notes": "..."
}
}

Disaster Data: ${JSON.stringify(disasters)}`
        }
      ],
      temperature: aiConfig.model?.parameters?.temperature ?? 0.5,
      max_tokens: aiConfig.model?.parameters?.maxTokens ?? 1024,
    });
  });

  // Extract the JSON response from ChatGPT reply
  const rawText = completion.choices[0]?.message?.content?.trim();
  const optimizedData = JSON.parse(rawText);
  return optimizedData;
}

module.exports = {
  resourceOptimizer
}