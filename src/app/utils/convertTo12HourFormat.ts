export function convertTo12HourFormat(time24: string) {
  // Parse the input time string
  const [hours, minutes] = time24.split(":").map(Number);

  // Determine AM or PM
  const period = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  const hours12 = hours % 12 || 12;

  // Ensure minutes have a leading zero if less than 10
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  // Create the formatted time string
  const time12 = `${hours12}:${formattedMinutes} ${period}`;

  return time12;
}