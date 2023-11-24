export const fetchEvent = async (eventId: number) => {
  try {
    const response = await fetch(`/api/getEvent?eventId=${eventId}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const eventData = await response.json();
    return eventData;
    // setEventData(eventData.data);
  } catch (error) {
    console.error('Error:', error.message);
  }
};