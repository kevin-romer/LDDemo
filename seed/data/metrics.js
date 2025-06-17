const metrics = [
  {
    key: "home-page-viewed",
    name: "Home page viewed",
    kind: "pageview",
    description: "Average page views per user",
    urls: [{
      kind: "exact",
      url: "http://localhost:3000"
    }]
  },
  {
    key: "disasters-page-viewed",
    name: "Disasters page viewed",
    kind: "pageview",
    description: "Average page views per user",
    urls: [{
      kind: "exact",
      url: "http://localhost:3000/disasters"
    }]
  }
];

module.exports = {
  metrics
}