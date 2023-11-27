import { API_BASE_URL } from "@/app/utils/constant";

export const createEvent = async (payload: unknown) => {
  try {
    const authToken = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/api/events/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${authToken}`, // Include the token in the Authorization header
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // eslint-disable-next-line unused-imports/no-unused-vars
    const data = await response.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error:', error);
  }
};