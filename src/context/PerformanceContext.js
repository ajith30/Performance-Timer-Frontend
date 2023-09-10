import { createContext, useEffect, useState } from "react";
import { BACKEND_API } from "../utils/constants";

// create a context for the performance data
const PerformanceContext = createContext();

// create a context provider component

export const PerformanceProvider = ({ children }) => {
  const [records, setRecords] = useState({
    running: [],
    cycling: [],
    swimming: [],
  });
  
  const events = ["Running", "Cycling", "Swimming"];

  const distances = {
    Running: ["1km", "2km", "3km", "4km", "5km"],
    Cycling: ["1km", "2km", "3km", "4km", "5km"],
    Swimming: ["100m", "200m", "300m", "400m"],
  };


  // Fetch data from the backend when the app loaded
  useEffect(() => {
    fetchPerformance();
  }, []);

  const fetchPerformance = async () => {
    try {
      const response = await fetch(BACKEND_API);
      const data = await response.json();
      //console.log(data.data);
      setRecords(data.data);
    } catch (err) {
      console.log(err);
    }
  }


  // Add new events performance record and save
  const saveRecord = async (newRecord) => {
    try {
        await fetch(`${BACKEND_API}/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newRecord)
      });
     
      // Fetching latest records once new event is added
      fetchPerformance();
    } catch (err) {
      console.log(err);
    }
  }

  // Delete all performance records of each events
  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete all records?")) {
      await fetch(`${BACKEND_API}/delete-all`, { method: "DELETE" });
      // Fetching latest records once all records deleted
      fetchPerformance();
    }
};

  return (
    <PerformanceContext.Provider value={{
        records,
        setRecords,
        events,
        distances,
        saveRecord,
        fetchPerformance,
        deleteFeedback
      }
    }>
      {children}
    </PerformanceContext.Provider>
  )
}

export default PerformanceContext;