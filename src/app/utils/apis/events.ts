import { API_BASE_URL } from "@/app/utils/constant";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const eventList = async (token: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/events`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${token}`,
        },
        cache: 'no-cache'
      });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const eventData = await response.json();
    return eventData;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error:', error);
  }
};