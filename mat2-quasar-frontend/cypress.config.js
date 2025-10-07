module.exports = {
  projectId: 'v2o8an',
  fixturesFolder: 'test/cypress/fixtures',
  screenshotsFolder: 'test/cypress/screenshots',
  videosFolder: 'test/cypress/videos',
  chromeWebSecurity: false,
  video: false,
  waitForAnimations: false,
  'json.schemas': [
    {
      fileMatch: ['cypress.json'],
      url: 'https://on.cypress.io/cypress.schema.json',
    },
  ],
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./test/cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:8080/',
    specPattern: 'test/cypress/integration/**/*.{js,jsx,ts,tsx}',
    supportFile: 'test/cypress/support/index.js',
  },
}
