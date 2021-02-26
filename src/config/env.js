require('dotenv').config();

// Good practice for passing environment variables into the code
// Instead of calling process.env everywhere, import from this file
const envConfig = {
  backendUrl: process.env.REACT_APP_BACKEND_URL,
  endpoints: {
    questions: 'questions',
    assignments: 'assignments',
    students: 'students',
    resources: 'resources',
    assignmentResults: 'assignmentResults',
  },
};

module.exports = envConfig;