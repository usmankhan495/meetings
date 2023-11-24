import { API_BASE_URL } from "@/app/utils/constant";

export const createEvent = async (payload: unknown) => {
  try {
    // const authToken = getAuthToken();

    const response = await fetch(`${API_BASE_URL}/api/event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Authorization': `Bearer ${authToken}`, // Include the token in the Authorization header
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // eslint-disable-next-line unused-imports/no-unused-vars
    const data = await response.json();
    // setResponseMessage(`Event created successfully: ${data.message}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error:', error);
    // setResponseMessage('Error creating event');
  }
};