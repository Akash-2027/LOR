import { fail } from '../utils/apiResponse.js';

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse({
    body: req.body,
    params: req.params,
    query: req.query
  });

  if (!result.success) {
    return fail(res, 400, 'Validation failed', result.error.flatten());
  }

  req.validated = result.data;
  return next();
};

export default validate;
