import Cors from 'cors';

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

// Initialize the cors middleware
const cors = Cors({
  // Allow requests from any origin
  origin: '*',
  // Allow all HTTP methods
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
});

export default function initMiddleware(middleware) {
  return (req, res) => {
    return runMiddleware(req, res, middleware);
  };
}

export { cors };