import { signIn, getSession } from 'next-auth/react';

export const apiCall = async (url: string, options: RequestInit = {}) => {
  const session = await getSession();
  if (!session) {
    throw new Error('No active session');
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (response.status === 401) {
    // Token expired, try to refresh
    await signIn('credentials', { redirect: false });
    // Retry the original request
    return apiCall(url, options);
  }

  return response;
};