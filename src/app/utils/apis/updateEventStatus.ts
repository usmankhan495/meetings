import { API_BASE_URL } from "@/app/utils/constant";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateEvent = async (payload: any) => {

  try {
    const authToken = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/event-attendees/${payload.attendees}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${authToken}`,
      },
      body: JSON.stringify({ status: payload.status })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    await response.json();
    // return data;
  } catch (error) {
    return { success: false }
  }
};