import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { authLimiter } from './rateLimit';

export function withRateLimit(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    await new Promise((resolve) => authLimiter(req, res, resolve));
    return handler(req, res);
  };
}
