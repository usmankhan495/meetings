import { API_BASE_URL } from "@/app/utils/constant";

export const fetchEvent = async (eventId: string) => {
  const authToken = localStorage.getItem('token');
  try {
    const response = await fetch(`${API_BASE_URL}/api/event-attendees/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${authToken}`, // Include the token in the Authorization header
        },
        body: JSON.stringify({ base64_id: eventId })
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