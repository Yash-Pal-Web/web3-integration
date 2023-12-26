import rateLimit from 'express-rate-limit';
import { ApiError } from '../error';
import { SERVER_MESSAGE, HttpStatusCode } from '../constant';

const apiLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
  handler: () => {
    throw new ApiError(SERVER_MESSAGE.API_RATE_LIMIT, true, HttpStatusCode.RATE_LIMIT);
  },
});

// Apply the rate limiting middleware to API calls only
export default apiLimiter;
