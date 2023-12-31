import { API_BASE_URL } from "@/app/utils/constant";


export const loginWithSocial = async (payload: unknown) => {
  try {
    const response = await fetch(`${API_BASE_URL}/social-login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.success) {
      // Save token in local storage
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('userId', data.data.id);
    }

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error:', error);
    return { success: false, message: 'An error occurred while logging in' };
  }
};
