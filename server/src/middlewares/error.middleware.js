import { fail } from '../utils/apiResponse.js';

const errorMiddleware = (err, req, res, next) => {
  console.error('[error]', err.message);
  if (res.headersSent) {
    return next(err);
  }
  return fail(res, 500, err.message || 'Server error');
};

export default errorMiddleware;
