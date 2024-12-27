// jest.global.setup.js
module.exports = async () => {
    // Global setup tasks
    console.log('Setting up test environment...');
    
    // Example: Set up global test configurations
    global.TEST_CONFIG = {
      apiBaseUrl: 'http://localhost:3001',
      testRunId: Date.now()
    };
  
    // Optional: Perform any necessary global initialization
    // For example, connecting to a test database
    // await initializeTestDatabase();
  };