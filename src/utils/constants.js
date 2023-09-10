//Bakend API
export const BACKEND_API = "https://performance-measuring-stopwatch.onrender.com";

//For local host
//export const BACKEND_API = "http://localhost:5000";

// create helper function for formatting Time
export const formatTime = (milliseconds) => {
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
